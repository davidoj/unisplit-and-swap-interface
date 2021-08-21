import { createReducer } from '@reduxjs/toolkit'
import { BigNumber } from '@ethersproject/bignumber'
import { replaceSplitState, selectCollateral, typeCollateralInput, selectCondition } from './actions'
import { GetWrappedTokens_wrappedTokens_position_conditions } from 'queries/__generated__/GetWrappedTokens'
import cloneDeep from 'lodash'

export interface SplitState {
  readonly condition: GetWrappedTokens_wrappedTokens_position_conditions | null
  readonly typedCollateralValue: string
  readonly collateralId: string
  readonly partition: BigNumber[]
}

const initialState: SplitState = {
  condition: null,
  typedCollateralValue: '',
  collateralId: '',
  partition: []
}

export default createReducer<SplitState>(initialState, builder =>
  builder
    .addCase(
      replaceSplitState,
      (state, { payload: { typedCollateralValue, condition, collateralId, partition } }) => {

        const conditionClone = cloneDeep(condition).value()

        return {
          collateralId: collateralId,
          condition: conditionClone,
          typedCollateralValue: typedCollateralValue,
          partition: partition
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
