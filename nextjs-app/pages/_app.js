import '../styles/globals.css';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery} from '@apollo/client';
import { HttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

const link =new HttpLink({
  uri: "https://d2z3o48dntziip.cloudfront.net/cms/manage/en-US",
});

const authLink = setContext((_, { headers }) => {
  const token = 'ab5e4303f84ed5ae9ac1e85f8a8e50ec8c8b3145ba863f1a';
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache()
});

function MyApp({ Component, pageProps }) {
  return (
  <ApolloProvider client = {client}>
<Component {...pageProps} />
  </ApolloProvider>
  )
}

export default MyApp;
