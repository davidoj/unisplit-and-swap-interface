import { createAction } from '@reduxjs/toolkit'
import { GetWrappedTokens_wrappedTokens_position_conditions } from 'queries/__generated__/GetWrappedTokens'


export const collateralField = 'COLLATERAL'

export const selectCondition = createAction<{ condition: GetWrappedTokens_wrappedTokens_position_conditions }>('split/selectCondition')
export const selectCollateral = createAction<{ collateralId: string }>('split/selectCollateral')
export const typeCollateralInput = createAction<{ typedCollateralValue: string }>('split/typeCollateralInput')
export const replaceSplitState = createAction<{
  typedCollateralValue: string
  condition: GetWrappedTokens_wrappedTokens_position_conditions
  collateralId: string
}>('split/replaceSplitState')
export const setRecipient = createAction<{ recipient: string | null }>('split/setRecipient')