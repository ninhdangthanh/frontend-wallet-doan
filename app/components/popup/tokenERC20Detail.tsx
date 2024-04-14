"use client";

import "../../../css/fontawesome-free-6.5.1-web/css/all.css"
import "../../../css/bootstrap.min.css"
import "../../../css/main.css"
import "../../../css/popup.css"
import "../../../css/token-detail.css"

export default function TokenERC20(props: any) {
    const {setShowDetail, token} = props

    const handleOpenNewTab = () => {
        window.open(`https://sepolia.etherscan.io/address/${token.contract_address}`, '_blank');
    };

    return (
        <>
            <div onClick={() => setShowDetail(false)} className="overlay"></div>

            <div className="show-token-erc20-detail-container">
                    <div onClick={() => setShowDetail(false)} className="token-detail-close">
                        <i className="fa-solid fa-xmark"></i>
                    </div>
                    <div className="token-detail-container-title">
                        <div className="token-detail-title" style={{fontWeight: "bold", fontSize: 32, color: "orangered"}}>
                            Token details
                        </div>
                        <div className="top-20px token-detail-token-contract-address-title">
                            <strong>Balance</strong>
                        </div>
                        <h2 className="token-detail-quantity">
                            {token.balances}
                        </h2>
                        <div className="top-20px token-detail-token-contract-address-title">
                            <strong>Token name</strong>
                        </div>
                        <div className="token-detail-token-contract-address">
                            {token.name}
                        </div>
                        <div className="top-20px token-detail-token-contract-address-title">
                            <strong>Token contract address</strong>
                        </div>
                        <div className="token-detail-token-contract-address">
                            {token.contract_address}
                        </div>
                        <div className="top-20px token-detail-token-network-title">
                            <strong>Network:</strong>
                        </div>
                        <div className="token-detail-token-network">
                            Sepolia network
                        </div>
                    </div>

                    <div style={{width: "100%", alignItems: "center", display: "flex", justifyContent: "center", flexDirection: "column", marginTop: 40}}>
                        <div className="wallet-coin-option-button flex-row">
                            <i className="fa-solid fa-arrow-up wallet-coin-option-button-send"></i>
                        </div>
                        <div><span>Send</span></div>
                    </div>
                    <div onClick={() => handleOpenNewTab()} className="top-20px top-20px network-select-add">
                        View Asset in explorer
                    </div>
                    <div className="top-20px network-select-add">
                        Hide token
                    </div>
            </div>
        </>
    );
}
