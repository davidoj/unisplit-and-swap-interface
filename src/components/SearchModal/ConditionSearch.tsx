import { useWrappedTokensList } from "hooks/useWrappedTokensList"
import { FixedSizeList } from 'react-window'
import useTheme from 'hooks/useTheme'
import useToggle from 'hooks/useToggle'
import AutoSizer from 'react-virtualized-auto-sizer'
import { useOnClickOutside } from 'hooks/useOnClickOutside'
import styled from 'styled-components'
import Column from '../Column'
import { PaddedColumn, Separator } from './styleds'
import  { RowBetween } from '../Row'
import { Text } from 'rebass'
import { CloseIcon, TYPE } from '../../theme'
import React, { useCallback, useRef } from 'react'
import ConditionList from './ConditionList'


import { GetWrappedTokens_wrappedTokens, GetWrappedTokens_wrappedTokens_position_conditions } from 'queries/__generated__/GetWrappedTokens'


const ContentWrapper = styled(Column)`
  width: 100%;
  flex: 1 1;
  position: relative;
`

interface ConditionSearchProps {
  isOpen: boolean
  onDismiss: () => void
  selectedCondition?: GetWrappedTokens_wrappedTokens_position_conditions | null
  onConditionSelect: (condition: GetWrappedTokens_wrappedTokens_position_conditions) => void
  // conditionWrappedTokens: GetWrappedTokens_wrappedTokens[]
}

function extractConditions (wrappedTokens : GetWrappedTokens_wrappedTokens[] | undefined) {
  if (wrappedTokens === undefined || wrappedTokens.length == 0) {
    return undefined
  }
  const conditionIds = wrappedTokens.map((wrappedToken) => wrappedToken.position.conditions.map((condition)=>condition.id).flat() ).flat()
  const conditions = wrappedTokens.filter(function(wrappedToken, pos) {
    return conditionIds.indexOf(wrappedToken.position.conditions[0]?.id) == pos;
}).map((wrappedToken) => wrappedToken.position.conditions).flat()
  return conditions
}

export function ConditionSearch({
  selectedCondition,
  onConditionSelect,
  onDismiss,
  isOpen
}: ConditionSearchProps) {

	const theme = useTheme()

  const fixedList = useRef<FixedSizeList>()

  const { loading, error, data } = useWrappedTokensList()

	const ctConditionsWithWrappedTokens =  extractConditions(data?.wrappedTokens)

  const handleConditionSelect = useCallback(
    (condition: GetWrappedTokens_wrappedTokens_position_conditions) => {
      onConditionSelect(condition)
      onDismiss()
    },
    [onDismiss, onConditionSelect]
  )

  // menu ui
  const [open, toggle] = useToggle(false)
  const node = useRef<HTMLDivElement>()
  useOnClickOutside(node, open ? toggle : undefined)

  return (
    <ContentWrapper>
      <PaddedColumn gap="16px">
        <RowBetween>
          <Text fontWeight={500} fontSize={16}>
            Select a condition
          </Text>
          <CloseIcon onClick={onDismiss} />
        </RowBetween>
      </PaddedColumn>
      <Separator />
      { (error && !loading) ? <Text>{error.message}</Text> : null }
      { (loading || error) ? (
        <Text>
          loading
        </Text>
      ) : ctConditionsWithWrappedTokens && ctConditionsWithWrappedTokens?.length > 0 ? (
        <div style={{ flex: '1' }}>
          <AutoSizer disableWidth>
            {({ height }) => (
              <ConditionList
                height={height}
                conditions={ctConditionsWithWrappedTokens}
                breakIndex={undefined}
                onConditionSelect={handleConditionSelect}
                selectedCondition={selectedCondition}
                fixedListRef={fixedList}
              />
            )}
          </AutoSizer>
        </div>
      ) : (
        <Column style={{ padding: '20px', height: '100%' }}>
          <TYPE.main color={theme.text3} textAlign="center" mb="20px">
            No results found.
          </TYPE.main>
        </Column>
      )}
    </ContentWrapper>
  )
}
