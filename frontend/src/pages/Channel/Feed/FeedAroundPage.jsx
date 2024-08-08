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
      setContents(resp);
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

  const handleChange = (contentId, type, status) => {
    if (type === "like") {
      const add = status ? 1 : -1;
      setContents((s) =>
        s.map((feed) =>
          feed.id === contentId ? { ...feed, likes: feed.likes + add } : feed
        )
      );
    } else if (type === "comment") {
      setContents((s) =>
        s.map((feed) =>
          feed.id === contentId
            ? { ...feed, commentsCount: feed.commentsCount + 1 }
            : feed
        )
      );
    }
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
          originChangeHandle={handleChange}
        />
      </div>
    </div>
  );
}

export default FeedAroundPage;
