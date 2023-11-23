import React, { useEffect, useState } from 'react'
import NftGrid from '../layouts/NftGrid'
import { useAccount, useContractRead } from 'wagmi'
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../config'

function Marketplace () {
  const [data, setData] = useState()
  const [mintIds, setMintIds] = useState()
  const [sort, setSort] = useState(true)

  const { address } = useAccount()

  const mintedData = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getAllTokens',
    watch: true
  })

  if (mintedData.data !== null && mintedData.data !== undefined) {
    console.log("mintedData : ", mintedData.data)
  }
  useEffect(() => {
    if (mintedData.data !== null && mintedData.data !== undefined) {
      let _mintedIds = []
      mintedData.data.forEach(datum => {
        if (datum && datum != null) {
          _mintedIds.push(Number(datum))
        }
      })
      setMintIds(_mintedIds)
    }
    setData([])
    let _data = []
    if (sort) {
      for (let i = 499; i >= 0; i--) {
        _data.push(i)
      }
    } else {
      for (let i = 0; i <= 499; i++) {
        _data.push(i)
      }
    }
    setData(_data)
  }, [address, sort])

  return (
    <>
      <div className='mt-20 px-4 lg:px-24'>
        <div className='flex flex-row justify-between items-center'>
          <h1 className='text-white text-3xl sm:text-[42px] font-bold '>
            Marketplace
          </h1>
          <div
            className='cursor-pointer hover:animate-pulse hover:scale-105 transition-all border-[1px] border-solid border-pink-300 bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500 rounded-[5px] py-1 px-6 text-white my-2 text-xl sm:text-2xl font-semibold'
            onClick={() => setSort(!sort)}
          >
            Sort
          </div>
        </div>
        <div className='w-full flex justify-center items-center mx-auto'>
          <NftGrid datas={data} mintedIds={mintIds} />
        </div>
      </div>
    </>
  )
}

export default Marketplace
