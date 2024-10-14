import PropTypes from "prop-types";

PopupAddNewBlockchainAccount.propTypes = {
  onCancel: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default function PopupAddNewBlockchainAccount({
  onCancel,
  className = "w-[350px]",
  children,
}) {
  return (
    <div onClick={onCancel} className="text-black fixed inset-0 z-50 bg-black bg-opacity-10 scrollbar-thin backdrop-blur-sm flex justify-center items-center mx-4 overflow-y-auto">
      {/* Popup container */}
      <div
        className={`${className} p-4 min-ss:w-[320px] flex-col justify-center items-center bg-linear-gradient-grey border border-border-color rounded-[12px] flex bg-neutral-900`}
      >
        <div className="text-orangered pb-3 pt-1 text-center font-bold text-[22px] text-center">Create Blockchain Account</div>

        {/* Popup body */}
        <div className="w-full mt-6 justify-center flex flex-col items-center">
          <div>
            <label for="account_name" class="block mb-2 text-sm font-medium text-orange-500 dark:text-orange-500">Account name</label>
            <input type="text" placeholder="Account name" required id="account_name" className="w-[280px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-800 focus:border-orange-800 block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-800 dark:focus:border-orange-800" />
          </div>
          <br />
          <button className="px-16 py-2 mb-3 rounded-lg whitespace-nowrap w-[280px] text-16 radius font-bold bg-black text-orangered border-solid border-2 border-orange-800 hover:bg-orangered hover:text-orange-400 hover:border-orangered">
            Create
          </button>
        </div>


        {/* Additional content */}
        {children}
      </div>
    </div>
  );
}
