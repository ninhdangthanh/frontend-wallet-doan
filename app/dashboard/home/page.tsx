"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AddERC20PopUp from "@/app/components/new-templete/addERC20";
import { tokenApi } from "@/api-client/token-api";
import { useDispatch, useSelector } from "react-redux";
import { selectedAccount } from "@/redux/slice/accountSlice";
import TokenERC20 from "@/app/components/new-templete/tokenERC20Detail";
import SendTokenPopUp from "@/app/components/popup/sendTokenPopUp";
import { addManyTokens, selectTokens } from "@/redux/slice/ERC20Slice";



const tokenAbi = [
    "function balanceOf(address) view returns (uint256)"
];



export default function Home() {

    const dispatch = useDispatch();
    const tokens = useSelector(selectTokens);
    const account = useSelector(selectedAccount);

    const getTokenERC20s = async () => {
        let tokens = await tokenApi.getTokenERC20s(account.id)
        
        dispatch(addManyTokens(tokens.data))
    }

    useEffect(() => {
        getTokenERC20s()
    }, [])

    useEffect(() => {
        getTokenERC20s()
    }, [account])

    return (
        <>
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
                {/* <div className="mx-5 mb- text-red text-left px-3 text-base cursor-pointer font-semibold flex justify-center ">
                    <div className=" border-[1px] px-2  py-1 mb-3 rounded-3xl border-red ">
                        <span>Refresh list</span>
                    </div>
                </div> */}
                <div className="mb-[20px] ">
                    {
                        tokens.tokens.map((token, index) => {
                            return (<TokenERC20Item token={token} index={index} />)
                        })
                    }
                    
                </div>
            </div>

        </>
    );
}


const TokenERC20Item = (props: any) => {
    const { token, index } = props

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
            {isShowSendTokenPopup && <SendTokenPopUp setIsShowSendTokenPopup={setIsShowSendTokenPopup} token={tokenStateSend} />}
            {showDetail && <TokenERC20 showSendToken={showSendToken} setShowDetail={setShowDetail} token={token} />}

            <div onClick={() => setShowDetail(true)} key={index} className={(index % 2 === 0) ? 
                "flex px-16 py-3 justify-between hover:bg-gray-700 hover:bg-opacity-35" 
                : "flex px-16 py-3 justify-between bg-slate-800 bg-opacity-50  hover:bg-gray-700 hover:bg-opacity-35"}>
                <div className="flex ">
                    <img
                        src="https://imgs.search.brave.com/maVnAeMgk8RU7p1bBsOcuRfemtXiRggIekSe30-B_J0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMtMDAuaWNvbmR1/Y2suY29tL2Fzc2V0/cy4wMC9ldGhlcmV1/bS1jbGFzc2ljLWNy/eXB0b2N1cnJlbmN5/LWljb24tMjU2eDI1/Ni1qcHlsMWx6OS5w/bmc"
                        alt=""
                        className="w-10 h-10 rounded-[50px] mr-[12px]"
                    />
                    <div className="items-start flex-col flex">
                        <div className="font-bold pb-[6px]">{token.name}</div>
                        <div className="wallet-token-item-real-balance">{token.balance} ETH</div>
                    </div>
                </div>
                <p 
                    onClick={(event) => {
                        event.stopPropagation()
                        console.log("send erc20");
                        
                    }}
                    className="py-1 px-3 border text-orangered rounded-full items-center justify-center flex font-bold text-[18px] hover:bg-orange-900 hover:text-white"
                >
                    Send
                </p>
            </div>
        </>
    )
}