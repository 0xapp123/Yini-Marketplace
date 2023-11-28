import React, { useEffect, useState, useMemo } from 'react'
import NFTBg from '../assets/images/nft_bg.png'
import WindowBg from '../assets/images/window_bg.png'
import WindowBgS from '../assets/images/window_bg-sm.png'
import ComingSoon from '../assets/images/coming_soon.png'
import WalletModal from '../component/wallerConnectModal'
import LoadingModal from '../component/loding'
import Pagination from '../component/Pagination'
import { AiOutlineClose } from 'react-icons/ai'

import { useAccount, useContractRead, useWaitForTransaction } from 'wagmi'
import { writeContract } from '@wagmi/core'
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../config'
import { formatEther, parseEther } from 'viem'
import { useContract } from '../hook/useContract'

function NftGrid (props) {
  const { address } = useAccount()
  const [nftInfoModalState, setNftInfoModalState] = useState(false)
  const [connectwalletModalState, setConnectwalletModalState] = useState(false)
  const [infoNft, setInfoNft] = useState()
  const [infoId, setInfoId] = useState()
  const [infoDescription, setInfoDescription] = useState()
  const [infoName, setInfoName] = useState()
  // const [infoPrice, setInfoPrice] = useState()
  const [infoBoxing, setInfoBoxing] = useState()
  const [infoEnergy, setInfoEnergy] = useState()
  const [loading, setLoading] = useState(false)

  const [getBNB, setGetBNB] = useState('')

  // const [infoOwner, setInfoOwner] = useState('')
  const [datas, setDatas] = useState([])
  const [mintedData, setMintedData] = useState([])
  const [transactionHash, SetTransactionHash] = useState('')

  const [currentPage, setCurrentPage] = useState(1)

  const { getRealPrice } = useContract();

  const mintNFT = async id => {
    setLoading(true)
    try {
      const { hash } = await writeContract({
        address: CONTRACT_ADDRESS,
        abi: CONTRACT_ABI,
        functionName: 'mintToken',
        args: [id],
        value: parseEther(getBNB)
      })
      console.log('tx', hash)
      SetTransactionHash(hash)
    } catch (err) {
      setLoading(false)
      console.log('error: ', err)
      setNftInfoModalState(!nftInfoModalState)
    }
  }

  const { data, isError, isLoading } = useWaitForTransaction({
    hash: transactionHash,
    onError (err) {
      console.log('error', err)
    },
    onSuccess (data) {
      console.log('Success', data)
      setLoading(false)
      setMintedData(oldArray => [...oldArray, infoId])
      setNftInfoModalState(!nftInfoModalState)
    }
  })

  const modalState = () => {
    setNftInfoModalState(!nftInfoModalState)
    setConnectwalletModalState(!connectwalletModalState)
  }

  const setModalInfo = async item => {
    if (item) {
      console.log(item)
      await getPrice(item);
      let data
      await fetch(`https://logarithm.games/bscnft/${item}`)
        .then(resp => {
          if (!resp.ok) {
            throw new Error(`HTTP error! Status: ${resp.status}`)
          }
          return resp.json()
        })
        .then(json => {
          data = json
        })
        .catch(e => {
          console.log(e)
        })
      data.image ? setInfoNft(data.image) : setInfoNft()
      // data.price ? setInfoPrice(data.price) : setInfoPrice()
      data.name ? setInfoName(data.name) : setInfoName()
      // data.contract ? setInfoOwner(data.contract) : setInfoOwner('')
      data.attributes.id != null ? setInfoId(data.attributes.id) : setInfoId()
      data.description
        ? setInfoDescription(data.description)
        : setInfoDescription()
      data.attributes.boxing
        ? setInfoBoxing(data.attributes.boxing)
        : setInfoBoxing()
      data.attributes.energy
        ? setInfoEnergy(data.attributes.energy)
        : setInfoEnergy()
    }
    setNftInfoModalState(!nftInfoModalState)
  }

  const getPrice = async (infoId) => {
    if (infoId || infoId === 0) {
      const getToken = await getRealPrice(infoId);
      setGetBNB(formatEther(getToken).toString())
  }}  

  // useEffect(() => {
  //   if (getToken && getToken.data) {
  //     console.log(typeof formatEther(getToken.data))
  //     setGetBNB(formatEther(getToken.data).toString())
  //   } else {
  //     // Handle the case when getToken or getToken.data is undefined
  //     console.log('getToken or getToken.data is undefined')
  //   }
  // }, [getToken])

  useEffect(() => {
    if (nftInfoModalState) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [nftInfoModalState])

  useEffect(() => {
    if (props.mintedIds && props.mintedIds.length > 0) {
      setMintedData(props.mintedIds)
    }
  }, [props.mintedIds])

  useEffect(() => {
    setLoading(true)
    if (props.datas !== undefined && props.datas !== null) {
      let currentTableData = []
      let firstPageIndex = 0
      firstPageIndex = (currentPage - 1) * 20
      const lastPageIndex = firstPageIndex + 20
      currentTableData = props.datas.slice(firstPageIndex, lastPageIndex)
      if (currentTableData && currentTableData.length > 0) {
        let propsData = []
        currentTableData.map(async datum => {
          await fetch(`https://logarithm.games/bscnft/${datum}`)
            .then(resp => {
              if (!resp.ok) {
                throw new Error(`HTTP error! Status: ${resp.status}`)
              }
              return resp.json()
            })
            .then(json => {
              propsData.push(json)
              if (propsData.length === currentTableData.length) {
                setDatas(propsData)
              }
            })
            .catch(e => {
              console.log(e)
            })
        })
      }
    } else {
      setDatas([])
    }

    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }, [props.datas, mintedData, currentPage])

  return (
    <>
      {props.datas && props.datas.length > 0 ? (
        <div className='w-full flex flex-col items-center justify-center'>
          <div className='my-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10'>
            {datas.map((item, index) => {
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
                    <div className='w-full items-center h-full text-lg sm:text-xl flex flex-col justify-center'>
                      <div className='w-full flex justify-between items-center'>
                        <p className='text-white'># {item.attributes.id}</p>
                        {item.attributes.id < 100 ? (
                          <p className='text-white'>0.01 BNB</p>
                        ) : item.attributes.id >= 100 &&
                          item.attributes.id < 200 ? (
                          <p className='text-white'>0.02 BNB</p>
                        ) : item.attributes.id >= 200 &&
                          item.attributes.id < 300 ? (
                          <p className='text-white'>0.04 BNB</p>
                        ) : item.attributes.id >= 300 &&
                          item.attributes.id < 400 ? (
                          <p className='text-white'>0.08 BNB</p>
                        ) : (
                          item.attributes.id >= 400 &&
                          item.attributes.id < 500 && (
                            <p className='text-white'>0.1 BNB</p>
                          )
                        )}
                      </div>
                      <div className='w-full flex justify-between items-center'>
                        <p className='text-white'>
                          Boxing :{item.attributes.boxing}
                        </p>
                        <p className='text-white'>
                          Energy :{item.attributes.energy}
                        </p>
                      </div>
                      <div className='w-full flex justify-center items-center'>
                        {mintedData?.includes(item.attributes.id) ? (
                          <></>
                        ) : (
                          <button
                            className='cursor-pointer hover:animate-pulse hover:scale-105 transition-all my-3 border-[1px] border-solid border-pink-300 bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500 rounded-[5px] w-[180px] h-[60px] text-white'
                            onClick={() => setModalInfo(item.attributes.id)}
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
          <div className='flex flex-col w-full px-5 py-3'>
            <Pagination
              className='justify-center items-center flex w-full text-white pagination-bar'
              currentPage={currentPage}
              totalCount={props.datas.length}
              pageSize={20}
              onPageChange={page => setCurrentPage(page)}
            />
          </div>
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
            <div className='relative flex justify-center z-10 mx-auto w-full h-full max-w-[320px] max-h-[330px] mt-10'>
              <img
                className='absolute top-0 opacity-80 w-full h-full mx-auto'
                src={NFTBg}
                alt=''
              />
              <div className='z-10 mt-8 w-full'>
                <img
                  className='w-[200px] h-[200px]  mx-auto object-cover z-10'
                  src={infoNft}
                  alt=''
                />
                <h1 className='text-xl font-medium text-[#333333] text-center p-1'>
                  {infoName}
                </h1>
                <div className='flex flex-row gap-1 sm:gap-10 justify-between w-[250px] px-5 mx-auto items-center'>
                  <p className='text-lg p-1'># {infoId}</p>
                  <p className='text-lg font-bold p-1'>{getBNB} BNB</p>
                </div>
              </div>
            </div>

            <div className='w-full max-h-screen '>
              <img
                className='lg:flex hidden max-w-7xl w-full h-[500px] right-0 absolute'
                src={WindowBg}
                alt=''
              />
              <img
                className='flex lg:hidden w-full h-[500px] right-0 absolute'
                src={WindowBgS}
                alt=''
              />
              <div className='px-4 mt-10 sm:mt-5 absolute lg:right-5 lg:max-w-3xl h-[450px] lg:w-2/3 w-full flex flex-col gap-5'>
                <div className='flex flex-row items-center justify-center w-full'>
                  <p className='text-lg sm:text-3xl font-bold text-[#333333] p-1 w-full text-start'>
                    Name: {infoName}
                  </p>
                  <div
                    onClick={() => setNftInfoModalState(!nftInfoModalState)}
                    className='flex items-center text-end cursor-pointer z-10'
                  >
                    <AiOutlineClose
                      style={{ fontSize: '24px' }}
                    />
                  </div>
                </div>
                <p className='text-lg sm:text-3xl font-bold text-[#333333] p-1'>
                  ID: # {infoId}
                </p>
                <p className='text-lg sm:text-3xl font-bold text-[#333333] p-1'>
                  Price: {getBNB} BNB
                </p>
                <p className='text-lg sm:text-3xl font-bold text-[#333333] p-1'>
                  Description: {infoDescription}
                </p>

                <p className='text-lg sm:text-3xl font-bold text-[#333333] p-1'>
                  Attributes
                </p>
                <div className='flex flex-wrap justify-center items-center gap-4 md:gap-10'>
                  <p className='text-lg sm:text-3xl font-medium text-[#333333] p-1'>
                    Boxing: {infoBoxing}
                  </p>
                  <p className='text-lg sm:text-3xl font-medium text-[#333333] p-1'>
                    Energy: {infoEnergy}
                  </p>
                </div>

                <div className='w-full flex justify-center items-center'>
                  {address !== '' &&
                  address !== undefined &&
                  address !== null ? (
                    <button
                      className='w-full lg:w-[300px] cursor-pointer hover:animate-pulse hover:scale-105 transition-all border-[1px] border-solid border-pink-300 bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500 rounded-[5px] h-[60px] text-white my-2'
                      onClick={() => mintNFT(infoId)}
                    >
                      {props.isMine === 1 ? 'Sell Now' : 'Mint Now'}
                    </button>
                  ) : (
                    <button
                      className='w-full lg:w-[300px] cursor-pointer hover:animate-pulse hover:scale-105 transition-all border-[1px] border-solid border-pink-300 bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500 rounded-[5px] h-[60px] text-white my-2'
                      onClick={() => modalState()}
                    >
                      Please connect wallet
                    </button>
                  )}
                </div>
              </div>
              {props.isMine === 1 && (
                <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center z-[8]'>
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
