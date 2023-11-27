import NftGrid from '../layouts/NftGrid'
import { useAccount, useContractRead, useContractReads } from 'wagmi'

import { useState, useEffect } from 'react'
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../config'

function MyNfts () {
  const { isConnected, address } = useAccount()
  const [nftcontracts, setNftContracts] = useState([])
  const [tokenIds, setTokenIds] = useState([])

  const count = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'balanceOf',
    args: [address],
    watch: true
  })

  console.log("count: ", count.data);

  const { data, isError, isLoading } = useContractReads({
    contracts: nftcontracts
  })

  useEffect(() => {
    if (data && data.length > 0) {
      let _ids = []
      data.forEach(datum => {
        console.log(Number(datum.result))
        _ids.push(Number(datum.result))
      })
      setTokenIds(_ids)
    } else {
      setTokenIds([])
    }
  }, [data])

  useEffect(() => {
    if (isConnected && address) {
      let _contracts = []

      for (let i = 0; i < count.data; i++) {
        _contracts.push({
          address: CONTRACT_ADDRESS,
          abi: CONTRACT_ABI,
          functionName: 'tokenOfOwnerByIndex',
          args: [address, i]
        })
      }
      setNftContracts(_contracts)
    } else {
      setTokenIds([])
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
