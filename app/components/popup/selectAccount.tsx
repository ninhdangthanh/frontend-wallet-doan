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
import { accountApi } from "@/api-client/account-api";
import { hideApiLoading, showApiLoading } from "@/redux/slice/apiLoadingSlice";
import { toast } from "react-toastify";


export default function SelectAccountPopUp(props: any) {
    let { accounts, getAccountsAPI, setIsShowSelectAccount, getAccounts, setIsShowAddAccountPopup, className = "w-[450px]", onCancel } = props;

    const selectedAccountSelect = useSelector(selectedAccount);


    return (
        <>
            <div onClick={() => onCancel()} className="fixed text-white inset-0 z-50 bg-black bg-opacity-10 scrollbar-thin backdrop-blur-sm flex justify-center items-center mx-4 overflow-y-auto">
                <div
                    className={`${className} py-4 px-8 min-ss:w-[320px] flex-col justify-center items-center bg-linear-gradient-grey border border-border-color rounded-[12px] flex bg-neutral-900`}
                >
                    <div className="flex justify-between pb-4 text-[24px] text-orangered font-semibold">
                        Select an account
                    </div>

                    {
                        accounts.map((account: any, index: any) => {
                            return <SelectAccountItem getAccounts={getAccounts} setIsShowSelectAccount={setIsShowSelectAccount} isSelected={selectedAccountSelect?.id == account.id} account={account} index={index} />
                        })
                    }


                </div>
            </div>

        </>
    );
}


function SelectAccountItem(props: any) {
    const { account, index, isSelected, setIsShowSelectAccount } = props
    const dispatch = useDispatch();

    const selectChangeAccount = (account: any) => {
        let account_change: Account = {
            id: account.id,
            name: account.name,
            address: account.address,
            user_id: account.user_id,
            index_acc: index,
            privateKey: account.privateKey,
            balance: account.balance
        }
        dispatch(changeAccount(account_change))
        setIsShowSelectAccount(false)
    }

    const handleDeleteAccount = async (accountId: number) => {
        let confirmDeleteAccount = confirm("You confirm delete network?")
        if (confirmDeleteAccount) {
            console.log("accountId ", accountId);
            try {
                dispatch(showApiLoading())
                await accountApi.removeAccount(accountId);
                toast.success('Remove account successfully', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark',
                });
                setIsShowSelectAccount(false)
                setTimeout(() => {
                    window.location.reload()
                }, 1000);
            } catch (error) {
                toast.error('Remove account failed', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark',
                });
            } finally {
                dispatch(hideApiLoading())
            }
        }
    }


    return (
        <>
            <div
                key={index}
                className={
                    isSelected ? "group flex w-full justify-between py-6 p-2 my-2 items-center bg-orange-900 bg-opacity-30" :
                    "group flex w-full justify-between py-6 p-2 my-2 items-center hover:bg-orange-900 hover:bg-opacity-30"
                }
                onClick={() => selectChangeAccount(account)} // Parent onClick
            >
                <div className="flex">
                    <img
                        src={`../account_list/${index + 1}.jpeg`}
                        alt="N"
                        className="network-select-item-logo"
                    />
                    <div className="flex items-start flex-col pl-2">
                        <div className="text-[18px] font-bold">{account.name}</div>
                        <div className="text-[13px] pt-2 text-gray-400"><div className="pr-[6px]">{`${account.address.slice(0, 6)}...${account.address.slice(37)}`}</div></div>
                    </div>
                </div>

                <div className="flex">
                    <div className="flex-col">
                        <div className="network-select-item-name1">
                            {account.balance | 0.0} <span className="text-gray-400">ETH</span>
                        </div>
                    </div>
                    <div className="pl-8">
                        <i
                            className="fa-solid fa-trash hidden group-hover:text-red"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteAccount(account.id);
                            }}
                        ></i>
                    </div>
                </div>
            </div>

        </>
    )
}