import "@fortawesome/fontawesome-free/css/all.min.css";
import { useState } from "react";
import PopupDetailActivity from "../popup-activity-detail";
import PopupAccountDetails from "../popup-account-detail";
import PopupSelectAccount from "../popup-select-account";
import ListTokens from "./list-token";
import ListActivitys from "./list-activity";
import PopupAddBlockchainAccount from "../popup-add-blockchain-account";

function IndexPage() {
  var [popupAccountDetails, setPopupAccountDetails] = useState(false);
  var [popupActivityDetail, setPopupActivityDetail] = useState(false);
  var [popupSelectAccount, setPopupSelectAccount] = useState(false);
  var [popupAddBlockchainAccount, setPopupAddBlockchainAccount] = useState(false);
  var [tabIndex, setTabIndex] = useState(1);
  return (
    <div className=" items-center justify-center flex flex-col text-center bg-black h-max">
      {popupAddBlockchainAccount && (
        <PopupAddBlockchainAccount
          onCancel={() => {
            setPopupAddBlockchainAccount(false);
          }}
        ></PopupAddBlockchainAccount>
      )}
      {popupAccountDetails && (
        <PopupAccountDetails
          onCancel={() => {
            setPopupAccountDetails(false);
          }}
        ></PopupAccountDetails>
      )}
      {popupActivityDetail && (
        <PopupDetailActivity
          onCancel={() => {
            setPopupActivityDetail(false);
          }}
        ></PopupDetailActivity>
      )}{" "}
      {popupSelectAccount && (
        <PopupSelectAccount
          onCancel={() => {
            setPopupSelectAccount(false);
          }}
        ></PopupSelectAccount>
      )}
      <h1 className="text-orangered pt-10 pb-10 bg-black items-center justify-center flex text-4xl font-bold">
        U2MYA BLOCKCHAIN WALLET
      </h1>
      {/* <button class="relative inline-flex items-center justify-center p-0.5 mb-6 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
          <span class="relative w-40 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Log out
          </span>
        </button> */}
      <div className="bg-backgroundColor w-[1000px] items-center h-full">
        <div className="relative pt-[26px] pb-[26px] px-[16px]  flex items-center justify-between">
          <div
            onClick={() => {
              setPopupAddBlockchainAccount(true)
            }}
            className="cursor-pointer bg-black py-[6px] rounded-3xl px-3 flex  items-center justify-center"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/5264/5264885.png"
              alt=""
              className="w-6 h-6 rounded-[50px] bg-white"
            />
            <div className="px-[6px] text-sm">Add blockchain account</div>
          </div>
          <h3
            onClick={() => {
              setPopupSelectAccount(true);
            }}
            className="absolute cursor-pointer left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-between"
          >
            <img src=".\src\assets\react.svg" alt="" className="w-8 h-8" />
            <div className="px-[10px]">Account 1</div>
            <i className="text-sm pl-3 fa-solid fa-chevron-down"></i>
          </h3>

          <div onClick={() => {
              setPopupAccountDetails(true);
            }} className="px-4 py-1 rounded-full font-bold text-2xl hover:bg-orange-900 hover:bg-opacity-30">
            <i className="fa-solid fa-ellipsis-vertical"></i>
          </div>
        </div>
        <div className="items-center  w-full ">
          <div className="flex items-center flex-col">
            {" "}
            <div
              className="inline-flex  justify-center text-orange-600 bg-[#422D24] px-4 py-1.5 rounded-[20px] mb-7"
            >
              <div className="pr-[6px]">0xc73cc...cdE73</div>
              <i className="wallet-coin-address-copy fa-regular fa-copy "></i>
            </div>
            <div className="mb-6 mt-2 text-[36px] items-center flex">
              2.8 SepoliaETH
            </div>
          </div>

          <div className=" mb-8 mt-6  w-full flex items-center justify-center ">
            <div className="w-56 cursor-pointer flex flex-col items-center justify-between">
              <div className="mb-2.5 bg-orange-600 w-10 h-10 rounded-full rotate-45 flex items-center justify-center">
                <i className="fa-solid fa-arrow-up wallet-coin-option-button-send"></i>
              </div>
              <span>Send Ethers</span>
            </div>
            <div className="w-56 cursor-pointer flex flex-col  items-center justify-between">
              <div className="mb-2.5 bg-orange-600 w-10 h-10 rounded-full  wallet-coin-option-button-disabled flex items-center justify-center">
              <i class="fa-solid fa-plus"></i>
              </div>
              <span>Import token</span>
            </div>
          </div>
        </div>
        <div className="wallet-container-activity">
          <div className="shadow-md py-4 px-6 relative flex items-center justify-center">
            <div
              onClick={() => {
                setTabIndex(0);
              }}
              className={`w-1/3 pb-2.5 cursor-pointer ${
                tabIndex == 0 ? "border-b-2 border-orangered" : ""
              }  `}
            >
              Chain Analytics
            </div>
            <div
              onClick={() => {
                setTabIndex(1);
              }}
              className={`w-1/3 pb-2.5 cursor-pointer ${
                tabIndex == 1 ? "border-b-2 border-orangered" : ""
              }  `}
            >
              Tokens
            </div>
            <div
              onClick={() => {
                setTabIndex(2);
              }}
              className={`w-1/3 pb-2.5 cursor-pointer ${
                tabIndex == 2 ? "border-b-2 border-orangered" : ""
              }  `}
            >
              Activitys
            </div>
          </div>
          {tabIndex == 0 ? (
            <ListTokens></ListTokens>
          ) : tabIndex == 1 ? (
            <ListTokens></ListTokens>
          ) : (
            <ListActivitys setPopupActivityDetail={setPopupActivityDetail}></ListActivitys>
          )}
        </div>
      </div>
    </div>
  );
}

export default IndexPage;
