import { createAction } from '@reduxjs/toolkit'
import { GetWrappedTokens_wrappedTokens_position_conditions } from 'queries/__generated__/GetWrappedTokens'
import { BigNumber } from '@ethersproject/bignumber'


export const collateralField = 'COLLATERAL'

export const selectCondition = createAction<{ 
	condition: GetWrappedTokens_wrappedTokens_position_conditions | null
}>('split/selectCondition')

export const selectCollateral = createAction<{ collateralId: string }>('split/selectCollateral')
export const typeCollateralInput = createAction<{ typedCollateralValue: string }>('split/typeCollateralInput')
export const replaceSplitState = createAction<{
  typedCollateralValue: string
  condition: GetWrappedTokens_wrappedTokens_position_conditions | null
  collateralId: string
  partition: BigNumber[]
}>('split/replaceSplitState')
export const setRecipient = createAction<{ recipient: string | null }>('split/setRecipient')
