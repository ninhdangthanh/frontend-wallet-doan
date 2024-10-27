"use client";

import "../../../css/fontawesome-free-6.5.1-web/css/all.css"
import "../../../css/bootstrap.min.css"
import "../../../css/main.css"
import "../../../css/send.css"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectedAccount } from "@/redux/slice/accountSlice";
import { toast } from "react-toastify";
import { hideApiLoading, showApiLoading } from "@/redux/slice/apiLoadingSlice";
import { selectNetwork } from "@/redux/slice/networkSlice";
import { ethers } from "ethers";

export default function SendCoinPopUp(props: any) {
    const {setIsShowSendCoinPopup} = props

    const account = useSelector(selectedAccount);
    const network_redux = useSelector(selectNetwork);
    const dispatch = useDispatch();

    const [toAddress, setToAddress] = useState("")
    const [valueSend, setValueSend] = useState(0)

    const handleSendToken = async () => {
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

            try {
                await transactionResponse.wait();
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

                setIsShowSendCoinPopup(false)
                
            } catch (error) {
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

        setValueSend(0)
        setToAddress("")
    }

    return (
        <>
            <div onClick={() => setIsShowSendCoinPopup(false)} className="overlay"></div>

            <div className="popup-send-container" style={{color: "white"}}>
                <div className="quantity-send-container" style={{color: "white"}}>
                    <div className="quantity-send-title">
                        Send
                    </div>
                    <div onClick={() => setIsShowSendCoinPopup(false)} className="quantity-send-close">
                        Cancel
                    </div>
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
                        <div onClick={() => handleSendToken()} className="quantity-send-button-send">Send</div>
                    </div>
                </div>
            </div>
        </>
    );
}
