import React, { useCallback } from 'react'
import Modal from '../Modal'
import { ConditionSearch } from './ConditionSearch'
import { GetWrappedTokens_wrappedTokens_position_conditions } from 'queries/__generated__/GetWrappedTokens'

interface ConditionSearchModalProps {
  isOpen: boolean
  onDismiss: () => void
  selectedCondition?: GetWrappedTokens_wrappedTokens_position_conditions | null
  onConditionSelect: (currency: GetWrappedTokens_wrappedTokens_position_conditions) => void
}

export default function ConditionSearchModal({
  isOpen,
  onDismiss,
  onConditionSelect,
  selectedCondition
}: ConditionSearchModalProps) {

  const handleConditionSelect = useCallback(
    (condition: GetWrappedTokens_wrappedTokens_position_conditions) => {
      onConditionSelect(condition)
      onDismiss()
    },
    [onDismiss, onConditionSelect]
  )

  return (
    <Modal isOpen={isOpen} onDismiss={onDismiss} maxHeight={80} minHeight={80}>
        <ConditionSearch
          isOpen={isOpen}
          onDismiss={onDismiss}
          onConditionSelect={handleConditionSelect}
          selectedCondition={selectedCondition}
        />
    </Modal>
  )
}
