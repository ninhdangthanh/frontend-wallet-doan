import PropTypes from "prop-types";

PopupSelectAccount.propTypes = {
  onCancel: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default function PopupSelectAccount({ onCancel, className = "w-[450px]" }) {
  return (
    <div onClick={onCancel} className="fixed text-white inset-0 z-50 bg-black bg-opacity-10 scrollbar-thin backdrop-blur-sm flex justify-center items-center mx-4 overflow-y-auto">
      <div
        className={`${className} py-4 px-8 min-ss:w-[320px] flex-col justify-center items-center bg-linear-gradient-grey border border-border-color rounded-[12px] flex bg-neutral-900`}
      >
        {/* Popup Header */}
        <div className="flex justify-between pb-4 text-[24px] text-orangered font-semibold">
          Select an account
        </div>

        {/* Account List */}
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="flex w-full justify-between py-6 p-2 my-2 items-center hover:bg-orange-900 hover:bg-opacity-30"
          >
            <div className="flex">
              <img
                src="https://stockimg.ai/_next/image?url=https%3A%2F%2Fmedia.stockimg.ai%2Fdalle-logo%2FGxTmDiIiWDP0.png&w=1920&q=75"
                alt="N"
                className="network-select-item-logo"
              />
              <div className="flex items-start flex-col pl-2">
                <div className="text-[18px] font-bold">Account {index + 1}</div>
                <div className="text-[13px] pt-2 text-gray-400">0xc73cc...cdE73</div>
              </div>
            </div>

            {/* <div className="w-12"></div> */}

            <div className="flex">
              <div className="flex-col">
                <div className="network-select-item-name1">0.0{index + 1} <span className="text-gray-400">ETH</span></div>
              </div>
              <div className="pl-5">
                <i className="fa-solid fa-ellipsis-vertical"></i>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
