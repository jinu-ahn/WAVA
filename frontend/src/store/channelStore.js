import { create } from "zustand";

const useTodoStore = create((set) => ({
  followChannels: [],
  setFollowChannels: (channels) => {
    set(() => ({ followChannels: channels }));
  },
}));
export default useTodoStore;
