import React, { useState, useRef, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import useDeviceStore from "../../../store/deviceStore";
import useUserStore from "../../../store/userStore";
import {
  ChevronDoubleRightIcon,
  HeartIcon as EmptyHeart,
  ChatBubbleLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  UserCircleIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import {
  HeartIcon as FullHeart,
  UserCircleIcon as DefaultUserIcon,
} from "@heroicons/react/24/solid";
import Swal from "sweetalert2";
import {
  createCommentFeedRequest,
  createLikeFeedRequest,
  deleteLikeFeedRequest,
  readOneFeedDetailRequest,
} from "../../../api/channelFeedApi";

const ContentDrawer = ({
  isOpen,
  onClose,
  onEdit,
  onDelete,
  originChangeHandle,
  feedId,
}) => {
  const isMobile = useDeviceStore((state) => state.isMobile);
  const userInfo = useUserStore((state) => state.userInfo);
  const imgInput = useRef(null);
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(null);
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [feedContent, setFeedContent] = useState(null);
  const [writedComment, setWritedComment] = useState("");

  const [isFetching, setIsFecthing] = useState(false);

  useLayoutEffect(() => {
    const getData = async () => {
      try {
        setIsFecthing(true);
        const resp = await readOneFeedDetailRequest(feedId);
        if (resp) {
          setFeedContent({
            isOwner: resp?.nickName === userInfo?.nickName,
            ...resp,
            isLiked: resp?.liked,
          });
          setEditedContent({
            isOwner: resp?.nickName === userInfo?.nickName,
            ...resp,
            isLiked: resp?.liked,
          });
          setImages(resp?.image || []);
          setIsLiked(resp?.liked || false);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setIsFecthing(false);
      }
    };
    if (feedId != null) {
      getData();
    }
  }, [feedId]);

  const handleAuthorClick = () => {
    if (feedContent && feedContent?.nickName) {
      navigate(`/channel/feed/${feedContent.nickName}`);
      onClose();
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    // 여기에 API 호출 로직을 추가해야 합니다.
    // 예: api.updateContent(editedContent.id, { ...editedContent, images })
    //     .then(() => {
    //       onEdit({ ...editedContent, images });
    //       setIsEditing(false);
    //     })
    //     .catch(error => {
    //       console.error("Failed to update content:", error);
    //       // 에러 처리 로직
    //     });

    // 임시로 프론트엔드에서만 변경을 반영
    onEdit({ ...editedContent, images });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedContent({ ...feedContent });
    setImages(feedContent?.image ?? []);
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    Swal.fire({
      title: "정말로 이 컨텐츠를 삭제하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "삭제",
      cancelButtonText: "취소",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(feedContent);
        onDelete(feedContent?.id);
        onClose();
        Swal.fire("컨텐츠가 성공적으로 삭제되었습니다.", "", "success");
      }
    });
  };

  const handleImageChange = (e) => {
    if (!e.target?.files) return;

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
      imageUrl: URL.createObjectURL(file),
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

  // 좋아요 핸들
  const handleLikeClick = async () => {
    if (isFetching) return;
    try {
      setIsFecthing(true);
      if (isLiked) {
        await deleteLikeFeedRequest(feedId);
        // 좋아요면 딜리트
      } else {
        // 아니면 포스트
        await createLikeFeedRequest(feedId);
      }
    } catch (e) {
      console.log(e);
    } finally {
      // 내부 로직
      // handleLike(feedId, isLiked);
      setIsFecthing(false);
      const newLikedState = !isLiked;
      setIsLiked(newLikedState);
      setEditedContent((prev) => ({
        ...prev,
        heart: newLikedState ? (prev.heart || 0) + 1 : (prev.heart || 1) - 1,
      }));
      originChangeHandle(editedContent.id, "like", newLikedState);
    }
  };

  const handleCommentSubmit = async () => {
    if (isFetching) return;
    try {
      setIsFecthing(true);
      const resp = await createCommentFeedRequest(feedId, {
        comment: writedComment,
      });
      console.log(resp);
      const newComment = {
        id: resp?.commentId,
        userId: resp?.userId,
        nickName: userInfo?.nickName,
        profile: userInfo?.profile,
        comment: writedComment,
      };
      setFeedContent((state) => ({
        ...state,
        comment: [...state.comment, newComment],
      }));
      setEditedContent((state) => ({
        ...state,
        comment: [...state.comment, newComment],
      }));
      originChangeHandle(editedContent.id, "comment");

      setWritedComment("");
    } catch (e) {
      console.log(e);
    } finally {
      setIsFecthing(false);
    }
  };

  return (
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
          onClick={() => {
            setIsEditing(false);
            onClose();
          }}
        />
        <div
          className={`${
            isMobile ? "w-11/12" : "w-2/3"
          } bg-white h-full p-6 flex flex-col`}
        >
          <button
            onClick={() => {
              setIsEditing(false);
              onClose();
            }}
            className="self-start mb-4 p-2 rounded-full hover:bg-gray-200 transition-colors"
          >
            <ChevronDoubleRightIcon className="h-6 w-6" />
          </button>

          {editedContent && isOpen && (
            <div className="flex-grow flex flex-col items-center overflow-y-auto">
              <div className="w-full max-w-lg mb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    {editedContent?.profile ? (
                      <img
                        src={editedContent?.profile}
                        alt="Profile"
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <UserCircleIcon className="h-10 w-10 text-gray-400" />
                    )}
                    <button
                      onClick={handleAuthorClick}
                      className="text-lg font-semibold hover:underline"
                    >
                      {editedContent?.nickName}
                    </button>
                  </div>
                  {editedContent.isOwner && !isEditing && (
                    <div className="flex space-x-2">
                      <button
                        onClick={handleEditClick}
                        className={`${
                          isMobile
                            ? "p-2"
                            : "text-mainBlue hover:bg-mainBlue hover:text-white px-3 py-1"
                        } rounded transition-colors duration-200 flex items-center`}
                      >
                        <PencilIcon
                          className={`h-4 w-4 ${
                            isMobile ? "text-mainBlue" : "mr-1"
                          }`}
                        />
                        {!isMobile && "수정"}
                      </button>
                      <button
                        onClick={handleDeleteClick}
                        className={`${
                          isMobile
                            ? "p-2"
                            : "text-red-500 hover:bg-red-500 hover:text-white px-3 py-1"
                        } rounded transition-colors duration-200 flex items-center`}
                      >
                        <TrashIcon
                          className={`h-4 w-4 ${
                            isMobile ? "text-red-500" : "mr-1"
                          }`}
                        />
                        {!isMobile && "삭제"}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="w-full max-w-lg aspect-video relative mb-6">
                {isEditing && images.length === 0 ? (
                  <div
                    onClick={() => imgInput.current.click()}
                    className="w-full h-full border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
                  >
                    <span className="text-gray-500">이미지 등록</span>
                  </div>
                ) : (
                  <>
                    <img
                      src={images[currentIndex]?.imageUrl}
                      alt={`Content ${currentIndex + 1}`}
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
                    {isEditing && (
                      <button
                        onClick={() => handleRemoveImage(currentIndex)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 shadow-lg"
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    )}
                    <span className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-sm">
                      {currentIndex + 1}/{images.length}
                    </span>
                  </>
                )}
                {isEditing && (
                  <button
                    onClick={() => imgInput.current.click()}
                    className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-toDoMid text-white rounded-full p-2 shadow-lg"
                  >
                    <PlusCircleIcon className="h-6 w-6" />
                  </button>
                )}
              </div>

              <div className="w-full max-w-lg mb-4">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleLikeClick}
                    className="flex items-center space-x-1 focus:outline-none"
                  >
                    {isLiked ? (
                      <FullHeart className="w-6 h-6 text-red-500" />
                    ) : (
                      <EmptyHeart className="w-6 h-6 text-gray-500 hover:text-red-500" />
                    )}
                    <span>{editedContent.heart || 0}</span>
                  </button>
                  <div className="flex items-center space-x-1">
                    <ChatBubbleLeftIcon className="w-6 h-6" />
                    <span>{editedContent.comment?.length || 0}</span>
                  </div>
                </div>
              </div>

              <div className="w-full max-w-lg">
                {isEditing ? (
                  <>
                    <textarea
                      value={editedContent?.content}
                      onChange={(e) =>
                        setEditedContent({
                          ...editedContent,
                          content: e.target.value,
                        })
                      }
                      className="mb-6 w-full p-2 border rounded"
                      rows="4"
                    />
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={handleCancelEdit}
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        취소
                      </button>
                      <button
                        onClick={handleSaveEdit}
                        className="px-4 py-2 bg-mainBlue text-white rounded hover:bg-blue-600"
                      >
                        저장
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <h2 className="text-xl font-bold mb-2">
                      {editedContent.title}
                    </h2>
                    {/* <p className="text-gray-600 mb-4">
                      {editedContent.authorName} {editedContent.visitDate}
                    </p> */}
                    <p className="mb-6">{editedContent.content}</p>

                    {/* 댓글 섹션 - 편집 모드가 아닐 때만 표시 */}
                    <div className="border-t border-gray-200 pt-4 mb-4">
                      <h3 className="font-semibold mb-2">댓글</h3>

                      {feedContent?.comment?.map((item, index) => {
                        return (
                          <div key={index}>
                            {item?.profile ? (
                              <img
                                className="h-8 w-8 rounded-full object-cover inline"
                                src={item?.profile}
                                alt="프로필이미지"
                              />
                            ) : (
                              <DefaultUserIcon className="w-8 h-8 rounded-full shadow-md inline" />
                            )}
                            {item?.nickName} : {item?.comment}
                          </div>
                        );
                      })}
                      {/* 여기에 댓글 목록을 렌더링합니다 */}
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleCommentSubmit();
                        }}
                        type="text"
                        onChange={(e) => setWritedComment(e.target.value)}
                        value={writedComment}
                        placeholder="댓글을 입력하세요..."
                        className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-0.5 focus:ring-mainBlue focus:border-mainBlue"
                      />
                      <button
                        onClick={handleCommentSubmit}
                        className="bg-mainBlue text-white px-4 py-2 rounded-md hover:bg-blue-500 transition-colors"
                      >
                        작성
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <input
        ref={imgInput}
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
    </div>
  );
};

export default ContentDrawer;
