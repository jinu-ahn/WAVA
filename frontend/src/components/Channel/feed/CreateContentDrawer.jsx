import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline";
import useDeviceStore from "../../../store/deviceStore";
import { useRef, useState } from "react";
import {
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import Swal from "sweetalert2";
import { createFeedRequest } from "../../../api/channelFeedApi";
import useUserStore from "../../../store/userStore";

function CreateContentDrawer({ isOpen, onClose, addItem }) {
  const isMobile = useDeviceStore((state) => state.isMobile);
  const userInfo = useUserStore((state) => state.userInfo);
  const imgInput = useRef(null);
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [textContent, setTextContent] = useState("");

  const handleImageChange = (e) => {
    if (e.target?.files?.length === 0) return;

    const newFiles = Array.from(e.target.files);
    if (newFiles.length + images.length > 10) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "이미지는 최대 10장까지 가능합니다.",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    const newImages = newFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setImages((prevImages) => [...prevImages, ...newImages]);
    setCurrentIndex(images.length);
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
  };

  const navigateImage = (direction) => {
    setCurrentIndex((prev) => {
      if (direction === "next") return prev < images.length - 1 ? prev + 1 : 0;
      return prev > 0 ? prev - 1 : images.length - 1;
    });
  };

  const submitHandle = async (e) => {
    e.preventDefault();
    if (images.length === 0 || textContent === "") {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "사진과 글을 입력해주세요!",
        showConfirmButton: false,
        timer: 2000,
      });

      return;
    }

    const formData = new FormData();
    images.forEach((img) => {
      formData.append("image", img?.file);
    });
    formData.append("content", textContent);
    formData.append("sido", userInfo?.worcation?.sido);
    formData.append("sigungu", userInfo?.worcation?.sigungu);
    const resp = await createFeedRequest(formData);
    console.log(resp);
    if (resp) {
      // addItem();
      setImages([]);
      setTextContent("");
      setCurrentIndex(0);
      onClose();

      addItem();
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "알 수 없는 에러!",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  return (
    <>
      <div className="drawer drawer-end z-20">
        <input
          type="checkbox"
          className="drawer-toggle"
          checked={isOpen}
          readOnly
        />
        <div className="drawer-side">
          <label
            className="drawer-overlay"
            style={{ backgroundColor: isOpen ? "#0003" : "transparent" }}
            onClick={onClose}
          />
          <div
            className={`${
              isMobile ? "w-11/12" : "w-2/3"
            } bg-white h-full p-6 flex flex-col`}
          >
            <button
              onClick={onClose}
              className="self-start mb-4 p-2 rounded-full hover:bg-gray-200 transition-colors"
            >
              <ChevronDoubleRightIcon className="h-6 w-6" />
            </button>

            <div className="flex-grow flex flex-col items-center overflow-y-auto">
              <div className="w-full max-w-lg aspect-square relative mb-6">
                {images.length === 0 ? (
                  <div
                    onClick={() => imgInput.current.click()}
                    className="w-full h-full border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
                  >
                    <span className="text-gray-500">이미지 등록</span>
                  </div>
                ) : (
                  <>
                    <img
                      src={images[currentIndex]?.url}
                      alt={`uploaded ${currentIndex}`}
                      className="w-full h-full object-contain rounded-lg"
                    />
                    {images.length > 1 && (
                      <>
                        <button
                          onClick={() => navigateImage("prev")}
                          className="absolute top-1/2 left-2 -translate-y-1/2 bg-white rounded-full p-1 shadow-md"
                        >
                          <ChevronLeftIcon className="h-6 w-6" />
                        </button>
                        <button
                          onClick={() => navigateImage("next")}
                          className="absolute top-1/2 right-2 -translate-y-1/2 bg-white rounded-full p-1 shadow-md"
                        >
                          <ChevronRightIcon className="h-6 w-6" />
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => handleRemoveImage(currentIndex)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 shadow-lg"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                    <span className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-sm">
                      {currentIndex + 1}/{images.length}
                    </span>
                  </>
                )}
                <button
                  onClick={() => imgInput.current.click()}
                  className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-toDoMid text-white rounded-full p-2 shadow-lg"
                >
                  <PlusCircleIcon className="h-6 w-6" />
                </button>
              </div>

              <div className="w-full max-w-lg">
                <div className="flex items-center mb-2">
                  <div className="flex-grow border-t border-gray-300" />
                  <span className="px-4 text-sm font-medium text-gray-700">
                    공유하고 싶은 내용을 적어주세요.
                  </span>
                  <div className="flex-grow border-t border-gray-300" />
                </div>
                <input
                  type="text"
                  value={textContent}
                  onChange={(e) => setTextContent(e.target.value)}
                  className="w-full h-48 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-0.5 focus:ring-mainBlue focus:border-mainBlue"
                  placeholder="내용을 입력하세요"
                />
              </div>

              <button
                onClick={submitHandle}
                className="mt-6 w-full max-w-lg bg-mainBlue hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
              >
                작성
              </button>
            </div>
          </div>
        </div>
      </div>
      <input
        ref={imgInput}
        className="hidden"
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageChange}
        // className="mb-4"
      />
    </>
  );
}

export default CreateContentDrawer;
