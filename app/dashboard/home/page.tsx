"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AddERC20PopUp from "@/app/components/popup/addERC20";
import { tokenApi } from "@/api-client/token-api";
import { useSelector } from "react-redux";
import { selectedAccount } from "@/redux/slice/accountSlice";
import { ethers } from "ethers";
import TokenERC20 from "@/app/components/popup/tokenERC20Detail";
import SendTokenPopUp from "@/app/components/popup/sendTokenPopUp";
import { selectNetwork } from "@/redux/slice/networkSlice";



const tokenAbi = [
    "function balanceOf(address) view returns (uint256)"
];



export default function Home() {

    const [isShowAddTokenERC20, setIsShowAddTokenERC20] = useState(false);
    const [tokens, setTokens] = useState<any[]>([]);
    const network_redux = useSelector(selectNetwork);


    const account = useSelector(selectedAccount);

    useEffect(() => {
        getTokenERC20s()
    }, [account])

    const getTokenERC20s = async () => {
        const provider = new ethers.JsonRpcProvider(network_redux.network?.rpc_url);
        let tokens = await tokenApi.getTokenERC20s(account.id)
        let tokenApis: any[] = []
        await Promise.all(tokens.data.map(async (token: any) => {
            const tokenContract = new ethers.Contract(token.contract_address, tokenAbi, provider);
            const balance = await tokenContract.balanceOf(account.address)
            let tokenImport = await token;
            let showBalance = (balance as unknown as number / 1000000000000000000).toFixed(2);
            tokenImport.balances = `${showBalance}`;
            tokenApis.push(tokenImport);
        }));
        setTokens(tokenApis)
    }


    return (
        <>
            {isShowAddTokenERC20 && <AddERC20PopUp getTokenERC20s={getTokenERC20s} setIsShowAddTokenERC20={setIsShowAddTokenERC20} />}

            <div className="shadow-md py-4 px-6 relative flex items-center justify-center">
                <Link
                    href="/dashboard/analysis"
                    className={`w-1/3 py-2.5 text-white no-underline cursor-pointer border-b-2 border-t-2 border-black`}
                >
                    Chain Analytics
                </Link>
                <Link
                    href="/dashboard/home"
                    className={`w-1/3 py-2.5 text-white no-underline cursor-pointer border-b-2 border-t-2 border-orangered`}
                >
                    Tokens
                </Link>
                <Link
                    href="/dashboard/activity"
                    className={`w-1/3 py-2.5 text-white no-underline cursor-pointer border-b-2 border-t-2 border-black`}
                >
                    Activitys
                </Link>
            </div>

            <div>
                <div className="mx-5 mb- text-red text-left px-3 text-base cursor-pointer font-semibold flex justify-center ">
                    <div className=" border-[1px] px-2  py-1 mb-3 rounded-3xl border-red ">
                        {/* <i className="fa-solid fa-arrows-rotate pr-2"></i> */}
                        <span>Refresh list</span>
                    </div>
                </div>
                <div className="mb-[20px] ">
                    <div className="flex px-16 py-3 justify-between bg-slate-800 bg-opacity-50  hover:bg-gray-700 hover:bg-opacity-35">
                        <div className="flex ">
                            <img
                                src="https://imgs.search.brave.com/maVnAeMgk8RU7p1bBsOcuRfemtXiRggIekSe30-B_J0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMtMDAuaWNvbmR1/Y2suY29tL2Fzc2V0/cy4wMC9ldGhlcmV1/bS1jbGFzc2ljLWNy/eXB0b2N1cnJlbmN5/LWljb24tMjU2eDI1/Ni1qcHlsMWx6OS5w/bmc"
                                alt=""
                                className="w-10 h-10 rounded-[50px] mr-[12px]"
                            />
                            <div className="items-start flex-col flex">
                                <div className="font-bold pb-[6px]">ETH</div>
                                <div className="wallet-token-item-real-balance">0 ETH</div>
                            </div>
                        </div>
                        <p className="py-1 px-3 border border text-orangered rounded-full items-center justify-center flex font-bold text-[18px] hover:bg-orange-900 hover:text-white">
                            Send
                        </p>
                    </div>
                    <div className="flex px-16 py-3 justify-between hover:bg-gray-700 hover:bg-opacity-35">
                        <div className="flex ">
                            <img
                                src="https://imgs.search.brave.com/ijyOoteOnk7_kEjOC6leZkr1Ul0j8RCU3Pyz0oQPago/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9zdHls/ZXMucmVkZGl0bWVk/aWEuY29tL3Q1X2hj/czJuL3N0eWxlcy9j/b21tdW5pdHlJY29u/X2o3M3U0ODU2MXk2/ODEucG5n"
                                alt=""
                                className="h-10 w-10 mr-4 rounded-[50px]"
                            />
                            <div className="items-start flex-col flex">
                                <div className="font-bold pb-[6px]">MyToken</div>
                                <div className="wallet-token-item-real-balance">20 MyToken</div>
                            </div>
                        </div>
                        <p className="py-1 px-3 border border text-orangered rounded-full items-center justify-center flex font-bold text-[18px] hover:bg-orange-900 hover:text-white">
                            Send
                        </p>
                    </div>
                    <div className="flex px-16 py-3 justify-between bg-slate-800 bg-opacity-50 hover:bg-gray-700 hover:bg-opacity-35 ">
                        <div className="flex ">
                            <img
                                src="https://imgs.search.brave.com/maVnAeMgk8RU7p1bBsOcuRfemtXiRggIekSe30-B_J0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMtMDAuaWNvbmR1/Y2suY29tL2Fzc2V0/cy4wMC9ldGhlcmV1/bS1jbGFzc2ljLWNy/eXB0b2N1cnJlbmN5/LWljb24tMjU2eDI1/Ni1qcHlsMWx6OS5w/bmc"
                                alt=""
                                className="w-10 h-10 rounded-[50px] mr-[12px]"
                            />
                            <div className="items-start flex-col flex">
                                <div className="font-bold pb-[6px]">ETH</div>
                                <div className="wallet-token-item-real-balance">0 ETH</div>
                            </div>
                        </div>
                        <p className="py-1 px-3 border border text-orangered rounded-full items-center justify-center flex font-bold text-[18px] hover:bg-orange-900 hover:text-white">
                            Send
                        </p>
                    </div>
                    <div className="flex px-16 py-3 justify-between hover:bg-gray-700 hover:bg-opacity-35">
                        <div className="flex ">
                            <img
                                src="https://imgs.search.brave.com/ijyOoteOnk7_kEjOC6leZkr1Ul0j8RCU3Pyz0oQPago/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9zdHls/ZXMucmVkZGl0bWVk/aWEuY29tL3Q1X2hj/czJuL3N0eWxlcy9j/b21tdW5pdHlJY29u/X2o3M3U0ODU2MXk2/ODEucG5n"
                                alt=""
                                className="h-10 w-10 mr-4 rounded-[50px]"
                            />
                            <div className="items-start flex-col flex">
                                <div className="font-bold pb-[6px]">MyToken</div>
                                <div className="wallet-token-item-real-balance">20 MyToken</div>
                            </div>
                        </div>
                        <p className="py-1 px-3 border border text-orangered rounded-full items-center justify-center flex font-bold text-[18px] hover:bg-orange-900 hover:text-white">
                            Send
                        </p>
                    </div>
                </div>
            </div>

        </>
    );
}


