"use client";
import React, { useMemo } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

export function QueryProvider({ children }: React.PropsWithChildren) {
  const client = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000,
            refetchInterval: 5 * 60 * 1000,
          },
        },
      }),
    []
  );

  return (
    <QueryClientProvider client={client} contextSharing={true}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}