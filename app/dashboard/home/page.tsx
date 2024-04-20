"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import AddERC20PopUp from "@/app/components/popup/addERC20";
import { tokenApi } from "@/api-client/token-api";
import { useSelector } from "react-redux";
import { selectedAccount } from "@/redux/slice/accountSlice";
import { ethers } from "ethers";
import TokenERC20 from "@/app/components/popup/tokenERC20Detail";



const tokenAbi = [
    "function balanceOf(address) view returns (uint256)"
];

const provider = new ethers.providers.JsonRpcProvider("https://ethereum-sepolia-rpc.publicnode.com");


export default function Home() {

    const [isShowAddTokenERC20, setIsShowAddTokenERC20] = useState(false);
    const [tokens, setTokens] = useState<any[]>([]);

    const account = useSelector(selectedAccount);

    useEffect(() => {
        getTokenERC20s()
    }, [account])

    const getTokenERC20s = async () => {
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
            
                <div className="wallet-activity-header flex-row">
                    <Link key="Home" href="/dashboard/home"  className="wallet-activity-header-option wallet-activity-header-option-active">Token</Link>
                    {/* <Link key="Activity" href="/dashboard/activity"  className="wallet-activity-header-option">Activity</Link> */}
                </div>
                <div className="wallet-activity-body"> 
                        <div className="wallet-activity-body-tokens">
                            {
                                tokens.map((token: any) => {
                                    return <TokenERC20Item getTokenERC20s={getTokenERC20s} account={account} token={token} />
                                })
                            }
                        </div>
                        <div className="wallet-activity-body-method">
                            <div onClick={() => setIsShowAddTokenERC20(true)} className="wallet-activity-import-token">
                                <i className="fa-solid fa-plus"></i>
                                <span>Import token</span>
                            </div>
                            <div className="wallet-activity-refresh-list">
                                <i onClick={() => {setTokens([]);getTokenERC20s()}} className="fa-solid fa-arrows-rotate"></i>
                                <span onClick={() => {setTokens([]);getTokenERC20s()}}>Refresh list</span>
                            </div>
                        </div>
                    </div>
            </>
    );
}


const TokenERC20Item = (props: any) => {
    const {token, getTokenERC20s} = props

    const [showDetail, setShowDetail] = useState(false);
    
    return (
        <>
            {showDetail && <TokenERC20 getTokenERC20s={getTokenERC20s} setShowDetail={setShowDetail} token={token} />}
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