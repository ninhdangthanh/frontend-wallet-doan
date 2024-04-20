'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { check_token } from "../../common";
import SelectAccountPopUp from "../components/popup/selectAccount";
import "../../css/fontawesome-free-6.5.1-web/css/all.css"
import "../../css/main.css"
import NetworkSelectPopUp from "../components/popup/networkSelect";
import { accountApi } from "../../api-client/account-api";
import { networkApi } from "../../api-client/network-api";
import { useDispatch, useSelector } from "react-redux";
import { Network, changeNetwork, selectNetwork } from "@/redux/slice/networkSlice";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddNetworkPopUp from "../components/popup/addNetwork";
import { hideApiLoading, selectLoading, showApiLoading } from "@/redux/slice/apiLoadingSlice";
import ApiLoading from "../components/loading/apiLoading";
import { ethers } from "ethers";
import { changeAccount, selectedAccount } from "@/redux/slice/accountSlice";
import ShowPrivateKeyPopUp from "../components/popup/showPrivateKey";
import { hexToNumber } from "@/utils/format-address";
import AddERC20PopUp from "../components/popup/addERC20";
import ChangePasswordPopup from "../components/popup/changePasswordPopup";
import AddAccountPopup from "../components/popup/addAccountPopup";
import SendTokenPopUp from "../components/popup/sendTokenPopUp";

