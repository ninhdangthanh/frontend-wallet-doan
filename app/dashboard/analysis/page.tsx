"use client";

import ChainAnalytics from "@/app/components/blockchain-analytics/chain-analyze"
import TxPoolAnalyzer from "@/app/components/blockchain-analytics/tx_pending_rank"
import Link from "next/link";

export default function Analysis() {

    return (
        <>
            <div className="shadow-md py-4 px-6 relative flex items-center justify-center">
                <Link
                    href="/dashboard/analysis"
                    className={`w-1/3 py-2.5 text-white no-underline cursor-pointer border-b-2 border-t-2 border-orangered`}
                >
                    Chain Analytics
                </Link>
                <Link
                    href="/dashboard/home"
                    className={`w-1/3 py-2.5 text-white no-underline cursor-pointer border-b-2 border-t-2 border-black`}
                >
                    Tokens
                </Link>
                <Link
                    href="/dashboard/activity"
                    className={`w-1/3 py-2.5 text-white no-underline cursor-pointer border-b-2 border-t-2 border-black`}
                >
                    Activitys
                </Link>
            </div>

            <ChainAnalytics />
            <TxPoolAnalyzer />
        </>
    );
}

