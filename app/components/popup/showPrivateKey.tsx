"use client";

import "../../../css/fontawesome-free-6.5.1-web/css/all.css"
import "../../../css/bootstrap.min.css"
import "../../../css/main.css"
import "../../../css/popup.css"
import { useRouter } from "next/navigation";

export default function ShowPrivateKeyPopUp(props: any) {
    const {setIsShowAccountDetail, account} = props
    const router = useRouter();


    const logoutAction = () => {
        setIsShowAccountDetail(false)
        sessionStorage.removeItem("u2mya_wallet_access_token");
        router.push("/login");
    }

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
                        <div className="show-private-key-name-edit-button">
                            <i className="fa-solid fa-pen-to-square"></i>
                        </div>
                    </div>

                    <div className="show-private-key-enter-password">
                        <div className="show-private-key-enter-password-title">
                            Enter your password to show private key:
                        </div>
                        <input type="password" className="form-control" placeholder="Password"/>
                    </div>

                    <div className="show-private-key-button flex-row">
                        <div onClick={() => setIsShowAccountDetail(false)} className="show-private-key-button-cancel">
                            Cancel
                        </div>
                        <div className="show-private-key-button-confirm">
                            Confirm
                        </div>
                    </div>

                    <div onClick={() => logoutAction()} className="show-private-key-button-logout">
                        Log out
                    </div>
                </div>
            </div>

        </>
    );
}
