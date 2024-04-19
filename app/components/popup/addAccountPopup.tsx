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
import { authApi } from "@/api-client/auth-api";
import { accountApi } from "@/api-client/account-api";

export default function AddAccountPopup(props: any) {
    const {setIsShowAddAccountPopup, getAccounts} = props

    const [privateKey, setPrivateKey] = useState("")
    const dispatch = useDispatch();

    const createAccountRequest = async () => {
        try {
            dispatch(showApiLoading());

            await accountApi.createAccount();
            
            toast.success('Create account successfully', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
            });
            await getAccounts();
            setIsShowAddAccountPopup(false)

            setTimeout(() => {
                window.location.reload()
            }, 2000);
        } catch (error) {
            toast.error('Create account failed', {
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
    }


    const importAccountRequest = async () => {
        if (privateKey == "" || !privateKey.startsWith("0x")) {
            alert("Please fill in the correct private key.")
            return;
        }

        try {
            dispatch(showApiLoading());

            await accountApi.importAccount(privateKey);
            
            toast.success('Import account successfully', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
            });
            setIsShowAddAccountPopup(false)

            setTimeout(() => {
                window.location.reload()
            }, 2000);
        } catch (error) {
            toast.error('Import account failed', {
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
    }


    return (
        <>
            <div onClick={() => setIsShowAddAccountPopup(false)} className="overlay"></div>

            <div className="network-add-container">
                {/* <h3 className="network-select-title">
                    Add account
                    <div onClick={() => setIsShowAddAccountPopup(false)} className="network-select-close">
                        <i className="fa-solid fa-xmark"></i>
                    </div>
                </h3> */}

                <button onClick={() => createAccountRequest()} type="button" className="network-select-add">
                    Create new account
                </button>
                <br /> <br />
                <div style={{width: "100%", height: 1, backgroundColor: "red"}}></div>
                <br />
                
                <div className="network-select-body">
                    <div className="form-group network-add-field">
                        <label htmlFor="network-name">Private Key</label>
                        <input value={privateKey} onChange={e => setPrivateKey(e.target.value)} type="text" className="form-control" id="network-name" />
                    </div>
                </div>
                <button onClick={() => importAccountRequest()} type="submit" className="network-select-add">
                    Import Account
                </button>
            </div>
        </>
    );
}
