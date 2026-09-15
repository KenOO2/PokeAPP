'use client';

import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getPokemonList, getPokemonDetail } from '@/services/pokemon';
import { PokemonListItem } from '@/types/pokemon';

export default function Home() {
  const [pokemons, setPokemons] = useState<PokemonListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const queryClient = useQueryClient();

  useEffect(() => {
    getPokemonList(50, 0).then((data) => {
      setPokemons(data);
      setLoading(false);
      data.slice(0, 12).forEach((pokemon: PokemonListItem) => {
        const img = new window.Image();
        img.src = pokemon.image;
      });
    });
  }, []);

  const handleMouseEnter = (name: string) => {
    queryClient.prefetchQuery({
      queryKey: ['pokemon', name],
      queryFn: () => getPokemonDetail(name),
      staleTime: 24 * 60 * 60 * 1000,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="font-pixel text-yellow-400 text-sm sm:text-base flex items-center gap-4">
          <span className="w-4 h-4 bg-red-600 inline-block border-2 border-white pixel-blink"></span>
          CARGANDO POKÉDEX...
        </div>
      </div>
    );
  }

  return (
    <main className="relative z-10 min-h-screen bg-white text-black p-4 sm:p-10">
      <div className="max-w-7xl mx-auto mb-10 bg-red-600 pixel-corners pixel-border p-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-cyan-400 border-4 border-white shadow-lg flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full absolute top-1 right-2 opacity-80"></div>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-300 border-2 border-white shadow-sm" />
            <div className="w-3 h-3 rounded-full bg-yellow-300 border-2 border-white shadow-sm" />
          </div>
        </div>
        <div className="text-center">
          <h1 className="font-pixel text-lg sm:text-2xl text-white drop-shadow-[2px_2px_0_rgba(0,0,0,0.5)]">
            POKÉDEX REGIONAL
          </h1>
          <p className="font-retro text-yellow-200 text-lg sm:text-xl mt-2 leading-tight">
            Explora los primeros 50 Pokémon de Kanto y descubre sus datos.
          </p>
        </div>

        <div className="font-pixel bg-red-900 text-yellow-300 px-4 py-2 pixel-corners-sm text-[10px] sm:text-xs border-2 border-black">
          KANTO GEN 1
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
        {pokemons.map((pokemon, index) => {
          const formattedId = `#${String(pokemon.id).padStart(3, '0')}`;
          const isPriority = index < 10;
          return (
            <Link
              key={pokemon.id}
              href={`/pokemon/${pokemon.name}`}
              onMouseEnter={() => handleMouseEnter(pokemon.name)}
              className="group relative bg-slate-500 pixel-corners pixel-border-thin p-5 flex flex-col items-center hover:bg-slate-800 transition-colors duration-150"
            >
              <span className="font-pixel absolute top-3 right-3 text-[9px] text-slate-500 group-hover:text-yellow-400">
                {formattedId}
              </span>
              <div className="w-28 h-28 bg-slate-100/60 pixel-corners-sm flex items-center justify-center mb-4 group-hover:bg-red-500/10 transition-colors">
                <Image
                  src={pokemon.image}
                  alt={pokemon.name}
                  width={96}
                  height={96}
                  priority={isPriority}
                  className="object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-md"
                  unoptimized
                />
              </div>
              <span className="font-retro capitalize text-slate-200 text-2xl tracking-wide group-hover:text-yellow-400 transition-colors">
                {pokemon.name}
              </span>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
