import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from
} from "@apollo/client"
import { RetryLink } from "@apollo/client/link/retry"
import { onError } from '@apollo/client/link/error'
// import apolloLogger from 'apollo-link-logger'
import React from 'react'



import {
  CTE_GRAPH_HTTP_MAINNET,
  CTE_GRAPH_HTTP_RINKEBY,
} from 'constants/conditionalTokens'

import { useActiveWeb3React } from '../hooks'
import { ChainId } from '@uniswap/sdk'

interface Props {
  children: JSX.Element
}

export const ApolloProviderWrapper = ({ children }: Props) => {

  const { chainId } = useActiveWeb3React()

  const CTELink = React.useMemo(() => {
    let httpUri = CTE_GRAPH_HTTP_MAINNET

    if (chainId === ChainId.RINKEBY) {
      httpUri = CTE_GRAPH_HTTP_RINKEBY
    }


    const CTEHttpLink = new HttpLink({
      uri: httpUri,
    })

    return CTEHttpLink
  },[] )

  const errorLink = onError(error => {
    const { graphQLErrors, networkError } = error

    if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            ),
        );
    if (networkError) console.log(`[Network error]: ${networkError}`, networkError);
  });  

  const link = from([
    errorLink,
    new RetryLink({
      delay: {
        initial: 100,
        max: 2000,
        jitter: true,
      },
      attempts: {
        max: 5,
      },
    }),
    CTELink
  ])

  const client = new ApolloClient({
    link: link,
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'no-cache',
      },
      query: {
        fetchPolicy: 'no-cache',
      },
    },
  })

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
