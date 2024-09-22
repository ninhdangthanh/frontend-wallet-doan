import PropTypes from "prop-types";
PopupComponent.propTypes = {
  children: PropTypes.element.isRequired,
  className: PropTypes.string,
};
export default function PopupComponent({ children, className = "w-[350px]" }) {
  return (
    <div className="fixed  inset-0 z-50 bg-black bg-opacity-10 scrollbar-thin backdrop-blur-sm flex justify-center items-center mx-4 overflow-y-auto ">
      {/* content */}
      <div
        className={`${className} p-4 min-ss:w-[320px]  flex-col justify-center items-center bg-linear-gradient-grey border border-border-color rounded-[12px]  flex bg-neutral-900`}
      >
        {children}
      </div>
    </div>
  );
}
