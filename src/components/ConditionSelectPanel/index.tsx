import { Currency } from '@uniswap/sdk'
import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { darken } from 'polished'
import ConditionSearchModal from '../SearchModal/ConditionSearchModal'
import { RowBetween } from '../Row'
import { TYPE } from '../../theme'
import { Input as NumericalInput } from '../NumericalInput'
import { ReactComponent as DropDown } from '../../assets/images/dropdown.svg'
import CurrencySearchModal from '../SearchModal/CurrencySearchModal'
import CurrencyLogo from '../CurrencyLogo'
import { GetWrappedTokens_wrappedTokens_position_conditions } from 'queries/__generated__/GetWrappedTokens'


import { useActiveWeb3React } from '../../hooks'
import useTheme from '../../hooks/useTheme'

const InputRow = styled.div<{ selected: boolean }>`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  padding: ${({ selected }) => (selected ? '0.75rem 0.5rem 0.75rem 1rem' : '0.75rem 0.75rem 0.75rem 1rem')};
`

const CurrencySelect = styled.button<{ selected: boolean }>`
  align-items: center;
  height: 2.2rem;
  font-size: 20px;
  font-weight: 500;
  background-color: ${({ selected, theme }) => (selected ? theme.bg1 : theme.primary1)};
  color: ${({ selected, theme }) => (selected ? theme.text1 : theme.white)};
  border-radius: 12px;
  box-shadow: ${({ selected }) => (selected ? 'none' : '0px 6px 10px rgba(0, 0, 0, 0.075)')};
  outline: none;
  cursor: pointer;
  user-select: none;
  border: none;
  padding: 0 0.5rem;

  :focus,
  :hover {
    background-color: ${({ selected, theme }) => (selected ? theme.bg2 : darken(0.05, theme.primary1))};
  }
`

const ConditionSelect = styled.button<{ selected: boolean }>`
  align-items: center;
  height: 2.2rem;
  font-size: 20px;
  font-weight: 500;
  background-color: ${({ selected, theme }) => (selected ? theme.bg1 : theme.primary1)};
  color: ${({ selected, theme }) => (selected ? theme.text1 : theme.white)};
  border-radius: 12px;
  box-shadow: ${({ selected }) => (selected ? 'none' : '0px 6px 10px rgba(0, 0, 0, 0.075)')};
  outline: none;
  cursor: pointer;
  user-select: none;
  border: none;
  padding: 0 0.5rem;
  margin-bottom: 20px;

  :focus,
  :hover {
    background-color: ${({ selected, theme }) => (selected ? theme.bg2 : darken(0.05, theme.primary1))};
  }
`

const LabelRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  color: ${({ theme }) => theme.text1};
  font-size: 0.75rem;
  line-height: 1rem;
  padding: 0.75rem 1rem 0 1rem;
  span:hover {
    cursor: pointer;
    color: ${({ theme }) => darken(0.2, theme.text2)};
  }
`

const Aligner = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const StyledDropDown = styled(DropDown)<{ selected: boolean }>`
  margin: 0 0.25rem 0 0.5rem;
  height: 35%;

  path {
    stroke: ${({ selected, theme }) => (selected ? theme.text1 : theme.white)};
    stroke-width: 1.5px;
  }
`

const InputPanel = styled.div<{ hideInput?: boolean }>`
  ${({ theme }) => theme.flexColumnNoWrap}
  position: relative;
  border-radius: ${({ hideInput }) => (hideInput ? '8px' : '20px')};
  background-color: ${({ theme }) => theme.bg2};
  z-index: 1;
`

const Container = styled.div<{ hideInput: boolean }>`
  border-radius: ${({ hideInput }) => (hideInput ? '8px' : '20px')};
  border: 1px solid ${({ theme }) => theme.bg2};
  background-color: ${({ theme }) => theme.bg1};
`

const StyledTokenName = styled.span<{ active?: boolean }>`
  ${({ active }) => (active ? '  margin: 0 0.25rem 0 0.75rem;' : '  margin: 0 0.25rem 0 0.25rem;')}
  font-size:  ${({ active }) => (active ? '20px' : '16px')};

`

const StyledBalanceMax = styled.button`
  height: 28px;
  background-color: ${({ theme }) => theme.primary5};
  border: 1px solid ${({ theme }) => theme.primary5};
  border-radius: 0.5rem;
  font-size: 0.875rem;

  font-weight: 500;
  cursor: pointer;
  margin-right: 0.5rem;
  color: ${({ theme }) => theme.primaryText1};
  :hover {
    border: 1px solid ${({ theme }) => theme.primary1};
  }
  :focus {
    border: 1px solid ${({ theme }) => theme.primary1};
    outline: none;
  }

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    margin-right: 0.5rem;
  `};
`

