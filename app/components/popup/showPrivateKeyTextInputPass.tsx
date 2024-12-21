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

export default function ShowPrivateKeyInputPassPopUp(props: any) {
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

            <div className="show-private-key-container w-[800px]">
                <h5 className="show-private-key-title font-bold text-2xl text-center">
                    Enter password to show Private Key
                    <div className="activity-popup-detail-title-close">
                        {/* <i onClick={() => setIsShowAccountDetail(false)} className="fa-solid fa-xmark"></i> */}
                    </div>
                </h5>
                <div className="show-private-key-body">
                    <div className="mb-4 mt-4">
                        <input type="text"  placeholder="Password" required id="account_name" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-800 focus:border-orange-800 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-800 dark:focus:border-orange-800" />
                    </div>


                    <div onClick={() => logoutAction()} className="show-private-key-button-logout">
                        Show
                    </div>
                </div>
            </div>

        </>
    );
}
