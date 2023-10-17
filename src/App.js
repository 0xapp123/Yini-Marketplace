import './App.css'
import {Buffer} from 'buffer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { WagmiConfig, createConfig, configureChains, mainnet } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import { goerli } from 'wagmi/chains'

import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

import Home from './pages/Home'
import Navbar from './layouts/Navbar'
import Footer from './layouts/Footer'
import Marketplace from './pages/Marketplace'
import MyNfts from './pages/MyNfts'



window.Buffer = window.Buffer || Buffer;

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [goerli],
  [
    alchemyProvider({ apiKey: 'QoYcVFgKZKtj4vJVNuuNMCeJg2yR26ZD' }),
    publicProvider()
  ]
)

const config = createConfig({
  autoConnect: false,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'wagmi',
      }
    }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: '8e0336e1a9129b0cf2a5abeb0dc1180c'
      }
    })
  ],
  publicClient,
  webSocketPublicClient
})
function App () {
  return (
    <div className='App'>
      <WagmiConfig config={config}>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/Marketplace' element={<Marketplace />} />
            <Route path='/MyNfts' element={<MyNfts />} />
          </Routes>
          <Footer />
        </Router>
      </WagmiConfig>
    </div>
  )
}

export default App
