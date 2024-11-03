"use client";

import "../../../css/fontawesome-free-6.5.1-web/css/all.css"
import "../../../css/bootstrap.min.css"
import "../../../css/main.css"
import "../../../css/send.css"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeBalance, selectedAccount } from "@/redux/slice/accountSlice";
import { toast } from "react-toastify";
import { hideApiLoading, showApiLoading } from "@/redux/slice/apiLoadingSlice";
import { selectNetwork } from "@/redux/slice/networkSlice";
import { ethers } from "ethers";
import { Activity, activityApi, GetActivityParams } from "@/api-client/activity-api";
import { addActivity, addManyActivities } from "@/redux/slice/activitySlice";
import { formatEthBalance } from "@/utils/format-address";

export default function SendCoinPopUp(props: any) {
    const {setIsShowSendCoinPopup} = props

    const account = useSelector(selectedAccount);
    const network_redux = useSelector(selectNetwork);
    const dispatch = useDispatch();

    const [toAddress, setToAddress] = useState("")
    const [valueSend, setValueSend] = useState(0)

    const getActivities = async () => {
        const query: GetActivityParams = {
            accountId: account.id,
            page: 1,
            pageSize: 10,
        };
        let activities = await activityApi.getActivity(query)
        dispatch(addManyActivities(activities.data.data))
    }

    const getEthBalance = async () => {
        try {
            const provider = new ethers.JsonRpcProvider(network_redux.network?.rpc_url);
            const balanceInWei = await provider.getBalance(account.address);
            const balanceInEth = ethers.formatEther(balanceInWei);
            console.log("balanceInEth: ", balanceInEth);
            dispatch(changeBalance(formatEthBalance(balanceInEth)))
            
            // setBalance(balanceInEth);
        } catch (error) {
            console.error("Error fetching balance:", error);
        }
    };

    const handleSendToken = async () => {
        let newActivity : Activity = {
            tx_hash: null,
            from: account.address,
            to: toAddress,
            amount: valueSend.toString(),
            status: "PENDING",
            account_id: account.id,
            createdAt: ""
        }
        if(toAddress == "" || !toAddress.startsWith("0x") || toAddress == account.address) {
            alert("Please fill in the correct to address.")
            return;
        }
        if(valueSend > parseFloat(account.balance) || valueSend == 0) {
            alert("Please fill in the correct amount.")
            return;
        }
        
        const provider = new ethers.JsonRpcProvider(network_redux.network?.rpc_url);
        
        const wallet = new ethers.Wallet(account.privateKey, provider);
        const amountToSend = ethers.parseEther(valueSend.toString());

        dispatch(showApiLoading())
        
        try {
            const transactionResponse = await wallet.sendTransaction({
                to: toAddress,
                value: amountToSend,
            });

            let createdActivity;
            
            try {
                newActivity.tx_hash = transactionResponse.hash
                createdActivity = await activityApi.createActivity(newActivity);
                await getActivities()
            } catch (error) {
                dispatch(hideApiLoading())
                setIsShowSendCoinPopup(false)
                setValueSend(0)
                setToAddress("")
            }

            toast.success('Import transaction into blockchain successfully', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
            });

            dispatch(hideApiLoading())
            setIsShowSendCoinPopup(false)
            setValueSend(0)
            setToAddress("")

            try {
                await transactionResponse.wait();
                if (createdActivity) {
                    createdActivity.data.status = "SUCCESS"
                    await activityApi.updateActivity(createdActivity.data.id, createdActivity.data);
                    await getActivities()
                    console.log("confirmed:", createdActivity.data);
                }
                
                toast.success('The transaction is successfully processed by the blockchain', {
                    position: 'top-right',
                    autoClose: 8000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark',
                });
            } catch (error) {
                if (createdActivity) {
                    createdActivity.data.status = "FAILED"
                    await activityApi.updateActivity(createdActivity.data.id, createdActivity.data);
                    await getActivities()
                    console.log("failed:", createdActivity.data);
                }
                
                toast.error('The transaction processed by the blockchain failed', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark',
                });
            }

        } catch (error) {
            newActivity.status = "FAILED"
            await activityApi.createActivity(newActivity);
            await getActivities()

            toast.error('Failed when import transaction into blockchain', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
            });
        }

        dispatch(hideApiLoading())
        setIsShowSendCoinPopup(false)
        setValueSend(0)
        setToAddress("")
        await getEthBalance()
    }

    return (
        <>
            <div onClick={() => setIsShowSendCoinPopup(false)} className="overlay"></div>

            <div className="popup-send-container  border-2 border-solid border-white" style={{color: "white"}}>
                <div className="quantity-send-container" style={{color: "white"}}>
                    <div className="quantity-send-title text-orangered font-bold !text-3xl mb-4">
                        Send ETH
                    </div>
                    {/* <div onClick={() => setIsShowSendCoinPopup(false)} className="quantity-send-close">
                        Cancel
                    </div> */}
                    <div className="quantity-send-account">
                        <div className="quantity-send-account-name">
                            From: {account.name}
                        </div>
                        <div className="quantity-send-account-address">
                            {account.address}
                        </div>
                    </div>
                    <div className="quantity-send-account-to">
                        <div className="quantity-send-account-name-to">
                            To:
                        </div>
                        <input value={toAddress} onChange={(e) => setToAddress(e.target.value)} type="text" className="quantity-send-account-input" />
                    </div>
                    <div className="quantity-send-asset flex-row">
                        <div className="quantity-send-amount-title">
                            Assets:
                        </div>
                        <div className="quantity-send-asset-choose flex-row">
                            {/* <img src="./account-1-logologo.png" alt="Send tokens logo" className="quantity-send-asset-choose-logo" /> */}
                            <div className="quantity-send-asset-choose-quantity">
                                <div className="quantity-send-asset-choose-quantity-name">
                                    ETH
                                </div>
                                <div className="quantity-send-asset-choose-quantity-balance">
                                    Balance: <strong style={{fontSize: 18}}>{account.balance}</strong> ETH
                                </div>
                            </div>
                            {/* <i className="fa-solid fa-caret-down"></i> */}
                        </div>
                    </div>
                    <div className="quantity-send-amount flex-row">
                        <div className="quantity-send-amount-title">
                            Amount:
                            {/* <div className="quantity-send-amount-title-max">
                                Max
                            </div> */}
                        </div>
                        <div className="quantity-send-amount-input">
                            <div className="quantity-send-amount-input-top">
                                <input value={valueSend} onChange={e => setValueSend(Number(e.target.value))} type="number" placeholder="0" className="quantity-send-amount-input-top-input"/>
                                <div className="quantity-send-amount-input-title">ETH</div>
                            </div>
                            <div className="quantity-send-amount-input-bot">
                                {/* No conversion rate avalable */}
                            </div>
                        </div>
                    </div>
                    <div className="quantity-send-button flex-row">
                        <div onClick={() => setIsShowSendCoinPopup(false)} className="quantity-send-button-cancel">Cancel</div>
                        <div onClick={() => handleSendToken()} className="quantity-send-button-send bg-red">Send</div>
                    </div>
                </div>
            </div>
        </>
    );
}
