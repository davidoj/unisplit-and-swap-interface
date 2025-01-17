/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetWrappedTokens
// ====================================================

export interface GetWrappedTokens_wrappedTokens_position_conditions_question {
  __typename: "Question";
  id: string;
  title: string | null;
}

export interface GetWrappedTokens_wrappedTokens_position_conditions_positions {
  __typename: "Position";
  collateralTokenAddress: string;
}

export interface GetWrappedTokens_wrappedTokens_position_conditions {
  __typename: "Condition";
  id: string;
  oracle: string;
  questionId: string;
  outcomeSlotCount: number;
  resolved: boolean;
  question: GetWrappedTokens_wrappedTokens_position_conditions_question | null;
  positions: GetWrappedTokens_wrappedTokens_position_conditions_positions[] | null;
}

export interface GetWrappedTokens_wrappedTokens_position_collection {
  __typename: "Collection";
  id: string;
  indexSets: any[];
}

export interface GetWrappedTokens_wrappedTokens_position {
  __typename: "Position";
  id: string;
  conditions: GetWrappedTokens_wrappedTokens_position_conditions[];
  collection: GetWrappedTokens_wrappedTokens_position_collection;
}

export interface GetWrappedTokens_wrappedTokens {
  __typename: "WrappedToken";
  id: string;
  position: GetWrappedTokens_wrappedTokens_position;
}

export interface GetWrappedTokens {
  wrappedTokens: GetWrappedTokens_wrappedTokens[];
}

export interface GetWrappedTokensVariables {
  first: number;
}
