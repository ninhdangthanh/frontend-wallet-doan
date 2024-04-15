"use client";

import "../../../css/fontawesome-free-6.5.1-web/css/all.css"
import "../../../css/bootstrap.min.css"
import "../../../css/main.css"
import "../../../css/popup.css"
import { useState } from "react";
import { ERC20Import, tokenApi } from "@/api-client/token-api";
import { useDispatch, useSelector } from "react-redux";
import { selectedAccount } from "@/redux/slice/accountSlice";
import { toast } from "react-toastify";
import { hideApiLoading, showApiLoading } from "@/redux/slice/apiLoadingSlice";

export default function AddERC20PopUp(props: any) {
    const {setIsShowAddTokenERC20, getTokenERC20s} = props
    
    const dispatch = useDispatch();
    const [tokenAddress, setTokenAddress] = useState("")
    const account = useSelector(selectedAccount);

    const importTokenERC20 = async (e: any) => {
        e.preventDefault()
        console.log("tokenAddress ", tokenAddress);

        let tokenInfo : ERC20Import = {
            account_id: account.id,
            token_address: tokenAddress
        };
        dispatch(showApiLoading())

        try {
            await tokenApi.importTokenERC20(tokenInfo)
            toast.success('Add token ERC20 successfully', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
            });
            await getTokenERC20s()
        } catch (error) {
            toast.error('Add token ERC20 network failed', {
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
            setIsShowAddTokenERC20(false)
            dispatch(hideApiLoading())
        }
    }

    return (
        <>
            <div onClick={() => setIsShowAddTokenERC20(false)} className="overlay"></div>

            <div className="network-add-container">
                <form onSubmit={(e) => importTokenERC20(e)}>
                    <h3 className="network-select-title">
                        Import token ERC20
                        <div onClick={() => setIsShowAddTokenERC20(false)} className="network-select-close">
                            <i className="fa-solid fa-xmark"></i>
                        </div>
                    </h3>
                    <div className="network-select-body">
                        <div className="form-group network-add-field">
                            <label htmlFor="network-name">Token address</label>
                            <input value={tokenAddress} onChange={e => setTokenAddress(e.target.value)} type="text" className="form-control" id="network-name" />
                        </div>
                    </div>
                    <button type="submit" className="network-select-add">
                        Import
                    </button>
                </form>
            </div>
        </>
    );
}
