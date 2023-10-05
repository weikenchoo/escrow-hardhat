import Navbar from './components/Navbar';
import Contract from './components/Contract';
import Escrow from './components/Escrow';
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { goerli } from 'wagmi/chains'
import { BrowserRouter,Route, Routes } from 'react-router-dom';



const chains = [goerli]
const projectId = process.env.REACT_APP_PUBLIC_PROJECT_ID

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)



function App() {

  return (
    <>
    <WagmiConfig config={wagmiConfig}>
    <BrowserRouter>
      <Navbar/>
      <div>
        
          <div className="container mx-auto">
          <Routes>
            <Route exact path="/" element={<Contract />} />
            <Route path="/escrows" element={<Escrow />} />
          </Routes>
          </div>
      </div>
    </BrowserRouter>
    </WagmiConfig>

      
    
    <Web3Modal projectId={projectId} ethereumClient={ethereumClient} themeMode='light'/>
    </>
  );
}

export default App;
