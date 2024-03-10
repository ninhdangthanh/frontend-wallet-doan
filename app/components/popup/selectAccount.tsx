"use client";

import "../../../css/fontawesome-free-6.5.1-web/css/all.css"
import "../../../css/bootstrap.min.css"
import "../../../css/main.css"
import "../../../css/popup.css"
import { useSelector } from "react-redux";
import { selectNetwork } from "@/redux/slice/networkSlice";
import { ethers } from "ethers";
import { useEffect, useState } from "react";



export default function SelectAccountPopUp(props: any) {
    let { accounts } = props;
    
    const network_redux = useSelector(selectNetwork);

    const ethers_provider = new ethers.providers.JsonRpcProvider(network_redux.network?.rpc_url);


    return (
    <>
        <div onClick={() => props.setIsShowSelectAccount(false)} className="overlay"></div>

        <div className="account-select-container">
            <div className="network-select-title">
                Select an account
                <div onClick={() => props.setIsShowSelectAccount(false)} className="network-select-close">
                    <i className="fa-solid fa-xmark"></i>
                </div>
            </div>
            <div className="network-select-body custom-overflow">
                {
                    accounts.map((account: any, index: any) => {
                        return <SelectAccountItem network_redux={network_redux} ethers_provider={ethers_provider} account={account} index={index} />
                    })
                }
            </div>
            <div className="network-select-add">
                Add Account
            </div>
        </div>

    </>
  );
}


function SelectAccountItem(props: any) {
    const {account, index, ethers_provider, network_redux} = props
    const [coin, setCoin] = useState("0.000");

    useEffect(() => {
        getCoinOfAddress()
    }, [])

    const getCoinOfAddress = async () => {
        try {
            let coin = await ethers_provider.getBalance(account.address)
            
            let number = Number(`${coin}`)
            let numberShow = (number / 1000000000000000000).toFixed(3)
            
            setCoin(numberShow)
        } catch (error) {
            setCoin("0.000")
        }
    }
    
    return (
        <>
            <div className="account-select-item">
                <img src={`../account_list/${index + 1}.jpeg`} alt="N" className="network-select-item-logo"/>
                <div className="account-select-item-name">
                    <div className="network-select-item-name1">{account.name.slice(0, 1).toUpperCase()}{account.name.slice(1, )}</div>
                    <div className="network-select-item-name2">{account.address.slice(0, 7)}...{account.address.slice(37, )}</div>
                </div>
                <div className="" style={{paddingRight: "50px"}}>
                    <div className="network-select-item-name1">{coin} {network_redux.network.currency_symbol}</div>
                </div>
                <div className="network-select-item-detail">
                    <i className="fa-solid fa-trash"></i>
                </div>
            </div>
        </>
    )
}