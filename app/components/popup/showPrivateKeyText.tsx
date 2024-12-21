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

export default function ShowPrivateKeyTextPopUp(props: any) {
    let className = "w-[400px]"
    
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
           

            <>
            <div
              className={`${className}  fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-50  p-4 min-ss:w-[320px] flex-col justify-center items-center bg-linear-gradient-grey border border-border-color rounded-[12px] flex bg-neutral-900`}
            >
              <div className="text-orangered pb-3 pt-1 text-center font-bold text-[22px]">Private Key</div>
      
              <div className="w-full mt-6 justify-center flex flex-col items-center">
              <div className="show-private-key-body">

              <div onClick={handleCopyTextAddress} className="wallet-coin-address-private">
        <div style={{color: "orangered", width: 300, wordWrap: "break-word"}}>{privateKey}</div>
        <div><i className="wallet-coin-address-copy fa-regular fa-copy"></i></div>
    </div>
</div>
              </div>
      
      
            </div>
            <div className="text-black fixed inset-0 z-40 bg-black bg-opacity-10 scrollbar-thin backdrop-blur-sm flex justify-center items-center mx-4 overflow-y-auto">
            </div>
            </>
        </>
    );
}
