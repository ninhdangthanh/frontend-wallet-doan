"use client";

import Link from "next/link";

export default function SignIn() {

    return (
        <>
            <div className="shadow-md py-4 px-6 relative flex items-center justify-center">
                <Link
                    href="/dashboard/analysis"
                    className={`w-1/3 py-2.5 text-white no-underline cursor-pointer border-b-2 border-t-2 border-black`}
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
                    className={`w-1/3 py-2.5 text-white no-underline cursor-pointer border-b-2 border-t-2 border-orangered`}
                >
                    Activitys
                </Link>
            </div>

            <div className="flex flex-col items-start w-full p-4 pt-2">
                <div onClick={() => {
                    // props.setPopupActivityDetail(true);
                }} className="bg-orange-300 bg-opacity-5 flex justify-between flex-row w-full py-3 px-8 hover:bg-orange-900 hover:bg-opacity-25">
                    <div className="flex justify-start items-center">
                        <i className="fa-solid fa-arrow-up rotate-45 text-orangered p-2 border-2 border-orangered rounded-full w-9 h-9 "></i>
                        <div className="flex-col items-start pl-3 flex">
                            <div className="text-[20px] font-semibold">Transfer</div>
                            <div className="text-red">Failed</div>
                        </div>
                    </div>
                    <div className="items-center text-end">
                        <div className="text-[18px] font-semibold text-orangered">-0.12 ETH</div>
                        <div className="text-[13px] font-bold">Jan 20, 2024</div>
                    </div>
                </div>
                <div onClick={() => {
                    // props.setPopupActivityDetail(true);
                }} className="flex justify-between flex-row w-full py-3 px-8 hover:bg-orange-900 hover:bg-opacity-25">
                    <div className="flex justify-start items-center">
                        <i className="fa-solid fa-arrow-up rotate-45 text-orangered p-2 border-2 border-orangered rounded-full w-9 h-9 "></i>
                        <div className="flex-col items-start justify-center pl-3 flex">
                            <div className="text-[20px] font-semibold">Transfer</div>
                            <div className="text-green">Confirm</div>
                        </div>
                    </div>
                    <div className="items-center text-end">
                        <div className="text-[18px] font-semibold text-orangered">-0.12 ETH</div>
                        <div className="text-[13px] font-bold">Jan 20, 2024</div>
                    </div>
                </div>
                <div onClick={() => {
                    // props.setPopupActivityDetail(true);
                }} className="bg-orange-300 bg-opacity-5 flex justify-between flex-row w-full py-3 px-8 hover:bg-orange-900 hover:bg-opacity-25">
                    <div className="flex justify-start items-center">
                        <i className="fa-solid fa-arrow-up rotate-45 text-orangered p-2 border-2 border-orangered rounded-full w-9 h-9 "></i>
                        <div className="flex-col items-start pl-3 flex">
                            <div className="text-[20px] font-semibold">Transfer</div>
                            <div className="text-red">Failed</div>
                        </div>
                    </div>
                    <div className="items-center text-end">
                        <div className="text-[18px] font-semibold text-orangered">-0.12 ETH</div>
                        <div className="text-[13px] font-bold">Jan 20, 2024</div>
                    </div>
                </div>
                <div onClick={() => {
                    // props.setPopupActivityDetail(true);
                }} className="flex justify-between flex-row w-full py-3 px-8 hover:bg-orange-900 hover:bg-opacity-25">
                    <div className="flex justify-start items-center">
                        <i className="fa-solid fa-arrow-up rotate-45 text-orangered p-2 border-2 border-orangered rounded-full w-9 h-9 "></i>
                        <div className="flex-col items-start justify-center pl-3 flex">
                            <div className="text-[20px] font-semibold">Transfer</div>
                            <div className="text-green">Confirm</div>
                        </div>
                    </div>
                    <div className="items-center text-end">
                        <div className="text-[18px] font-semibold text-orangered">-0.12 ETH</div>
                        <div className="text-[13px] font-bold">Jan 20, 2024</div>
                    </div>
                </div>
            </div>
        </>
    );
}
