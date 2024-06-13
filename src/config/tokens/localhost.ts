// import { ChainId, Token } from '@sushiswap/core-sdk'
import { ChainId, Token } from 'core-sdk'

// Default Ethereum chain tokens
export const DAI = new Token(
  ChainId.LOCALHOST_TEST,
  '0x7ae1dAcF5db3c10ac49EF7885E318B4F25a9Cf9D',
  18,
  'DAI',
  'Dai Stablecoin'
)
export const USDC = new Token(ChainId.LOCALHOST_TEST, '0xB055Adb3319db56B1Ac3A940dA74d42A5230C243', 6, 'USDC', 'USD Coin')
export const STSW = new Token(ChainId.LOCALHOST_TEST, '0x5758d8A3825A5f9e7ff17FC71730e7A6d74Be15A', 18, 'STSW', 'Stackswap Token')

// export const USDT = new Token(ChainId.LOCALHOST_TEST, '0xdAC17F958D2ee523a2206206994597C13D831ec7', 18, 'USDT', 'Tether USD')

