"use client";

import "../../css/fontawesome-free-6.5.1-web/css/all.css"
import "../../css/bootstrap.min.css"
import "../../css/main.css"
import "../../css/popup.css"

export default function AddNftPopUp() {

  return (
    <>
        <div className="overlay"></div>

        <div className="network-add-container">
            <form>
                <h3 className="network-select-title">
                    Add NFT
                    <div className="network-select-close">
                        <i className="fa-solid fa-xmark"></i>
                    </div>
                </h3>
                <div className="network-select-body">
                    <div className="form-group network-add-field">
                        <label htmlFor="network-name">Token address</label>
                        <input type="email" className="form-control" id="network-name" />
                    </div>
                    <div className="form-group network-add-field">
                        <label htmlFor="network-name">Token ID</label>
                        <input type="email" className="form-control" id="network-name" />
                    </div>
                </div>
                <button type="submit" className="network-select-add">
                    Add
                </button>
            </form>
        </div>
    </>
  );
}
