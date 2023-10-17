import LogoText from '../assets/images/logo_text.png'
import FooterBg from '../assets/images/footer_bg.png'
import LinkedinBtn from '../assets/images/linkedin_btn.png'
import ReditBtn from '../assets/images/redit_btn.png'
import YoutubeBtn from '../assets/images/youtube_btn.png'
import TelegramBtn from '../assets/images/telegram_btn.png'
import FacebookBtn from '../assets/images/facebook_btn.png'
import DiscordBtn from '../assets/images/discord_btn.png'
import InstagramBtn from '../assets/images/instagram_btn.png'
import MediumBtn from '../assets/images/medium_btn.png'
import TwitterBtn from '../assets/images/twitter_btn.png'

function Footer () {
  return (
    <>
      <div className='w-full flex justify-center items-center px-2'>
        <img src={LogoText} alt='' />
      </div>
      <footer className='relative mb-0 w-full h-full'>
        <img
          className='absolute z-[-1] opacity-80 w-full px-2 lg:px-8 h-full bottom-0'
          src={FooterBg}
          alt=''
        />
        <div className='w-full px-10 lg:w-2/3 mx-auto justify-center items-center flex flex-col pb-6'>
          <div className='w-full flex justify-center items-center mt-[160px]'>
            <div className='flex flex-row items-center justify-center lg:justify-start gap-6 mx-auto lg:ml-0'>
              <img
                className='w-[40px] h-[40px] md:w-[55px] md:h-[55px] lg:w-[70px] lg:h-[70px]'
                src='logo.png'
                alt=''
              />
              <h1 className='w-full font-black text-xl lg:text-3xl text-[#333333]'>
                LOGARITHM GAMES
              </h1>
            </div>
          </div>
          <div className='w-full flex flex-col justify-center items-center'>
            <h1 className='w-full py-8 mx-auto font-bold text-xl lg:text-3xl text-[#333333]'>
              Start Working With Us
            </h1>
            <div className='flex'>
              <input
                className='w-[170px] lg:w-[380px] h-[60px] px-2 md:px-10 rounded-l-[10px]'
                placeholder='Enter your email Address'
              />
              <button className='rounded-r-[10px] border-[1px] border-solid border-pink-300 bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500 max-w-[180px] h-[60px] text-white px-2'>
                Get Started
              </button>
            </div>
            <p className='py-10 text-[#1e1e1e] text-md lg:text-lg font-medium'>
              High level experience in crypto currencies and NFT’s knowledge,
              providing great profit.
            </p>

            <h1 className='pt-12 pb-8 font-bold text-xl text-[#333333]'>
              Follow Us
            </h1>

            <div className='flex flex-wrap items-center justify-center'>
              <img
                className='ml-[-20px] w-[70px] h-[70px] cursor-pointer hover:brightness-105'
                src={LinkedinBtn}
                alt=''
              />
              <img
                className='ml-[-20px] w-[70px] h-[70px] cursor-pointer hover:brightness-105'
                src={ReditBtn}
                alt=''
              />
              <img
                className='ml-[-20px] w-[70px] h-[70px] cursor-pointer hover:brightness-105'
                src={YoutubeBtn}
                alt=''
              />
              <img
                className='ml-[-20px] w-[70px] h-[70px] cursor-pointer hover:brightness-105'
                src={TelegramBtn}
                alt=''
              />
              <img
                className='ml-[-20px] w-[70px] h-[70px] cursor-pointer hover:brightness-105'
                src={FacebookBtn}
                alt=''
              />
              <img
                className='ml-[-20px] w-[70px] h-[70px] cursor-pointer hover:brightness-105'
                src={DiscordBtn}
                alt=''
              />
              <img
                className='ml-[-20px] w-[70px] h-[70px] cursor-pointer hover:brightness-105'
                src={InstagramBtn}
                alt=''
              />
              <img
                className='ml-[-20px] w-[70px] h-[70px] cursor-pointer hover:brightness-105'
                src={MediumBtn}
                alt=''
              />
              <img
                className='ml-[-20px] w-[70px] h-[70px] cursor-pointer hover:brightness-105'
                src={TwitterBtn}
                alt=''
              />
            </div>

            <p className='pt-16 text-center'>
              © PT Digital Agung Nusantara 2022 Springhill Terrace Apartment,
              Tower SandalWood S10, JI. Benyamin Suaeb, Jakarta Utara 14410{' '}
              <br />
              BaliTwin v1.1.5. Network Polygon Mainnet
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
