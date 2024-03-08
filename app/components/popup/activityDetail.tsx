"use client";

import "../../css/fontawesome-free-6.5.1-web/css/all.css"
import "../../css/bootstrap.min.css"
import "../../css/main.css"
import "../../css/popup.css"

export default function ActivityDetailPopUp() {

  return (
    <>
        <div className="overlay"></div>

        <div className="activity-popup-detail-container">
            <h5 className="activity-popup-detail-title">
                Receive
                <div className="activity-popup-detail-title-close">
                    <i className="fa-solid fa-xmark"></i>
                </div>
            </h5>
            <div className="activity-popup-detail-body">
                <div className="activity-popup-detail-row flex-row">
                    <strong>Status</strong>
                    <div className="activity-popup-detail-content">View on block explorer</div>
                </div>
                <div className="activity-popup-detail-row flex-row">
                    <strong>Confirmed</strong>
                    <div className="activity-popup-detail-content">Copy transaction ID</div>
                </div>
                <div className="flex-row activity-popup-detail-row-from-to">
                    <strong>From</strong>
                    <strong>To</strong>
                </div>
                <div className="flex-row">
                    <div className="">0x56242....631</div>
                    <div className="activity-popup-detail-arrow flex-row">
                        <i className="fa-solid fa-arrow-right"></i>
                    </div>
                    <div className="">0x56242....631</div>
                </div>
                <div className="flex-row activity-popup-detail-row-from-to activity-popup-detail-row-title">
                    <strong>Transaction</strong>
                </div>
                <div className="activity-popup-detail-row flex-row">
                    <strong>Nonce</strong>
                    <div className="activity-popup-detail-tx">481386</div>
                </div>
                <div className="activity-popup-detail-row flex-row">
                    <strong>Amount</strong>
                    <div className="activity-popup-detail-tx"><strong>0.5 SepoliaETH</strong></div>
                </div>
                <div className="activity-popup-detail-row flex-row">
                    <strong>Gas Limit (Units)</strong>
                    <div className="activity-popup-detail-tx">63000</div>
                </div>
                <div className="activity-popup-detail-row flex-row">
                    <strong>Gas price</strong>
                    <div className="activity-popup-detail-tx">0.005140839</div>
                </div>
                <div className="activity-popup-detail-row flex-row">
                    <strong>Total</strong>
                    <div className=""><strong>0.50000032 SepoliaETH</strong></div>
                </div>
            </div>
        </div>

    </>
  );
}
