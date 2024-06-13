import React, { createContext, useContext, useEffect, useState } from 'react'

//@ts-ignore
const { ethereum } = typeof window !== 'undefined' ? window : {}

const WalletContext = createContext({
  account: undefined,
  error: undefined,
  connect: () => {},
})

//@ts-ignore
export const WalletProvider = ({ children }) => {
  const [account, setAccount] = useState()
  const [error, setError] = useState('')

  const isEthereumExists = () => {
    if (!ethereum) {
      return false
    }
    return true
  }

  const checkWalletConnect = async () => {
    if (isEthereumExists()) {
      try {
        const accounts = await ethereum.request({
          method: 'eth_accounts',
        })
        setAccount(accounts[0])
      } catch (err:any) {
        setError(err.message)
      }
    }
  }

  const connect = async () => {
    alert("Connect Func")
    setError('')
    if (isEthereumExists()) {
      try {
        const accounts = await ethereum.request({
          method: 'eth_requestAccounts',
        })
        setAccount(accounts[0])
      } catch (err:any) {
        setError(err.message)
      }
    } else {
      setError('Please Install MetaMask.')
    }
  }

  useEffect(() => {
    checkWalletConnect()
  }, [checkWalletConnect])

  return (
    //@ts-ignore
    <WalletContext.Provider value={{ account, connect, error  }}>
      {children}
    </WalletContext.Provider>
  )
}

const useWallet = () => useContext(WalletContext)

export default useWallet