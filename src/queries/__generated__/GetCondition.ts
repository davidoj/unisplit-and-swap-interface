/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCondition
// ====================================================

export interface GetCondition_condition_question {
  __typename: "Question";
  title: string | null;
}

export interface GetCondition_condition {
  __typename: "Condition";
  id: string;
  oracle: string;
  questionId: string;
  outcomeSlotCount: number;
  resolved: boolean;
  creator: string;
  payouts: any[] | null;
  createTimestamp: any;
  payoutNumerators: any[] | null;
  payoutDenominator: any | null;
  resolveTimestamp: any | null;
  resolveBlockNumber: any | null;
  outcomes: string[] | null;
  question: GetCondition_condition_question | null;
}

export interface GetCondition {
  condition: GetCondition_condition | null;
}

export interface GetConditionVariables {
  id: string;
}
