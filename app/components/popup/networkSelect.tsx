"use client";

import "../../../css/fontawesome-free-6.5.1-web/css/all.css"
import "../../../css/bootstrap.min.css"
import "../../../css/main.css"
import "../../../css/popup.css"
import { useDispatch } from "react-redux";
import { changeNetwork } from "@/redux/slice/networkSlice";

export default function NetworkSelectPopUp(props: any) {
    let {networks} = props

    return (
        <>
            <div onClick={() => props.setIsShowSelectNetwork(false)} className="overlay"></div>

            <div className="network-select-container">
            <div className="network-select-title">
                Select a network
                <div onClick={() => props.setIsShowSelectNetwork(false)} className="network-select-close">
                    <i className="fa-solid fa-xmark"></i>
                </div>
            </div>
            <div className="network-select-body">
                {
                    networks.map((item: any, index: any) => {
                        return  <NetworkItem setIsShowSelectNetwork={props.setIsShowSelectNetwork} network={item} index={index} />
                    })
                }
            </div>
            <div className="network-select-add">
                Add network
            </div>
        </div>
        </>
    );
}

function NetworkItem(props: any) {
    const dispatch = useDispatch();

    const changeNetworkComponent = () => {
        dispatch(changeNetwork({network: props.network, isDefault: props.network.is_default}))
        props.setIsShowSelectNetwork(false)
    }
    
    return (
        <>
            <div onClick={() => changeNetworkComponent()} className="network-select-item">
                {
                    props.network.is_default ?
                    <img src="../eth_logo.png" alt="N" className="network-select-item-logo" />
                    :
                    <div className="network-select-item-logo-default">{props.network.name.slice(0, 1)}</div>
                }
                <div className="network-select-item-name">
                    {props.network.name}
                </div>
                <div className="network-select-trash">
                    <i className="fa-solid fa-trash"></i>
                </div>
            </div>
        </>
    )
} 