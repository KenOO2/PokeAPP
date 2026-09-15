import { PokemonDetail, PokemonListItem } from '@/types/pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2';

export async function getPokemonList(limit = 50, offset = 0): Promise<PokemonListItem[]> {
const res = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
const data = await res.json();

return data.results.map((item: { name: string; url: string }) => {
    const id = Number(item.url.split('/').filter(Boolean).pop());
    return {
        name: item.name,
        url: item.url,
        id,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
    };
});
}

export async function getPokemonDetail(idOrName: string | number): Promise<PokemonDetail> {
    const res = await fetch(`${BASE_URL}/pokemon/${idOrName}`);
    if (!res.ok) throw new Error('Failed to fetch pokemon details');
    return res.json();
}