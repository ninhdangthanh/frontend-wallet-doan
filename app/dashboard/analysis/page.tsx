"use client";

import ChainAnalytics from "@/app/components/blockchain-analytics/chain-analyze"
import TxPoolAnalyzer from "@/app/components/blockchain-analytics/tx_pending_rank"
import env_fe from "@/utils/env_fe";
import Link from "next/link";
import { useState } from "react";

export default function Analysis() {
    const [searchInput, setSearchInput] = useState('');

    const handleSubmitSearch = (e: any) => {
        e.preventDefault();

        if (searchInput.startsWith('0x')) {
            const url = `${env_fe.mainnet_ether_scan}/tx/${searchInput}`;
            window.open(url, '_blank');
        }
        else if (Number(searchInput)) {
            const url = `${env_fe.mainnet_ether_scan}/block/${searchInput}`;
            window.open(url, '_blank');
        } else {
            alert('Please enter a valid block number or transaction hash.');
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

            <form className="w-[70%] mx-auto mt-2 pb-2" onSubmit={handleSubmitSearch}>
                <div className="relative">
                    <input
                        type="text"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        id="default-search"
                        className="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-3xl bg-gray-50 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                        placeholder="Block number, Transaction hash"
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
            <TxPoolAnalyzer />
        </>
    );
}

