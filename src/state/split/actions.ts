import { createAction } from '@reduxjs/toolkit'

export const splitField = 'SPLIT'

export const selectCondition = createAction<{ conditionId: string }>('split/selectCondition')
export const selectCurrency = createAction<{ collateralId: string }>('split/selectCurrency')
export const typeInput = createAction<{ typedSplitValue: string }>('split/typeInput')
export const replaceSplitState = createAction<{
  typedSplitValue: string
  conditionId: string
  collateralId: string
}>('split/replaceSplitState')
export const setRecipient = createAction<{ recipient: string | null }>('split/setRecipient')
