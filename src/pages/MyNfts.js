
import NFT_1 from '../assets/images/nft_1.png'
import NFT_2 from '../assets/images/nft_2.png'
import NFT_3 from '../assets/images/nft_3.png'
import NftGrid from '../layouts/NftGrid'

const datas = [
    {
        id: 135123,
        price: 1.3,
        name: "Private's Helmet",
        head: 3,
        body: 21,
        arm: 4,
        special: 7,
        nft: NFT_1,
        owner: 'you',
    },
    {
        id: 135124,
        price: 1.5,
        name: "Private's Helmet",
        head: 3,
        body: 21,
        arm: 4,
        special: 7,
        nft: NFT_2,
        owner: 'you',
    },
    {
        id: 135125,
        price: 2.1,
        name: "Private's Helmet",
        head: 3,
        body: 21,
        arm: 4,
        special: 7,
        nft: NFT_3,
        owner: 'you',
    }
];

function MyNfts() {
    return (
        <>
            <div className='mt-20 px-4 lg:px-24'>
                <h1 className='text-white text-[42px] font-bold '>My NFTs</h1>
                <div className='w-full flex justify-center items-center mx-auto'>
                    <NftGrid datas={datas} />
                </div>
            </div>
        </>);
}

export default MyNfts;