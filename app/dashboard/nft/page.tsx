"use client";

import Link from "next/link";
import "../../../css/fontawesome-free-6.5.1-web/css/all.css"
import "../../../css/main.css"

export default function NftPage() {

  return (
    <>
        <div className="wallet-activity-header flex-row">
            <Link key="Home" href="/dashboard/home"  className="wallet-activity-header-option ">Token</Link>
            <Link key="NFT" href="/dashboard/nft"  className="wallet-activity-header-option wallet-activity-header-option-active">NFT</Link>
            <Link key="Activity" href="/dashboard/activity"  className="wallet-activity-header-option">Activity</Link>
        </div>
    
        <div className="wallet-activity-body"> 
            <div className="wallet-activity-body-tokens">
                <div className="wallet-token-item-nft">
                    <div className="wallet-token-item-balance-nft flex-row">
                        <img src="https://imgs.search.brave.com/maVnAeMgk8RU7p1bBsOcuRfemtXiRggIekSe30-B_J0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMtMDAuaWNvbmR1/Y2suY29tL2Fzc2V0/cy4wMC9ldGhlcmV1/bS1jbGFzc2ljLWNy/eXB0b2N1cnJlbmN5/LWljb24tMjU2eDI1/Ni1qcHlsMWx6OS5w/bmc" alt="" className="wallet-token-item-logo-nft" />
                        <div className="wallet-token-item-name">
                            MyTokenERC721
                        </div>
                    </div>
                    <div className="wallet-token-item-nft-body flex-row">
                        <img src="./../default_nft.png" alt="" className="wallet-token-item-nft-item" />
                        <img src="./../default_nft.png" alt="" className="wallet-token-item-nft-item" />
                    </div>
                </div>
                <div className="wallet-token-item-nft">
                    <div className="wallet-token-item-balance-nft flex-row">
                        <img src="https://imgs.search.brave.com/maVnAeMgk8RU7p1bBsOcuRfemtXiRggIekSe30-B_J0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMtMDAuaWNvbmR1/Y2suY29tL2Fzc2V0/cy4wMC9ldGhlcmV1/bS1jbGFzc2ljLWNy/eXB0b2N1cnJlbmN5/LWljb24tMjU2eDI1/Ni1qcHlsMWx6OS5w/bmc" alt="" className="wallet-token-item-logo-nft" />
                        <div className="wallet-token-item-name">
                            NFT-SLP
                        </div>
                    </div>
                    <div className="wallet-token-item-nft-body flex-row">
                        <img src="./../default_nft.png" alt="" className="wallet-token-item-nft-item" />
                        <img src="./../default_nft.png" alt="" className="wallet-token-item-nft-item" />
                        <img src="./../default_nft.png" alt="" className="wallet-token-item-nft-item" />
                    </div>
                </div>
            </div>
            <div className="wallet-activity-body-method">
                <div className="wallet-activity-import-token">
                    <i className="fa-solid fa-plus"></i>
                    <span>Import NFT</span>
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
