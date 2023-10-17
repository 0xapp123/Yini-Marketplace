import { ReactComponent as LogoSvg } from '../assets/images/nft_logo.svg'
import WindowBg from '../assets/images/window_bg.png'
import WindowBgS from '../assets/images/window_bg-sm.png'
import NFT_1 from '../assets/images/nft_1.png'
import NFT_2 from '../assets/images/nft_2.png'
import NFT_3 from '../assets/images/nft_3.png'
import NFT_4 from '../assets/images/nft_4.png'
import NFT_5 from '../assets/images/nft_5.png'
import NFT_6 from '../assets/images/nft_6.png'
import NFT_7 from '../assets/images/nft_7.png'
import NFT_8 from '../assets/images/nft_8.png'
import NftGrid from '../layouts/NftGrid'

function Home () {
  const datas = [
    {
      id: 135123,
      name: "Private's Helmet",
      head: 3,
      body: 21,
      arm: 4,
      special: 7,
      price: 1.3,
      nft: NFT_1,
      owner: ''
    },
    {
      id: 135124,
      name: "Private's Helmet",
      head: 3,
      body: 21,
      arm: 4,
      special: 7,
      price: 1.5,
      nft: NFT_2,
      owner: ''
    },
    {
      id: 135125,
      name: "Private's Helmet",
      head: 3,
      body: 21,
      arm: 4,
      special: 7,
      price: 2.1,
      nft: NFT_3,
      owner: ''
    },
    {
      id: 135126,
      name: "Private's Helmet",
      head: 3,
      body: 21,
      arm: 4,
      special: 7,
      price: 7.1,
      nft: NFT_4,
      owner: ''
    },
    {
      id: 135127,
      name: "Private's Helmet",
      head: 3,
      body: 21,
      arm: 4,
      special: 7,
      price: 2.9,
      nft: NFT_5,
      owner: ''
    },
    {
      id: 135128,
      name: "Private's Helmet",
      head: 3,
      body: 21,
      arm: 4,
      special: 7,
      price: 5.0,
      nft: NFT_6,
      owner: ''
    },
    {
      id: 135129,
      name: "Private's Helmet",
      head: 3,
      body: 21,
      arm: 4,
      special: 7,
      price: 1.8,
      nft: NFT_7,
      owner: ''
    },
    {
      id: 135130,
      name: "Private's Helmet",
      head: 3,
      body: 21,
      arm: 4,
      special: 7,
      price: 0.8,
      nft: NFT_8,
      owner: ''
    }
  ]
  return (
    <div className=''>
      <div className='relative flex items-center justify-between px-4 lg:px-12 h-auto w-full'>
        <div className='w-full px-2 my-28 lg:p-28 flex flex-col lg:items-start items-center justify-center z-10'>
          <h1 className='text-[32px] md:text-[40px] lg:ml-0 xl:text-[64px] text-white font-bold my-8 lg:mr-[200px]'>
            LOGARITHM GAMES
          </h1>
          <p className='text-[24px] lg:text-[32px] text-white my-8'>
            Stablecoin secured by land and real estate
          </p>
          <button className='my-8 border-[1px] border-solid border-pink-300 bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500 rounded-[5px] w-[180px] h-[60px] text-white'>
            Mint Now
          </button>
        </div>
        <LogoSvg className='hidden lg:top-0 lg:right-0 lg:flex absolute' />
      </div>
      <div className='my-[140px]'>
        <img
          className='absolute hidden lg:flex z-[-1] lg:w-full h-[1000px] xl:max-h-[1100px]'
          src={WindowBg}
          alt=''
        />
        <img
          className='absolute lg:hidden flex z-[-1] w-full h-[1000px] max-h-[1100px]'
          src={WindowBgS}
          alt=''
        />
        <div className='w-full h-auto flex flex-row justify-end items-center p-5 py-20 xl:p-20'>
          <div className='w-full lg:w-3/4 float-right'>
            <h1 className='text-[#1e1e1e] text-[32px] lg:text-[42px] font-bold text-center'>
              Description
            </h1>
            <p className='text-[#1e1e1e] h-[750px] object-cover overflow-y-scroll text-[20px] lg:text-[24px] font-medium mt-10'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              vulputate libero et velit interdum, ac aliquet odio mattis. Class
              aptent taciti sociosqu ad litora torquent per conubia nostra, per
              inceptos himenaeos.Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Nunc vulputate libero et velit interdum, ac
              aliquet odio mattis. Class aptent taciti sociosqu ad litora
              torquent per conubia nostra, per inceptos himenaeos. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero
              et velit interdum, ac aliquet odio mattis. Class aptent taciti
              sociosqu ad litora torquent per conubia nostra, per inceptos
              himenaeos.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Nunc vulputate libero et velit interdum, ac aliquet odio mattis.
              Class aptent taciti sociosqu ad litora torquent per conubia
              nostra, per inceptos himenaeos. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Nunc vulputate libero et velit
              interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad
              litora torquent per conubia nostra, per inceptos himenaeos.Lorem
              ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate
              libero et velit interdum, ac aliquet odio mattis. Class aptent
              taciti sociosqu ad litora torquent per conubia nostra, per
              inceptos himenaeos. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Nunc vulputate libero et velit interdum, ac
              aliquet odio mattis. Class aptent taciti sociosqu ad litora
              torquent per conubia nostra, per inceptos himenaeos.Lorem ipsum
              dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero
              et velit interdum, ac aliquet odio mattis. Class aptent taciti
              sociosqu ad litora torquent per conubia nostra, per inceptos
              himenaeos.
            </p>
          </div>
        </div>
      </div>
      <div className='px-10 md:px-24'>
        <h1 className='text-white text-[32px] md:text-[42px] font-bold text-center md:text-start '>
          Weekly Top NFTs
        </h1>
        <p className='my-4 text-white text-[20px] md:text-[24px] text-center md:text-start'>
          Mintable NFTs with the most weekly views
        </p>
        <div className='w-full flex justify-center items-center'>
          <NftGrid datas={datas} />
        </div>
      </div>
    </div>
  )
}

export default Home
