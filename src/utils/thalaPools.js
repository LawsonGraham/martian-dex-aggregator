import BigNumber from "bignumber.js";

export function scaleUp(v, decimals) {
  return new BigNumber(v)
    .multipliedBy((new BigNumber(10)).exponentiatedBy(decimals))
    .toNumber();
}

// Returns [liquidityPoolType, coinAddresses]
export function parseLiquidityPoolType(
  poolType,
) {
  const matchWeightedPool = poolType.includes("weighted_pool::WeightedPool<");
  if (matchWeightedPool) {
    return "weighted"
  }
  const matchStablePool = poolType.includes("stable_pool::StablePool<");
  if (matchStablePool) {
    return "stable"
  }
  throw new Error(`Invalid poolType: ${poolType}`);
}

