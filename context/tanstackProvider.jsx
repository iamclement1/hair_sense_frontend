"use client";
import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import StateProvider from "./StateProvider";


const TanstackProvider = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient({}));

  return (
    <StateProvider>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </StateProvider>
  );
};

export default TanstackProvider;
