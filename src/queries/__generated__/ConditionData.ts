/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ConditionData
// ====================================================

export interface ConditionData_question {
  __typename: "Question";
  title: string | null;
}

export interface ConditionData {
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
  question: ConditionData_question | null;
}
