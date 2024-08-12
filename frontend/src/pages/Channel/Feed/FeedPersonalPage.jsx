import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ContentDrawer from "../../../components/Channel/feed/ContentDrawer";
import ContentItemGrid from "../../../components/Channel/feed/ContentItemGrid";
import CreateContentDrawer from "../../../components/Channel/feed/CreateContentDrawer";
import FeedHeader from "../../../components/Channel/feed/FeedHeader";
import {
  readFeedContentRequest,
  readFeedInfoRequest,
} from "../../../api/channelFeedApi";
import NoContent from "../../../components/Channel/feed/NoContent";
import LoadingSpinner from "../../../components/Channel/LoadingSpinner";
import useDeviceStore from "../../../store/deviceStore";

function FeedPersonalPage() {
  const isMobile = useDeviceStore((state) => state.isMobile);
  const { userId } = useParams(); // URL에서 userId를 가져옵니다
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedFeedId, setSelectedFeedId] = useState(null);
  const [isCreateDrawerOpen, setIsCreateDrawerOpen] = useState(false);

  const [userInfo, setUserInfo] = useState(null);
  const [contents, setContents] = useState(null);

  const [loading, setLoading] = useState(false);
  const [itemLoading, setItemLoading] = useState(false);

  const [pages, setPages] = useState(0);
  const [maxPage, setMaxPage] = useState(-1);

  const [isNoContent, setIsNoContent] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const openDrawerRef = useRef(null);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const feedInfoResp = await readFeedInfoRequest(userId);
        if (feedInfoResp?.data) {
          setUserInfo(feedInfoResp?.data);
        } else {
          // alert("존재하지 않는 유저입니다!");
          navigate("/channel");
        }
        const feedContResp = await readFeedContentRequest(userId);
        if (feedContResp?.data?.data?.length > 0) {
          setMaxPage(feedContResp?.data?.totalPages - 1); // 0부터 -1까지
          setContents(feedContResp.data.data);
          setIsNoContent(false);
        } else {
          setMaxPage(-1);
          setContents([]);
          setIsNoContent(true);
        }
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
  };

  const handleDeleteContent = (contentId) => {
    setContents((prevContents) =>
      prevContents.filter((content) => content.id !== contentId)
    );
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

  const addItem = () => {
    window.location.reload();
  };

  const loadMore = async () => {
    if (itemLoading) return;
    try {
      if (pages + 1 > maxPage) return;
      setItemLoading(true);
      const feedContResp = await readFeedContentRequest(userId, pages + 1);
      if (feedContResp?.data) {
        setContents((state) => [...state, ...feedContResp?.data?.data]);
        setPages((c) => c + 1);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setItemLoading(false);
    }
  };

  const createFeedControl = () => {
    openDrawerRef.current.click();
  };
  return (
    <>
      <div className="flex h-full">
        <div className={`flex flex-col flex-1 `}>
          <FeedHeader
            openDrawerRef={openDrawerRef}
            createFeedControl={createFeedControl}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            openCreateDrawer={() => setIsCreateDrawerOpen(true)}
          />
          {loading ? (
            <LoadingSpinner message="게시글을 불러오는 중입니다." /> // 추가: 로딩 중일 때 스피너 표시
          ) : (
            <>
              <ContentItemGrid
                isPersonal={true}
                isNoContent={isNoContent}
                noContentComponent={
                  <NoContent
                    refStatus={openDrawerRef.current ? true : false}
                    createFeedControl={createFeedControl}
                  />
                }
                loadMore={loadMore}
                loading={itemLoading}
                contents={contents}
                onSelectContent={handleSelectContent}
              />
              <ContentDrawer
                isOpen={isDrawerOpen}
                onClose={handleCloseDrawer}
                onEdit={handleEditContent}
                onDelete={handleDeleteContent}
                originChangeHandle={handleChange}
                feedId={selectedFeedId}
              />
              <CreateContentDrawer
                addItem={addItem}
                onClose={() => setIsCreateDrawerOpen(false)}
                isOpen={isCreateDrawerOpen}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default FeedPersonalPage;
