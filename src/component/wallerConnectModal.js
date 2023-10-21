import React, { useEffect, useState } from 'react'

import { useConnect } from 'wagmi'

import { ReactComponent as ModalBg } from '../assets/images/modal_bg.svg'

export default function WalletModal ({ onClose }) {
  const [walletIcons, setWalletIcons] = useState(new Map())
  const { connect, connectors, isLoading, pendingConnector } = useConnect()

  useEffect(() => {
    let tmp = new Map()
    tmp.set('metaMask', '/images/metamask.png')
    tmp.set('coinbaseWallet', '/images/walletlink.png')
    tmp.set('walletConnect', '/images/walletconnect.png')
    setWalletIcons(tmp)
  }, [])

  return (
    <>
      <ModalBg className='w-[400px] absolute' />
      <div className='z-20'>
        {connectors.map((connector, i) => (
          <div key={i}>
            <div
              disabled={!connector.ready}
              onClick={() => (connect({ connector }), onClose())}
              className='flex justify-center items-center p-2 cursor-pointer hover:brightness-150 hover:bg-[#ffffff11]'
            >
              <p className='z-20 text-white font-bold text-2xl pr-4 drop-shadow-[1px_1px_0_rgba(18,214,223,1)]'>
                {connector.name}
                {!connector.ready && ' (unsupported)'}
                {isLoading &&
                  connector.id === pendingConnector?.id &&
                  ' (connecting)'}
              </p>
              <div className='z-10'>
                <img
                  className='w-10 h-10'
                  src={walletIcons.get(connector.id) ?? ''}
                  alt=''
                />
              </div>
            </div>
            <div className='my-2 w-full h-[1px] bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500 z-10'></div>
          </div>
        ))}
      </div>
    </>
  )
}
