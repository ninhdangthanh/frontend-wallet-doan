"use client";

import "../../css/fontawesome-free-6.5.1-web/css/all.css"
import "../../css/bootstrap.min.css"
import "../../css/main.css"
import "../../css/popup.css"
import { useEffect, useState } from "react";
import { accountApi } from "@/app/api-client/account-api";

export default function SelectAccountPopUp(props: any) {
    const [accounts, setAccounts] = useState([]);


    useEffect(() => {
        getAccounts()
    })

    const getAccounts = async () => {
        let accounts = await accountApi.getAccounts()
        setAccounts(accounts.data)
    }

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
                    accounts.map((account, index) => {
                        return <SelectAccountItem account={account} index={index} />
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
    const {account, index} = props
    
    return (
        <>
            <div className="account-select-item">
                <img src={`../account_list/${index + 1}.jpeg`} alt="N" className="network-select-item-logo"/>
                <div className="account-select-item-name">
                    <div className="network-select-item-name1">{account.name}</div>
                    <div className="network-select-item-name2">{account.address.slice(0, 7)}...{account.address.slice(37, )}</div>
                </div>
                <div className="" style={{paddingRight: "30px"}}>
                    <div className="network-select-item-name1">0.5 SepoliaETH</div>
                </div>
                <div className="network-select-item-detail">
                    <i className="fa-solid fa-trash"></i>
                </div>
            </div>
        </>
    )
}