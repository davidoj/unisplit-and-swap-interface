import { createReducer } from '@reduxjs/toolkit'
import { replaceSplitState, selectCurrency, setRecipient, switchCurrencies, typeInput } from './actions'

export interface SplitState {
  readonly conditionId: string
  readonly typedValue: string
  readonly currencyId: string
  // the typed recipient address or ENS name, or null if split should go to sender
  readonly recipient: string | null
}

const initialState: SplitState = {
  conditionId: ''
  typedValue: '',
  currencyId: '',
  recipient: null
}

export default createReducer<SplitState>(initialState, builder =>
  builder
    .addCase(
      replaceSplitState,
      (state, { payload: { typedValue, conditionId, currencyId, recipient } }) => {
        return {
          currencyId: currencyId,
          conditionId: conditionId,
          typedValue: typedValue,
          recipient: recipient
        }
      }
    )
    .addCase(selectCurrency, (state, { payload: { currencyId } }) => {
        return {
          ...state,
          currencyId: currencyId
        }
      } 
    )
    .addCase(typeInput, (state, { payload: { typedValue } }) => {
      return {
        ...state,
        typedValue: typedValue
      }
    })
    .addCase(setRecipient, (state, { payload: { recipient } }) => {
      state.recipient = recipient
    })
)
