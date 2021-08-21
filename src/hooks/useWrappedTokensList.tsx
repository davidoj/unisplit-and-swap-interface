import { GetWrappedTokens } from 'queries/CTWrappedTokens'
import { GetQuestions } from 'queries/CTConditionsWithQuestions'
import { BigNumber } from '@ethersproject/bignumber'

import { GetQuestions_questions } from 'queries/__generated__/GetQuestions'
import { GetWrappedTokens_wrappedTokens, GetWrappedTokens_wrappedTokens_position } from 'queries/__generated__/GetWrappedTokens'

import { useQuery } from '@apollo/client'

export interface wrappedConditionalToken {
  id: string;
  position: GetWrappedTokens_wrappedTokens_position;
  partition: BigNumber[] | null
}

function addQuestionsToConditions(questions: GetQuestions_questions[], wrappedTokens: GetWrappedTokens_wrappedTokens[]) {

  for (let wrappedToken of wrappedTokens) {
  	for (let condition of wrappedToken.position.conditions) {
      try {
  		  condition.question  = questions.find(( question )=> question.id === condition.questionId ) ?? null
      } catch (error) {
        console.log(error)
        console.log(condition?.question?.title)
      }
  	}
  }
}


function isPartition( partition: BigNumber[] ): boolean {
  const bitwidth = partition.length
  const sum = partition.reduce((a,b)=>a.add(b))
  return (sum.toTwos(bitwidth) == BigNumber.from('1'))
}

// Currently, can only split if the wrapped tokens form an exhausitve and mutually exclusive partition of outcomes
function inferPartition( wrappedToken: GetWrappedTokens_wrappedTokens, wrappedTokens: GetWrappedTokens_wrappedTokens[] ): BigNumber[] | null {

  const partition = wrappedTokens.filter( (token: GetWrappedTokens_wrappedTokens) => token.position.conditions == wrappedToken.position.conditions )
  .map((token: any) => {
    return token.collection.indexSets.map((iSet: any) => BigNumber.from(iSet))
  } ).flat()
  if (isPartition(partition)) {
      return partition
    }
  else {
    console.warn(
      'removing {conditionId} from results because wrapped tokens do not form a partition')
    return null
  }
}

function addPartitionsToWrappedTokens( wrappedTokens: GetWrappedTokens_wrappedTokens[] ): wrappedConditionalToken[] {
  return wrappedTokens.map( (token: GetWrappedTokens_wrappedTokens) => {
    return {
      id: token.id,
      position: token.position,
      partition: inferPartition( token, wrappedTokens)
    }
  }).filter( (token: wrappedConditionalToken) => Boolean(token.partition) )
}

export function useWrappedTokensList() {
  const { loading: loadingQ, error: errorQ, data: dataQ } = useQuery(
    GetQuestions,
    { variables: { first: 1000 }}
  )

  const { loading: loading, error: error, data: data } = useQuery(
    GetWrappedTokens,
    { variables: {first: 1000 }}
  )

  if ( dataQ?.questions && data?.wrappedTokens ) {
	addQuestionsToConditions(dataQ.questions, data.wrappedTokens)
  }

  const wrappedConditionalTokens = addPartitionsToWrappedTokens(data.wrappedTokens)

  return {
  	wrappedConditionalTokens,
  	loading,
  	error,
  	loadingQ,
  	errorQ
  } 
}