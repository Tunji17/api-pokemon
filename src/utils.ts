import { InternalPokemon } from './types';

export const convertDimensions = (dimension: { minimum: string, maximum: string }) => {
  return [dimension.minimum, dimension.maximum].join(' - ')
}

export const getDimensions = (dimensionString: string) => {
  const [minimum, maximum] = dimensionString.split(' - ')
  return {
    minimum,
    maximum,
  }
}

export const processPokemonListResponse = (pokemons: InternalPokemon[]) => {
  return pokemons.map((pokemon: InternalPokemon) => {
    const weight = getDimensions(pokemon.weight)
    const height = getDimensions(pokemon.height)
    return {
      ...pokemon,
      weight,
      height,
    }
  })
}