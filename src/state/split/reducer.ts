import { createReducer } from '@reduxjs/toolkit'
import { replaceSplitState, selectCollateral, typeCollateralInput, selectCondition } from './actions'
import { GetWrappedTokens_wrappedTokens_position_conditions } from 'queries/__generated__/GetWrappedTokens'
import cloneDeep from 'lodash'

export interface SplitState {
  readonly condition: GetWrappedTokens_wrappedTokens_position_conditions | null
  readonly typedCollateralValue: string
  readonly collateralId: string
  // the typed recipient address or ENS name, or null if split should go to sender
}

const initialState: SplitState = {
  condition: null,
  typedCollateralValue: '',
  collateralId: ''
}

export default createReducer<SplitState>(initialState, builder =>
  builder
    .addCase(
      replaceSplitState,
      (state, { payload: { typedCollateralValue, condition, collateralId } }) => {
        const conditionClone = cloneDeep(condition).value()
        return {
          collateralId: collateralId,
          condition: conditionClone,
          typedCollateralValue: typedCollateralValue
        }
      }
    )
    .addCase(selectCollateral, (state, { payload: { collateralId } }) => {
        return {
          ...state,
          collateralId: collateralId
        }
      } 
    )
    .addCase(typeCollateralInput, (state, { payload: { typedCollateralValue } }) => {
      return {
        ...state,
        typedCollateralValue: typedCollateralValue
      }
    })
    .addCase(selectCondition, (state, { payload: { condition } }) => {
        const conditionClone = cloneDeep(condition).value()
        return {
          ...state,
          condition: conditionClone
        }
      }
    )

)
