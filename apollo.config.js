// lib/apollo-client.ts
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// Create an HttpLink for your GraphQL endpoint
const httpLink = new HttpLink({
  uri: "http://localhost:8000/graphql", // Replace with your GraphQL endpoint
});

// Optionally, you can add an auth link to add headers
// const authLink = setContext((_, { headers }) => {
//   const token = localStorage.getItem("token");
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : "",
//     },
//   };
// });

// Combine authLink and httpLink if using authLink
// const link = authLink.concat(httpLink);

const client = new ApolloClient({
  link: httpLink, // Replace the string with httpLink
  cache: new InMemoryCache(),
});

export default client;
