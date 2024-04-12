"use client";

import "../../../css/fontawesome-free-6.5.1-web/css/all.css"
import "../../../css/bootstrap.min.css"
import "../../../css/main.css"
import "../../../css/popup.css"
import { useDispatch, useSelector } from "react-redux";
import { selectNetwork } from "@/redux/slice/networkSlice";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { Account, changeAccount, selectedAccount } from "@/redux/slice/accountSlice";



export default function SelectAccountPopUp(props: any) {
    let { accounts, setIsShowSelectAccount } = props;
    
    const network_redux = useSelector(selectNetwork);
    const selectedAccountSelect = useSelector(selectedAccount);

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
                        return <SelectAccountItem setIsShowSelectAccount={setIsShowSelectAccount} isSelected={selectedAccountSelect?.id == account.id} network_redux={network_redux} ethers_provider={ethers_provider} account={account} index={index} />
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
    const {account, index, ethers_provider, network_redux, isSelected, setIsShowSelectAccount} = props
    const [coin, setCoin] = useState("0.000");
    const dispatch = useDispatch();

    useEffect(() => {
        getCoinOfAddress()
    }, [])

    const selectChangeAccount = (account: any) => {
        let account_change : Account = {
            id: account.id,
            name: account.name,
            address: account.address,
            user_id: account.user_id,
            index_acc: index
        }
        dispatch(changeAccount(account_change))
        setIsShowSelectAccount(false)
    }

    const getCoinOfAddress = async () => {
        try {
            let coin = await ethers_provider.getBalance(account.address)
            
            let number = Number(`${coin}`)
            let numberShow = (number / 1000000000000000000).toFixed(3)
            
            console.log(index, numberShow);
            
            setCoin(numberShow)
        } catch (error) {
            setCoin("0.000")
        }
    }
    
    return (
        <>
            <div onClick={() => selectChangeAccount(account)} className={isSelected ? "account-select-item-selected" : "account-select-item"}>
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