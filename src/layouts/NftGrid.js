import React, { useEffect, useState } from 'react'
import EthSvg from '../assets/svgIcons'
import NFTBg from '../assets/images/nft_bg.png'
import WindowBg from '../assets/images/window_bg.png'
import WindowBgS from '../assets/images/window_bg-sm.png'
import ComingSoon from '../assets/images/coming_soon.png'

function NftGrid (props) {
  const [nftInfoModalState, setNftInfoModalState] = useState(false)
  const [infoNft, setInfoNft] = useState()
  const [infoId, setInfoId] = useState()
  const [infoName, setInfoName] = useState()
  const [infoPrice, setInfoPrice] = useState()
  const [infoHead, setInfoHead] = useState()
  const [infoBody, setInfoBody] = useState()
  const [infoArm, setInfoArm] = useState()
  const [infoSpecial, setInfoSpecial] = useState()
  const [infoOwner, setInfoOwner] = useState('')

  const setModalInfo = data => {
    if (data) {
      data.nft ? setInfoNft(data.nft) : setInfoNft()
      data.id ? setInfoId(data.id) : setInfoId()
      data.price ? setInfoPrice(data.price) : setInfoPrice()
      data.name ? setInfoName(data.name) : setInfoName()
      data.head ? setInfoHead(data.head) : setInfoHead()
      data.body ? setInfoBody(data.body) : setInfoBody()
      data.arm ? setInfoArm(data.arm) : setInfoArm()
      data.special ? setInfoSpecial(data.special) : setInfoSpecial()
      data.owner ? setInfoOwner(data.owner) : setInfoOwner('')
    }
    setNftInfoModalState(!nftInfoModalState)
  }

  useEffect(() => {
    if (nftInfoModalState) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [nftInfoModalState])

  return (
    <>
      {props.datas && props.datas.length > 0 && (
        <div className='my-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10'>
          {props.datas.map((data, index) => {
            return (
              <div
                key={index}
                className='hover:animate-pulse hover:scale-105 transition-all'
              >
                <img
                  className='w-[362px] h-auto bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500 p-1'
                  src={data.nft}
                  alt=''
                />
                <div className='backdrop-blur-lg bg-[#02021b6b] w-auto h-[196px] flex justify-center p-[20px]'>
                  <div className='w-full'>
                    <div className='w-full flex justify-between items-center'>
                      <p className='text-white'>#{data.id}</p>
                      <div className='flex'></div>
                    </div>
                    <div className='my-3 flex items-center ju gap-4'>
                      <EthSvg />
                      <p className='text-white font-bold text-2xl'>
                        {data.price} ETH
                      </p>
                    </div>
                    <div className='w-full flex justify-center items-center'>
                      <button
                        className='cursor-pointer hover:animate-pulse hover:scale-105 transition-all my-3 border-[1px] border-solid border-pink-300 bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500 rounded-[5px] w-[180px] h-[60px] text-white'
                        onClick={() => setModalInfo(data)}
                      >
                        {data.owner === '' ? 'Mint Now' : 'Sell Now'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {nftInfoModalState && (
        <div className='w-full h-screen z-30 fixed top-0 left-0 flex justify-center overflow-auto'>
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
                  <p className='text-2xl p-1'>#{infoId}</p>
                  <p className='text-2xl font-bold p-1'>{infoPrice} ETH</p>
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
                  ID: #{infoId}
                </p>
                <p className='my-8 text-xl sm:text-3xl font-bold text-[#333333] p-1'>
                  Price: {infoPrice} ETH
                </p>

                <p className='mt-20 mb-4 text-xl sm:text-3xl font-bold text-[#333333] p-1'>
                  Attributes
                </p>
                <div className='flex flex-wrap justify-center items-center gap-4 md:gap-10'>
                  <p className='text-xl sm:text-3xl font-medium text-[#333333] p-1'>
                    Head: {infoHead}
                  </p>
                  <p className='text-xl sm:text-3xl font-medium text-[#333333] p-1'>
                    Body: {infoBody}
                  </p>
                  <p className='text-xl sm:text-3xl font-medium text-[#333333] p-1'>
                    Arm: {infoArm}
                  </p>
                  <p className='text-xl sm:text-3xl font-medium text-[#333333] p-1'>
                    Special: {infoSpecial}
                  </p>
                </div>

                <div className='w-full flex justify-center items-center'>
                  <button className='w-full lg:w-[300px] cursor-pointer hover:animate-pulse hover:scale-105 transition-all border-[1px] border-solid border-pink-300 bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500 rounded-[5px] h-[60px] text-white my-10'>
                    {!infoOwner ? 'Mint Now' : 'Sell Now'}
                  </button>
                </div>
                {infoOwner && (
                  <div className='fixed top-0 left-0 w-full h-screen flex justify-center items-center z-50'>
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
        </div>
      )}
    </>
  )
}

export default NftGrid
