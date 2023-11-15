import React, { useEffect, useState } from 'react'
import NFTBg from '../assets/images/nft_bg.png'
import WindowBg from '../assets/images/window_bg.png'
import WindowBgS from '../assets/images/window_bg-sm.png'
import ComingSoon from '../assets/images/coming_soon.png'
import WalletModal from '../component/wallerConnectModal'
import LoadingModal from '../component/loding'

import { useAccount, useContractRead } from 'wagmi'
import { writeContract, waitForTransaction } from '@wagmi/core'
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../config'
import { formatEther, parseEther } from 'viem'

function NftGrid (props) {
  const { address } = useAccount()
  const [nftInfoModalState, setNftInfoModalState] = useState(false)
  const [connectwalletModalState, setConnectwalletModalState] = useState(false)
  const [infoNft, setInfoNft] = useState()
  const [infoId, setInfoId] = useState()
  const [infoName, setInfoName] = useState()
  // const [infoPrice, setInfoPrice] = useState()
  const [infoBoxing, setInfoBoxing] = useState()
  const [infoEnergy, setInfoEnergy] = useState()
  const [loading, setLoading] = useState(false)

  const [getBNB, setGetBNB] = useState('')

  // const [infoOwner, setInfoOwner] = useState('')
  const [data, setData] = useState([])
  const [mintedData, setMintedData] = useState([])

  const mintNFT = async id => {
    setLoading(true)
    try {
      const { transaction } = await writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'mintToken',
        args: [id],
        value: parseEther('0.1')
      })
      console.log(transaction, '>>>>transaction<<<<<<')
      const data = await waitForTransaction({
        hash: transaction
      })
      if (data) {
        setLoading(false)
        setNftInfoModalState(false)
      }
    } catch (err) {
      setLoading(false)
      console.log('error')
    }
  }

  const setModalInfo = item => {
    console.log('item.attributes.id', item.attributes.id)
    if (item) {
      item.image ? setInfoNft(item.image) : setInfoNft()
      // item.price ? setInfoPrice(item.price) : setInfoPrice()
      item.name ? setInfoName(item.name) : setInfoName()
      // item.contract ? setInfoOwner(item.contract) : setInfoOwner('')
      item.attributes.id != null ? setInfoId(item.attributes.id) : setInfoId(9)
      item.attributes.boxing
        ? setInfoBoxing(item.attributes.boxing)
        : setInfoBoxing()
      item.attributes.energy
        ? setInfoEnergy(item.attributes.energy)
        : setInfoEnergy()
    }
    setNftInfoModalState(!nftInfoModalState)
  }

  const getToken = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'getRealPrice',
    args: [infoId]
  })

  useEffect(() => {
    if (getToken && getToken.data) {
      console.log(typeof formatEther(getToken.data))
      setGetBNB(formatEther(getToken.data).toString())
    } else {
      // Handle the case when getToken or getToken.data is undefined
      console.log('getToken or getToken.data is undefined')
    }
  }, [getToken])

  useEffect(() => {
    if (nftInfoModalState) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [nftInfoModalState])

  useEffect(() => {
    console.log('props ', props.contract)
    if (props.mintedIds && props.mintedIds.length > 0) {
      setMintedData(props.mintedIds)
    }
    if (props.datas && props.datas.length > 0) {
      props.datas.map(async datum => {
        await fetch(`https://logarithm.games/bscnft/${datum}`)
          .then(resp => {
            if (!resp.ok) {
              throw new Error(`HTTP error! Status: ${resp.status}`)
            }
            return resp.json()
          })
          .then(json => {
            setData(oldArray => [...oldArray, json])
          })
          .catch(e => {
            console.log(e)
          })
      })
    }
  }, [props])

  return (
    <>
      {props.datas && props.datas.length > 0 ? (
        <div className='my-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10'>
          {data.map((item, index) => {
            return (
              <div
                key={index}
                className='hover:animate-pulse hover:scale-105 transition-all'
              >
                {mintedData?.includes(item.attributes.id) ? (
                  <img
                    className='w-[362px] h-auto bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500 p-1 grayscale'
                    src={item.image}
                    alt=''
                  />
                ) : (
                  <img
                    className='w-[362px] h-auto bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500 p-1'
                    src={item.image}
                    alt=''
                  />
                )}
                <div className='backdrop-blur-lg bg-[#02021b6b] w-auto h-[180px] flex justify-center p-[20px]'>
                  <div className='w-full items-center h-full flex flex-col justify-center'>
                    <div className='w-full flex justify-between text-2xl items-center'>
                      <p className='text-white'># {item.attributes.id}</p>
                      <div className='flex'></div>
                    </div>
                    <div className='w-full flex justify-center items-center'>
                      {mintedData?.includes(item.attributes.id) ? (
                        <></>
                      ) : (
                        <button
                          className='cursor-pointer hover:animate-pulse hover:scale-105 transition-all my-3 border-[1px] border-solid border-pink-300 bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500 rounded-[5px] w-[180px] h-[60px] text-white'
                          onClick={() => setModalInfo(item)}
                        >
                          {props.isMine === 1 ? 'Sell Now' : 'Mint Now'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className='text-3xl text-white font-bold mx-auto items-center flex py-40'>
          No NFT
        </div>
      )}

      {nftInfoModalState && (
        <div className='w-full h-screen z-30 fixed top-0 left-0 flex justify-center overflow-x-scroll'>
          <div
            className='w-full h-full backdrop-blur-sm fixed top-0 left-0 cursor-pointer bg-[#33333333] '
            onClick={() => setNftInfoModalState(!nftInfoModalState)}
          ></div>
          <div className='w-full'>
            <div className='relative flex justify-center z-10 mx-auto w-[260px] sm:w-[400px] md:w-[500px] h-[460px] md:h-[540px] mt-10'>
              <img
                className='absolute top-0 opacity-80 w-full h-full mx-auto'
                src={NFTBg}
                alt=''
              />
              <div className='z-10 w-full'>
                <img
                  className='w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[300px] md:h-[300px] mx-auto object-cover z-10 m-16 mb-4'
                  src={infoNft}
                  alt=''
                />
                <h1 className='text-3xl font-medium text-[#333333] text-center p-1'>
                  {infoName}
                </h1>
                <div className='flex flex-col sm:flex-row w-full gap-1 sm:gap-10 justify-between px-12 items-center'>
                  <p className='text-2xl p-1'># {infoId}</p>
                  <p className='text-2xl font-bold p-1'>{getBNB} BNB</p>
                </div>
              </div>
            </div>

            <div className='mt-[40px] w-full h-full '>
              <img
                className='lg:flex hidden max-w-7xl w-full h-[650px] right-0 absolute'
                src={WindowBg}
                alt=''
              />
              <img
                className='flex lg:hidden w-full h-[600px] right-0 absolute'
                src={WindowBgS}
                alt=''
              />
              <div className='p-2 z-10 mt-5 absolute lg:right-0 max-w-3xl h-[600px] lg:w-2/3 w-full '>
                <p className='my-8 text-xl sm:text-3xl font-bold text-[#333333] p-1'>
                  Name: {infoName}
                </p>
                <p className='my-8 text-xl sm:text-3xl font-bold text-[#333333] p-1'>
                  ID: # {infoId}
                </p>
                <p className='my-8 text-xl sm:text-3xl font-bold text-[#333333] p-1'>
                  Price: {getBNB} BNB
                </p>

                <p className='mt-20 mb-4 text-xl sm:text-3xl font-bold text-[#333333] p-1'>
                  Attributes
                </p>
                <div className='flex flex-wrap justify-center items-center gap-4 md:gap-10'>
                  <p className='text-xl sm:text-3xl font-medium text-[#333333] p-1'>
                    Boxing: {infoBoxing}
                  </p>
                  <p className='text-xl sm:text-3xl font-medium text-[#333333] p-1'>
                    Energy: {infoEnergy}
                  </p>
                </div>

                <div className='w-full flex justify-center items-center'>
                  {address != '' && address != undefined && address != null ? (
                    <button
                      className='w-full lg:w-[300px] cursor-pointer hover:animate-pulse hover:scale-105 transition-all border-[1px] border-solid border-pink-300 bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500 rounded-[5px] h-[60px] text-white my-10'
                      onClick={() => mintNFT(infoId)}
                    >
                      {props.isMine == 1 ? 'Sell Now' : 'Mint Now'}
                    </button>
                  ) : (
                    <button
                      className='w-full lg:w-[300px] cursor-pointer hover:animate-pulse hover:scale-105 transition-all border-[1px] border-solid border-pink-300 bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500 rounded-[5px] h-[60px] text-white my-10'
                      onClick={() => (
                        setNftInfoModalState(!nftInfoModalState),
                        setConnectwalletModalState(!connectwalletModalState)
                      )}
                    >
                      Please connect wallet
                    </button>
                  )}
                </div>
              </div>
              {props.isMine == 1 && (
                <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center z-50'>
                  {/* <p className='z-50 text-red-500 '>COMING SOON!</p> */}
                  <img
                    className='w-[60%] cursor-pointer'
                    src={ComingSoon}
                    alt=''
                    onClick={() => setNftInfoModalState(!nftInfoModalState)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {connectwalletModalState && (
        <div className='w-full h-screen z-30 fixed top-0 left-0 flex justify-center items-center'>
          <div
            className='w-full h-screen backdrop-blur-sm fixed top-0 left-0 cursor-pointer bg-[#33333333]'
            onClick={() => setConnectwalletModalState(!connectwalletModalState)}
          ></div>
          <WalletModal onClose={() => setConnectwalletModalState(false)} />
        </div>
      )}
      {loading && <LoadingModal />}
    </>
  )
}

export default NftGrid
