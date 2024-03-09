"use client";

import Link from "next/link";
import "../../../css/fontawesome-free-6.5.1-web/css/all.css"
import "../../../css/main.css"

export default function Home() {
    return (
        <>
            <div className="wallet-activity-header flex-row">
                <Link key="Home" href="/dashboard/home"  className="wallet-activity-header-option wallet-activity-header-option-active">Token</Link>
                <Link key="NFT" href="/dashboard/nft"  className="wallet-activity-header-option">NFT</Link>
                <Link key="Activity" href="/dashboard/activity"  className="wallet-activity-header-option">Activity</Link>
            </div>
            <div className="wallet-activity-body"> 
                    <div className="wallet-activity-body-tokens">
                        <div className="wallet-token-item">
                            <img src="https://imgs.search.brave.com/maVnAeMgk8RU7p1bBsOcuRfemtXiRggIekSe30-B_J0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMtMDAuaWNvbmR1/Y2suY29tL2Fzc2V0/cy4wMC9ldGhlcmV1/bS1jbGFzc2ljLWNy/eXB0b2N1cnJlbmN5/LWljb24tMjU2eDI1/Ni1qcHlsMWx6OS5w/bmc" alt="" className="wallet-token-item-logo" />
                            <div className="wallet-token-item-balance">
                                <div className="wallet-token-item-name">
                                    SepoliaETH
                                </div>
                                <div className="wallet-token-item-real-balance">
                                    0 SepoliaETH
                                </div>
                            </div>
                        </div>
                        <div className="wallet-token-item">
                            <img src="https://imgs.search.brave.com/ijyOoteOnk7_kEjOC6leZkr1Ul0j8RCU3Pyz0oQPago/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9zdHls/ZXMucmVkZGl0bWVk/aWEuY29tL3Q1X2hj/czJuL3N0eWxlcy9j/b21tdW5pdHlJY29u/X2o3M3U0ODU2MXk2/ODEucG5n" alt="" className="wallet-token-item-logo" />
                            <div className="wallet-token-item-balance">
                                <div className="wallet-token-item-name">
                                    MyToken
                                </div>
                                <div className="wallet-token-item-real-balance">
                                    20 MyToken
                                </div>
                            </div>
                        </div>
                        <div className="wallet-token-item">
                            <img src="https://imgs.search.brave.com/maVnAeMgk8RU7p1bBsOcuRfemtXiRggIekSe30-B_J0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMtMDAuaWNvbmR1/Y2suY29tL2Fzc2V0/cy4wMC9ldGhlcmV1/bS1jbGFzc2ljLWNy/eXB0b2N1cnJlbmN5/LWljb24tMjU2eDI1/Ni1qcHlsMWx6OS5w/bmc" alt="" className="wallet-token-item-logo" />
                            <div className="wallet-token-item-balance">
                                <div className="wallet-token-item-name">
                                    SepoliaETH
                                </div>
                                <div className="wallet-token-item-real-balance">
                                    0 SepoliaETH
                                </div>
                            </div>
                        </div>
                        <div className="wallet-token-item">
                            <img src="https://imgs.search.brave.com/ijyOoteOnk7_kEjOC6leZkr1Ul0j8RCU3Pyz0oQPago/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9zdHls/ZXMucmVkZGl0bWVk/aWEuY29tL3Q1X2hj/czJuL3N0eWxlcy9j/b21tdW5pdHlJY29u/X2o3M3U0ODU2MXk2/ODEucG5n" alt="" className="wallet-token-item-logo" />
                            <div className="wallet-token-item-balance">
                                <div className="wallet-token-item-name">
                                    MyToken
                                </div>
                                <div className="wallet-token-item-real-balance">
                                    20 MyToken
                                </div>
                            </div>
                        </div>
                        <div className="wallet-token-item">
                            <img src="https://imgs.search.brave.com/maVnAeMgk8RU7p1bBsOcuRfemtXiRggIekSe30-B_J0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMtMDAuaWNvbmR1/Y2suY29tL2Fzc2V0/cy4wMC9ldGhlcmV1/bS1jbGFzc2ljLWNy/eXB0b2N1cnJlbmN5/LWljb24tMjU2eDI1/Ni1qcHlsMWx6OS5w/bmc" alt="" className="wallet-token-item-logo" />
                            <div className="wallet-token-item-balance">
                                <div className="wallet-token-item-name">
                                    SepoliaETH
                                </div>
                                <div className="wallet-token-item-real-balance">
                                    0 SepoliaETH
                                </div>
                            </div>
                        </div>
                        <div className="wallet-token-item">
                            <img src="https://imgs.search.brave.com/ijyOoteOnk7_kEjOC6leZkr1Ul0j8RCU3Pyz0oQPago/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9zdHls/ZXMucmVkZGl0bWVk/aWEuY29tL3Q1X2hj/czJuL3N0eWxlcy9j/b21tdW5pdHlJY29u/X2o3M3U0ODU2MXk2/ODEucG5n" alt="" className="wallet-token-item-logo"  />
                            <div className="wallet-token-item-balance">
                                <div className="wallet-token-item-name">
                                    MyToken
                                </div>
                                <div className="wallet-token-item-real-balance">
                                    20 MyToken
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="wallet-activity-body-method">
                        <div className="wallet-activity-import-token">
                            <i className="fa-solid fa-plus"></i>
                            <span>Import token</span>
                        </div>
                        <div className="wallet-activity-refresh-list">
                            <i className="fa-solid fa-arrows-rotate"></i>
                            <span>Refresh list</span>
                        </div>
                    </div>
                </div>
        </>
  );
}
