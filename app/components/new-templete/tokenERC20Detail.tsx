"use client";

import "../../../css/fontawesome-free-6.5.1-web/css/all.css"
import "../../../css/bootstrap.min.css"
import "../../../css/main.css"
import "../../../css/popup.css"
import "../../../css/token-detail.css"
import { useDispatch, useSelector } from "react-redux";
import { selectedAccount } from "@/redux/slice/accountSlice";
import { tokenApi } from "@/api-client/token-api";
import { toast } from "react-toastify";
import { hideApiLoading, showApiLoading } from "@/redux/slice/apiLoadingSlice";
import { removeToken } from "@/redux/slice/ERC20Slice";
import env_fe from "@/utils/env_fe";

export default function TokenERC20(props: any) {
    const {setShowDetail, token, showSendToken} = props
    const account = useSelector(selectedAccount);
    const dispatch = useDispatch();


    const handleOpenNewTab = () => {
        window.open(`${env_fe.sepolia_ether_scan}/address/${token.contract_address}`, '_blank');
    };

    const hideTokenERC20 = async (tokenID: number) => {
        const result = window.confirm('Confirm hide token ERC20?');
        if (result) {
            dispatch(showApiLoading())
            try {
                await tokenApi.hideTokenERC20(tokenID, account.id as any as number)
                toast.success('Hide token ERC20 successfully', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark',
                });
                dispatch(removeToken(tokenID))
            } catch (error) {
                toast.error('Add token ERC20 failed', {
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
                setShowDetail(false)
            }
        } else {
            // console.log('User canceled');
        }
    };
    

    return (
        <>
            <div onClick={() => setShowDetail(false)} className="text-black fixed inset-0 z-0 bg-black bg-opacity-10 scrollbar-thin backdrop-blur-sm flex justify-center items-center mx-4 overflow-y-auto">
            </div>

            <div className="show-token-erc20-detail-container border-white border-solid border-2">
                <div className="h-4"></div>
                <div className="token-detail-container-title">
                    <div className="token-detail-title" style={{fontWeight: "bold", fontSize: 32, color: "orangered"}}>
                        Token details
                    </div>
                    <div className="top-20px token-detail-token-contract-address-title text-orangered">
                        <strong>Balance</strong>
                    </div>
                    <h2 className="token-detail-quantity">
                        {token.balance}
                    </h2>
                    <div className="top-20px token-detail-token-contract-address-title text-orangered">
                        <strong>Token name</strong>
                    </div>
                    <div className="token-detail-token-contract-address text-xl">
                        {token.name}
                    </div>
                    <div className="top-20px token-detail-token-contract-address-title text-orangered">
                        <strong>Token contract address</strong>
                    </div>
                    <div className="token-detail-token-contract-address">
                        {token.contract_address}
                    </div>
                    <div className="mt-10"></div>
                </div>

                <div onClick={() => handleOpenNewTab()} className="top-20px top-20px network-select-add bg-black text-white border">
                    View Asset in explorer
                </div>
                <div onClick={() => hideTokenERC20(token.id)} className="top-20px network-select-add bg-black">
                    Hide token
                </div>
                <div className="h-6"></div>
            </div>
        </>
    );
}
