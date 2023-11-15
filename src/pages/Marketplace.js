import React, { useEffect, useState } from 'react'
import NftGrid from '../layouts/NftGrid'
import { useAccount, useContractRead } from 'wagmi'
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../config'

function Marketplace () {
  const [data, setData] = useState()
  const [mintIds, setMintIds] = useState()

  const { address } = useAccount()

  const mintedData = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getAllTokens'
  })

  useEffect(() => {
    if (mintedData && mintedData.data) {
      let _mintedIds = []
      mintedData.data.forEach(datum => {
        _mintedIds.push(Number(datum))
      })
      setMintIds(_mintedIds)
    }

    let _data = []
    for (let i = 499; i >= 0; i--) {
      _data.push(i)
    }
    setData(_data)
  }, [address])

  return (
    <>
      <div className='mt-20 px-4 lg:px-24'>
        <h1 className='text-white text-[42px] font-bold '>Marketplace</h1>
        <div className='w-full flex justify-center items-center mx-auto'>
          <NftGrid datas={data} mintedIds={mintIds} />
        </div>
      </div>
    </>
  )
}

export default Marketplace
