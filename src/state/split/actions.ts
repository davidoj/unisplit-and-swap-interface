import { createAction } from '@reduxjs/toolkit'

export const selectCondition = createAction<{ conditionId: string }>('split/selectCondition')
export const selectCurrency = createAction<{ currencyId: string }>('split/selectCurrency')
export const typeInput = createAction<{ field: Field; typedValue: string }>('split/typeInput')
export const replaceSplitState = createAction<{
  typedValue: string
  conditionId: string
  currencyId: string
  recipient: string | null
}>('split/replaceSplitState')
export const setRecipient = createAction<{ recipient: string | null }>('split/setRecipient')
