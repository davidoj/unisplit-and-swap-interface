import { BigNumber } from '@ethersproject/bignumber'
import { useMemo } from 'react'
// import { useTransactionAdder } from '../state/transactions/hooks'
import { useActiveWeb3React } from './index'
import { useCTContract } from './useContract'
import { NULL_PARENT_ID } from 'constants/abis/conditional-tokens'

export enum CTCallbackState {
  INVALID,
  LOADING,
  VALID
}

// returns a function that will execute a split, if the parameters are all valid
export function useSplitCallback(
  collateral: string, // collateral token address
  parentCollectionId: string = NULL_PARENT_ID,
  conditionId: string,
  partition: BigNumber[],
  amount: BigNumber
): { state: CTCallbackState; callback: null | (() => Promise<string>); error: string | null } {
  const { account, chainId, library } = useActiveWeb3React()
  const contract = useCTContract()
  return useMemo(() => {
    if (!collateral || !library || !account || !chainId || !parentCollectionId || !conditionId || !partition || !amount || !contract ) {
      return { state: CTCallbackState.INVALID, callback: null, error: 'Missing dependencies' }
    }
    if (!account) {
	    return { state: CTCallbackState.LOADING, callback: null, error: null }
    }

    return {
      state: CTCallbackState.VALID,

      callback: async function onSplit(): Promise<string> {

        const tx = contract.splitPosition(
          collateral,
          parentCollectionId,
          conditionId,
          partition,
          amount
        )

        return tx.then( (response: any) => response.hash ).catch((error: any) => {
        // if the user rejected the tx, pass this along
        if (error?.code === 4001) {
            throw new Error('Transaction rejected.')
          } else {
            // otherwise, the error was unexpected and we need to convey that
            console.error(`Swap failed`, 
              error, 
              collateral,
              parentCollectionId,
              conditionId,
              partition,
              amount)
            throw new Error(`Swap failed: ${error.message}`)
          }
        })
      },
      error: null
    }
  }, [collateral, parentCollectionId, conditionId, partition, amount, library, account, chainId])
}
