// import React, {
//   useState,
//   useEffect,
//   lazy,
//   Suspense,
//   useCallback,
//   useMemo,
//   useRef,
// } from "react";
// import { useParams } from "react-router-dom";
// import * as Y from "yjs";
// import { WebsocketProvider } from "y-websocket";
// import ChatComponent from "../components/Chat/ChatComponent";
// import MapComponent from "../components/Channel/group/MapComponent";
// import { ZoomIn, ZoomOut } from "lucide-react";

// const VideoChatComponent = lazy(() =>
//   import("../components/Channel/group/VideoChatComponent")
// );

// function GroupChannelComponent() {
//   const { channelId } = useParams();
//   const [isVideoEnabled, setIsVideoEnabled] = useState(false);
//   const ydocRef = useRef(new Y.Doc());
//   const [provider, setProvider] = useState(null);
//   const [isViewSyncEnabled, setIsViewSyncEnabled] = useState(false);
//   const [chatMessages, setChatMessages] = useState([]);
//   const yviewStateRef = useRef(ydocRef.current.getMap("viewState"));
//   const [mapCenter, setMapCenter] = useState({
//     lat: 37.566826,
//     lng: 126.9786567,
//   });
//   const [mapLevel, setMapLevel] = useState(3);
//   const [searchKeyword, setSearchKeyword] = useState("");
//   const [searchResults, setSearchResults] = useState([]);

//   useEffect(() => {
//     const wsProvider = new WebsocketProvider(
//       "ws://localhost:1234",
//       channelId,
//       ydocRef.current
//     );
//     setProvider(wsProvider);

//     const handleKeyDown = (e) => {
//       if (e.code === "Space") {
//         e.preventDefault();
//         setIsViewSyncEnabled((prev) => !prev);
//       }
//     };
//     window.addEventListener("keydown", handleKeyDown);

//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//       if (wsProvider) {
//         wsProvider.disconnect();
//       }
//     };
//   }, [channelId]);

//   useEffect(() => {
//     const handleViewStateChange = () => {
//       if (isViewSyncEnabled) {
//         const center = yviewStateRef.current.get("center");
//         const level = yviewStateRef.current.get("level");
//         if (center && level) {
//           setMapCenter(center);
//           setMapLevel(level);
//         }
//       }
//     };

//     yviewStateRef.current.observe(handleViewStateChange);
//     return () => yviewStateRef.current.unobserve(handleViewStateChange);
//   }, [isViewSyncEnabled]);

//   const handleMapChange = useCallback((center, level) => {
//     setMapCenter(center);
//     setMapLevel(level);
//     yviewStateRef.current.set("center", { lat: center.lat, lng: center.lng });
//     yviewStateRef.current.set("level", level);
//   }, []);

//   const handleZoomIn = useCallback(() => {
//     setMapLevel((prevLevel) => Math.max(prevLevel - 1, 1));
//   }, []);

//   const handleZoomOut = useCallback(() => {
//     setMapLevel((prevLevel) => Math.min(prevLevel + 1, 14));
//   }, []);

//   const toggleVideoChat = useCallback(() => {
//     setIsVideoEnabled((prev) => !prev);
//   }, []);

//   const handleSearch = useCallback((keyword) => {
//     setSearchKeyword(keyword);
//   }, []);

//   const handleSearchResults = useCallback((results) => {
//     setSearchResults(results);
//   }, []);

//   const memoizedMapComponent = useMemo(
//     () => (
//       <MapComponent
//         data={{
//           center: mapCenter,
//           level: mapLevel,
//         }}
//         onMapChange={handleMapChange}
//         searchKeyword={searchKeyword}
//         onSearch={handleSearch}
//         onSearchResults={handleSearchResults}
//       />
//     ),
//     [
//       mapCenter,
//       mapLevel,
//       handleMapChange,
//       searchKeyword,
//       handleSearch,
//       handleSearchResults,
//     ]
//   );

//   return (
//     <div className="flex h-screen">
//       <div className="w-3/4 relative">
//         {memoizedMapComponent}
//         <div className="absolute top-4 right-4 z-10 bg-white p-2 rounded shadow">
//           <span
//             className={`px-2 py-1 rounded ${
//               isViewSyncEnabled
//                 ? "bg-green-500 text-white"
//                 : "bg-red-500 text-white"
//             }`}
//           >
//             {isViewSyncEnabled ? "동기화 ON" : "동기화 OFF"}
//           </span>
//         </div>
//         <div className="absolute bottom-4 right-4 z-10 bg-white p-2 rounded shadow flex flex-col">
//           <button
//             onClick={handleZoomIn}
//             className="mb-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
//           >
//             <ZoomIn size={24} />
//           </button>
//           <button
//             onClick={handleZoomOut}
//             className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
//           >
//             <ZoomOut size={24} />
//           </button>
//         </div>
//       </div>
//       <div className="w-1/4 flex flex-col">
//         <ChatComponent messages={chatMessages} />
//         <button
//           onClick={toggleVideoChat}
//           className="mt-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
//         >
//           {isVideoEnabled ? "비디오 통화 종료" : "비디오 통화 시작"}
//         </button>
//         {isVideoEnabled && (
//           <Suspense fallback={<div>비디오 통화 로딩 중...</div>}>
//             <VideoChatComponent channelId={channelId} />
//           </Suspense>
//         )}
//       </div>
//     </div>
//   );
// }

// export default React.memo(GroupChannelComponent);

import React from "react";
import ChatComponent from "../components/Chat/ChatComponent";
import MapComponent from "../components/Channel/group/MapComponent";
import VideoChat from "../components/VideoChat/VideoChat"

const GroupChannelPage = () => {
  return (
    <div className="flex h-screen">
      {/* 지도 컴포넌트 (3/4) */}
      <div className="w-3/4 h-full">
        <MapComponent />
      </div>

      {/* 채팅 컴포넌트 (1/4) */}
      {/* <div className="w-1/4 h-full">
        <ChatComponent />
      </div> */}
      <div className="w-1/4 max-h-">
        <VideoChat />
      </div>
    </div>
  );
};

export default GroupChannelPage;
