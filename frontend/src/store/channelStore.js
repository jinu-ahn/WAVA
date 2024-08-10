import { create } from "zustand";

const useChannelStore = create((set) => ({
  followChannels: [],
  setFollowChannels: (channels) => {
    set(() => ({ followChannels: channels }));
  },
  addFollowChannels: (newChannel) => {
    set((state) => ({ followChannels: [...state.followChannels, newChannel] }));
  },
}));
export default useChannelStore;
