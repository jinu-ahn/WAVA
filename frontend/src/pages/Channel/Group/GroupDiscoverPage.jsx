import { useEffect, useState } from "react";
import FeedSearchBar from "../../../components/Channel/feed/FeedSearchbar";
import { createGroupChannelAPI } from "../../../api/groupChannelAPI";

function GroupDiscoverPage() {
  const [groupList, setGroupList] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const resp = await createGroupChannelAPI.getAllChannelList();
      console.log(resp);
      if (resp) {
        setGroupList(resp.data);
      }
    };
    getData();
  }, []);
  const searchHandle = async (searchText) => {};
  return (
    <>
      <FeedSearchBar searchHandle={searchHandle} />

      <div>
        {groupList.map((g) => (
          <h1> {g.channelId}</h1>
        ))}
      </div>
    </>
  );
}

export default GroupDiscoverPage;
