import { create } from "zustand";

const useChannelStore = create((set) => ({
  followChannels: [],
  setFollowChannels: (channels) => {
    set(() => ({ followChannels: channels }));
  },
}));
export default useChannelStore;
