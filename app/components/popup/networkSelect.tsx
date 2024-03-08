"use client";

import "../../css/fontawesome-free-6.5.1-web/css/all.css"
import "../../css/bootstrap.css"
import "../../css/main.css"

export default function NftPage() {

  return (
    <>
        <div className="overlay"></div>

        <div className="network-select-container">
        <div className="network-select-title">
            Select a network
            <div className="network-select-close">
                <i className="fa-solid fa-xmark"></i>
            </div>
        </div>
        <div className="network-select-body">
            <div className="network-select-item">
                <img src="./eth_logo.png" alt="N" className="network-select-item-logo" />
                <div className="network-select-item-name">
                    Mainnet
                </div>
                <div className="network-select-trash">
                    <i className="fa-solid fa-trash"></i>
                </div>
            </div>
            <div className="network-select-item">
                <div className="network-select-item-logo-default">S</div>
                <div className="network-select-item-name">
                    SepoliaETH
                </div>
                <div className="network-select-trash">
                    <i className="fa-solid fa-trash"></i>
                </div>
            </div>
        </div>
        <div className="network-select-add">
            Add network
        </div>
    </div>
    </>
  );
}
