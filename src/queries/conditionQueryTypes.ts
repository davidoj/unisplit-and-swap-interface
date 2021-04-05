
export enum ConditionType {
  omen = 'Omen Condition',
  custom = 'Custom Reporter',
}

export enum ConditionTypeAll {
  all = 'All',
}

export enum OracleFilterOptions {
  All = 'all',
  Custom = 'custom',
  Current = 'current',
  Kleros = 'kleros',
  Reality = 'reality',
}

export enum StatusOptions {
  All = 'all',
  Resolved = 'resolved',
  Open = 'open',
}


export enum ConditionSearchOptions {
  All = 'all',
  ConditionId = 'conditionId',
  QuestionId = 'questionId',
  QuestionText = 'questionText',
  OracleAddress = 'oracleAddress',
  CreatorAddress = 'creatorAddress',
}

export interface AdvancedFilterConditions {
  ReporterOracle: {
    type: OracleFilterOptions
    value: Array<string>
  }
  ConditionType: {
    type: ConditionType | ConditionTypeAll
    value: Maybe<string>
  }
  Status: StatusOptions
  MinOutcomes: Maybe<number>
  MaxOutcomes: Maybe<number>
  FromCreationDate: Maybe<number>
  ToCreationDate: Maybe<number>
  TextToSearch: {
    type: ConditionSearchOptions
    value: Maybe<string>
  }
}
