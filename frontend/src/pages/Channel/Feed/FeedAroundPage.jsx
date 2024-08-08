import { useEffect, useState } from "react";
import ContentDrawer from "../../../components/Channel/feed/ContentDrawer";
import ContentItemGrid from "../../../components/Channel/feed/ContentItemGrid";
import FeedSearchBar from "../../../components/Channel/feed/FeedSearchbar";
import { searchFeedRequest } from "../../../api/channelFeedApi";

function FeedAroundPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedFeedId, setSelectedFeedId] = useState(null);

  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(false);

  const [pages, setPages] = useState(0);
  const [maxPage, setMaxPage] = useState(-1);

  const [searchKeyword, setSearchKeyword] = useState("");

  const [isNoContent, setIsNoContent] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const resp = await searchFeedRequest();
        if (resp?.data?.data?.length > 0) {
          setContents(resp?.data?.data);
          setMaxPage(resp?.data?.totalPages - 1); // 0부터 -1까지
        } else {
          setIsNoContent(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedFeedId(null);
  };

  const handleSelectContent = (content) => {
    setSelectedFeedId(content.id);
    setIsDrawerOpen(true);
  };

  const searchHandle = async (searchText) => {
    const resp = await searchFeedRequest(searchText);
    if (resp?.data?.data.length > 0) {
      setContents(resp?.data?.data);
      setMaxPage(resp?.data?.totalPages);
    } else {
      setIsNoContent(true);
      setContents([]);
      setMaxPage(-1);
    }
    setPages(0);
    setSearchKeyword(searchText);
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

  const loadMore = async () => {
    if (loading) return;
    try {
      console.log(pages, maxPage);
      if (pages + 1 > maxPage) return;
      setLoading(true);
      const feedContResp = await searchFeedRequest(searchKeyword, pages + 1);
      if (feedContResp?.data) {
        setContents((state) => [...state, ...feedContResp?.data?.data]);
        setPages((c) => c + 1);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full">
      <div className="flex flex-col flex-1">
        <FeedSearchBar searchHandle={searchHandle} />

        {isNoContent && <h1>아무것도검색되지않았다</h1>}
        <ContentItemGrid
          loadMore={loadMore}
          contents={contents}
          loading={loading}
          onSelectContent={handleSelectContent}
        />
        <ContentDrawer
          isOpen={isDrawerOpen}
          onClose={handleCloseDrawer}
          feedId={selectedFeedId}
          originChangeHandle={handleChange}
        />
      </div>
    </div>
  );
}

export default FeedAroundPage;
