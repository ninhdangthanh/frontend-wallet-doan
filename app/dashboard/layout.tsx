'use client'

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SelectAccountPopUp from "../components/popup/selectAccount";
import { accountApi } from "../../api-client/account-api";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { hideApiLoading, selectLoading, showApiLoading } from "@/redux/slice/apiLoadingSlice";
import ApiLoading from "../components/loading/apiLoading";
import { ethers } from "ethers";
import { addManyAccount, changeAccount, selectedAccount } from "@/redux/slice/accountSlice";
import ShowPrivateKeyPopUp from "../components/popup/showPrivateKey";
import ChangePasswordPopup from "../components/popup/changePasswordPopup";
import SendCoinPopUp from "../components/popup/sendCoinPopUp";
import PopupAddBlockchainAccount from "../components/new-templete/add-new-account/popup-add-blockchain-account";
import PopupAddNewBlockchainAccount from "../components/new-templete/add-new-account/popup-new-blockchain-acocunt";
import PopupAddPrivateKeyBlockchainAccount from "../components/new-templete/add-new-account/popup-import-private-blockchain-account";
import { check_token } from "@/common";
import AddERC20PopUp from "../components/new-templete/addERC20";
import { tokenApi } from "@/api-client/token-api";
import { addManyTokens, selectTokens } from "@/redux/slice/ERC20Slice";
import { formatEthBalance } from "@/utils/format-address";



