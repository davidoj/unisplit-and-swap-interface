import { createStore, Store } from 'redux'
import { Field, selectCurrency } from './actions'
import reducer, { SwapState } from './reducer'

describe('swap reducer', () => {
  let store: Store<SwapState>

  beforeEach(() => {
    store = createStore(reducer, {
      conditionId:'',
      collateralId: '',
      typedSplitValue: ''
    })
  })

  describe('selectToken', () => {
    it('changes token', () => {
      store.dispatch(
        selectCurrency({
          collateralId: '0x0000'
        })
      )

      expect(store.getState()).toEqual({
      conditionId:'',
      collateralId: '0x0000',
      typedSplitValue: ''
      })
    })
  })
})
