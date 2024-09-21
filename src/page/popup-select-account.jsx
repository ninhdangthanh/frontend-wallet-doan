import PopupComponent from "../component/popup-component";
import PropTypes from "prop-types";
PopupSelectAccount.propTypes = { onCancel: PropTypes.func.isRequired };
export default function PopupSelectAccount({ onCancel }) {
  return (
    <PopupComponent className={"w-[450px]"}>
      {" "}
      <div className="flex w-full flex-col">
        <div className="flex justify-between pb-5 text-[20px] font-semibold">
          Select an account
          <div className="network-select-close" onClick={onCancel}>
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>

        <div className="flex justify-between py-6 p-2 my-2 items-center hover:bg-orange-900 hover:bg-opacity-30">
          <div className="flex ">
            {" "}
            <img
              src=".\src\assets\react.svg"
              alt="N"
              className="network-select-item-logo"
            />
            <div className="flex items-start flex-col pl-5">
              <div className="text-[16px] font-bold">Account 1</div>
              <div className="text-[14px] pt-2">0xc73cc...cdE73</div>
            </div>
          </div>

          <div className="flex">
            {" "}
            <div className="flex-col">
              <div className="network-select-item-name1">0.5 SepoliaETH</div>
            </div>
            <div className="pl-5">
              <i className="fa-solid fa-ellipsis-vertical"></i>
            </div>
          </div>
        </div>

        <div className="flex justify-between py-6 p-2 my-2 items-center hover:bg-orange-900 hover:bg-opacity-30">
          <div className="flex ">
            {" "}
            <img
              src=".\src\assets\react.svg"
              alt="N"
              className="network-select-item-logo"
            />
            <div className="flex items-start flex-col pl-5">
              <div className="text-[16px] font-bold">Account 1</div>
              <div className="text-[14px] pt-2">0xc73cc...cdE73</div>
            </div>
          </div>

          <div className="flex">
            {" "}
            <div className="flex-col">
              <div className="network-select-item-name1">0.5 SepoliaETH</div>
            </div>
            <div className="pl-5">
              <i className="fa-solid fa-ellipsis-vertical"></i>
            </div>
          </div>
        </div>

        <div className="flex justify-between py-6 p-2 my-2 items-center hover:bg-orange-900 hover:bg-opacity-30">
          <div className="flex ">
            {" "}
            <img
              src=".\src\assets\react.svg"
              alt="N"
              className="network-select-item-logo"
            />
            <div className="flex items-start flex-col pl-5">
              <div className="text-[16px] font-bold">Account 1</div>
              <div className="text-[14px] pt-2">0xc73cc...cdE73</div>
            </div>
          </div>

          <div className="flex">
            {" "}
            <div className="flex-col">
              <div className="network-select-item-name1">0.5 SepoliaETH</div>
            </div>
            <div className="pl-5">
              <i className="fa-solid fa-ellipsis-vertical"></i>
            </div>
          </div>
        </div>

        <div className="flex justify-between py-6 p-2 my-2 items-center hover:bg-orange-900 hover:bg-opacity-30">
          <div className="flex ">
            {" "}
            <img
              src=".\src\assets\react.svg"
              alt="N"
              className="network-select-item-logo"
            />
            <div className="flex items-start flex-col pl-5">
              <div className="text-[16px] font-bold">Account 1</div>
              <div className="text-[14px] pt-2">0xc73cc...cdE73</div>
            </div>
          </div>

          <div className="flex">
            {" "}
            <div className="flex-col">
              <div className="network-select-item-name1">0.5 SepoliaETH</div>
            </div>
            <div className="pl-5">
              <i className="fa-solid fa-ellipsis-vertical"></i>
            </div>
          </div>
        </div>
      </div>
    </PopupComponent>
  );
}
