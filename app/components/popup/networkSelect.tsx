"use client";

import "../../../css/fontawesome-free-6.5.1-web/css/all.css"
import "../../../css/bootstrap.min.css"
import "../../../css/main.css"
import "../../../css/popup.css"
import { useDispatch, useSelector } from "react-redux";
import { changeNetwork, selectNetwork } from "@/redux/slice/networkSlice";
import { networkApi } from "@/api-client/network-api";
import { toast } from 'react-toastify';

export default function NetworkSelectPopUp(props: any) {
    let {networks, setIsShowSelectNetwork, setIsShowAddNetwork} = props

    const showAddNetwork = () => {
        setIsShowSelectNetwork(false)
        setIsShowAddNetwork(true)
    }

    return (
        <>
            <div onClick={() => setIsShowSelectNetwork(false)} className="overlay"></div>

            <div className="network-select-container">
            <div className="network-select-title">
                Select a network
                <div onClick={() => setIsShowSelectNetwork(false)} className="network-select-close">
                    <i className="fa-solid fa-xmark"></i>
                </div>
            </div>
            <div className="network-select-body">
                {
                    networks.map((item: any, index: any) => {
                        return  <NetworkItem getNetworks={props.getNetworks} setIsShowSelectNetwork={setIsShowSelectNetwork} network={item} index={index} />
                    })
                }
            </div>
            <div onClick={() => showAddNetwork()} className="network-select-add">
                Add network
            </div>
        </div>
        </>
    );
}

function NetworkItem(props: any) {
    const dispatch = useDispatch();

    const network_redux = useSelector(selectNetwork);

    const changeNetworkComponent = () => {
        dispatch(changeNetwork({network: props.network, isDefault: props.network.is_default}))
        props.setIsShowSelectNetwork(false)
    }

    const deleteNetwork = async (network_id: any) => {
        let confirmDelete = confirm("You confirm delete network?")
        try {
            if (confirmDelete) {
                await networkApi.deleteNetwork(network_id)
                await props.getNetworks()
                toast.success('Delete network successfully', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'dark',
                });
            }
        } catch (error) {
            toast.error('Delete network failed', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
            });
            console.log("delete network failed, err=", error);
        } finally {
            props.setIsShowSelectNetwork(false)
        }
    }
    
    return (
        <>
            <div onClick={() => changeNetworkComponent()} className={props.network.id == network_redux.network?.id ? "network-select-item-selected-redux" : "network-select-item"}>
                {
                    props.network.is_default ?
                    <img src="../eth_logo.png" alt="N" className="network-select-item-logo" />
                    :
                    <div className="network-select-item-logo-default">{props.network.name.slice(0, 1)}</div>
                }
                <div className="network-select-item-name">
                    {props.network.name}
                </div>
                {!props.network.is_default && <div className="network-select-trash">
                    <i onClick={() => deleteNetwork(props.network.id)} className="fa-solid fa-trash"></i>
                </div>}
            </div>
        </>
    )
} 