import { ApolloClient, InMemoryCache } from '@apollo/client';
const endpoint = process.env.NEXT_PUBLIC_SECRET
const client = new ApolloClient({
  uri: endpoint,
  cache: new InMemoryCache(),
});

export default client;