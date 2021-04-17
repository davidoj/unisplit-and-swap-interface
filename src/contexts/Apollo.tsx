import { ApolloProvider } from '@apollo/react-hooks'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { from } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import apolloLogger from 'apollo-link-logger'
import { RetryLink } from 'apollo-link-retry'
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

  const link = from([
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
    link: from([apolloLogger, link]),
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
