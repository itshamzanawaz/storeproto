import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://api-ap-south-1.hygraph.com/v2/clt05bx260pne07wekcgnv3a2/master',
  cache: new InMemoryCache(),
});

export default client;