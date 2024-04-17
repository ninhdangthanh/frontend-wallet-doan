"use client";

import Link from "next/link";
import "../../../css/fontawesome-free-6.5.1-web/css/all.css"
import "../../../css/main.css"

export default function SignIn() {

  return (
    <>
        <div className="wallet-activity-header flex-row">
            <Link key="Home" href="/dashboard/home"  className="wallet-activity-header-option ">Token</Link>
            <Link key="Activity" href="/dashboard/activity"  className="wallet-activity-header-option wallet-activity-header-option-active">Activity</Link>
        </div>
        <div className="wallet-activity-body"> 
            <div className="wallet-activity-body-tokens">
                <div className="wallet-token-item-activity">
                    <div className="wallet-token-item-activity-day">
                        Jan 24, 2024
                    </div>
                    <div className="">
                        <div className="wallet-token-item-activity-body-item">
                            <div className="wallet-token-item-activity-icon">
                                <i className="fa-solid fa-arrow-up wallet-token-item-activity-icon-i"></i>
                            </div>
                            <div className="wallet-token-item-activity-body-details flex-row">
                                <div className="wallet-token-item-activity-body-details-title">
                                    <h3>Transfer</h3>
                                    <div className="wallet-token-item-activity-body-details-status-confirmed">
                                        Confirmed
                                    </div>
                                </div>
                                <div className="wallet-token-item-activity-body-details-amount">
                                    <div>-0.5 ETH</div>
                                    <div>-0.5 ETH</div>
                                </div>
                            </div>
                        </div>
                        <div className="wallet-token-item-activity-body-item">
                            <div className="wallet-token-item-activity-icon">
                                <i className="fa-solid fa-arrow-up wallet-token-item-activity-icon-i"></i>
                            </div>
                            <div className="wallet-token-item-activity-body-details flex-row">
                                <div className="wallet-token-item-activity-body-details-title">
                                    <h3>Transfer</h3>
                                    <div className="wallet-token-item-activity-body-details-status-failed">
                                        Failed
                                    </div>
                                </div>
                                <div className="wallet-token-item-activity-body-details-amount">
                                    <div>-0.5 ETH</div>
                                    <div>-0.5 ETH</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="wallet-activity-body-tokens">
                <div className="wallet-token-item-activity">
                    <div className="wallet-token-item-activity-day">
                        Jan 12, 2024
                    </div>
                    <div className="">
                        <div className="wallet-token-item-activity-body-item">
                            <div className="wallet-token-item-activity-icon">
                                <i className="fa-solid fa-download"></i>
                            </div>
                            <div className="wallet-token-item-activity-body-details flex-row">
                                <div className="wallet-token-item-activity-body-details-title">
                                    <h3>Receive</h3>
                                    <div className="wallet-token-item-activity-body-details-status-confirmed">
                                        Confirm
                                    </div>
                                </div>
                                <div className="wallet-token-item-activity-body-details-amount">
                                    <div>-0.5 ETH</div>
                                    <div>-0.5 ETH</div>
                                </div>
                            </div>
                        </div>
                        <div className="wallet-token-item-activity-body-item">
                            <div className="wallet-token-item-activity-icon">
                                <i className="fa-solid fa-arrow-up wallet-token-item-activity-icon-i"></i>
                            </div>
                            <div className="wallet-token-item-activity-body-details flex-row">
                                <div className="wallet-token-item-activity-body-details-title">
                                    <h3>Transfer</h3>
                                    <div className="wallet-token-item-activity-body-details-status-pending">
                                        Pending
                                    </div>
                                </div>
                                <div className="wallet-token-item-activity-body-details-amount">
                                    <div>-0.5 ETH</div>
                                    <div>-0.5 ETH</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="wallet-activity-body-method">
                <div className="wallet-activity-import-token">
                </div>
                <div className="wallet-activity-refresh-list">
                </div>
            </div>
        </div>
    </>
  );
}
