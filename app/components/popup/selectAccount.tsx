"use client";

import "../../css/fontawesome-free-6.5.1-web/css/all.css"
import "../../css/bootstrap.min.css"
import "../../css/main.css"
import "../../css/popup.css"

export default function SelectAccountPopUp() {

  return (
    <>
        <div className="overlay"></div>

        <div className="account-select-container">
            <div className="network-select-title">
                Select an account
                <div className="network-select-close">
                    <i className="fa-solid fa-xmark"></i>
                </div>
            </div>
            <div className="network-select-body custom-overflow">
                <div className="account-select-item">
                    <img src="./account-1-logologo.png" alt="N" className="network-select-item-logo" />
                    <div className="account-select-item-name">
                        <div className="network-select-item-name1">Account 1</div>
                        <div className="network-select-item-name2">0xc73cc...cdE73</div>
                    </div>
                    <div className="">
                        <div className="network-select-item-name1">0.5 SepoliaETH</div>
                    </div>
                    <div className="network-select-item-detail">
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                    </div>
                </div>
                <div className="account-select-item">
                    <img src="./account-1-logologo.png" alt="N" className="network-select-item-logo" />
                    <div className="account-select-item-name">
                        <div className="network-select-item-name1">Account 1</div>
                        <div className="network-select-item-name2">0xc73cc...cdE73</div>
                    </div>
                    <div className="">
                        <div className="network-select-item-name1">0.5 SepoliaETH</div>
                    </div>
                    <div className="network-select-item-detail">
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                    </div>
                </div>
                <div className="account-select-item">
                    <img src="./account-1-logologo.png" alt="N" className="network-select-item-logo" />
                    <div className="account-select-item-name">
                        <div className="network-select-item-name1">Account 1</div>
                        <div className="network-select-item-name2">0xc73cc...cdE73</div>
                    </div>
                    <div className="">
                        <div className="network-select-item-name1">0.5 SepoliaETH</div>
                    </div>
                    <div className="network-select-item-detail">
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                    </div>
                </div>
                <div className="account-select-item">
                    <img src="./account-1-logologo.png" alt="N" className="network-select-item-logo" />
                    <div className="account-select-item-name">
                        <div className="network-select-item-name1">Account 1</div>
                        <div className="network-select-item-name2">0xc73cc...cdE73</div>
                    </div>
                    <div className="">
                        <div className="network-select-item-name1">0.5 SepoliaETH</div>
                    </div>
                    <div className="network-select-item-detail">
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                    </div>
                </div>
                <div className="account-select-item">
                    <img src="./account-1-logologo.png" alt="N" className="network-select-item-logo"/>
                    <div className="account-select-item-name">
                        <div className="network-select-item-name1">Account 1</div>
                        <div className="network-select-item-name2">0xc73cc...cdE73</div>
                    </div>
                    <div className="">
                        <div className="network-select-item-name1">0.5 SepoliaETH</div>
                    </div>
                    <div className="network-select-item-detail">
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                    </div>
                </div>
                <div className="account-select-item">
                    <img src="./account-1-logologo.png" alt="N" className="network-select-item-logo"/>
                    <div className="account-select-item-name">
                        <div className="network-select-item-name1">Account 1</div>
                        <div className="network-select-item-name2">0xc73cc...cdE73</div>
                    </div>
                    <div className="">
                        <div className="network-select-item-name1">0.5 SepoliaETH</div>
                    </div>
                    <div className="network-select-item-detail">
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                    </div>
                </div>
            </div>
            <div className="network-select-add">
                Add Account
            </div>
        </div>

    </>
  );
}
