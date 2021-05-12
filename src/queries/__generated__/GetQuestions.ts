/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetQuestions
// ====================================================

export interface GetQuestions_questions {
  __typename: "Question";
  id: string;
  title: string | null;
}

export interface GetQuestions {
  questions: GetQuestions_questions[];
}

export interface GetQuestionsVariables {
  first: number;
}
