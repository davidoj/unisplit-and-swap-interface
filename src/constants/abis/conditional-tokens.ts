import { ChainId } from '@uniswap/sdk'


const CT_ABI = [
    'function prepareCondition(address oracle, bytes32 questionId, uint outcomeSlotCount) external',
    'event ConditionPreparation(bytes32 indexed conditionId, address indexed oracle, bytes32 indexed questionId, uint outcomeSlotCount)',
    'function setApprovalForAll(address operator, bool approved) external',
    'function isApprovedForAll(address owner, address operator) external view returns (bool)',
    'function payoutNumerators(bytes32, uint) public view returns (uint)',
    'function payoutDenominator(bytes32) public view returns (uint)',
    'function redeemPositions(address collateralToken, bytes32 parentCollectionId, bytes32 conditionId, uint[] indexSets) external',
    'function getCollectionId(bytes32 parentCollectionId, bytes32 conditionId, uint indexSet) external view returns (bytes32) ',
    'function getPositionId(address collateralToken, bytes32 collectionId) external pure returns (uint) ',
    'function balanceOf(address owner, uint256 positionId) external view returns (uint256)',
    'function balanceOfBatch(address[] owners, uint256[] ids) public view returns (uint256[])',
    'function safeTransferFrom(address from, address to, uint256 id, uint256 value, bytes data) external',
    'function getOutcomeSlotCount(bytes32 conditionId) external view returns (uint)',
    'function mergePositions(address collateralToken, bytes32 parentCollectionId, bytes32 conditionId, uint[] partition, uint amount) external',
    'function splitPosition(address collateralToken, bytes32 parentCollectionId, bytes32 conditionId, uint[] partition, uint amount) external',
    'function reportPayouts(bytes32 questionId, uint[] payouts)',
    'function safeBatchTransferFrom(address from, address to, uint256[] ids, uint256[] values, bytes data) external',
    'function decimals() external view returns (uint8)',
    'function symbol() external view returns (string)',
  ]

const CT_ADDRESSES: { [chainId in ChainId]?: string } = {
  [ChainId.MAINNET]:'0xC59b0e4De5F1248C1140964E0fF287B192407E0C',
  [ChainId.RINKEBY]:'0x36bede640D19981A82090519bC1626249984c908'
}

const NULL_PARENT_ID = '0x0000000000000000000000000000000000000000000000000000000000000000'


export { CT_ABI, CT_ADDRESSES, NULL_PARENT_ID }