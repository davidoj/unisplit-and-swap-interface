/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ConditionsList
// ====================================================

export interface ConditionsList_conditions_question {
  __typename: "Question";
  title: string | null;
}

export interface ConditionsList_conditions {
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
  question: ConditionsList_conditions_question | null;
}

export interface ConditionsList {
  conditions: ConditionsList_conditions[];
}
