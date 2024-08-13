import React, { useState } from "react";
import { Button } from "@headlessui/react";
import useDeviceStore from "../../../store/deviceStore";
import { groupChannelAPI } from "../../../api/groupChannelAPI";
import useUserStore from "../../../store/userStore";
import LoadingSpinner from "../LoadingSpinner";
import { useNavigate } from "react-router-dom";
import useChannelStore from "../../../store/channelStore";

function CreateGroupChannel({ onClose }) {
  const userInfo = useUserStore((state) => state.userInfo);
  const isMobile = useDeviceStore((state) => state.isMobile);
  const { addFollowChannels } = useChannelStore();

  const [channelTitle, setChannelTitle] = useState("");
  const [channelDescription, setChannelDescription] = useState("");

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandle = async () => {
    setLoading(true);
    const data = {
      channelSido: userInfo?.worcation?.sido,
      channelSigungu: userInfo?.worcation?.sigungu,
      channelTitle: channelTitle,
      channelDescription: channelDescription,
    };
    try {
      const resp = await groupChannelAPI.createGroupChannel(data);
      if (resp.status === "OK") {
        addFollowChannels(resp.data);
        navigate("/channel/group/" + resp?.data?.channelId);
        onClose();
      } else {
        console.log(resp);
      }
    } catch (error) {
      console.error("Error creating channel:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`${
        isMobile ? "scale-90 transform origin-top " : ""
      } select-none p-5`}
    >
      {loading ? (
        <div className="relative flex justify-center items-center w-full h-64">
          {" "}
          <LoadingSpinner message="채널을 생성중입니다." />
        </div>
      ) : (
        <>
          <p className="text-2xl text-center font-bold">채널 생성</p>

          <div className="divider" />
          <input
            type="text"
            onChange={(e) => setChannelTitle(e.target.value)}
            className="w-full mb-2 border-gray-300 py-1 px-2 border rounded-md shadow-sm focus:outline-none focus:ring-0.5 focus:ring-mainBlue focus:border-mainBlue text-xs"
            value={channelTitle}
            placeholder="채널명을 입력해 주세요.(지역을 포함하면 검색이 쉬워집니다!)"
          />
          <textarea
            value={channelDescription}
            onChange={(e) => setChannelDescription(e.target.value)}
            className="w-full h-36 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-0.5 focus:ring-mainBlue focus:border-mainBlue"
            placeholder="설명을 입력하세요."
          />
          <div className="divider my-4" />
          <div className="flex flex-wrap gap-2 mt-6">
            <Button
              className="flex-grow sm:flex-grow-0 inline-flex justify-center items-center gap-2 rounded-md bg-gray-200 py-2 px-4 text-sm font-semibold text-gray-700 shadow-md transition-colors duration-300 hover:bg-gray-300 focus:outline-none"
              onClick={onClose}
            >
              취소
            </Button>
            <Button
              className="flex-grow sm:flex-grow-0 inline-flex justify-center items-center gap-2 rounded-md bg-mainBlue py-2 px-4 text-sm font-semibold text-white shadow-md shadow-[#ff93ac]/20 transition-colors duration-300 hover:bg-subBlue focus:outline-none"
              onClick={submitHandle}
            >
              생성
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default CreateGroupChannel;
