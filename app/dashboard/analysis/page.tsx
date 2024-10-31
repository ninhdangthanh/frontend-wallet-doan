"use client";

import ChainAnalytics from "@/app/components/blockchain-analytics/chain-analyze"
import TxPoolAnalyzer from "@/app/components/blockchain-analytics/tx_pending_rank"
import Link from "next/link";
import { useState } from "react";

export default function Analysis() {
    const [blockNumber, setBlockNumber] = useState('');

    const handleSubmitSearchBlock = (e: any) => {
        e.preventDefault(); // Prevent default form submission behavior
        
        const number = Number(blockNumber);
        
        // Check if the input is a valid number
        if (!isNaN(number) && Number.isInteger(number) && number > 0) {
            const url = `https://etherscan.io/block/${number}`;
            window.open(url, '_blank'); // Open in new tab
        } else {
            alert('Please enter a valid block number'); // Alert for invalid input
        }
    };
    
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

            <form className="max-w-xl mx-auto mt-2 pb-2" onSubmit={handleSubmitSearchBlock}>
                <div className="relative">
                    <input
                        type="number"
                        value={blockNumber}
                        onChange={(e) => setBlockNumber(e.target.value)}
                        id="default-search"
                        className="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-3xl bg-gray-50 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                        placeholder="Block number"
                        required
                    />
                    <button
                        type="submit"
                        className="text-white absolute end-4 bottom-[50%] translate-y-[50%] bg-orange-800 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-500 rounded-3xl text-base px-4 py-2 dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
                    >
                        Search
                    </button>
                </div>
            </form>

            <ChainAnalytics />
            {/* <TxPoolAnalyzer /> */}
        </>
    );
}

