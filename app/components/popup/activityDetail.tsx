"use client";

import "../../../css/fontawesome-free-6.5.1-web/css/all.css"
import "../../../css/bootstrap.min.css"
import "../../../css/main.css"
import "../../../css/popup.css"

export default function ActivityDetailPopUp(props: any) {
    const {setIsShowDetail, activity, account} = props

  return (
    <>
        <div className="overlay" onClick={() => setIsShowDetail(false)}></div>

        <div className="activity-popup-detail-container border-2 border-solid border-white">
            <h5 className="activity-popup-detail-title !text-orangered text-2xl">
                {account.address == activity.from ? "Transfer" : "Receive"}
            </h5>
            <div className="activity-popup-detail-body">
                <div className="activity-popup-detail-row flex-row">
                    <div className="activity-popup-detail-content"
                        onClick={() => window.open(`https://sepolia.etherscan.io/tx/${activity.tx_hash}`, '_blank')}
                    >View on block explorer</div>
                    <div className="text-gray-400 font-bold text-sm">Tx Hash</div>
                </div>
                <div className="activity-popup-detail-row flex-row">
                    <strong><div className={
                                    activity.status === "FAILED" ? "text-red" :
                                    activity.status === "PENDING" ? "text-yellow" :
                                    activity.status === "SUCCESS" ? "text-green" :
                                    ""
                                }>{activity.status}</div></strong>
                    <div className="text-sm">{shortenTxHash(activity.tx_hash)}</div>
                </div>
                <div className="flex-row activity-popup-detail-row-from-to">
                    <strong>From</strong>
                    <strong>To</strong>
                </div>
                <div className="flex-row">
                    <div className="">{shortenAddress(activity.from)}</div>
                    <div className="activity-popup-detail-arrow flex-row">
                        <i className="fa-solid fa-arrow-right"></i>
                    </div>
                    <div className="">{shortenAddress(activity.to)}</div>
                </div>
                {activity.erc20_symbol && <div className="flex-row activity-popup-detail-row-from-to activity-popup-detail-row-title">
                    <strong>ERC20 Token</strong>
                    <div className="text-orangered"><strong>{activity.erc20_name}</strong></div>
                </div>}
                <div className="flex-row activity-popup-detail-row-from-to activity-popup-detail-row-title">
                    <strong>Amount</strong>
                    <div className="activity-popup-detail-tx"><strong>{account.address == activity.from ? "-" : "+"} {activity.amount} {activity.erc20_symbol ? activity.erc20_symbol : "ETH"}</strong></div>
                </div>
                <div className="activity-popup-detail-row flex-row">
                    <strong>Date</strong>
                    <div className="activity-popup-detail-tx"><strong>
                    {new Date(activity.createdAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                            })} 
                    </strong></div>
                </div>
                
            </div>
        </div>

    </>
  );
}

const shortenAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-5)}`;
};

const shortenTxHash = (address: string) => {
    return `${address.slice(0, 8)}...${address.slice(-12)}`;
  };
  