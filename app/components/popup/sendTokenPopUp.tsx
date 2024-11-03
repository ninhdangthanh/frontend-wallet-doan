"use client";

import "../../../css/fontawesome-free-6.5.1-web/css/all.css"
import "../../../css/bootstrap.min.css"
import "../../../css/main.css"
import "../../../css/send.css"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectedAccount } from "@/redux/slice/accountSlice";
import { ethers } from "ethers";
import { hideApiLoading, showApiLoading } from "@/redux/slice/apiLoadingSlice";
import { toast } from "react-toastify";
import { selectNetwork } from "@/redux/slice/networkSlice";
import { Activity, activityApi, GetActivityParams } from "@/api-client/activity-api";
import { addManyActivities } from "@/redux/slice/activitySlice";

const tokenAbi = [
    "function transfer(address to, uint256 value) returns (bool)"
];



export default function SendTokenPopUp(props: any) {
    const {token, setIsShowSendTokenPopup, getTokenERC20s} = props

    const account = useSelector(selectedAccount);
    const dispatch = useDispatch();
    const network_redux = useSelector(selectNetwork);

    const [toAddress, setToAddress] = useState("")
    const [valueSend, setValueSend] = useState(0)

    useEffect(() => {
        console.log("send token popup");
        
    }, [])

    const getActivities = async () => {
        const query: GetActivityParams = {
            accountId: account.id,
            page: 1,
            pageSize: 10,
        };
        let activities = await activityApi.getActivity(query)
        dispatch(addManyActivities(activities.data.data))
    }
    
    const handleSendToken = async () => {
        let newActivity: Activity = {
            tx_hash: null,
            from: account.address,
            to: toAddress,
            amount: valueSend.toString(),
            status: "PENDING",
            account_id: account.id,
            createdAt: ""
        };
        
        if(toAddress == "" || !toAddress.startsWith("0x")) {
            alert("Please fill in the correct to address.")
            return;
        }
        if(valueSend > Number(token.balance) || valueSend == 0) {
            alert("Please fill in the correct amount.")
            return;
        }
        
        const provider = new ethers.JsonRpcProvider(network_redux.network?.rpc_url);
         
        const wallet = new ethers.Wallet(account.privateKey, provider);
        const tokenContractAddress = token.contract_address;
        const tokenContract = new ethers.Contract(tokenContractAddress, tokenAbi, wallet);

        const amountToSend = ethers.parseUnits(valueSend.toString(), 18);

        dispatch(showApiLoading())
        
        try {
            const transactionResponse = await tokenContract.transfer(toAddress, amountToSend);
            newActivity.tx_hash = transactionResponse.hash;
            const createdActivity = await activityApi.createActivity(newActivity);
            await getActivities();

            toast.success('Import transaction into blockchain successfully', {
                position: 'top-right',
                autoClose: 8000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
            });

            setIsShowSendTokenPopup(false);
            setValueSend(0);
            setToAddress("");

            try {
                await transactionResponse.wait();
                createdActivity.data.status = "SUCCESS";
                await activityApi.updateActivity(createdActivity.data.id, createdActivity.data);
                await getActivities();

                toast.success('The transaction is successfully processed by the blockchain', {
                    position: 'top-right',
                    autoClose: 8000,
                    theme: 'dark',
                });
            } catch (error) {
                createdActivity.data.status = "FAILED";
                await activityApi.updateActivity(createdActivity.data.id, createdActivity.data);
                await getActivities();

                toast.error('The transaction processed by the blockchain failed', {
                    position: 'top-right',
                    autoClose: 5000,
                    theme: 'dark',
                });
            }
        } catch (error) {
            newActivity.status = "FAILED";
            await activityApi.createActivity(newActivity);
            await getActivities();
            
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

        dispatch(hideApiLoading());
        setIsShowSendTokenPopup(false);
        setValueSend(0);
        setToAddress("");
        await getTokenERC20s();
    }

    return (
        <>
            <div onClick={() => setIsShowSendTokenPopup(false)} className="overlay"></div>

            <div className="popup-send-container border" style={{color: "white"}}>
                <div className="quantity-send-container" style={{color: "white"}}>
                    <div className="text-[28px] text-center text-orangered pb-[12px] font-bold">
                        Send Token ERC20
                    </div>
                    <div className="border-[1px] border-white rounded-[8px] text-left px-3 py-[8px] mt-[10px]">
                        <div className="text-orangered">
                            From: {account.name}
                        </div>
                        <div className="text-[14px]">
                            {account.address}
                        </div>
                    </div>
                    <div className="flex mt-3">
                        <div className="text-white text-[20px] pl-[10px] pr-[12px]">
                            To:
                        </div>
                        <input value={toAddress} onChange={(e) => setToAddress(e.target.value)} type="text" className="border-[1px] border-white rounded-[8px] text-left px-4 py-1 bg-[#191c23] text-orangered flex-1" />
                    </div>
                    <div className="quantity-send-asset flex-row">
                        <div className="quantity-send-amount-title">
                            Assets:
                        </div>
                        <div className="quantity-send-asset-choose flex-row">
                            {/* <img src="./account-1-logologo.png" alt="Send tokens logo" className="quantity-send-asset-choose-logo" /> */}
                            <div className="quantity-send-asset-choose-quantity">
                                <div className="quantity-send-asset-choose-quantity-name text-orangered">
                                    {token.name}
                                </div>
                                <div className="quantity-send-asset-choose-quantity-balance">
                                    Balance: <strong style={{fontSize: 18}}>{token.balance}</strong> {token.symbol}
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
                                <div className="quantity-send-amount-input-title">{token.symbol}</div>
                            </div>
                            {/* <div className="quantity-send-amount-input-bot">
                                No conversion rate avalable
                            </div> */}
                        </div>
                    </div>
                    <div className="quantity-send-button flex-row">
                        <div onClick={() => setIsShowSendTokenPopup(false)} className=" bg-black text-white border-1 border-white">Cancel</div>
                        <div onClick={() => handleSendToken()} className=" bg-black text-orangered border-1 border-white">Send</div>
                    </div>
                </div>
            </div>
        </>
    );
}
