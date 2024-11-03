'use client'

import { Activity as ActivityModel, GetActivityParams, activityApi } from "@/api-client/activity-api";
import ActivityDetailPopUp from "@/app/components/popup/activityDetail";
import { selectedAccount } from "@/redux/slice/accountSlice";
import { addManyActivities, selectActivities } from "@/redux/slice/activitySlice";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Activity() {
    const [isShowDetail, setIsShowDetail] = useState(false);
    const [activityDetail, setActivityDetail] = useState<ActivityModel>();
    const [statusFilter, setStatusFilter] = useState("");
    const [typeFilter, setTypeFilter] = useState("");
    const [page, setPage] = useState(1);
    const [pageSize] = useState(10);
    const [hasMore, setHasMore] = useState(true);

    const dispatch = useDispatch();
    const account = useSelector(selectedAccount);
    const activities = useSelector(selectActivities);

    useEffect(() => {
        getActivities();
    }, [account, statusFilter, typeFilter, page]);

    const getActivities = async () => {
        const query: GetActivityParams = {
            accountId: account.id,
            status: statusFilter,
            type: typeFilter,
            page,
            pageSize,
        };

        const response = await activityApi.getActivity(query);
        dispatch(addManyActivities(response.data.data));
        
        // Check if there are more activities to load
        setHasMore(response.data.data.length === pageSize);
    };

    const handleStatusChange = (e: any) => {
        setStatusFilter(e.target.value);
        setPage(1);
    };

    const handleTypeChange = (e: any) => {
        setTypeFilter(e.target.value);
        setPage(1);
    };

    const handleNextPage = () => setPage((prev) => prev + 1);
    const handlePreviousPage = () => setPage((prev) => Math.max(prev - 1, 1));

    return (
        <>
            {isShowDetail && (
                <ActivityDetailPopUp setIsShowDetail={setIsShowDetail} activity={activityDetail} account={account} />
            )}
            <div className="shadow-md py-4 px-6 relative flex items-center justify-center">
                <Link href="/dashboard/analysis" className="w-1/3 py-2.5 text-white no-underline cursor-pointer border-b-2 border-t-2 border-black">
                    Chain Analytics
                </Link>
                <Link href="/dashboard/home" className="w-1/3 py-2.5 text-white no-underline cursor-pointer border-b-2 border-t-2 border-black">
                    Tokens
                </Link>
                <Link href="/dashboard/activity" className="w-1/3 py-2.5 text-white no-underline cursor-pointer border-b-2 border-t-2 border-orangered">
                    Activity
                </Link>
            </div>

            <div className="flex flex-col items-start w-full p-4 pt-2">
                <div className="flex gap-4 mb-4">

                    {/* Status Filter Select */}
                    <select
                        value={statusFilter}
                        onChange={handleStatusChange}
                        className="bg-gray-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-700 focus:border-orange-700 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-700 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                    >
                        <option value="">All Statuses</option>
                        <option value="SUCCESS" className="text-green">Success</option>
                        <option value="FAILED" className="text-red">Failed</option>
                        <option value="PENDING" className="text-yellow">Pending</option>
                    </select>

                    {/* Type Filter Select */}
                    <select
                        value={typeFilter}
                        onChange={handleTypeChange}
                        className="bg-gray-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-700 focus:border-orange-700 block w-full p-2.5 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                    >
                        <option value="">All Types</option>
                        <option value="Transfer">Transfer</option>
                        <option value="Receive">Receive</option>
                    </select>
                </div>

                {activities.map((act, index) => (
                    <div
                        key={act.id}
                        onClick={() => {
                            setIsShowDetail(true);
                            setActivityDetail(act);
                        }}
                        className={
                            index % 2 === 0
                                ? "bg-orange-300 bg-opacity-5 flex justify-between flex-row w-full py-3 px-8 hover:bg-orange-900 hover:bg-opacity-25"
                                : "flex justify-between flex-row w-full py-3 px-8 hover:bg-orange-900 hover:bg-opacity-25"
                        }
                    >
                        <div className="flex justify-start items-center">
                            {account.address === act.from ? (
                                <i className="fa-solid fa-arrow-up rotate-45 text-orangered p-2 border-2 border-orangered rounded-full w-9 h-9 "></i>
                            ) : (
                                <i className="fa-solid fa-arrow-up rotate-[-135deg] text-orangered p-2 border-2 border-orangered rounded-full w-9 h-9 "></i>
                            )}
                            <div className="flex-col items-start pl-3 flex">
                                <div className="text-[20px] font-semibold">
                                    {account.address === act.from ? "Transfer" : "Receive"}
                                </div>
                                <div className={
                                    act.status === "FAILED"
                                        ? "text-red"
                                        : act.status === "PENDING"
                                        ? "text-yellow"
                                        : act.status === "SUCCESS"
                                        ? "text-green"
                                        : ""
                                }>
                                    {act.status}
                                </div>
                            </div>
                        </div>
                        <div className="items-center text-end">
                            <div className="text-[18px] font-semibold text-orange-600">
                                {account.address === act.from ? "-" : "+"} {act.amount}{" "}
                                {act.erc20_symbol ? act.erc20_symbol : "ETH"}
                            </div>
                            {new Date(act.createdAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                            })}
                        </div>
                    </div>
                ))}

            </div>
            <div className="flex items-center justify-center pb-10">
                <button onClick={handlePreviousPage} disabled={page === 1} className={page !== 1 ? "w-28 bg-black py-1 border text-orangered rounded-xl": "w-28 bg-black py-1 text-orange-950 rounded-xl"}>
                    Previous
                </button>
                <span className="px-4 font-bold text-orangered text-xl">Page {page}</span>
                <button onClick={handleNextPage} disabled={!hasMore} className={hasMore ? "w-28 bg-black py-1 border text-orangered rounded-xl": "w-28 bg-black py-1 text-orange-950 rounded-xl"}>
                    Next
                </button>
            </div>
        </>
    );
}