const TokenERC20Item = (props: any) => {
    const { token, getTokenERC20s } = props

    const [isShowSendTokenPopup, setIsShowSendTokenPopup] = useState(false);
    const [tokenStateSend, setTokenStateSend] = useState<any>();
    const [showDetail, setShowDetail] = useState(false);

    const showSendToken = () => {
        setIsShowSendTokenPopup(true)
        setShowDetail(false)
        setTokenStateSend(token)
    }

    return (
        <>
            {isShowSendTokenPopup && <SendTokenPopUp getTokenERC20s={getTokenERC20s} setIsShowSendTokenPopup={setIsShowSendTokenPopup} token={tokenStateSend} />}
            {showDetail && <TokenERC20 showSendToken={showSendToken} getTokenERC20s={getTokenERC20s} setShowDetail={setShowDetail} token={token} />}
            <div className="wallet-token-item" onClick={() => setShowDetail(true)}>
                <img src="https://imgs.search.brave.com/maVnAeMgk8RU7p1bBsOcuRfemtXiRggIekSe30-B_J0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMtMDAuaWNvbmR1/Y2suY29tL2Fzc2V0/cy4wMC9ldGhlcmV1/bS1jbGFzc2ljLWNy/eXB0b2N1cnJlbmN5/LWljb24tMjU2eDI1/Ni1qcHlsMWx6OS5w/bmc" alt="" className="wallet-token-item-logo" />
                <div className="wallet-token-item-balance">
                    <div className="wallet-token-item-name">
                        {token.name}
                    </div>
                    <div className="wallet-token-item-real-balance">
                        {token.balances} {token.symbol}
                    </div>
                </div>
            </div>
        </>
    )
}