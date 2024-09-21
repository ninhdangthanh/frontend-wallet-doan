import PropTypes from "prop-types";
import PopupComponent from "../component/popup-component";
PopupDetailActivity.propTypes = {
  onCancel: PropTypes.func.isRequired, // Validate the onCancel prop
};
export default function PopupDetailActivity({ onCancel }) {
  return (
    <PopupComponent>
      <h5 className="flex justify-between w-full text-xl font-bold">
        Receive
        <div onClick={onCancel}>
          <i className="fa-solid fa-xmark"></i>
        </div>
      </h5>
      <div className="flex w-full flex-col pt-4 text-[14px]">
        <div className="flex justify-between py-2">
          <strong>Status</strong>
          <div className="text-dodgerblue ">View on block explorer</div>
        </div>
        <div className="flex justify-between py-2">
          <strong>Confirmed</strong>
          <div className="text-dodgerblue ">Copy transaction ID</div>
        </div>
        <div className="flex justify-between w-full py-2">
          <strong>From</strong>
          <strong>To</strong>
        </div>
        <div className="flex justify-between w-full  items-center">
          <div className="">0x56242....631</div>
          <div className="border-[2px] rounded-full w-[40px] h-[40px] border-orangered items-center flex flex-col justify-center">
            <i className="fa-solid fa-arrow-right"></i>
          </div>
          <div className="">0x56242....631</div>
        </div>
        <div className="flex justify-between w-full py-2">
          <strong>Transaction</strong>
        </div>
        <div className="flex justify-between w-full py-2">
          <strong>Nonce</strong>
          <div className="activity-popup-detail-tx text-neutral-400">
            481386
          </div>
        </div>
        <div className="flex justify-between w-full py-2">
          <strong>Amount</strong>

          <strong className="text-neutral-400">0.5 SepoliaETH</strong>
        </div>
        <div className="flex justify-between w-full py-2">
          <strong>Gas Limit (Units)</strong>
          <div className="activity-popup-detail-tx text-neutral-400">63000</div>
        </div>
        <div className="flex justify-between w-full py-2">
          <strong>Gas price</strong>
          <div className="activity-popup-detail-tx text-neutral-400">
            0.005140839
          </div>
        </div>
        <div className="flex justify-between w-full py-2">
          <strong>Total</strong>
          <div className="">
            <strong>0.50000032 SepoliaETH</strong>
          </div>
        </div>
      </div>
    </PopupComponent>
  );
}
