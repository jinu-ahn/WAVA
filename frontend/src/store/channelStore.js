import { create } from "zustand";

const useChannelStore = create((set, get) => ({
  followChannels: [],
  channelUserList: [],
  myInfo: {},
  setFollowChannels: (channels) => {
    set(() => ({ followChannels: channels }));
  },
  addFollowChannels: (newChannel) => {
    set((state) => ({ followChannels: [...state.followChannels, newChannel] }));
  },
  setUserListAndMyInfo: (userList) => {
    set(() => ({ channelUserList: userList }));
    const myObjectString = sessionStorage.getItem("userStorage");
    const myObject = JSON.parse(myObjectString);
    const myNickName = myObject.state.userInfo.nickName;
    const myProfileImg = userList.find(user => user.nickName === myNickName).profile
    set(() => ({
      myInfo: {
        nickName: myNickName,
        profileImg: myProfileImg
    }}));
  },
}));
export default useChannelStore;
