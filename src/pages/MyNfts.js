import NftGrid from '../layouts/NftGrid'
import {
    useAccount, useContractRead,
} from 'wagmi';

import {
    useState,
    useEffect
} from 'react';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../config';

const datas = [
    {
        id: 135123,
        price: 1.3,
        name: "Private's Helmet",
        head: 3,
        body: 21,
        arm: 4,
        special: 7,
        nft: `https://logarithm.games/bscnft/1.png`,
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
        nft: `https://logarithm.games/bscnft/2.png`,
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
        nft: `https://logarithm.games/bscnft/3.png`,
        owner: 'you',
    }
];


function MyNfts() {
    const { isConnected, address } = useAccount()
    const [nfts, setNfts] = useState([])
    const {data} = useContractRead({
        addressOrName: CONTRACT_ADDRESS,
        contractInterface: CONTRACT_ABI,
        functionName: 'name'
        // {
        //     owner: '0x77b3Ee608B7a387cE7611039A16EC28a000B57f7'
        // }
        });

    useEffect(() => {
        console.log("isConnected ", isConnected)
        if (isConnected) {
            console.log(address, data);

            setNfts(datas)
        } else {
            setNfts([])
        }
    }, [isConnected])


    return (
        <>
            <div className='mt-20 px-4 lg:px-24'>
                <h1 className='text-white text-[42px] font-bold '>My NFTs</h1>
                <div className='w-full flex justify-center items-center mx-auto'>
                    <NftGrid datas={nfts} />
                </div>
            </div>
        </>);
}

export default MyNfts;