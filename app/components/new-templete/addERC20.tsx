"use client";

import "../../../css/fontawesome-free-6.5.1-web/css/all.css"
import "../../../css/bootstrap.min.css"
import "../../../css/main.css"
import "../../../css/popup.css"
import { useState } from "react";
import { ERC20Import, tokenApi } from "@/api-client/token-api";
import { useDispatch, useSelector } from "react-redux";
import { selectedAccount } from "@/redux/slice/accountSlice";
import { toast } from "react-toastify";
import { hideApiLoading, showApiLoading } from "@/redux/slice/apiLoadingSlice";
import { addToken } from "@/redux/slice/ERC20Slice";

export default function AddERC20PopUp(props: any) {
    const {setIsShowAddTokenERC20} = props
    let className = "w-[350px]"
    
    const dispatch = useDispatch();
    const [tokenAddress, setTokenAddress] = useState("")
    const account = useSelector(selectedAccount);

    const importTokenERC20 = async () => {
        let tokenInfo : ERC20Import = {
            account_id: account.id,
            token_address: tokenAddress
        };
        dispatch(showApiLoading())

        try {
            let result = await tokenApi.importTokenERC20(tokenInfo)
            dispatch(addToken(result.data.data))
            toast.success('Add token ERC20 successfully', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
            });
        } catch (error) {
            toast.error('Add token ERC20 failed', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
            });
        } finally {
            setIsShowAddTokenERC20(false)
            dispatch(hideApiLoading())
        }
    }

    return (
        <>
            <div onClick={() => setIsShowAddTokenERC20(false)} className="text-black fixed inset-0 z-10 bg-black bg-opacity-10 scrollbar-thin backdrop-blur-sm flex justify-center items-center mx-4 overflow-y-auto">
            </div>

            <div
        className={`${className}  fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-50  p-4 min-ss:w-[320px] flex-col justify-center items-center bg-linear-gradient-grey border border-border-color rounded-[12px] flex bg-neutral-900`}
      >
        <div className="text-orangered pb-3 pt-1 text-center font-bold text-[22px]">Add Token ERC20</div>

        <div className="w-full mt-6 justify-center flex flex-col items-center">
          <div>
            <label htmlFor="account_name" className="block mb-2 text-sm font-medium text-orange-500 dark:text-orange-500">Token Address</label>
            <input type="text"  value={tokenAddress} onChange={e => setTokenAddress(e.target.value)} placeholder="0x..............." required id="account_name" className="w-[280px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-800 focus:border-orange-800 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-800 dark:focus:border-orange-800" />
          </div>
          <br />
          <button onClick={() => importTokenERC20()} className="px-16 py-2 mb-3 rounded-lg whitespace-nowrap w-[280px] text-16 radius font-bold bg-black text-orangered border-solid border-2 border-orange-800 hover:bg-orangered hover:text-orange-400 hover:border-orangered">
            Add
          </button>
        </div>


      </div>

            {/* <div className="network-add-container border-white">
                <form onSubmit={(e) => importTokenERC20(e)}>
                    <h3 className="network-select-title">
                        Import token ERC20
                        <div onClick={() => setIsShowAddTokenERC20(false)} className="network-select-close">
                            <i className="fa-solid fa-xmark"></i>
                        </div>
                    </h3>
                    <div className="network-select-body">
                        <div className="form-group network-add-field">
                            <label htmlFor="network-name">Token address</label>
                            <input value={tokenAddress} onChange={e => setTokenAddress(e.target.value)} type="text" className="form-control" id="network-name" />
                        </div>
                    </div>
                    <button type="submit" className="network-select-add">
                        Import
                    </button>
                </form>
            </div> */}
        </>
    );
}
