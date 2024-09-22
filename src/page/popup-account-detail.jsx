import PropTypes from "prop-types";
import PopupComponent from "../component/popup-component";
PopupAccountDetails.propTypes = {
  onCancel: PropTypes.func.isRequired, // Validate the onCancel prop
};
export default function PopupAccountDetails({ onCancel }) {
  return (
    <PopupComponent>
      <h5 className="flex justify-between w-full text-xl">
        Account details
        <div className="activity-popup-detail-title-close">
          <i className="fa-solid fa-xmark" onClick={onCancel}></i>
        </div>
      </h5>
      <div className="w-full justify-center flex flex-col items-center">
        <img
          src=".\src\assets\react.svg"
          alt=""
          className="w-[50px] h-[50px] mt-4"
        />

        <div className="">
          <div className="text-xl mt-6">Account 3</div>

          <i className="fa-solid fa-pen-to-square"></i>
        </div>

        <div className="w-full flex items-start flex-col mt-6">
          <div className="show-private-key-enter-password-title">
            Enter your password to show private key:
          </div>
          <input
            type="password"
            className="bg-white px-3 py-2 rounded-md w-full my-3"
            placeholder="Password"
          />
        </div>

        <div className="w-full justify-evenly flex mt-5">
          <div className="border-[1px] mr-1 font-bold text-orangered border-orangered px-4 py-2 rounded-full flex w-full justify-center">
            Cancel
          </div>
          <div className="ml-1 font-bold text-black bg-orangered px-4 py-2 rounded-full flex w-full justify-center">
            Confirm
          </div>
        </div>
      </div>
    </PopupComponent>
  );
}
