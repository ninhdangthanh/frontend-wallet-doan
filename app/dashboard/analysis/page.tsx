"use client";

import ChainAnalytics from "@/app/components/blockchain-analytics/chain-analyze"
import TxPoolAnalyzer from "@/app/components/blockchain-analytics/tx_pending_rank"

export default function Analysis() {

    return (
        <>
            <div className="shadow-md py-4 px-6 relative flex items-center justify-center">
                <div
                    className={`w-1/3 py-2.5 cursor-pointer border-b-2 border-t-2 border-orangered`}
                >
                    Chain Analytics
                </div>
                <div
                    className={`w-1/3 py-2.5 cursor-pointer border-b-2 border-t-2 border-black`}
                >
                    Tokens
                </div>
                <div
                    className={`w-1/3 py-2.5 cursor-pointer border-b-2 border-t-2 border-black`}
                >
                    Activitys
                </div>
            </div>

            <ChainAnalytics />
            <TxPoolAnalyzer />
        </>
    );
}

