import { GetWrappedTokens } from 'queries/CTWrappedTokens'
import { GetQuestions } from 'queries/CTConditionsWithQuestions'

import { GetQuestions_questions } from 'queries/__generated__/GetQuestions'
import { GetWrappedTokens_wrappedTokens } from 'queries/__generated__/GetWrappedTokens'

import { useQuery } from '@apollo/client'

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

  return {
  	data,
  	loading,
  	error,
  	loadingQ,
  	errorQ
  } 
}