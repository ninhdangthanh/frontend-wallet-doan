import PropTypes from "prop-types";
import PopupComponent from "../component/popup-component";
PopupAddBlockchainAccount.propTypes = {
  onCancel: PropTypes.func.isRequired, // Validate the onCancel prop
};
export default function PopupAddBlockchainAccount({ onCancel }) {
  return (
    <PopupComponent>
      <h5 className="flex justify-between w-full text-xl">
        <strong className="text-orangered">Add Blockchain account</strong>
        <div className="activity-popup-detail-title-close">
          <i className="fa-solid fa-xmark" onClick={onCancel}></i>
        </div>
      </h5>
      <div className="w-full mt-8 justify-center flex flex-col items-center">
        <button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
          <span class="relative w-60 py-3 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Create New
          </span>
        </button>
        <button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
          <span class="relative w-60 py-3 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Import with Private Key
          </span>
        </button>
      </div>
    </PopupComponent>
  );
}
