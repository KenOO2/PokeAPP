'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, type ReactNode } from 'react';

export default function Providers({ children }: { children: ReactNode }) {
const [queryClient] = useState(
    () =>
    new QueryClient({
        defaultOptions: {
        queries: {
            staleTime: 24 * 60 * 60 * 1000, 
            gcTime: 48 * 60 * 60 * 1000, 
            refetchOnWindowFocus: false,
        },
        },
    })
);

return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
}