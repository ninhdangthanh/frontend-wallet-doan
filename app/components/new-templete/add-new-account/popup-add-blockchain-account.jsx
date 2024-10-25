import PropTypes from "prop-types";

PopupAddBlockchainAccount.propTypes = {
  onCancel: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
  setPopupImportBlockchainAccount: () => any,
  setPopupCreateNewBlockchainAccount: () => any
};

export default function PopupAddBlockchainAccount({
  onCancel,
  className = "w-[350px]",
  children,
  setPopupImportBlockchainAccount,
  setPopupCreateNewBlockchainAccount
}) {
  return (
    <>
    <div onClick={onCancel} className="text-black fixed inset-0 z-40 bg-black bg-opacity-10 scrollbar-thin backdrop-blur-sm flex justify-center items-center mx-4 overflow-y-auto">
    </div>
    <div
        className={`${className} fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-50 p-4 min-ss:w-[320px] flex-col justify-center items-center bg-linear-gradient-grey border border-border-color rounded-[12px] flex bg-neutral-900`}
      >
        <div className="text-orangered pb-3 pt-1 font-bold text-2xl text-center">Add Blockchain account</div>

        <div className="w-full mt-6 justify-center flex flex-col items-center">
          <button onClick={() => {
            onCancel()
            setPopupCreateNewBlockchainAccount(true)
          }} className="px-16 py-2 mb-3 rounded-lg whitespace-nowrap w-[280px] text-16 radius font-bold bg-black text-orangered border-solid border-2 border-orange-800 hover:bg-orangered hover:text-orange-400 hover:border-orangered">
            Create New
          </button>
          <button onClick={() => {
            onCancel()
            setPopupImportBlockchainAccount(true)
          }} className="px-16 py-2 mb-3 rounded-lg whitespace-nowrap w-[280px] text-16 radius font-bold bg-black text-orangered border-solid border-2 border-orange-800 hover:bg-orangered hover:text-orange-400 hover:border-orangered">
            Import with Private Key
          </button>
        </div>
      </div>
    </>
  );
}
