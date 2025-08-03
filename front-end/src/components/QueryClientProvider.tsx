"use client";

import * as React from "react";
import { QueryClient, QueryClientProvider as QueryClientProviderO } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export function QueryClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProviderO client={queryClient}>
      {children}
    </QueryClientProviderO>
  )
}