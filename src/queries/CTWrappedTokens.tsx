import gql from 'graphql-tag'

const questionFragment = gql`
  fragment QuestionData on Question {
    id
    title
  }
`


const conditionWithQuestionsFragment = gql`
  fragment ConditionWithQuestionsFragment on Condition {
    id
    oracle
    questionId
    outcomeSlotCount
    resolved
    question {
      ...QuestionData
    }
    positions {
      collateralTokenAddress
    }
  }
`

const wrappedTokenWithConditionsFragment = gql`
  fragment WrappedTokenWithConditionsFragment on WrappedToken {
    id
    position {
      id
      conditions {
        ...ConditionWithQuestionsFragment
      }
    }
  }
`

export const GetWrappedTokens = gql`
  query GetWrappedTokens($first: Int!) {
    wrappedTokens(first: $first) {
      ...WrappedTokenWithConditionsFragment
    }
  }
  ${wrappedTokenWithConditionsFragment}
  ${conditionWithQuestionsFragment}
  ${questionFragment}
`