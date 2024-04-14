"use client";
import React from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { Suspense } from "react";
function Provider({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<h1>Loading...</h1>}>{children}</Suspense>
      </QueryClientProvider>
    </div>
  );
}

export default Provider;
