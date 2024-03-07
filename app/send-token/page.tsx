"use client";

import "../css/fontawesome-free-6.5.1-web/css/all.css"
import "../css/bootstrap.min.css"
import "../css/main.css"
import "../css/send.css"

export default function SignIn() {

  return (
    <div className="app-container">
        <h1 className="wallet-logo">
            U2MYA BLOCKCHAIN WALLET
        </h1>
        <div className="wallet-container">
            <div className="wallet-container-header flex-row">
                <div className="wallet-network flex-row">
                    <img src="data:image/png;base64,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"
                        alt="" className="wallet-network-logo"/>
                    <div className="wallet-network-name">SepoliaETH</div>
                    <i className="wallet-network-icon-select fa-solid fa-chevron-down"></i>
                </div>
                <h3 className="wallet-account flex-row">
                    <img src="https://assets-global.website-files.com/6241bcd9e666c1514401461d/62f37fad10d6cdfc3e427bc4_RandomRats-NFTMintRadar.png"
                        alt="" className="wallet-account-image"/>
                    <div className="wallet-account-name">Account 1</div>
                    <i className="wallet-network-icon-select fa-solid fa-chevron-down"></i>
                </h3>
                <div className="wallet-setting">
                    <i className="fa-solid fa-ellipsis-vertical"></i>
                </div>
            </div>

        </div>
        {/* choose account popup */}
        {/* <div className="send-container">
            <h5 className="send-container-title">
                Send to
            </h5>
            <div className="send-container-cancel">
                Cancel
            </div>
            <input type="text" className="form-control send-container-input" id="public_address"
                placeholder="Enter public address (0x) or END name"/>
            <div className="send-container-account">
                <div className="send-container-account-title">
                    Your accounts
                </div>
                <div className="send-container-account-list">
                    <div className="send-container-account-item flex-row">
                        <img className="send-container-account-logo"
                            src="https://assets-global.website-files.com/6241bcd9e666c1514401461d/62f37fad10d6cdfc3e427bc4_RandomRats-NFTMintRadar.png"
                            alt="logo"/>
                        <div className="send-container-account-item-info">
                            <div className="send-container-account-item-name">
                                Account 1
                            </div>
                            <div className="send-container-account-item-address">
                                0xweg3...r034r
                            </div>
                        </div>
                    </div>
                    <div className="send-container-account-item flex-row">
                        <img className="send-container-account-logo"
                            src="https://assets-global.website-files.com/6241bcd9e666c1514401461d/62f37fad10d6cdfc3e427bc4_RandomRats-NFTMintRadar.png"
                            alt="logo"/>
                        <div className="send-container-account-item-info">
                            <div className="send-container-account-item-name">
                                Account 1
                            </div>
                            <div className="send-container-account-item-address">
                                0xweg3...r034r
                            </div>
                        </div>
                    </div>
                    <div className="send-container-account-item flex-row">
                        <img className="send-container-account-logo"
                            src="https://assets-global.website-files.com/6241bcd9e666c1514401461d/62f37fad10d6cdfc3e427bc4_RandomRats-NFTMintRadar.png"
                            alt="logo"/>
                        <div className="send-container-account-item-info">
                            <div className="send-container-account-item-name">
                                Account 1
                            </div>
                            <div className="send-container-account-item-address">
                                0xweg3...r034r
                            </div>
                        </div>
                    </div>
                    <div className="send-container-account-item flex-row">
                        <img className="send-container-account-logo"
                            src="https://assets-global.website-files.com/6241bcd9e666c1514401461d/62f37fad10d6cdfc3e427bc4_RandomRats-NFTMintRadar.png"
                            alt="logo" />
                        <div className="send-container-account-item-info">
                            <div className="send-container-account-item-name">
                                Account 1
                            </div>
                            <div className="send-container-account-item-address">
                                0xweg3...r034r
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> */}
        {/* enter quantity */}
        <div className="quantity-send-container">
            <div className="quantity-send-title">
                Send
            </div>
            <div className="quantity-send-close">
                Cancel
            </div>
            <div className="quantity-send-account">
                <div className="quantity-send-account-name">
                    Account 1
                </div>
                <div className="quantity-send-account-address">
                    0x586f11b8084c1590a5c0fe867953b4f6eab0088b
                </div>
            </div>
            <div className="quantity-send-asset flex-row">
                <div className="quantity-send-amount-title">
                    Assets:
                </div>
                <div className="quantity-send-asset-choose flex-row">
                    <img src="./account-1-logologo.png" alt="Send tokens logo" className="quantity-send-asset-choose-logo" />
                    <div className="quantity-send-asset-choose-quantity">
                        <div className="quantity-send-asset-choose-quantity-name">
                            MTKERC20
                        </div>
                        <div className="quantity-send-asset-choose-quantity-balance">
                            Balance: 950000 MTKERC20
                        </div>
                    </div>
                    <i className="fa-solid fa-caret-down"></i>
                </div>
            </div>
            <div className="quantity-send-amount flex-row">
                <div className="quantity-send-amount-title">
                    Amount:
                    <div className="quantity-send-amount-title-max">
                        Max
                    </div>
                </div>
                <div className="quantity-send-amount-input">
                    <div className="quantity-send-amount-input-top">
                        <input type="number" placeholder="0" className="quantity-send-amount-input-top-input"/>
                        <div className="quantity-send-amount-input-title">MTKERC20</div>
                    </div>
                    <div className="quantity-send-amount-input-bot">
                        No conversion rate avalable
                    </div>
                </div>
            </div>
            <div className="quantity-send-gas-container">
                <div className="quantity-send-gas-estimate flex-row">
                    <div className="quantity-send-gas-estimate-left"><strong>Gas</strong><span>(estimation)</span></div>
                    <div className="quantity-send-gas-estimate-right">
                        0.00008938SepoliaETH
                    </div>
                </div>
                <div className="quantity-send-gas-push flex-row">
                    <div className="quantity-send-gas-push-left quantity-send-gas-push-right">Likely in &lt; 30 seconds</div>
                    <div className="quantity-send-gas-push-right ">
                        <strong>Max fee:</strong>
                        0.00009471SepoliaETH
                    </div>
                </div>
            </div>
            <div className="quantity-send-button flex-row">
                <div className="quantity-send-button-cancel">Cancel</div>
                <div className="quantity-send-button-send">Send</div>
                {/* <!-- sau do hien len confirm model mac dinh --> */}
            </div>
        </div>

        <div className="" style={{height: "300px"}}></div>
    </div>
  );
}
