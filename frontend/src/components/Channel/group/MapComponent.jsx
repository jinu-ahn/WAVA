import React, { useEffect, useRef, useState, useCallback } from "react";
import ReactDOMServer from "react-dom/server";
import Swal from "sweetalert2";
import Cursors from "./cursor/Cursors";
import { ChevronDown } from "lucide-react";
// import { useUsers } from "y-presence";
// import { awareness } from "./cursor/y";
// import { USER_COLORS } from "./cursor/constants";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import RestartAltOutlinedIcon from "@mui/icons-material/RestartAltOutlined";
import AddLocationAltTwoToneIcon from "@mui/icons-material/AddLocationAltTwoTone";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Stomp } from "@stomp/stompjs";
import { groupChannelAPI } from "../../../api/groupChannelAPI";
import { nanoid } from "nanoid";
import useChannelStore from "../../../store/channelStore";
import { MyPin } from "./pin/MyPin";
import { CatchingPokemonSharp } from "@mui/icons-material";

const MapComponent = (props) => {
  const mapContainer = useRef(null);
  const cursorsRef = useRef(null);
  const [map, setMap] = useState(null);
  const [drawingManager, setDrawingManager] = useState(null);
  const [places, setPlaces] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [lastSearchBounds, setLastSearchBounds] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [customMarkers, setCustomMarkers] = useState([]);
  const infowindow = useRef(null);
  const { selectedUserNickName, channelId, setSelectedUserNickName } = props;
  const [isToolbarOpen, setIsToolbarOpen] = useState(false);
  const dropdownRef = useRef(null);

  const userPinStompClient = useRef(null);
  const userPinLat = useRef(null);
  const userPinLng = useRef(null);
  const [userPinList, setUserPinList] = useState([]);
  const [userOverLayList, setUserOverLayList] = useState([]);

  const myInfo = useChannelStore((state) => state.myInfo)

  useEffect(() => {
    if (selectedUserNickName && cursorsRef.current) {
      const cursors = cursorsRef.current.getCursorMarkers();
      const selectedCursor = cursors[selectedUserNickName];

      if (selectedCursor && map) {
        const position = selectedCursor.getPosition();
        map.panTo(position); // 선택된 사용자의 커서 위치로 지도 이동
      } else {
        Swal.fire({
          title: "해당 사용자의 커서 위치를 찾을 수 없습니다.",
          icon: "warning",
        });
      }

      setSelectedUserNickName(null);
    }
  }, [selectedUserNickName, map, setSelectedUserNickName]);

  useEffect(() => {
    let isMounted = true;
    const script = document.createElement("script");
    script.async = true;
    const apiKey = process.env.REACT_APP_KAKAO_MAPS_API_KEY;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${apiKey}&libraries=services,drawing&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        if (isMounted) {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                const mapOption = {
                  center: new window.kakao.maps.LatLng(lat, lng),
                  level: 3,
                };
                const createdMap = new window.kakao.maps.Map(
                  mapContainer.current,
                  mapOption
                );
                setMap(createdMap);
                initializeDrawingManager(createdMap);
                initializeClickEventListener(createdMap);
              },
              (error) => {
                console.error("Error fetching current location:", error);
                const defaultCenter = new window.kakao.maps.LatLng(
                  37.566826,
                  126.9786567
                );
                const mapOption = {
                  center: defaultCenter,
                  level: 3,
                };
                const createdMap = new window.kakao.maps.Map(
                  mapContainer.current,
                  mapOption
                );
                setMap(createdMap);
                initializeDrawingManager(createdMap);
                initializeClickEventListener(createdMap);
              }
            );
          } else {
            const defaultCenter = new window.kakao.maps.LatLng(
              37.566826,
              126.9786567
            );
            const mapOption = {
              center: defaultCenter,
              level: 3,
            };
            const createdMap = new window.kakao.maps.Map(
              mapContainer.current,
              mapOption
            );
            setMap(createdMap);
            initializeDrawingManager(createdMap);
            initializeClickEventListener(createdMap);
          }

          const initializeDrawingManager = (createdMap) => {
            infowindow.current = new window.kakao.maps.InfoWindow({
              zIndex: 1,
              removable: true,
            });
            const manager = new window.kakao.maps.drawing.DrawingManager({
              map: createdMap,
              drawingMode: [
                window.kakao.maps.drawing.OverlayType.MARKER,
                window.kakao.maps.drawing.OverlayType.POLYLINE,
                window.kakao.maps.drawing.OverlayType.RECTANGLE,
                window.kakao.maps.drawing.OverlayType.CIRCLE,
                window.kakao.maps.drawing.OverlayType.POLYGON,
              ],
              guideTooltip: ["draw", "drag", "edit"],
              markerOptions: {
                draggable: true,
              },
              polylineOptions: {
                draggable: true,
                removable: true,
                editable: true,
              },
              rectangleOptions: {
                draggable: true,
                removable: true,
                editable: true,
              },
              circleOptions: {
                draggable: true,
                removable: true,
                editable: true,
              },
              polygonOptions: {
                draggable: true,
                removable: true,
                editable: true,
              },
            });
            setDrawingManager(manager);

            // 마커 생성 완료 이벤트 리스너
            window.kakao.maps.event.addListener(
              manager,
              "drawend",
              function (data) {
                const overlay = data.target;
                const overlayType = data.overlayType;
                if (
                  overlayType === window.kakao.maps.drawing.OverlayType.MARKER
                ) {
                  handleMarkerCreated(overlay);
                } else {
                  console.log(`Overlay created, but not handled:`, overlayType);
                }
              }
            );
          };
        }

        const initializeClickEventListener = (createdMap) => {
          window.kakao.maps.event.addListener(
            createdMap,
            "click",
            function (mouseEvent) {
              // 클릭한 위도, 경도 정보를 가져옵니다
              var latlng = mouseEvent.latLng;

              var message =
                "클릭한 위치의 위도는 " + latlng.getLat() + " 이고, ";
              message += "경도는 " + latlng.getLng() + " 입니다";

              userPinLat.current = latlng.getLat();
              userPinLng.current = latlng.getLng();

              console.log(message);
            }
          );
        };
      });
    };

    return () => {
      isMounted = false;
      // kakaomap의 script를 제거하는게 비동기적이라서, 해당 함수의 제거가 완료되지 않은 채로
      // map컴포넌트가 사라지면 남아있는 함수의 잔존 동작들이(커서, 마커 등)
      // map을 참조해서 일어나는 에러였던거 같습니다.
      // 그래서 해당 스크립트와 생명주기를 같이하는 flag를 설정해서 의존성을 만들고,
      // flag가 있을 때에만 스크립트가 map을 참조하도록 설정
      document.head.removeChild(script);
      disconnect();
    };
  }, [channelId]);

  useEffect(() => {
    if (map && myInfo) {
      connect();
      fetchPins();
    }
  }, [map, myInfo]);

  const handleMarkerCreated = useCallback((marker) => {
    if (!myInfo) return;
    Swal.fire({
      title: "마커 정보 입력",
      html:
        '<label class="block mb-2 text-lg font-medium text-gray-900 dark:text-white">pin 장소</label>' +
        '<input id="pin-place" class="swal2-input" placeholder="장소 입력">' +
        '<label for="message" class="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Pin </label>' +
        '<textarea id="pin-info" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="메모할 내용을 입력해주세요."></textarea>',
      // '<label>pin 설명</label>' +
      // '<input id="swal-input2" class="swal2-input" placeholder="장소에 대한 메모">',
      focusConfirm: false,
      preConfirm: () => {
        return {
          title: document.getElementById("pin-place").value,
          description: document.getElementById("pin-info").value,
        };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const pinId = nanoid();
        const newUserPin = {
          marker: marker,
          content: result.value,
          lat: userPinLat.current,
          lng: userPinLng.current,
          pinId: pinId,
          profileImg: myInfo.profileImg
        };
        console.log("생성: ");
        console.log(newUserPin.marker);
        console.log(newUserPin.content);
        console.log(newUserPin.lat);
        console.log(newUserPin.lng);
        console.log(newUserPin.pinId);
        // setUserPinList((prev) => [...prev, newUserPin]);
        console.log("생성 후: " + userPinList);
        sendPin(newUserPin, "ADD");
        // 마커 이벤트 리스너 추가
        // addMarkerEventListeners(newUserPin);
        marker.setMap(null);
      } else {
        // 사용자가 취소한 경우 마커 제거
        marker.setMap(null);
      }
    });
  }, [myInfo]);

  const addMarkerEventListeners = useCallback((customMarker) => {
    const { marker } = customMarker;

    window.kakao.maps.event.addListener(marker, "click", () => {
      displayCustomMarkerInfo(customMarker);
    });

    window.kakao.maps.event.addListener(marker, "mouseover", () => {
      displayCustomMarkerInfoWindow(customMarker);
    });

    window.kakao.maps.event.addListener(marker, "mouseout", () => {
      infowindow.current.close();
    });

    window.kakao.maps.event.addListener(marker, "rightclick", () => {
      deleteCustomMarker(customMarker);
    });
  }, []);

  const deleteCustomMarker = useCallback((customMarker) => {
    Swal.fire({
      title: "마커 삭제",
      text: "이 마커를 삭제하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        customMarker.marker.setMap(null);
        const deleteUserPin = {
          marker: customMarker.marker,
          content: customMarker.content,
          lat: customMarker.lat,
          lng: customMarker.lng,
          pinId: customMarker.pinId,
          profileImg: myInfo.profileImg
        };
        sendPin(deleteUserPin, "DELETE");

        // setUserPinList((prev) => prev.filter((cm) => cm !== customMarker));
        Swal.fire("", "마커가 삭제되었습니다.", "success");
      }
    });
  }, []);

  const displayCustomMarkerInfo = useCallback((customMarker) => {
    Swal.fire({
      title: customMarker.content.title,
      text: customMarker.content.description,
      icon: "info",
    });
  }, []);

  const displayCustomMarkerInfoWindow = useCallback(
    (customMarker) => {
      const content = `<div style="padding:5px;font-size:12px;">
        <strong>${customMarker.content.title}</strong><br>
        ${customMarker.content.description}
      </div>`;

      infowindow.current.setContent(content);
      infowindow.current.open(map, customMarker.marker);
    },
    [map]
  );

  const handleDrawingModeChange = useCallback(
    (mode) => {
      if (drawingManager) {
        drawingManager.cancel();
        drawingManager.select(window.kakao.maps.drawing.OverlayType[mode]);
      }
    },
    [drawingManager]
  );

  const searchPlaces = useCallback(() => {
    if (!map) return;

    const ps = new window.kakao.maps.services.Places();

    if (!keyword.trim()) {
      setPlaces([]);
      return;
    }

    ps.keywordSearch(keyword, (data, status, pagination) => {
      if (status === window.kakao.maps.services.Status.OK) {
        setPlaces(data);

        const bounds = new window.kakao.maps.LatLngBounds();
        const newMarkers = [];

        data.forEach((place, i) => {
          const marker = displayMarker(place);
          newMarkers.push(marker);
          bounds.extend(new window.kakao.maps.LatLng(place.y, place.x));
        });

        setMarkers((prevMarkers) => [...prevMarkers, ...newMarkers]);
        map.setBounds(bounds);
        setLastSearchBounds(bounds);
      } else {
        setPlaces([]);
        Swal.fire({
          title: "검색 결과가 없습니다.",
          icon: "warning",
        });
      }
    });
  }, [map, keyword]);

  const displayMarker = useCallback(
    (place) => {
      if (!map) return null;

      const marker = new window.kakao.maps.Marker({
        map: map,
        position: new window.kakao.maps.LatLng(place.y, place.x),
      });

      window.kakao.maps.event.addListener(marker, "click", () => {
        infowindow.current.setContent(
          '<div style="padding:5px;font-size:12px;">' +
            place.place_name +
            "</div>"
        );
        infowindow.current.open(map, marker);
      });

      window.kakao.maps.event.addListener(marker, "mouseover", () => {
        displayInfowindow(marker, place.place_name);
      });

      window.kakao.maps.event.addListener(marker, "mouseout", () => {
        infowindow.current.close();
      });

      return marker;
    },
    [map]
  );

  const displayInfowindow = (marker, title) => {
    infowindow.current.setContent(
      '<div style="padding:5px;font-size:12px;">' + title + "</div>"
    );
    infowindow.current.open(map, marker);
  };

  useEffect(() => {
    if (map && lastSearchBounds) {
      map.setBounds(lastSearchBounds);
    }
  }, [map, lastSearchBounds]);

  const resetMap = useCallback(() => {
    if (!map) return;

    // 모든 검색 결과 마커 제거
    markers.forEach((marker) => marker.setMap(null));
    setMarkers([]);

    // 검색 결과 초기화
    setPlaces([]);
    setKeyword("");

    // 마지막 검색 경계 초기화
    setLastSearchBounds(null);

    // 현재 지도 뷰는 유지
  }, [map, markers]);

  // 검색 결과 목록에 마우스 오버 이벤트 추가
  const handleMouseOverPlaceItem = useCallback(
    (index) => {
      const marker = markers[index];
      if (marker) {
        const position = marker.getPosition();
        map.panTo(position);
        displayInfowindow(marker, places[index].place_name);
      }
    },
    [map, markers, places]
  );

  // 사용자 정의 핀

  const connect = () => {
    const socket = new WebSocket(
      process.env.REACT_APP_MARKER_WEBSOCKET_ADDRESS
    );
    userPinStompClient.current = Stomp.over(socket);
    userPinStompClient.current.connect(
      {},
      () => {
        userPinStompClient.current.subscribe(
          `/sub/map/${channelId}`,
          (userPin) => {
            const newPin = JSON.parse(userPin.body);
            console.log("newPin: ", newPin);
            if (newPin.status === "ADD") {
              console.log("들어가요?");
              displayFetchedPin(newPin);
            } else if (newPin.status === "DELETE") {
              setUserPinList((prevUserPinList) =>
                prevUserPinList.filter((marker) => {
                  if (marker.pinId === newPin.pinId) {
                    marker.marker.setMap(null);
                  }
                  return marker.pinId !== newPin.pinId;
                })
              );
              setUserOverLayList((prevUserOverLayList) =>
                prevUserOverLayList.filter((marker) => {
                  if (marker.pinId === newPin.pinId) {
                    marker.overlay.setMap(null);
                  }
                  return marker.pinId !== newPin.pinId;
                })
              );
              // newPin.marker.setMap(null);
            }
          },
          {}
        );
      },
      (error) => {}
    );
  };

  const disconnect = () => {
    if (userPinStompClient.current) {
      userPinStompClient.current.disconnect();
    }
  };

  const fetchPins = async () => {
    try {
      const userPinData = await groupChannelAPI.getMapPinRequest(channelId);
      if (userPinData.status === "OK") {
        console.log(userPinData);
        userPinData.data.map((pin) => {
          displayFetchedPin(pin);
          console.log(pin);
        });
        // setUserPinList(userPinData.data)
      }
    } catch (error) {
      console.error("Error get userPins", error);
    }
  };

  const sendPin = async (newUserPin, status) => {
    if (
      userPinStompClient.current &&
      newUserPin.content.title &&
      newUserPin.content.description
    ) {
      const pinObj = {
        pinId: newUserPin.pinId,
        channelId: channelId,
        lat: newUserPin.lat,
        lng: newUserPin.lng,
        placeName: newUserPin.content.title,
        info: newUserPin.content.description,
        profileImg: newUserPin.profileImg,
        status: status,
      };
      await userPinStompClient.current.send(
        `/pub/marker/position`,
        { Authorization: `Bearer ${sessionStorage.getItem("accessToken")}` },
        JSON.stringify(pinObj)
      );
      userPinLat.current = null;
      userPinLng.current = null;
    }
  };

  const displayFetchedPin = useCallback(
    (pinData) => {
      console.log("들어왔음");
      if (!map) return;
      console.log("지도 있음");
      console.log("프로필 사진", myInfo)
      const profileImgPin = ReactDOMServer.renderToString(
        <MyPin profileImg={pinData.profileImg} />
      )
      const overlay = new window.kakao.maps.CustomOverlay({
        map: map,
        position: new window.kakao.maps.LatLng(pinData.lat, pinData.lng),
        content: profileImgPin,
        // clickable: true
      });

      // let imageSrc = myInfo?.profileImg || 'https://raw.githubusercontent.com/tailwindlabs/heroicons/56c073c2c9a66d2e51adb93d8e87e2e941d5b6db/src/20/solid/user-circle.svg';
      // // if (pinData.profileImg)
      // let imageSize = new window.kakao.maps.Size(64, 69);
      // let imageOption = { offset: new window.kakao.maps.Point(27, 69) };

      // console.log("profile: ", imageSrc)
      // const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

      const pin = new window.kakao.maps.Marker({
        map: map,
        position: new window.kakao.maps.LatLng(pinData.lat, pinData.lng),
        // image: markerImage
      });

      const customPin = {
        marker: pin,
        content: {
          title: pinData.placeName,
          description: pinData.info,
        },
        lat: pinData.lat,
        lng: pinData.lng,
        pinId: pinData.pinId,
      };

      const customOverLay = {
        overlay: overlay,
        pinId: pinData.pinId
      }

      console.log("fetch: ");
      console.log(customPin.marker);
      console.log(customPin.content);
      console.log(customPin.lat);
      console.log(customPin.lng);
      console.log(customPin.pinId);
      setUserPinList((prev) => [...prev, customPin]);
      setUserOverLayList((prevList) => [...prevList, customOverLay]);
      addMarkerEventListeners(customPin);
      console.log("등록 성공");
      console.log("추가 후: " + userPinList);
      console.log("추가 후 오버레이: " + userOverLayList)
    },
    [map, addMarkerEventListeners, userPinList, myInfo, userOverLayList]
  );

  console.log(userPinList);

  return (
    <div className="flex flex-col h-full relative ">
      <div className="w-3/4 absolute top-0 left-0 p-2 bg-white bg-opacity-0 z-10">
        <div className="flex justify-end space-x-2 mx-52 bg-white rounded-full shadow-md shadow-slate-300 hover:shadow-slate-400 focus:shadow-slate-400">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="검색할 키워드를 입력하세요"
            className="ps-4 p-1 rounded-s-full w-full focus:outline-none"
          />
          <div className="w-[1px] bg-gray-300 h-10 self-center"></div>
          <Tooltip title="검색" placement="bottom" arrow>
            <button
              onClick={searchPlaces}
              className="p-2 rounded hover: shadow-sm"
            >
              {/* <MagnifyingGlassCircleIcon className="w-10"/> */}
              <SearchOutlinedIcon fontSize="large" />
            </button>
          </Tooltip>
          <Tooltip title="검색 결과 초기화" placement="bottom" arrow>
            <button onClick={resetMap} className="p-2 mb-0.5 ">
              <RestartAltOutlinedIcon fontSize="large" color="danger" />
            </button>
          </Tooltip>
          <Tooltip title="일정 마커 추가" placement="bottom" arrow>
            <button
              onClick={() => handleDrawingModeChange("MARKER")}
              className="p-2 "
            >
              <AddLocationAltTwoToneIcon fontSize="large" color="primary" />
            </button>
          </Tooltip>
        </div>
        {/* <div className="p-2 flex space-x-2 mt-2">
          <button
            onClick={() => handleDrawingModeChange("MARKER")}
            className="p-2 bg-gray-500 text-white rounded hover:bg-toolBtn"
          >
            마커
          </button>
          <button
            onClick={() => handleDrawingModeChange("POLYLINE")}
            className="p-2 bg-gray-500 text-white rounded hover:bg-toolBtn"
          >
            선
          </button>
          <button
            onClick={() => handleDrawingModeChange("RECTANGLE")}
            className="p-2 bg-gray-500 text-white rounded hover:bg-toolBtn"
          >
            사각형
          </button>
          <button
            onClick={() => handleDrawingModeChange("CIRCLE")}
            className="p-2 bg-gray-500 text-white rounded hover:bg-toolBtn"
          >
            원
          </button>
          <button
            onClick={() => handleDrawingModeChange("POLYGON")}
            className="p-2 bg-gray-500 text-white rounded hover:bg-toolBtn"
          >
            다각형
          </button>
        </div> */}
      </div>

      <div ref={mapContainer} className="flex-grow h-screen">
        {map && <Cursors ref={cursorsRef} channelId={channelId} map={map} />}
      </div>
      <div className="absolute bottom-0 left-0 w-full p-4 bg-white bg-opacity-60 z-10 max-h-40 overflow-y-auto">
        <ul>
          {places.map((place, index) => (
            <li
              id={`place-item-${index}`}
              key={index}
              className="mb-2"
              onMouseOver={() => handleMouseOverPlaceItem(index)}
              onMouseOut={() => infowindow.current.close()}
            >
              <span className="font-bold">{place.place_name}</span>
              {place.road_address_name && (
                <span className="block text-sm text-gray-600">
                  {place.road_address_name}
                </span>
              )}
              <span className="block text-sm text-gray-600">
                {place.address_name}
              </span>
              <span className="block text-sm text-gray-600">{place.phone}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MapComponent;