export default function Layout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const dispatch = useDispatch();

    const account = useSelector(selectedAccount);
    const apiLoading = useSelector(selectLoading);
    
    const [copied, setCopied] = useState(false);
    const [accessToken, setAccessToken] = useState("");
    const [accounts, setAccounts] = useState([]);
    const [networks, setNetworks] = useState<Network[]>([]);
    const [isShowSelectAccount, setIsShowSelectAccount] = useState(false);
    const [isShowAccountDetail, setIsShowAccountDetail] = useState(false);
    const [isShowSelectNetwork, setIsShowSelectNetwork] = useState(false);
    const [isShowAddNetwork, setIsShowAddNetwork] = useState(false);
    const [isShowChangePasswordPopup, setIsShowChangePasswordPopup] = useState(false);
    const [isShowAddAccountPopup, setIsShowAddAccountPopup] = useState(false);
    const [isShowSendTokenPopup, setIsShowSendTokenPopup] = useState(false);
    
    const [accountBalanceETH, setAccountBalanceETH] = useState('0');
    
    

    useEffect(() => {
        let access_token = check_token();
        if(!access_token) {
            router.push("/login");
            setAccessToken("")
        } else {
            setAccessToken(access_token)
        }

        dispatch(showApiLoading())
        
        Promise.all([getAccounts()])
            .then(([accounts]) => {
                setAccounts(accounts);

                setTimeout(() => {
                    dispatch(hideApiLoading())
                }, 500);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                setTimeout(() => {
                    dispatch(hideApiLoading())
                }, 500);
            });

    }, [])

    useEffect(() => {
        getAccountBalance()
        setAccountBalanceETH(`${0}`)
        // console.log("accountBalanceETH", accountBalanceETH);
    }, [account])

    const getAccountBalance = async () => {
        try {
            const provider = new ethers.providers.JsonRpcProvider("https://ethereum-sepolia-rpc.publicnode.com");
            const etherBalance = await provider.getBalance(account.address);
            // console.log("Balance:", etherBalance, "ETH", account.address);

            let showBalance = (etherBalance as unknown as number / 1000000000000000000).toFixed(4);
            if (showBalance == '0.0000') {
                showBalance = '0'
            }
            setAccountBalanceETH(`${showBalance}`)
        } catch (error) {
            console.error("Error when get account balance:", error);
        }
    }

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

    // useEffect(() => {
    //     let network_rpc = network_redux.network?.rpc_url
    //     const ethers_provider = new ethers.providers.JsonRpcProvider(network_rpc);

    //     const balance_account_promist = accounts.map(async (account: any) => {
    //         let coin = await ethers_provider.getBalance(account.address)
    
    //         let number = Number(`${coin}`)
    //         let numberShow = (number / 1000000000000000000).toFixed(3)

    //         return numberShow
    //     });
        
    //     Promise.all(balance_account_promist).then((items) => {
    //         console.log(items);
    //     })
    //     .catch((error) => {
    //         console.error("Error fetching amounts:", error);
    //     });
    // }, [isShowSelectAccount])

    const getAccounts = async () => {
        try {
            const accounts = await accountApi.getAccounts();
            const default_account : any = accounts.data[0];
            dispatch(changeAccount({
                id: default_account.id,
                name: default_account.name,
                address: default_account.address,
                user_id: default_account.user_id,
                index_acc: 0,
                privateKey: default_account.privateKey
            }));
            return accounts.data;
        } catch (error) {
            console.error("Error fetching accounts:", error);
            throw error;
        }
    };

    const getNetworks = async () => {
        try {
            const network = await networkApi.getNetworks();
            await initNetwork(network.data);
            return network.data;
        } catch (error) {
            console.error("Error fetching networks:", error);
            throw error;
        }
    };


    const initNetwork = async (network_list: Network[]) => {
        network_list.forEach((network: Network) => {
            if(network.is_default) {
                dispatch(changeNetwork({network: network, isDefault: true}));
                // console.log(network);
                return network.rpc_url;
            }
        });
    }


    return (
        <>
        <ToastContainer />
        {isShowSendTokenPopup && <SendTokenPopUp />}

        {apiLoading.isLoading && <ApiLoading />}
        {isShowSelectAccount && <SelectAccountPopUp setIsShowAddAccountPopup={setIsShowAddAccountPopup} getAccounts={getAccounts} accounts={accounts} accessToken={accessToken} setIsShowSelectAccount={setIsShowSelectAccount} />}
        {isShowAccountDetail && <ShowPrivateKeyPopUp setIsShowChangePasswordPopup={setIsShowChangePasswordPopup} account={account}  setIsShowAccountDetail={setIsShowAccountDetail} />}

        {/* {isShowSelectNetwork && <NetworkSelectPopUp setIsShowAddNetwork={setIsShowAddNetwork} getNetworks={getNetworks} networks={networks} accessToken={accessToken} setIsShowSelectNetwork={setIsShowSelectNetwork} />}
        {isShowAddNetwork && <AddNetworkPopUp getNetworks={getNetworks} setIsShowAddNetwork={setIsShowAddNetwork} />} */}
        {isShowChangePasswordPopup && <ChangePasswordPopup setIsShowChangePasswordPopup={setIsShowChangePasswordPopup} />}
        {isShowAddAccountPopup && <AddAccountPopup getAccounts={getAccounts} setIsShowAddAccountPopup={setIsShowAddAccountPopup} />}

        <div className="app-container">
            <h1 className="wallet-logo">
                U2MYA BLOCKCHAIN WALLET
            </h1>
            <div className="wallet-container">
                <div className="wallet-container-header flex-row"> 
                    <div className="wallet-network-hide flex-row"></div>
                    {/* <div onClick={() => setIsShowSelectNetwork(true)} className="wallet-network flex-row">
                        {
                            network_redux.isDefault ?
                            <img src="../eth_logo.png" alt="N" className="wallet-network-logo" />
                            :
                            <div className="wallet-network-logo-character">{network_redux.network ? network_redux.network?.name.slice(0, 1): "Mainnet"}</div>
                        }
                        <div className="wallet-network-name">{network_redux.network?.name || "Mainnet"}</div>
                        <i className="wallet-network-icon-select fa-solid fa-chevron-down"></i>
                    </div> */}
                    <div onClick={() => setIsShowSelectAccount(true)} className="wallet-account flex-row">
                        <img src={`../account_list/${account.index_acc + 1}.jpeg`} alt="" className="wallet-account-image"/>
                        <div className="wallet-account-name">{account?.name}</div>
                        <i className="wallet-network-icon-select fa-solid fa-chevron-down"></i>
                    </div>
                    <div style={{paddingLeft: "10px", paddingRight: "10px"}} onClick={() => setIsShowAccountDetail(true)} className="wallet-setting">
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                    </div>
                </div>
                <div className="wallet-container-coin">
                <div onClick={handleCopyTextAddress} className="wallet-coin-address">
                    {/* <div className="wallet-coin-address-text">0xc73cc...cdE73</div> */}
                    <div className="wallet-coin-address-text">{`${account.address.slice(0, 6)}...${account.address.slice(37)}`}</div>
                    <i className="wallet-coin-address-copy fa-regular fa-copy"></i>
                </div>
                <div className="wallet-coin-balance">
                    {accountBalanceETH} SepoliaETH
                </div>
                <div className="wallet-coin-option">
                    <div className="wallet-coin-option-item flex-row">
                        <div className="wallet-coin-option-button wallet-coin-option-button-disabled flex-row">
                            <i className="fa-solid fa-plus-minus"></i>
                        </div>
                    <span>Buy & Sell</span>
                    </div>
                    <div onClick={() => getAccountBalance()} className="wallet-coin-option-item flex-row">
                        <div className="wallet-coin-option-button flex-row">
                            <i className="fa-solid fa-arrow-up wallet-coin-option-button-send"></i>
                        </div>
                    <span>Send</span>
                    </div>
                    <div className="wallet-coin-option-item flex-row">
                        <div className="wallet-coin-option-button wallet-coin-option-button-disabled flex-row">
                            <i className="fa-solid fa-arrow-right-arrow-left"></i>
                        </div>
                    <span>Swap</span>
                    </div>
                    {/* <div className="wallet-coin-option-item flex-row">
                        <div className="wallet-coin-option-button wallet-coin-option-button-disabled flex-row">
                            <i className="fa-solid fa-arrow-trend-up"></i>
                        </div>
                    <span>Bridge</span>
                    </div>
                    <div className="wallet-coin-option-item flex-row">
                        <div className="wallet-coin-option-button wallet-coin-option-button-disabled flex-row">
                            <i className="fa-solid fa-chart-column"></i>
                        </div>
                    <span>Portfolio</span>
                    </div> */}
                </div>
            </div>
            <div className="wallet-container-activity">
                <>{children}</>
            </div>
            </div>
            </div>
        </>
    );
}