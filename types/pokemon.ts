export interface PokemonListItem {
    name: string;
    url: string;
    id: number;
    image: string;
}

export interface PokemonDetail {
    id: number;
    name: string;
    height: number;
    weight: number;
    sprites: {
    front_default: string;
    other: {
    'official-artwork': {
        front_default: string;
    };
    };
};
    types: {
    slot: number;
    type: {
    name: string;
    };
}[];
    stats: {
    base_stat: number;
    stat: {
    name: string;
    };
}[];
    abilities: {
    ability: {
    name: string;
    };
}[];
}