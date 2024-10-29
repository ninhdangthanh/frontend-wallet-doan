"use client";

import { Activity as ActivityModel, activityApi } from "@/api-client/activity-api";
import ActivityDetailPopUp from "@/app/components/popup/activityDetail";
import { useWebSocket } from "@/app/context/WebSocketContext";
import { selectedAccount } from "@/redux/slice/accountSlice";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Activity() {
    let [isShowDetail, setIsShowDetail] = useState(false)
    let [activityDetail, setActivityDetail] = useState<ActivityModel>()
    let [activities, setActivities] = useState<ActivityModel[]>([])
    const account = useSelector(selectedAccount);

    const { sendMessage } = useWebSocket();


    useEffect(() => {
        const interval = setInterval(() => {
        sendMessage("Message from Activity (child)");
        }, 3000); // Send every 3 seconds
    
        return () => {
        clearInterval(interval); // Clear interval on component unmount
        };
    }, [sendMessage]);
    
    useEffect(() => {
        getActivities()
    }, [])

    useEffect(() => {
        getActivities()
    }, [account])
    
    
    const getActivities = async () => {
        let activities = await activityApi.getActivity(account.id)
        console.log("activities ", activities.data);
        setActivities(activities.data)
    }

    return (
        <>
            {isShowDetail && <ActivityDetailPopUp setIsShowDetail={setIsShowDetail} activity={activityDetail} account={account} />}
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
                {activities.map((act, index) => {
                    return (<div onClick={() => {
                        setIsShowDetail(true)
                        setActivityDetail(act)
                    }} className={
                        index % 2 == 0 ? "bg-orange-300 bg-opacity-5 flex justify-between flex-row w-full py-3 px-8 hover:bg-orange-900 hover:bg-opacity-25":
                        "flex justify-between flex-row w-full py-3 px-8 hover:bg-orange-900 hover:bg-opacity-25"
                    }>
                        <div className="flex justify-start items-center">
                            {
                                account.address == act.from ? 
                                <i className="fa-solid fa-arrow-up rotate-45 text-orangered p-2 border-2 border-orangered rounded-full w-9 h-9 "></i> :
                                <i className="fa-solid fa-arrow-up rotate-[-135deg] text-orangered p-2 border-2 border-orangered rounded-full w-9 h-9 "></i>
                            }
                            <div className="flex-col items-start pl-3 flex">
                                <div className="text-[20px] font-semibold">{
                                    account.address == act.from ? "Transfer" : "Receive"
                                }</div>
                                <div
                                className={
                                    act.status === "FAILED" ? "text-red" :
                                    act.status === "PENDING" ? "text-yellow" :
                                    act.status === "SUCCESS" ? "text-green" :
                                    ""
                                }
                                >
                                {act.status}
                                </div>
                            </div>
                        </div>
                        <div className="items-center text-end">
                            <div className="text-[18px] font-semibold text-orange-600"> {account.address == act.from ? "-" : "+"} {act.amount} {act.erc20_symbol ? act.erc20_symbol : "ETH"}</div>
                            {new Date(act.createdAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                            })}   
                        </div>
                    </div>)
                })}
            </div>
        </>
    );
}
