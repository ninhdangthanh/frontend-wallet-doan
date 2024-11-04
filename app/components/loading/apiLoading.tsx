import "../../../css/popup.css"

export default function ApiLoading() {

    return (
    <>
        <div className="overlay_loading"></div>

        
        <img src="../kOnzy.gif" alt="Loading....." className="api_loading_image" />
        {/* <div className="api_loading_image_text">Loading...</div> */}
    </>
);
}
