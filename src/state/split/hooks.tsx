import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, AppState } from '../index'
import { useCallback, } from 'react'
import { useToken } from '../../hooks/Tokens'
import { Currency, ETHER, Token, ChainId } from '@uniswap/sdk'
import { selectCollateral, typeCollateralInput, selectCondition } from './actions'
import { Web3Provider } from '@ethersproject/providers'
import { getContract } from 'utils'


import { GetWrappedTokens_wrappedTokens_position_conditions } from 'queries/__generated__/GetWrappedTokens'

async function getToken(tokenAddress: string, chainId: number, provider: Web3Provider ): Promise<Token | undefined | null> {
  const erc20abi = [
    'function symbol() external view returns (string)',
    'function name() external view returns (string)',
    'function decimals() external view returns (uint8)',
  ]

  const contract = getContract( tokenAddress, erc20abi, provider)
  const decimals = await contract.decimals()
  const symbol = await contract.symbol()
  const name = await contract.name()

  return new Token(
    chainId,
    tokenAddress,
    decimals,
    symbol,
    name
  )
}

function updateCollateralTokens( 
  condition: GetWrappedTokens_wrappedTokens_position_conditions, 
  userAddedTokens: Token[],
  removeToken: ( chainId: number, address: string ) => void,
  addToken: ( token: Token ) => void,
  tokenAddresses: string[] | undefined,
  chainId: ChainId | undefined,
  provider: Web3Provider
  ) {

 if (chainId && userAddedTokens) {
    userAddedTokens.map(token => {
      return removeToken(chainId, token.address)
    })
  }

  if (chainId ) {
    tokenAddresses?.map( (tokenAddress) => getToken(tokenAddress, chainId, provider).then( ( t ) => {
      if (t) {
        addToken( t )
      }
    }))
  }
}

export function useSplitState(): AppState['split'] {
  return useSelector<AppState, AppState['split']>(state => state.split)
}

export function useSplitActionHandlers(): {
  onCollateralCurrencySelection: ( collateral: Currency ) => void
  onCollateralUserInput: ( typedCollateralValue: string ) => void
  onConditionSelection: ( condition: GetWrappedTokens_wrappedTokens_position_conditions,
                          userAddedTokens: Token[],
                          provider: Web3Provider,
                          removeToken: ( chainId: number, address: string) => void,
                          addToken: ( token: Token ) => void,
                          tokenAddresses: string[] | undefined,
                          chainId: ChainId | undefined ) => void
} {
  const dispatch = useDispatch<AppDispatch>()
  const onCollateralCurrencySelection = useCallback(
    (collateral: Currency) => {
      dispatch(
        selectCollateral({
          collateralId: collateral instanceof Token ? collateral.address : collateral === ETHER ? 'ETH' : ''
        })
      )
    },
    [dispatch]
  )

  const onCollateralUserInput = useCallback(
    (typedCollateralValue: string) => {
      dispatch(typeCollateralInput({ typedCollateralValue }))
    },
    [dispatch]
  )

  const onConditionSelection = useCallback(
      ( condition: GetWrappedTokens_wrappedTokens_position_conditions,
        userAddedTokens: Token[],
        provider: Web3Provider,
        removeToken: ( chainId: number, address: string) => void,
        addToken: ( token: Token ) => void,
        tokenAddresses: string[] | undefined,
        chainId: ChainId | undefined )  => {

      updateCollateralTokens( condition, userAddedTokens, removeToken, addToken, tokenAddresses, chainId, provider )
      dispatch(selectCondition( { condition: condition } ))

    },
    [dispatch]
  )

  return {
    onCollateralCurrencySelection,
    onCollateralUserInput,
    onConditionSelection
  }
}

export function useDerivedSplitInfo(): {
  collateral: Currency | null | undefined
} {
    const { collateralId }= useSplitState()
    const collateral = useToken(collateralId)
    return {
      collateral
    }
  }