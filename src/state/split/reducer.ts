import { createReducer } from '@reduxjs/toolkit'
import { replaceSplitState, selectCurrency, typeInput } from './actions'

export interface SplitState {
  readonly conditionId: string
  readonly typedSplitValue: string
  readonly collateralId: string
  // the typed recipient address or ENS name, or null if split should go to sender
}

const initialState: SplitState = {
  conditionId: '',
  typedSplitValue: '',
  collateralId: ''
}

export default createReducer<SplitState>(initialState, builder =>
  builder
    .addCase(
      replaceSplitState,
      (state, { payload: { typedSplitValue, conditionId, collateralId } }) => {
        return {
          collateralId: collateralId,
          conditionId: conditionId,
          typedSplitValue: typedSplitValue
        }
      }
    )
    .addCase(selectCurrency, (state, { payload: { collateralId } }) => {
        return {
          ...state,
          collateralId: collateralId
        }
      } 
    )
    .addCase(typeInput, (state, { payload: { typedSplitValue } }) => {
      return {
        ...state,
        typedSplitValue: typedSplitValue
      }
    })

)
