import { React, useEffect, useRef } from "react";
import groupChannelAPI from "../../../../api/groupChannelAPI"


export const Markers = forwardRef((props, ref) => {
    const { groupId }= props
    const channelId = props.channelId;
    const map = props.map;
    const { markerList, setMarkerList } = useState()
    const [users, setUsers] = useState({})
    // const socketUrl = process.env.REACT_APP_MARKER_WEBSOCKET_ADDRESS;
    const [isConnected, setIsConnected] = useState(false)
    const stompClient = useRef(null);

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

    useEffect(() => {
        fetchMarkers();
    }, [groupId])

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
                {userItems}
            </div>
        </>
    )
})