export default function Layout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const dispatch = useDispatch();
    const pathname = usePathname();

    const account = useSelector(selectedAccount);
    const apiLoading = useSelector(selectLoading);
    const tokens = useSelector(selectTokens);

    var [tabIndex, setTabIndex] = useState(1);
    const [copied, setCopied] = useState(false);
    const [accessToken, setAccessToken] = useState("");
    const [isShowSelectAccount, setIsShowSelectAccount] = useState(false);
    const [isShowAccountDetail, setIsShowAccountDetail] = useState(false);
    const [isShowChangePasswordPopup, setIsShowChangePasswordPopup] = useState(false);

    const [accountBalanceETH, setAccountBalanceETH] = useState('0');


    useEffect(() => {
        let access_token = check_token();
        if(!access_token) {
            router.push("/login");
            setAccessToken("")
        } else {
            setAccessToken(access_token)
        }
        
        getAccounts();
    }, [])

    const handleCopyTextAddress = () => {
        const textToCopy = account.address;
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                alert("Copied account address")
            })
            .catch((error) => {
                console.error('Failed to copy:', error);
            });
    };


    const getAccounts = async () => {
        try {
            const accounts = await accountApi.getAccounts();
            // console.log("accounts.data", accounts.data);
            dispatch(addManyAccount(accounts.data))
            
            const default_account: any = accounts.data[0];
            // console.log("default_account", default_account);
            
            dispatch(changeAccount({
                id: default_account.id,
                name: default_account.name,
                address: default_account.address,
                user_id: default_account.user_id,
                index_acc: 0,
                privateKey: default_account.privateKey,
                balance: default_account.balance
            }));
            return accounts.data;
        } catch (error) {
            console.error("Error fetching accounts:", error);
            throw error;
        }
    };

    var [popupAddBlockchainAccount, setPopupAddBlockchainAccount] = useState(false);
    var [popupCreateNewBlockchainAccount, setPopupCreateNewBlockchainAccount] = useState(false);
    var [popupImportBlockchainAccount, setPopupImportBlockchainAccount] = useState(false);
    const [isShowAddTokenERC20, setIsShowAddTokenERC20] = useState(false);
    const [isShowSendCoinPopup, setIsShowSendCoinPopup] = useState(false);


    return (
        <>
            <ToastContainer />

            {popupAddBlockchainAccount && (
                <PopupAddBlockchainAccount
                setPopupImportBlockchainAccount={setPopupImportBlockchainAccount}
                setPopupCreateNewBlockchainAccount={setPopupCreateNewBlockchainAccount}
                onCancel={() => {
                    setPopupAddBlockchainAccount(false);
                }} 
                / >
            )}
            {popupCreateNewBlockchainAccount && (
                <PopupAddNewBlockchainAccount
                onCancel={() => {
                    setPopupCreateNewBlockchainAccount(false);
                }} 
                / >
            )}
            {popupImportBlockchainAccount && (
                <PopupAddPrivateKeyBlockchainAccount
                onCancel={() => {
                    setPopupImportBlockchainAccount(false);
                }} 
                / >
            )}

            {isShowSendCoinPopup && <SendCoinPopUp setIsShowSendCoinPopup={setIsShowSendCoinPopup} coinBalance={accountBalanceETH} />}

            {apiLoading.isLoading && <ApiLoading />}
            {isShowAddTokenERC20 && <AddERC20PopUp setIsShowAddTokenERC20={setIsShowAddTokenERC20} />}
            {isShowSelectAccount && <SelectAccountPopUp onCancel={() => setIsShowSelectAccount(false)} getAccountsAPI={getAccounts} getAccounts={getAccounts} accessToken={accessToken} setIsShowSelectAccount={setIsShowSelectAccount} />}
            {isShowAccountDetail && <ShowPrivateKeyPopUp setIsShowChangePasswordPopup={setIsShowChangePasswordPopup} account={account} setIsShowAccountDetail={setIsShowAccountDetail} />}

            {isShowChangePasswordPopup && <ChangePasswordPopup setIsShowChangePasswordPopup={setIsShowChangePasswordPopup} />}

            <div className="text-white items-center justify-center flex flex-col text-center bg-black ">
                <h1 className="text-orangered pt-10 pb-10 bg-black items-center justify-center flex text-4xl font-bold">
                    U2MYA BLOCKCHAIN WALLET
                </h1>
                <div className="bg-backgroundColor w-[1000px] items-center mb-16">
                    <div className="relative pt-[16px] pb-[12px] px-[12px]  flex items-center justify-between border-t-2 border-b-2 border-orange-900">
                        <div
                            onClick={() => {
                                setPopupAddBlockchainAccount(true)
                            }}
                            className="cursor-pointer bg-black py-[6px] rounded-3xl px-3 flex  items-center justify-center border-solid border-2 border-orange-900"
                        >
                            {/* <img
                                src="https://cdn-icons-png.flaticon.com/512/5264/5264885.png"
                                alt=""
                                className="w-6 h-6 rounded-[50px] bg-white"
                            /> */}
                            <div className="px-[6px] text-[16px]">Add blockchain account</div>
                        </div>
                        <div
                            onClick={() => {
                                setIsShowSelectAccount(true);
                            }}
                            className="absolute cursor-pointer left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-between"
                        >
                            <img src={`../account_list/${account.index_acc + 1}.jpeg`} alt="" className="w-8 h-8 bg-white rounded-full" />
                            <div className="px-[10px] font-bold text-[22px]">{account?.name}</div>
                            <i className="text-sm pl-3 fa-solid fa-chevron-down"></i>
                        </div>

                        <div onClick={() => {
                            setIsShowAccountDetail(true);
                        }} className="px-4 py-1 rounded-full font-bold text-2xl hover:bg-orange-900 hover:bg-opacity-30">
                            <i className="fa-solid fa-ellipsis-vertical"></i>
                        </div>
                    </div>
                    <div className="items-center  w-full pt-8">
                        <div className="flex items-center flex-col">
                            {" "}
                            <div
                                onClick={handleCopyTextAddress}
                                className="inline-flex  justify-center text-orange-600 bg-[#422D24] px-4 py-1.5 rounded-[20px] mb-2"
                            >
                                <div className="pr-[6px]">{`${account.address.slice(0, 6)}...${account.address.slice(37)}`}</div>
                                <i className="wallet-coin-address-copy fa-regular fa-copy "></i>
                            </div>
                            <div className="mb-6 mt-2 text-[36px] items-center flex">
                                {formatEthBalance(account.balance)} ETH
                            </div>
                        </div>

                        {pathname === '/dashboard/home' && (<div className=" mb-8 mt-4  w-full flex items-center justify-center ">
                            <div onClick={() => setIsShowSendCoinPopup(true)} className="w-56 cursor-pointer flex flex-col items-center justify-between">
                                <div className="mb-2.5 bg-orange-600 w-11 h-11 rounded-full rotate-45 flex items-center justify-center hover:opacity-65">
                                    <i className="fa-solid fa-arrow-up wallet-coin-option-button-send"></i>
                                </div>
                                <span className="font-bold">Send Ethers</span>
                            </div>
                            <div onClick={() => setIsShowAddTokenERC20(true)} className="w-56 cursor-pointer flex flex-col  items-center justify-between">
                                <div className="mb-2.5 bg-orange-600 w-11 h-11 rounded-full flex items-center justify-center hover:opacity-65">
                                    <i className="fa-solid fa-plus"></i>
                                </div>
                                <span className="font-bold">Add token</span>
                            </div>
                        </div> )}
                    </div>
                    <div className="">
                        {children}
                    </div>
                </div>
                {/* bottom hight */}
                <div className="h-[800px]"></div>
            </div>
        </>
    );
}