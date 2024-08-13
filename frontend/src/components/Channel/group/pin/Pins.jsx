import { React, useEffect, useRef, useState, forwardRef } from "react";
import { groupChannelAPI } from "../../../../api/groupChannelAPI"
import { Stomp } from "@stomp/stompjs";
import MyPin from "./MyPin"


export const Markers = forwardRef((props, ref) => {
    const channelId = props.channelId;
    const map = props.map;
    const { markerList, setMarkerList } = useState('')
    const [inputValue, setInputValue] = useState('')
    const [users, setUsers] = useState({})
    const [isConnected, setIsConnected] = useState(false)
    const stompClient = useRef(null);

    const connect = () => {
        const socket = new WebSocket(process.env.REACT_APP_MARKER_WEBSOCKET_ADDRESS)
        stompClient = Stomp.over(socket);
        stompClient.current.connect(
            {},
            () => {
                stompClient.current.subscribe(
                    `/sub/map/${channelId}`,
                    (message) => {
                        const newMarker = JSON.parse(message.body);
                        setMarkerList((prevMarkerList) => [...prevMarkerList, newMarker]);
                    },
                    {}
                );
            },
            (error) => { }
        );
        console.log("마커 방 번호", channelId);
    };

    const disconnect = () => {
        if (stompClient.current) {
            stompClient.current.disconnect()
        }
    }

    const fetchMarkers = async() => {
        try {
            const markerData = await groupChannelAPI.getMapPinRequest(channelId);
            if (markerData.status === "OK") {
                console.log(markerData)
                setMarkerList(markerData.data);
            };
        } catch (error) {
            console.error("Error get channel markerData", error)
        }
    }

    const sendMarker = () => {
        if (stompClient.current && inputValue) {
            
        }
    }

    useEffect(() => {
        connect();
        fetchMarkers();
        return () => disconnect();
    }, [channelId])

    useEffect(() => {
        if (markerList) {
            const mItems = markerList.map((marker) => {
                // 마커에 띄워줄 정보 확실히 정하고 넘겨주기
                <MyPin marker={ marker } />
            })
            setMarkerList(mItems)
        }
    }, [markerList])


    return (
        <>
            <div className="bg-white rounded-md drop-shadow-md flex justify-evenly items-center h-full p-1">
            </div>
        </>
    )
})