'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { getPokemonDetail } from '@/services/pokemon';

const typeColors: Record<string, string> = {
    fire: 'bg-red-600 text-white',
    water: 'bg-blue-600 text-white',
    grass: 'bg-emerald-600 text-white',
    electric: 'bg-amber-400 text-slate-900',
    ice: 'bg-cyan-300 text-slate-900',
    fighting: 'bg-orange-700 text-white',
    poison: 'bg-purple-600 text-white',
    ground: 'bg-amber-800 text-white',
    flying: 'bg-indigo-400 text-white',
    psychic: 'bg-pink-500 text-white',
    bug: 'bg-lime-600 text-slate-900',
    rock: 'bg-yellow-700 text-white',
    ghost: 'bg-violet-800 text-white',
    dragon: 'bg-indigo-600 text-white',
    steel: 'bg-slate-400 text-slate-900',
    dark: 'bg-zinc-800 text-white',
    fairy: 'bg-rose-300 text-slate-900',
    normal: 'bg-zinc-500 text-white',
};

export default function PokemonDetailView({ id }: { id: string }) {
const { data: pokemon, isLoading } = useQuery({
    queryKey: ['pokemon', id],
    queryFn: () => getPokemonDetail(id),
    staleTime: 24 * 60 * 60 * 1000,
});

if (isLoading) {
    return (
    <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="font-pixel text-yellow-400 text-sm flex items-center gap-4">
        <span className="w-4 h-4 bg-red-600 inline-block border-2 border-white pixel-blink"></span>
            CARGANDO DATOS...
        </div>
    </div>
    );
}

if (!pokemon) {
    return (
    <div className="min-h-screen bg-slate-300 flex flex-col items-center justify-center gap-4">
        <div className="font-pixel text-white text-sm">NO SE ENCONTRÓ EL POKÉMON</div>
        <Link href="/" className="font-pixel text-yellow-400 hover:underline text-xs">&larr; VOLVER</Link>
    </div>
    );
}

const mainSprite = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;
const formattedId = `#${String(pokemon.id).padStart(3, '0')}`;

return (
    <main className="relative z-10 min-h-screen bg-white text-slate-200 p-4 sm:p-10">
    <div className="max-w-4xl mx-auto flex justify-between items-center mb-8 bg-red-600 p-4 pixel-corners pixel-border-thin">
        <Link
            href="/"
            className="pixel-btn font-pixel inline-flex items-center gap-2 bg-yellow-400 text-slate-950 px-3 py-2 pixel-corners-sm text-[10px] border-2 border-black"
        >
        &larr; VOLVER
        </Link>
        <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-cyan-400 border-2 border-white shadow-sm" />
            <div className="w-3 h-3 rounded-full bg-yellow-300 border-2 border-white shadow-sm" />
            <div className="w-3 h-3 rounded-full bg-green-500 border-2 border-white shadow-sm" />
        </div>
        <span className="font-pixel text-sm sm:text-base text-white bg-red-900 px-3 py-1.5 pixel-corners-sm border-2 border-black">
        {formattedId}
        </span>
    </div>
    <div className="max-w-4xl mx-auto bg-slate-500 pixel-corners pixel-border overflow-hidden">
        <div className="relative p-6 sm:p-10 flex flex-col items-center bg-gradient-to-b from-red-600/10 via-slate-900 to-slate-900 border-b-4 border-black">
        <div className="relative w-56 h-56 sm:w-64 sm:h-64 drop-shadow-[0_15px_15px_rgba(255,255,255,0.05)]">
            <Image
                src={mainSprite}
                alt={pokemon.name}
                fill
                className="object-contain"
                priority
                unoptimized
            />
        </div>
        <h1 className="font-pixel text-2xl md:text-4xl capitalize text-white tracking-tight mt-6 drop-shadow-[2px_2px_0_rgba(0,0,0,0.6)]">
            {pokemon.name}
        </h1>
        <div className="flex gap-3 mt-5 flex-wrap justify-center">
            {pokemon.types.map((t) => {
            const colorClass = typeColors[t.type.name] || 'bg-slate-500 text-white';
            return (
                <span
                key={t.type.name}
                className={`font-pixel px-4 py-1.5 pixel-corners-sm text-[10px] uppercase border-2 border-black ${colorClass}`}
                >
                {t.type.name}
                </span>
            );
            })}
        </div>
        </div>

        {/* Sección Inferior: Info y Stats */}
        <div className="p-6 sm:p-10 grid md:grid-cols-3 gap-10">
          {/* Físico */}
        <div className="md:col-span-1 bg-slate-250 p-6 pixel-corners-sm border-2 border-black">
            <h2 className="font-pixel text-[10px] text-yellow-400 mb-5 uppercase flex items-center gap-2">
            <span className="w-2 h-2 bg-yellow-400"></span>
            Físico
            </h2>
            <div className="space-y-4 font-retro text-lg">
            <p className="flex justify-between items-center border-b-2 border-dashed border-slate-800 pb-2">
                <span className="text-slate-400">Altura</span>
                <span className="text-white font-bold text-xl">{(pokemon.height / 10).toFixed(1)} m</span>
            </p>
            <p className="flex justify-between items-center border-b-2 border-dashed border-slate-800 pb-2">
                <span className="text-slate-400">Peso</span>
                <span className="text-white font-bold text-xl">{(pokemon.weight / 10).toFixed(1)} kg</span>
            </p>
            <div>
                <span className="text-slate-400 block mb-2">Habilidades</span>
                <div className="flex flex-wrap gap-2">
                {pokemon.abilities.map((a) => (
                    <span key={a.ability.name} className="font-pixel bg-red-950/60 text-red-300 border-2 border-red-800/50 px-2 py-1.5 pixel-corners-sm text-[9px] capitalize">
                    {a.ability.name.replace('-', ' ')}
                    </span>
                ))}
                </div>
            </div>
            </div>
        </div>
        <div className="md:col-span-2 bg-slate-250 p-6 pixel-corners-sm border-2 border-black">
            <h2 className="font-pixel text-[10px] text-yellow-400 mb-5 uppercase flex items-center gap-2">
            <span className="w-2 h-2 bg-yellow-400"></span>
            Estadísticas Base
            </h2>
            <div className="space-y-4">
            {pokemon.stats.map((s) => {
                const statNameMap: Record<string, string> = {
                    hp: 'HP',
                    attack: 'ATK',
                    defense: 'DEF',
                    'special-attack': 'SATK',
                    'special-defense': 'SDEF',
                    speed: 'SPD',
                };
                const shortName = statNameMap[s.stat.name] || s.stat.name.toUpperCase();
                const maxStat = 255; 
                const percentage = (s.base_stat / maxStat) * 100;
                
                let barColor = 'bg-red-500';
                if (s.base_stat >= 60) barColor = 'bg-yellow-400';
                if (s.base_stat >= 90) barColor = 'bg-green-500';
                return (
                <div key={s.stat.name} className="grid grid-cols-[50px,1fr,44px] items-center gap-3">
                    <span className="font-pixel text-slate-400 text-[9px]">{shortName}</span>
                    <div className="w-full bg-slate-900 h-4 overflow-hidden border-2 border-black pixel-bar-track">
                    <div 
                        className={`h-full ${barColor}`} 
                        style={{ width: `${percentage}%` }}
                    />
                    </div>
                    <span className="font-pixel text-white text-[10px] text-right">{s.base_stat}</span>
                </div>
                );
            })}
            </div>
        </div>
        </div>
    </div>
    </main>
);
}
