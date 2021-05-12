import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, AppState } from '../index'
import { useCallback, } from 'react'
import { useCurrency } from '../../hooks/Tokens'
import { Currency, ETHER, Token } from '@uniswap/sdk'
import { selectCollateral, typeCollateralInput, selectCondition } from './actions'

import { GetWrappedTokens_wrappedTokens_position_conditions } from 'queries/__generated__/GetWrappedTokens'


export function useSplitState(): AppState['split'] {
  return useSelector<AppState, AppState['split']>(state => state.split)
}

export function useSplitActionHandlers(): {
  onCollateralCurrencySelection: ( collateral: Currency) => void
  onCollateralUserInput: ( typedCollateralValue: string) => void
  onConditionSelection: ( condition: GetWrappedTokens_wrappedTokens_position_conditions ) => void
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
    (condition: GetWrappedTokens_wrappedTokens_position_conditions) => 
     { dispatch(selectCondition( {condition: condition} )) }
    ,
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
}
  {
    const { collateralId }= useSplitState()
    const collateral = useCurrency(collateralId)
    return {
      collateral
    }
  }