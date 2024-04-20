"use client";

import "../../../css/fontawesome-free-6.5.1-web/css/all.css"
import "../../../css/bootstrap.min.css"
import "../../../css/main.css"
import "../../../css/send.css"

export default function SendTokenPopUp() {

  return (
    <>
        <div className="overlay"></div>

        <div className="popup-send-container" style={{color: "white"}}>
            <div className="quantity-send-container" style={{color: "white"}}>
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
                        {/* <img src="./account-1-logologo.png" alt="Send tokens logo" className="quantity-send-asset-choose-logo" /> */}
                        <div className="quantity-send-asset-choose-quantity">
                            <div className="quantity-send-asset-choose-quantity-name">
                                MTKERC20
                            </div>
                            <div className="quantity-send-asset-choose-quantity-balance">
                                Balance: 950000 MTKERC20
                            </div>
                        </div>
                        {/* <i className="fa-solid fa-caret-down"></i> */}
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
                            0.00008938 SepoliaETH
                        </div>
                    </div>
                    <div className="quantity-send-gas-push flex-row">
                        <div className="quantity-send-gas-push-left quantity-send-gas-push-right">Likely in &lt; 30 seconds</div>
                        <div className="quantity-send-gas-push-right ">
                            <strong>Max fee:</strong>
                            0.00009471 SepoliaETH
                        </div>
                    </div>
                </div>
                <div className="quantity-send-button flex-row">
                    <div className="quantity-send-button-cancel">Cancel</div>
                    <div className="quantity-send-button-send">Send</div>
                    {/* <!-- sau do hien len confirm model mac dinh --> */}
                </div>
            </div>
        </div>
    </>
  );
}
