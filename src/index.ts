import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { gql, GraphQLClient } from 'graphql-request';
import { PaginateQuery, Pokemon } from './types';
import { convertDimensions, processPokemonListResponse } from './utils';

const prisma = new PrismaClient();
const app = express();
const pokemonClient = new GraphQLClient('https://graphql-pokemon2.vercel.app/');

app.use(express.json())



// This endpoint fetches all pokenmon from graphql api and returns them as json
// It has support for pagination
app.get(`/pokemons`, async (req: Request, res: Response) => {

  const { page = '0', limit = '10' } = req.query as unknown as PaginateQuery;

  // convert to number
  const pageNumber = parseInt(page);
  const limitNumber = parseInt(limit);

  const lastRequestedPokemonNumber = (pageNumber + 1) * limitNumber;

  // check if we have pokemons in db
  const [lastPokemonWeHave] = await prisma.pokemon.findMany({
    orderBy: {
      id: 'desc',
    },
    take: 1,
  });

  if (lastPokemonWeHave && lastPokemonWeHave.number >= lastRequestedPokemonNumber) {
    // we have all pokemons in db
    let pokemonList = await prisma.pokemon.findMany({
      skip: pageNumber * limitNumber,
      take: limitNumber,
    });
    const pokemons = processPokemonListResponse(pokemonList);

    return res.status(200).json({
      success: true,
      data: pokemons,
    });
  }

  const query = gql`
    query pokemons($first: Int!) {
      pokemons(first: $first) {
        id
        number
        name
        image
        classification
        weight {
          minimum
          maximum
        }
        height {
          minimum
          maximum
        }
      }
    }
  `;

  const variables = {
    first: lastRequestedPokemonNumber,
  };

  const data: { pokemons : Pokemon[] } = await pokemonClient.request(query, variables);

  // Bulk create pokemons using prisma client fails silently if there is a duplicate

  await prisma.pokemon.createMany({
    data: data.pokemons.map((pokemon: Pokemon) => {
      const weight = convertDimensions(pokemon.weight);
      const height = convertDimensions(pokemon.height);
      return {
      id: pokemon.id,
      number: parseInt(pokemon.number),
      name: pokemon.name,
      image: pokemon.image,
      classification: pokemon.classification,
      weight,
      height,
    }}),
    skipDuplicates: true,
  });

  const pokemonList = await prisma.pokemon.findMany({
    skip: pageNumber * limitNumber,
    take: limitNumber,
  });

  const pokemons = processPokemonListResponse(pokemonList);

  return res.status(200).json({
    success: true,
    data: pokemons,
  })
})

app.listen(3000, () =>
  console.log(`🚀 Server ready at: http://localhost:3000`),
)
