"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Props } from "next/script";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const config = {
  defaultOptions: {
    queries: {
      // stateTime: 60 * 1000,
      staleTime: 0,
    },
  },
};
export default function ReactQueryProvider({ children }: Props) {
  const queryClient = new QueryClient(config);
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} />
      {children}
    </QueryClientProvider>
  );
}
