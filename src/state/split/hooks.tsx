import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, AppState } from '../index'
import { useCallback, } from 'react'
// import { useCurrency } from '../../hooks/Tokens'
import { Currency, ETHER, Token } from '@uniswap/sdk'
import { selectCurrency, typeInput } from './actions'


export function useSplitState(): AppState['split'] {
  return useSelector<AppState, AppState['split']>(state => state.split)
}

export function useSplitActionHandlers(): {
  onSplitCurrencySelection: ( currency: Currency) => void
  onSplitUserInput: ( typedSplitValue: string) => void
} {
  const dispatch = useDispatch<AppDispatch>()
  const onSplitCurrencySelection = useCallback(
    (currency: Currency) => {
      dispatch(
        selectCurrency({
          collateralId: currency instanceof Token ? currency.address : currency === ETHER ? 'ETH' : ''
        })
      )
    },
    [dispatch]
  )

  const onSplitUserInput = useCallback(
    (typedSplitValue: string) => {
      dispatch(typeInput({ typedSplitValue }))
    },
    [dispatch]
  )

  return {
    onSplitCurrencySelection,
    onSplitUserInput
  }
}