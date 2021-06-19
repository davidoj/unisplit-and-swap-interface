/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ConditionWithQuestionsFragment
// ====================================================

export interface ConditionWithQuestionsFragment_question {
  __typename: "Question";
  id: string;
  title: string | null;
}

export interface ConditionWithQuestionsFragment_positions {
  __typename: "Position";
  collateralTokenAddress: string;
}

export interface ConditionWithQuestionsFragment {
  __typename: "Condition";
  id: string;
  oracle: string;
  questionId: string;
  outcomeSlotCount: number;
  resolved: boolean;
  question: ConditionWithQuestionsFragment_question | null;
  positions: ConditionWithQuestionsFragment_positions[] | null;
}
