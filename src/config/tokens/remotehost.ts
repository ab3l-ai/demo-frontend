// import { ChainId, Token } from '@sushiswap/core-sdk'
import { ChainId, Token } from 'core-sdk'

// Default Ethereum chain tokens
export const DAI = new Token(
  ChainId.REMOTEHOST_TEST,
  '0xf43633856C4c6200eB82E783274dc067Fc04eB8c',
  18,
  'DAI',
  'Dai Stablecoin'
)
export const USDC = new Token(ChainId.REMOTEHOST_TEST, '0x5cAe497bC856d70eC2E10765ca012F3012d20d8A', 6, 'USDC', 'USD Coin')
export const STSW = new Token(ChainId.REMOTEHOST_TEST, '0x0C369f52cC564bAF7C30438269674D4EA6889373', 18, 'STSW', 'Stackswap Token')

// export const USDT = new Token(ChainId.LOCALHOST_TEST, '0xdAC17F958D2ee523a2206206994597C13D831ec7', 18, 'USDT', 'Tether USD')