interface ConditionInputPanelProps {
  value: string
  onUserInput: (value: string) => void
  onMax?: () => void
  showMaxButton: boolean
  label?: string
  onConditionSelect?: (condition: GetWrappedTokens_wrappedTokens_position_conditions) => void
  condition?: GetWrappedTokens_wrappedTokens_position_conditions | null
  disableConditionSelect?: boolean
  hideInput?: boolean
  id: string
  otherCurrency?: Currency | null
  collateral?: Currency | null
  showCommonBases?: boolean
  onCollateralSelect?: (collateral: Currency) => void
  disableCollateralSelect?: boolean
}

export default function ConditionInputPanel({
  value,
  onUserInput,
  onMax,
  showMaxButton,
  label = 'Input',
  onConditionSelect,
  onCollateralSelect,
  collateral,
  condition,
  disableConditionSelect = false,
  disableCollateralSelect = false,
  hideInput = false,
  showCommonBases,
  otherCurrency,
  id
}: ConditionInputPanelProps) {

  const [modalOpenConditions, setModalOpenConditions] = useState(false)
  const [modalOpenCollateral, setModalOpenCollateral] = useState(false)
  const { account } = useActiveWeb3React()
  const theme = useTheme()

  const handleDismissSearch = useCallback(() => {
    setModalOpenConditions(false)
    setModalOpenCollateral(false)
  }, [setModalOpenConditions,setModalOpenCollateral])

  return (

    <InputPanel id={id}>
      <ConditionSelect
        selected={!!condition}
        className="open-condition-select-button"
        onClick={() => {
          if (!disableConditionSelect) {
            setModalOpenConditions(true)
          }
        }}
      >
        <Aligner>
          {(<StyledTokenName className="token-symbol-container" active={Boolean(condition && condition.question && condition.question.title)}>
              {(condition && condition.question && condition.question.title && condition.question.title.length > 20
                ? condition.question.title.slice(0, 4) +
                  '...' +
                  condition.question.title.slice(condition.question.title.length - 5, condition.question.title.length)
                : condition?.question?.title) || 'Select a condition'}
            </StyledTokenName>
          )}
          {!disableConditionSelect && <StyledDropDown selected={!!condition} />}
        </Aligner>
      </ConditionSelect>
      <Container hideInput={hideInput}>
        {!hideInput && (
          <LabelRow>
            <RowBetween>
              <TYPE.body color={theme.text2} fontWeight={500} fontSize={14}>
                {label}
              </TYPE.body>
            </RowBetween>
          </LabelRow>
        )}

        <InputRow style={hideInput ? { padding: '0', borderRadius: '8px' } : {}} selected={disableCollateralSelect}>
          {!hideInput && (
            <>
              <NumericalInput
                className="token-amount-input"
                value={value}
                onUserInput={val => {
                  onUserInput(val)
                }}
              />
              {account && collateral && showMaxButton && label !== 'To' && (
                <StyledBalanceMax onClick={onMax}>MAX</StyledBalanceMax>
              )}
            </>
          )}
          <CurrencySelect
            selected={!!collateral}
            className="open-collateral-select-button"
            onClick={() => {
              if (!disableCollateralSelect) {
                setModalOpenCollateral(true)
              }
            }}
          >
            <Aligner>
              { collateral ? (
                <CurrencyLogo currency={collateral} size={'24px'} />
              ) : null}
              <StyledTokenName className="token-symbol-container" active={Boolean(collateral && collateral.symbol)}>
                {(collateral && collateral.symbol && collateral.symbol.length > 20
                  ? collateral.symbol.slice(0, 4) +
                    '...' +
                    collateral.symbol.slice(collateral.symbol.length - 5, collateral.symbol.length)
                  : collateral?.symbol) || 'Select collateral' }
              </StyledTokenName>
              {!disableCollateralSelect && <StyledDropDown selected={!!collateral} />}
            </Aligner>
          </CurrencySelect>
        </InputRow>
      </Container>
      {!disableConditionSelect && onConditionSelect && (
        <ConditionSearchModal
          isOpen={modalOpenConditions}
          onDismiss={handleDismissSearch}
          onConditionSelect={onConditionSelect}
          selectedCondition={condition}
        />
      )}
      {!disableCollateralSelect && onCollateralSelect && (
        <CurrencySearchModal
          isOpen={modalOpenCollateral}
          onDismiss={handleDismissSearch}
          onCurrencySelect={onCollateralSelect}
          selectedCurrency={collateral}
          otherSelectedCurrency={otherCurrency}
          showCommonBases={showCommonBases}
        />
      )}
    </InputPanel>
  )
}
