"use client";

import "../../../css/fontawesome-free-6.5.1-web/css/all.css"
import "../../../css/bootstrap.min.css"
import "../../../css/main.css"
import "../../../css/popup.css"

export default function AddERC20PopUp(props: any) {
    const {setIsShowAddTokenERC20} = props

    return (
        <>
            <div onClick={() => setIsShowAddTokenERC20(false)} className="overlay"></div>

            <div className="network-add-container">
                <form>
                    <h3 className="network-select-title">
                        Import token ERC20
                        <div onClick={() => setIsShowAddTokenERC20(false)} className="network-select-close">
                            <i className="fa-solid fa-xmark"></i>
                        </div>
                    </h3>
                    <div className="network-select-body">
                        <div className="form-group network-add-field">
                            <label htmlFor="network-name">Token address</label>
                            <input type="text" className="form-control" id="network-name" />
                        </div>
                    </div>
                    <button type="submit" className="network-select-add">
                        Import
                    </button>
                </form>
            </div>
        </>
    );
}
