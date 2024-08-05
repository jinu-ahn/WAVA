// import { useState } from "react";
// import { useParams } from "react-router-dom";
// import ContentDrawer from "../../../components/Channel/feed/ContentDrawer";
// import ContentItemGrid from "../../../components/Channel/feed/ContentItemGrid";
// import CreateContentDrawer from "../../../components/Channel/feed/CreateContentDrawer";
// import FeedHeader from "../../../components/Channel/feed/FeedHeader";
// import { get_feedData } from "../../../api/dummy";

// function FeedPersonalPage() {
//   const { userId } = useParams(); // URL에서 userId를 가져옵니다
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const [selectedContent, setSelectedContent] = useState(null);
//   const [isCreateDrawerOpen, setIsCreateDrawerOpen] = useState(false);

//   // 더미 데이터를 현재 페이지 소유자의 정보로 수정합니다
//   const contents = get_feedData.map((content) => ({
//     ...content,
//     authorId: userId,
//     authorName: `User ${userId}`, // 실제로는 사용자 이름을 가져오는 로직이 필요합니다
//     isOwner: true, // 모든 컨텐츠가 현재 사용자의 것임을 표시
//   }));

//   const handleSelectContent = (content) => {
//     setSelectedContent(content);
//     setIsDrawerOpen(true);
//   };

//   const handleCloseDrawer = () => {
//     setIsDrawerOpen(false);
//     setSelectedContent(null);
//   };

//   return (
//     <>
//       <div className="flex h-full">
//         <div className="flex flex-col flex-1">
//           <FeedHeader openCreateDrawer={() => setIsCreateDrawerOpen(true)} />
//           <ContentItemGrid
//             contents={contents}
//             onSelectContent={handleSelectContent}
//           />
//           <ContentDrawer
//             isOpen={isDrawerOpen}
//             onClose={handleCloseDrawer}
//             content={selectedContent}
//           />
//           <CreateContentDrawer
//             onClose={() => setIsCreateDrawerOpen(false)}
//             isOpen={isCreateDrawerOpen}
//           />
//         </div>
//       </div>
//     </>
//   );
// }

// export default FeedPersonalPage;

import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import ContentDrawer from "../../../components/Channel/feed/ContentDrawer";
import ContentItemGrid from "../../../components/Channel/feed/ContentItemGrid";
import CreateContentDrawer from "../../../components/Channel/feed/CreateContentDrawer";
import FeedHeader from "../../../components/Channel/feed/FeedHeader";
import {
  readFeedContentRequest,
  readFeedInfoRequest,
} from "../../../api/channelFeedApi";

function FeedPersonalPage() {
  const { userId } = useParams(); // URL에서 userId를 가져옵니다
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedFeedId, setSelectedFeedId] = useState(null);
  const [isCreateDrawerOpen, setIsCreateDrawerOpen] = useState(false);

  const [userInfo, setUserInfo] = useState(null);
  const [contents, setContents] = useState(null);

  const [loading, setLoading] = useState(false);

  const [pages, setPages] = useState(1);
  const location = useLocation();
  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const feedInfoResp = await readFeedInfoRequest(userId);
        const feedContResp = await readFeedContentRequest(userId);
        // 1페이지 컨텐츠 있는지 서버 붙었을때 테스트 할 것
        if (feedContResp?.data) {
          setContents(feedContResp.data);
        }
        if (feedInfoResp) setUserInfo(feedInfoResp);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [userId, location.pathname]);

  const handleSelectContent = (content) => {
    setSelectedFeedId(content.id);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedFeedId(null);
  };

  const handleEditContent = (editedContent) => {
    setContents((prevContents) =>
      prevContents.map((content) =>
        content.id === editedContent.id ? editedContent : content
      )
    );
    setSelectedFeedId(editedContent?.id);
    // setSelectedContent(editedContent?.id);
  };

  const handleDeleteContent = (contentId) => {
    setContents((prevContents) =>
      prevContents.filter((content) => content.id !== contentId)
    );
  };

  const handleLike = (contentId, isLiked) => {
    // API 호출을 통해 서버에 좋아요 상태 업데이트
    // 예: api.updateLike(contentId, isLiked)
    //     .then(() => {
    //       // 필요한 경우 로컬 상태 업데이트
    //     })
    //     .catch(error => {
    //       console.error("Failed to update like:", error);
    //       // 에러 처리 로직
    //     });
  };

  const addItem = () => {
    window.location.reload();
  };

  const loadMore = async () => {
    try {
      setLoading(true);
      const feedContResp = await readFeedContentRequest(userId, pages + 1);
      if (feedContResp?.data) {
        setContents((state) => [...state, ...feedContResp.data]);
        setPages((c) => c + 1);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="flex h-full">
        <div className="flex flex-col flex-1">
          <FeedHeader
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            openCreateDrawer={() => setIsCreateDrawerOpen(true)}
          />
          <ContentItemGrid
            loadMore={loadMore}
            loading={loading}
            contents={contents}
            onSelectContent={handleSelectContent}
          />
          <ContentDrawer
            isOpen={isDrawerOpen}
            onClose={handleCloseDrawer}
            onEdit={handleEditContent}
            onDelete={handleDeleteContent}
            onLike={handleLike}
            feedId={selectedFeedId}
          />
          <CreateContentDrawer
            addItem={addItem}
            onClose={() => setIsCreateDrawerOpen(false)}
            isOpen={isCreateDrawerOpen}
          />
        </div>
      </div>
    </>
  );
}

export default FeedPersonalPage;
