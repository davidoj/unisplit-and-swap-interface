/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetConditionWithQuestionsOfPosition
// ====================================================

export interface GetConditionWithQuestionsOfPosition_position_conditions_question {
  __typename: "Question";
  id: string;
  title: string | null;
}

export interface GetConditionWithQuestionsOfPosition_position_conditions_positions {
  __typename: "Position";
  collateralTokenAddress: string;
}

export interface GetConditionWithQuestionsOfPosition_position_conditions {
  __typename: "Condition";
  id: string;
  oracle: string;
  questionId: string;
  outcomeSlotCount: number;
  resolved: boolean;
  question: GetConditionWithQuestionsOfPosition_position_conditions_question | null;
  positions: GetConditionWithQuestionsOfPosition_position_conditions_positions[] | null;
}

export interface GetConditionWithQuestionsOfPosition_position {
  __typename: "Position";
  conditions: GetConditionWithQuestionsOfPosition_position_conditions[];
}

export interface GetConditionWithQuestionsOfPosition {
  position: GetConditionWithQuestionsOfPosition_position | null;
}

export interface GetConditionWithQuestionsOfPositionVariables {
  id: string;
}
