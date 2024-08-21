"use client";

import { ReactNode } from "react";

import client from "../../apollo.config";
import { ApolloProvider } from "@apollo/client";
import { SessionProvider } from "next-auth/react";
import ThemeRegistry from "@/theme/themeRegistry";

// import { JWTProvider as AuthProvider } from 'contexts/JWTContext';

export default function ProviderWrapper({ children }: { children: ReactNode }) {
  return (
    <ApolloProvider client={client}>
      <ThemeRegistry>
        <SessionProvider>{children}</SessionProvider>
      </ThemeRegistry>
    </ApolloProvider>
  );
}
