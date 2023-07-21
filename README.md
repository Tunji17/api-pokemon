# Luxor Assessment

The Task is to implement a stable backend service that acts as a REST API adapter for the external Pokemon GraphQL API, and stores Pokemon details in a PostgreSQL database.

## Application Requirements

• Building an API-adapter service that fetches data from an external GraphQL Pokedex API and serve it through a REST API instead
• The service should also store the Pokemon details in a PostgreSQL database when a specific Pokemon is requested for the first time
• Pagination

## API Documentation

REQUEST: `GET http://localhost:8000/pokemons?page=1&limit=10`

RESPONSE:

```shell

{
    "success": true,
    "data": [
        {
            "id": "UG9rZW1vbjowMTE=",
            "number": 11,
            "name": "Metapod",
            "image": "https://img.pokemondb.net/artwork/metapod.jpg",
            "classification": "Cocoon Pokémon",
            "weight": {
                "minimum": "8.66kg",
                "maximum": "11.14kg"
            },
            "height": {
                "minimum": "0.61m",
                "maximum": "0.79m"
            },
            "createdAt": "2023-07-21T13:14:05.152Z",
            "updatedAt": "2023-07-21T13:14:05.152Z"
        },
        {
            "id": "UG9rZW1vbjowMTI=",
            "number": 12,
            "name": "Butterfree",
            "image": "https://img.pokemondb.net/artwork/butterfree.jpg",
            "classification": "Butterfly Pokémon",
            "weight": {
                "minimum": "28kg",
                "maximum": "36kg"
            },
            "height": {
                "minimum": "0.96m",
                "maximum": "1.24m"
            },
            "createdAt": "2023-07-21T13:14:05.152Z",
            "updatedAt": "2023-07-21T13:14:05.152Z"
        },
        • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • •
        {
            "id": "UG9rZW1vbjowMTk=",
            "number": 19,
            "name": "Rattata",
            "image": "https://img.pokemondb.net/artwork/rattata.jpg",
            "classification": "Mouse Pokémon",
            "weight": {
                "minimum": "3.06kg",
                "maximum": "3.94kg"
            },
            "height": {
                "minimum": "0.26m",
                "maximum": "0.34m"
            },
            "createdAt": "2023-07-21T13:14:05.152Z",
            "updatedAt": "2023-07-21T13:14:05.152Z"
        },
        {
            "id": "UG9rZW1vbjowMjA=",
            "number": 20,
            "name": "Raticate",
            "image": "https://img.pokemondb.net/artwork/raticate.jpg",
            "classification": "Mouse Pokémon",
            "weight": {
                "minimum": "16.19kg",
                "maximum": "20.81kg"
            },
            "height": {
                "minimum": "0.61m",
                "maximum": "0.79m"
            },
            "createdAt": "2023-07-21T13:14:05.152Z",
            "updatedAt": "2023-07-21T13:14:05.152Z"
        }
    ]
}
```

## Development

Application is build using an Express server, Typescript, PostgreSQL and Prisma ORM. It runs in a docker container for cross platform compartibility.

### Running the App

Checkout to root of the application and run the following commands in the terminal

```shell
  docker-compose build

  docker-compose up

```

App should be running on <http://localhost:8000>
