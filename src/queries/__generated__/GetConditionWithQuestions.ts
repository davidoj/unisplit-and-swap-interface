/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetConditionWithQuestions
// ====================================================

export interface GetConditionWithQuestions_condition_question {
  __typename: "Question";
  id: string;
  title: string | null;
}

export interface GetConditionWithQuestions_condition_positions {
  __typename: "Position";
  collateralTokenAddress: string;
}

export interface GetConditionWithQuestions_condition {
  __typename: "Condition";
  id: string;
  oracle: string;
  questionId: string;
  outcomeSlotCount: number;
  resolved: boolean;
  question: GetConditionWithQuestions_condition_question | null;
  positions: GetConditionWithQuestions_condition_positions[] | null;
}

export interface GetConditionWithQuestions {
  condition: GetConditionWithQuestions_condition | null;
}

export interface GetConditionWithQuestionsVariables {
  id: string;
}
