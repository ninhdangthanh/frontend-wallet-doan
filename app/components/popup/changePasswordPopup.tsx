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

export default function ChangePasswordPopup(props: any) {
    const {setIsShowChangePasswordPopup} = props

    const [newPassword, setNewPassword] = useState("")
    const [newPasswordConfirm, setNewPasswordConfirm] = useState("")

    const changePasswordRequest = async (e: any) => {
        e.preventDefault();

        if (newPassword == "" || newPassword != newPasswordConfirm || newPassword.length < 6) {
            alert("Please fill in the correct new password.");
            return;
        }

        try {
            await authApi.changePassword(newPassword);
            toast.success('Change password successfully', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
            });
            setIsShowChangePasswordPopup(false)
        } catch (error) {
            toast.error('Change password failed', {
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
    }


    return (
        <>
            <div onClick={() => setIsShowChangePasswordPopup(false)} className="overlay"></div>

            <div className="network-add-container">
                <form onSubmit={(e) => changePasswordRequest(e)}>
                    <h3 className="network-select-title">
                        Change password
                        <div onClick={() => setIsShowChangePasswordPopup(false)} className="network-select-close">
                            <i className="fa-solid fa-xmark"></i>
                        </div>
                    </h3>
                    <div className="network-select-body">
                        <div className="form-group network-add-field">
                            <label htmlFor="network-name">New password</label>
                            <input value={newPassword} onChange={e => setNewPassword(e.target.value)} type="text" className="form-control" id="network-name" />
                        </div>
                        <div className="form-group network-add-field">
                            <label htmlFor="network-name">Confirm new password</label>
                            <input value={newPasswordConfirm} onChange={e => setNewPasswordConfirm(e.target.value)} type="text" className="form-control" id="network-name" />
                        </div>
                    </div>
                    <button type="submit" className="network-select-add">
                        Save
                    </button>
                </form>
            </div>
        </>
    );
}
