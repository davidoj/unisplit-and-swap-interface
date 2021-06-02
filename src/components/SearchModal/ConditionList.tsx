import React, { CSSProperties, useCallback, MutableRefObject, useMemo } from 'react'
import { FixedSizeList } from 'react-window'
import { Text } from 'rebass'
import { TYPE } from '../../theme'
import Column from '../Column'
import { MenuItem } from './styleds'
import useTheme from 'hooks/useTheme'

import { GetWrappedTokens_wrappedTokens_position_conditions } from 'queries/__generated__/GetWrappedTokens'

function conditionEquals( condition1: GetWrappedTokens_wrappedTokens_position_conditions, condition2: GetWrappedTokens_wrappedTokens_position_conditions ) {
  return condition1.id === condition2.id
}

function ConditionRow({
  condition,
  onSelect,
  isSelected,
  style
}: {
  condition: GetWrappedTokens_wrappedTokens_position_conditions
  onSelect: () => void
  isSelected: boolean
  style: CSSProperties
}) {
  // only show add or remove buttons if not on selected list
  return (
    <MenuItem
      style={style}
      className={`condition-item-${condition.id}`}
      onClick={() => (isSelected ? null : onSelect())}
      disabled={isSelected}
    >
      <Column>
        <Text title={condition.id} fontWeight={500}>
          {condition.question?.title ?? condition.id}
        </Text>
        <TYPE.darkGray ml="0px" fontSize={'12px'} fontWeight={300}>
          {condition.id}
        </TYPE.darkGray>
      </Column>
    </MenuItem>
  )
}

export default function ConditionList({
  height,
  conditions,
  selectedCondition,
  onConditionSelect,
  fixedListRef,
  breakIndex
}: {
  height: number
  conditions: GetWrappedTokens_wrappedTokens_position_conditions[]
  selectedCondition?: GetWrappedTokens_wrappedTokens_position_conditions | null
  onConditionSelect: (condition: GetWrappedTokens_wrappedTokens_position_conditions) => void
  fixedListRef?: MutableRefObject<FixedSizeList | undefined>
  breakIndex: number | undefined
}) {
  const itemData: (GetWrappedTokens_wrappedTokens_position_conditions | undefined)[] = useMemo(() => {
    let formatted: (GetWrappedTokens_wrappedTokens_position_conditions| undefined)[] =  conditions
    if (breakIndex !== undefined) {
      formatted = [...formatted.slice(0, breakIndex), undefined, ...formatted.slice(breakIndex, formatted.length)]
    }
    return formatted
  }, [breakIndex, conditions])

  const theme = useTheme()

  const Row = useCallback(
    ({ data, index, style }) => {
      const condition: GetWrappedTokens_wrappedTokens_position_conditions = data[index]
      const isSelected = Boolean(selectedCondition && conditionEquals(selectedCondition, condition))
      const handleSelect = () => onConditionSelect(condition)

      return (
        <ConditionRow
          style={style}
          condition={condition}
          isSelected={isSelected}
          onSelect={handleSelect}
        />
      )
    },
    [
      onConditionSelect,
      selectedCondition,
      breakIndex,
      theme.text1
    ]
  )

  const itemKey = useCallback((index: number, data: any) => data[index].id, [])

  return (
    <FixedSizeList
      height={height}
      ref={fixedListRef as any}
      width="100%"
      itemData={itemData}
      itemCount={itemData.length}
      itemSize={56}
      itemKey={itemKey}
    >
      {Row}
    </FixedSizeList>
  )
}
