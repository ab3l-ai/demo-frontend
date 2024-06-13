// import { ChainId } from '@sushiswap/core-sdk'
import { ChainId } from 'core-sdk'

export const SUSHIGUARD_RELAY: { [chainId in ChainId]?: string } = {
  [ChainId.ETHEREUM]: 'https://api.sushirelay.com/v1',
}
