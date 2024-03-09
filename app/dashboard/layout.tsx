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

export default function Layout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const dispatch = useDispatch();

    const [accessToken, setAccessToken] = useState("");
    const [accounts, setAccounts] = useState([]);
    const [networks, setNetworks] = useState<Network[]>([]);
    const network_redux = useSelector(selectNetwork);

    const [isShowSelectAccount, setIsShowSelectAccount] = useState(false);
    const [isShowSelectNetwork, setIsShowSelectNetwork] = useState(false);

    useEffect(() => {
        let access_token = check_token();
        if(!access_token) {
            router.push("/login");
            setAccessToken("")
        } else {
            setAccessToken(access_token)
        }

        getAccounts()
        getNetworks()
    }, [])

    const getAccounts = async () => {
        let accounts = await accountApi.getAccounts()
        setAccounts(accounts.data)
    }

    const getNetworks = async () => {
        let network = await networkApi.getNetworks()
        await initNetwork(network.data)
        setNetworks(network.data)
    }

    const initNetwork = async (network_list: Network[]) => {
        console.log("dispatch network");
        network_list.forEach((network: Network) => {
            
            if(network.is_default) {
                dispatch(changeNetwork({network: network, isDefault: true}));
                console.log(network);
                
                return false;
            }
        });
    }


    return (
        <>
        {isShowSelectAccount && <SelectAccountPopUp accounts={accounts} accessToken={accessToken} setIsShowSelectAccount={setIsShowSelectAccount} />}
        {isShowSelectNetwork && <NetworkSelectPopUp networks={networks} accessToken={accessToken} setIsShowSelectNetwork={setIsShowSelectNetwork} />}

        <div className="app-container">
            <h1 className="wallet-logo">
                U2MYA BLOCKCHAIN WALLET
            </h1>
            <div className="wallet-container">
                <div className="wallet-container-header flex-row"> 
                    <div onClick={() => setIsShowSelectNetwork(true)} className="wallet-network flex-row">
                        {
                            network_redux.isDefault ?
                            <img src="../eth_logo.png" alt="N" className="wallet-network-logo" />
                            :
                            <div className="wallet-network-logo-character">{network_redux.network ? network_redux.network?.name.slice(0, 1): "Mainnet"}</div>
                        }
                        <div className="wallet-network-name">{network_redux.network?.name || "Mainnet"}</div>
                        <i className="wallet-network-icon-select fa-solid fa-chevron-down"></i>
                    </div>
                    <div onClick={() => setIsShowSelectAccount(true)} className="wallet-account flex-row">
                        <img src="../account-1-logologo.png" alt="" className="wallet-account-image"/>
                        <div className="wallet-account-name">Account 1</div>
                        <i className="wallet-network-icon-select fa-solid fa-chevron-down"></i>
                    </div>
                    <div className="wallet-setting">
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                    </div>
                </div>
                <div className="wallet-container-coin">
                <div className="wallet-coin-address">
                    <div className="wallet-coin-address-text">0xc73cc...cdE73</div>
                    <i className="wallet-coin-address-copy fa-regular fa-copy"></i>
                </div>
                <div className="wallet-coin-balance">
                    0 SepoliaETH
                </div>
                <div className="wallet-coin-option">
                    <div className="wallet-coin-option-item flex-row">
                        <div className="wallet-coin-option-button wallet-coin-option-button-disabled flex-row">
                            <i className="fa-solid fa-plus-minus"></i>
                        </div>
                    <span>Buy & Sell</span>
                    </div>
                    <div className="wallet-coin-option-item flex-row">
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
                    <div className="wallet-coin-option-item flex-row">
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
                    </div>
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