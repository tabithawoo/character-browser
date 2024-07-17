"use client";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const Providers = ({children} : {
    children: React.ReactNode
}) => {
    const client = new ApolloClient({
        uri: "https://rickandmortyapi.com/graphql",
        cache: new InMemoryCache(),
    });

    return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export default Providers;