"use client";

import "../../../css/fontawesome-free-6.5.1-web/css/all.css"
import "../../../css/bootstrap.min.css"
import "../../../css/main.css"
import "../../../css/popup.css"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideApiLoading, showApiLoading } from "@/redux/slice/apiLoadingSlice";
import { accountApi } from "@/api-client/account-api";
import { toast } from "react-toastify";
import { changeSelectedAccountName, getPrivateKey } from "@/redux/slice/accountSlice";

export default function ShowPrivateKeyPopUp(props: any) {
    const {setIsShowAccountDetail, account, setIsShowChangePasswordPopup} = props
    const router = useRouter();
    const dispatch = useDispatch();
    const [accountName, setAccountName] = useState("");

    const [isChangeAccountnameShow, setShowIsChangeAccountnameShow] = useState(false);
    const [newAccountName, setNewAccountName] = useState("");
    const privateKey = useSelector(getPrivateKey);

    useEffect(() => {
        setNewAccountName(account.name);
        setAccountName(account.name)
    }, [])


    const logoutAction = () => {
        setIsShowAccountDetail(false)
        sessionStorage.removeItem("u2mya_wallet_access_token");
        router.push("/login");
        window.location.reload()
    }

    const changeAccountName = async () => {
        dispatch(showApiLoading())
        try {
            let payload = {
                name: newAccountName
            }
            await accountApi.changeAccountName(account.id, payload);
            toast.success('Change account name success', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark',
                });
            setAccountName(newAccountName)
            dispatch(changeSelectedAccountName(newAccountName))
        } catch (error) {
            toast.error('Change account name failed', {
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
    }

    const handleCopyTextAddress = () => {
        const textToCopy = privateKey;
            navigator.clipboard.writeText(textToCopy)
            .then(() => {
                alert("Copied account private key")
            })
            .catch((error) => {
                console.error('Failed to copy:', error);
            });
    };



    return (
        <>
            <div onClick={() => setIsShowAccountDetail(false)} className="overlay"></div>

            <div className="show-private-key-container">
                <h5 className="show-private-key-title">
                    Account details
                    <div className="activity-popup-detail-title-close">
                        <i onClick={() => setIsShowAccountDetail(false)} className="fa-solid fa-xmark"></i>
                    </div>
                </h5>
                <div className="show-private-key-body">
                    <img src={`../account_list/${account.index_acc + 1}.jpeg`} alt="" className="show-private-key-detail-logo"/>

                    <div className="show-private-key-account-name">
                        <div className="show-private-key-account-name-title">{account.name}</div>
                        <div onClick={() => setShowIsChangeAccountnameShow(true)} className="show-private-key-name-edit-button">
                            <i className="fa-solid fa-pen-to-square"></i>
                        </div>
                    </div>

                    {
                        isChangeAccountnameShow && <>
                        <div className="show-private-key-enter-password">
                            <div className="show-private-key-enter-password-title">
                                Enter new account name
                            </div>
                            <input value={newAccountName} onChange={((e) => setNewAccountName(e.target.value))} 
                            type="text" className="form-control" placeholder="Password"/>
                        </div>

                        <div className="show-private-key-button flex-row">
                            <div onClick={() => setShowIsChangeAccountnameShow(false)} className="show-private-key-button-cancel">
                                Cancel
                            </div>
                            <div onClick={() => changeAccountName()} className={newAccountName.length < 5 ? "show-private-key-button-confirm-disabled" : "show-private-key-button-confirm"}>
                                Save
                            </div>
                        </div>
                        </>
                    }

                    {!isChangeAccountnameShow && <>
                        <div style={{fontSize: 24, color: "white", marginTop: 20}}>Private Key</div>
                        <div onClick={handleCopyTextAddress} className="wallet-coin-address-private">
                            <div style={{color: "orangered", width: 300, wordWrap: "break-word"}}>{privateKey}</div>
                            <div><i className="wallet-coin-address-copy fa-regular fa-copy"></i></div>
                        </div>
                        
                    </>}

                    {!isChangeAccountnameShow && <div onClick={() => {setIsShowChangePasswordPopup(true);setIsShowAccountDetail(false)}} className="show-private-key-button-cancel">
                        Change password
                    </div>}

                    <div onClick={() => logoutAction()} className="show-private-key-button-logout">
                        Log out
                    </div>
                </div>
            </div>

        </>
    );
}
