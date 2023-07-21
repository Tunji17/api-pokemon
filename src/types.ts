export interface PaginateQuery {
  page: string;
  limit: string;
}

export interface BasePokemon {
  id: string;
  name: string;
  image: string;
  classification: string;
}

export interface InternalPokemon extends BasePokemon {
  number: number;
  weight: string;
  height: string;
}

export interface Pokemon extends BasePokemon {
  number: string;
  weight: {
    minimum: string;
    maximum: string;
  };
  height: {
    minimum: string;
    maximum: string;
  };
}