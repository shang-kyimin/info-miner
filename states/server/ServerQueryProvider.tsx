"use client";


import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


let browserQueryClient: QueryClient | undefined = undefined;

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      },
    }
  });
}

function getQueryClient() {
  if (typeof window === "undefined")
    return makeQueryClient();

  if (!browserQueryClient)
    browserQueryClient = makeQueryClient();

  return browserQueryClient;
}


export const queryClient = getQueryClient();

export default function ServerQueryProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}


