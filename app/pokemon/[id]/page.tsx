import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getPokemonDetail } from '@/services/pokemon';
import PokemonDetailView from '../../../components/PokemonDetailView';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function PokemonPage({ params }: PageProps) {
const { id } = await params;
const queryClient = new QueryClient();

await queryClient.prefetchQuery({
    queryKey: ['pokemon', id],
    queryFn: () => getPokemonDetail(id),
});

return (
    <HydrationBoundary state={dehydrate(queryClient)}>
    <PokemonDetailView id={id} />
    </HydrationBoundary>
);
}