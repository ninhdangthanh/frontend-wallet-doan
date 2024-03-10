"use client";

import "../../../css/fontawesome-free-6.5.1-web/css/all.css"
import "../../../css/bootstrap.min.css"
import "../../../css/main.css"
import "../../../css/popup.css"
import { FormEvent, useState } from "react";
import { IAddNetwork } from "@/common";
import { networkApi } from "@/api-client/network-api";
import { toast } from "react-toastify";

export default function AddNetworkPopUp(props: any) {
    const {setIsShowAddNetwork, getNetworks} = props;

    const [rpcURL, setRpcURL] = useState("");
    const [currentSymbol, setCurrentSymbol] = useState("");
    const [explorerURL, setExplorerURL] = useState("");

    const addNetwork = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (rpcURL == "") {
            alert("You must fill rpc url")
            return
        }
        if (currentSymbol == "") {
            alert("You must fill current symbol")
            return
        }


        try {
            let data: IAddNetwork = {
                rpc_url: rpcURL,
                currency_symbol: currentSymbol,
                block_explorer_url: explorerURL
            }

            await networkApi.addNetwork(data);

            toast.success('Add network successfully', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
            });
        } catch (error) {
            console.log("Add network failed, err=", error);
            toast.error('Add network failed', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
            });
        } finally {
            setIsShowAddNetwork(false)
            setRpcURL("")
            setCurrentSymbol("")
            setExplorerURL("")
            await getNetworks()
        }
    }

    return (
        <>
            <div onClick={() => setIsShowAddNetwork()} className="overlay"></div>

            <div className="network-add-container">
                <form onSubmit={(e) => addNetwork(e)}>
                    <h3 className="network-select-title">
                        Add a network
                        <div className="network-select-close">
                            <i onClick={() => setIsShowAddNetwork()} className="fa-solid fa-xmark"></i>
                        </div>
                    </h3>
                    <div className="network-select-body">
                        <div className="form-group network-add-field">
                            <label htmlFor="network-name">New RPC URL</label>
                            <input value={rpcURL} onChange={(e) => setRpcURL(e.target.value)} type="text" className="form-control" id="network-name" />
                        </div>
                        <div className="form-group network-add-field">
                            <label htmlFor="network-name">Current symbol</label>
                            <input value={currentSymbol} onChange={(e) => setCurrentSymbol(e.target.value)} type="text" className="form-control" id="network-name" />
                        </div>
                        <div className="form-group network-add-field">
                            <label htmlFor="network-name">Block explorer URL (Optional)</label>
                            <input value={explorerURL} onChange={(e) => setExplorerURL(e.target.value)} type="text" className="form-control" id="network-name" />
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
