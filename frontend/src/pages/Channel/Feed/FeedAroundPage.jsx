import { useEffect, useState } from "react";
import ContentDrawer from "../../../components/Channel/feed/ContentDrawer";
import ContentItemGrid from "../../../components/Channel/feed/ContentItemGrid";
import FeedSearchBar from "../../../components/Channel/feed/FeedSearchbar";
import { searchFeedRequest } from "../../../api/channelFeedApi";

function FeedAroundPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);

  const [contents, setContents] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const resp = await searchFeedRequest();
      setContents(resp?.data);
    };

    getData();
  }, []);

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedContent(null);
  };

  const handleSelectContent = (content) => {
    setSelectedContent(content);
    setIsDrawerOpen(true);
  };

  const searchHandle = async (searchText) => {
    setContents(await searchFeedRequest(searchText));
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

  return (
    <div className="flex h-full">
      <div className="flex flex-col flex-1">
        <FeedSearchBar searchHandle={searchHandle} />
        <ContentItemGrid
          loadMore={null}
          contents={contents}
          onSelectContent={handleSelectContent}
        />
        <ContentDrawer
          isOpen={isDrawerOpen}
          onClose={handleCloseDrawer}
          content={selectedContent}
          onLike={handleLike}
        />
      </div>
    </div>
  );
}

export default FeedAroundPage;
