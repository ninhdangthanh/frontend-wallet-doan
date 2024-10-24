import { accountApi } from "@/api-client/account-api";
import { showApiLoading } from "@/redux/slice/apiLoadingSlice";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { hideApiLoading, showApiLoading } from "@/redux/slice/apiLoadingSlice";
import { accountApi } from "@/api-client/account-api";

PopupAddPrivateKeyBlockchainAccount.propTypes = {
  onCancel: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default function PopupAddPrivateKeyBlockchainAccount({
  onCancel,
  className = "w-[350px]",
  children,
}) {
  
    const [privateKey, setPrivateKey] = useState("")
    const [accountName, setAccountName] = useState("")
    const dispatch = useDispatch();
  
    const importAccountRequest = async () => {
      if (privateKey == "" || !privateKey.startsWith("0x")) {
          alert("Please fill in the correct private key.")
          return;
      }

      try {
          dispatch(showApiLoading());

          let account = await accountApi.importAccount(privateKey, accountName);
          // TODO: add accont to redux
          
          toast.success('Import account successfully', {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'dark',
          });
          setIsShowAddAccountPopup(false)
      } catch (error) {
          toast.error('Import account failed', {
              position: 'top-right',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: 'dark',
          });
      }
      dispatch(hideApiLoading());
  }


  return (
    <div onClick={onCancel} className="text-black fixed inset-0 z-50 bg-black bg-opacity-10 scrollbar-thin backdrop-blur-sm flex justify-center items-center mx-4 overflow-y-auto">
    {/* Popup container */}
    <div
      className={`${className} p-4 min-ss:w-[320px] flex-col justify-center items-center bg-linear-gradient-grey border border-border-color rounded-[12px] flex bg-neutral-900`}
    >
      <div className="text-orangered pb-3 pt-1 text-center font-bold text-[22px]">Import Blockchain Account</div>

      {/* Popup body */}
      <div className="w-full mt-6 justify-center flex flex-col items-center">
        <div>
          <label for="account_name" class="block mb-2 text-sm font-medium text-orange-500 dark:text-orange-500">Account name</label>
          <input  value={accountName} onChange={e => setAccountName(e.target.value)} type="text" placeholder="Account name" required id="account_name" className="w-[280px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-800 focus:border-orange-800 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-800 dark:focus:border-orange-800" />
        </div>
        <div className="pt-4">
          <label for="private_key" class="block mb-2 text-sm font-medium text-orange-500 dark:text-orange-500"><strong>Private Key</strong></label>
          <input value={privateKey} onChange={e => setPrivateKey(e.target.value)} type="text" placeholder="0x.........." required id="account_name" className="w-[280px] bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-orange-800 focus:border-orange-800 block p-2 dark:bg-gray-700 dark:border-orangered dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-800 dark:focus:border-orange-800 border border-orangered" />
        </div>
        <br />
        <button onClick={() => importAccountRequest()} className="px-16 py-2 mb-3 rounded-lg whitespace-nowrap w-[280px] text-16 radius font-bold bg-black text-orangered border-solid border-2 border-orange-800 hover:bg-orangered hover:text-orange-400 hover:border-orangered">
          Import
        </button>
      </div>


      {/* Additional content */}
      {children}
    </div>
  </div>
  );
}
