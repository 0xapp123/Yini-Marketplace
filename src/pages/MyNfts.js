import NftGrid from '../layouts/NftGrid'
import { useAccount, useContractRead, useContractReads } from 'wagmi'

import { useState, useEffect, useMemo } from 'react'
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../config'

function MyNfts () {
  const { isConnected, address } = useAccount()
  const [contracts, setContracts] = useState([])
  const count = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'balanceOf',
    args: [address]
  })

  const tokenIdData = useContractReads({
    contracts: contracts
  })

  let tokenIds = useMemo(() => {
    if (tokenIdData.data && tokenIdData.data.length > 0) {
      let _ids = []
      tokenIdData.data.forEach(datum => {
        console.log(Number(datum.result))
        _ids.push(Number(datum.result))
      })
      return _ids
    } else {
      return []
    }
  }, [tokenIdData])

  useEffect(() => {
    console.log('isConnected ', isConnected)
    if (isConnected && address) {
      console.log(address, Number(count.data), count.data)
      let _contracts = []

      for (let i = 0; i < count.data; i++) {
        _contracts.push({
          address: CONTRACT_ADDRESS,
          abi: CONTRACT_ABI,
          functionName: 'tokenOfOwnerByIndex',
          args: [address, i]
        })
      }
      setContracts(_contracts)
    } else {
      tokenIds = []
    }
  }, [isConnected, address])

  return (
    <>
      <div className='mt-20 px-4 lg:px-24'>
        <h1 className='text-white text-[42px] font-bold '>My NFTs</h1>
        <div className='w-full flex justify-center items-center mx-auto'>
          <NftGrid datas={tokenIds} isMine={1} />
        </div>
      </div>
    </>
  )
}

export default MyNfts
