import { useAccount, useDisconnect } from 'wagmi'
import WalletModal from '../component/wallerConnectModal'
import { NavLink, useNavigate } from 'react-router-dom'
import React, { useEffect, useState, useRef } from 'react'
import { BiMenu } from 'react-icons/bi'

function Navbar () {
  const [walletIcons, setWalletIcons] = useState(new Map())
  const { address, isConnected } = useAccount()
  const [connectwalletModalState, setConnectwalletModalState] = useState(false)
  const menuDropdown = useRef()
  const [dropMenu, setDropMenu] = useState(false)
  const navigate = useNavigate()
  const { disconnect } = useDisconnect()

  useEffect(() => {
    let tmp = new Map()
    tmp.set('metaMask', '/images/metamask.png')
    tmp.set('coinbaseWallet', '/images/walletlink.png')
    tmp.set('walletConnect', '/images/walletconnect.png')
    setWalletIcons(tmp)
  }, [])

  useEffect(() => {
    if (address) {
      setConnectwalletModalState(false)
    }
  }, [address])

  useEffect(() => {
    if (connectwalletModalState) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [connectwalletModalState])

  useEffect(() => {
    function handleClickOutside (event) {
      if (
        menuDropdown.current &&
        !menuDropdown.current.contains(event.target)
      ) {
        setDropMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [menuDropdown])

  return (
    <>
      <nav className='flex-row top-0 w-full backdrop-blur-lg bg-[#befdff11] border-b-[1px] border-[#88888888] flex items-center justify-between px-2 sm:px-8 z-20'>
        <NavLink to='/' className='flex sm:justify-center items-center'>
          <img
            className='w-[42px] h-[42px] xl:w-[70px] xl:h-[70px]'
            src='logo.png'
            alt=''
          />
          <h1 className='hidden sm:flex px-6 font-bold text-xl xl:text-3xl text-white'>
            LOGARITHM GAMES
          </h1>
        </NavLink>
        <div className='hidden lg:flex gap-3 lg:gap-12'>
          <NavLink
            to='/'
            className={({ isActive, isPending }) =>
              isPending
                ? 'text-white'
                : isActive
                ? 'text-white text-lg font-bold border-b-4 py-8 drop-shadow-[1px_1px_0_rgba(18,214,223,1)]'
                : 'text-lg font-bold text-[rgba(255,255,255,0.48)] py-8 drop-shadow-[1px_1px_0_rgba(18,214,223,1)]'
            }
          >
            HOME
          </NavLink>
          <NavLink
            to='/Marketplace'
            className={({ isActive, isPending }) =>
              isPending
                ? 'text-white'
                : isActive
                ? 'text-white text-lg font-bold border-b-4 py-8 drop-shadow-[1px_1px_0_rgba(18,214,223,1)]'
                : 'text-lg font-bold text-[rgba(255,255,255,0.48)] py-8 drop-shadow-[1px_1px_0_rgba(18,214,223,1)]'
            }
          >
            MARKETPLACE
          </NavLink>
          <NavLink
            to='/MyNFTs'
            className={({ isActive, isPending }) =>
              isPending
                ? 'text-white'
                : isActive
                ? 'text-white text-lg font-bold border-b-4 py-8 drop-shadow-[1px_1px_0_rgba(18,214,223,1)]'
                : 'text-lg font-bold text-[rgba(255,255,255,0.48)] py-8 drop-shadow-[1px_1px_0_rgba(18,214,223,1)]'
            }
          >
            MY NFTS
          </NavLink>
        </div>
        <div className='flex relative justify-center items-center font-bold cursor-pointer hover:brightness-150 transition-all'>
          <div
            onClick={() => setDropMenu(!dropMenu)}
            className='relative w-[40px] h-[40px] mr-1 flex lg:hidden items-center justify-center rounded-lg border-[1px] border-[rgba(255,255,255,0.48)] cursor-pointer'
          >
            <BiMenu
              style={{ fontSize: '24px', color: 'rgba(255,255,255,0.48)' }}
            />
            <div
              className={`${
                dropMenu ? 'flex flex-col' : 'hidden'
              } absolute w-[140px] border-2 border-[rgba(255,255,255,0.48)] top-[50px] bg-[#befdff11] rounded-xl z-[9999] text-[rgba(255,255,255,0.48)]`}
            >
              <div
                onClick={() => navigate('/')}
                className='w-full text-[14px] rounded-t-lg hover:bg-[#525252] hover:text-white py-1 px-4'
              >
                <span className='w-full py-2 font-semibold'>Home</span>
              </div>
              <div
                onClick={() => navigate('/Marketplace')}
                className='w-full text-[14px] hover:bg-[#525252] hover:text-white py-1 px-4'
              >
                <span className='w-full py-2 font-semibold'>MARKETPLACE</span>
              </div>
              <div
                onClick={() => navigate('/MyNFTs')}
                className='w-full text-[14px] rounded-b-lg hover:bg-[#525252] hover:text-white py-1 px-4'
              >
                <span className='w-full py-2 font-semibold'>MY NFTS</span>
              </div>
            </div>
          </div>
          {!isConnected ? (
            <p
              onClick={() =>
                setConnectwalletModalState(!connectwalletModalState)
              }
              className='z-20 w-[160px] lg:w-[220px] xl:w-[319px] text-end text-white text-md lg:text-lg xl:text-2xl lg:pr-4 drop-shadow-[1px_1px_0_rgba(18,214,223,1)]'
            >
              CONNECT WALLET
            </p>
          ) : (
            <p
              onClick={disconnect}
              className='z-20 w-[160px] lg:w-[220px] xl:w-[319px] text-end text-white text-md lg:text-lg xl:text-2xl lg:pr-4 drop-shadow-[1px_1px_0_rgba(18,214,223,1)]'
            >
              Disconnect
            </p>
          )}
          <div className='z-10'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='53'
              height='59'
              className='w-[30px] lg:w-[40px] xl:w-[53px]'
              viewBox='0 0 53 59'
              fill='none'
            >
              <path
                d='M53 59L44.1921 59L44.1921 20.8769L32.1813 7.26154L0.953229 7.26153L0.953229 10.44614L26.5763 5.44615L26.5763 -2.26551e-07L32.982 1.67792e-06L53 19.9692L53 59Z'
                fill='#F70FFF'
              />
            </svg>
          </div>
          <div className='right-0 bottom-0 absolute'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              height='57'
              className='w-[190px] lg:w-[250px] xl:w-[349px]'
              viewBox='0 0 349 57'
              fill='none'
            >
              <g filter='url(#filter0_b_5_2470)'>
                <path
                  d='M348.713 18.631L348.713 57L33.1248 56.9999L12.6399 34.1612L12.6399 22.2851L12.6399 15.8902L-4.79309e-05 0.35992L137.874 0.359961L141.971 4.92771L159.998 4.92771L336.422 4.92777L348.713 18.631Z'
                  fill='url(#paint0_linear_5_2470)'
                />
                <path
                  d='M141.413 5.42848C141.555 5.58709 141.758 5.67771 141.971 5.67771L159.998 5.67771L336.088 5.67776L347.963 18.9181L347.963 56.25L33.4595 56.2499L13.3899 33.8741L13.3899 22.2851L13.3899 15.8902C13.3899 15.7178 13.3305 15.5506 13.2216 15.4168L1.57737 1.10992L137.539 1.10996L141.413 5.42848Z'
                  stroke='url(#paint1_linear_5_2470)'
                  strokeWidth='1.5'
                  strokeLinejoin='round'
                />
              </g>
              <defs>
                <filter
                  id='filter0_b_5_2470'
                  x='-20'
                  y='-19.6401'
                  width='388.713'
                  height='96.6401'
                  filterUnits='userSpaceOnUse'
                  colorInterpolationFilters='sRGB'
                >
                  <feFlood floodOpacity='0' result='BackgroundImageFix' />
                  <feGaussianBlur in='BackgroundImageFix' stdDeviation='10' />
                  <feComposite
                    in2='SourceAlpha'
                    operator='in'
                    result='effect1_backgroundBlur_5_2470'
                  />
                  <feBlend
                    mode='normal'
                    in='SourceGraphic'
                    in2='effect1_backgroundBlur_5_2470'
                    result='shape'
                  />
                </filter>
                <linearGradient
                  id='paint0_linear_5_2470'
                  x1='350.052'
                  y1='40.5562'
                  x2='26.2856'
                  y2='26.2945'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop stopColor='#330C5E' />
                  <stop offset='1' stopColor='#0F2A58' />
                </linearGradient>
                <linearGradient
                  id='paint1_linear_5_2470'
                  x1='350.052'
                  y1='36.902'
                  x2='26.4172'
                  y2='21.2205'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop stopColor='#F70FFF' />
                  <stop offset='1' stopColor='#12D6DF' />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </nav>
      {connectwalletModalState && (
        <div className='w-full h-screen z-30 fixed top-0 left-0 flex justify-center items-center'>
          <div
            className='w-full h-screen backdrop-blur-sm fixed top-0 left-0 cursor-pointer bg-[#33333333]'
            onClick={() => setConnectwalletModalState(!connectwalletModalState)}
          ></div>
          <WalletModal onClose={() => setConnectwalletModalState(false)} />
        </div>
      )}
    </>
  )
}

export default Navbar
