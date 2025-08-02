"use client";

import { QueryClient, QueryClientProvider as QueryClientProviderO } from "@tanstack/react-query";
import * as React from "react";

export const queryClient = new QueryClient();

export function QueryClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProviderO client={queryClient}>
      {children}
    </QueryClientProviderO>
  )
}