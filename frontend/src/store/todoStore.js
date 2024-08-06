import { create } from "zustand";
import {
  getTodoList,
  createTodoRequest,
  deleteTodoRequest,
  updateTodoRequest,
} from "../api/todoApi";

const useTodoStore = create((set) => ({
  events: [],
  filteredEvents: [],
  setFilteredEvents: (evts) => {
    set(() => ({ filteredEvents: evts }));
  },
  fetchEvents: async () => {
    const events = await getTodoList();
    if (Array.isArray(events)) {
      set({
        events,
      });
      return true;
    } else {
      console.log("server error-f");
      return false;
    }
  },

  addEvent: async (newTodo) => {
    const event = await createTodoRequest(newTodo);
    if (event) {
      set((state) => ({
        events: [...state.events, event],
      }));
      return true;
    } else {
      return false;
    }
  },

  deleteEvent: async (id) => {
    const rst = await deleteTodoRequest(id);
    if (rst) {
      set((state) => ({
        events: state.events.filter((event) => event.id !== id),
      }));
      return true;
    } else {
      console.error("delete 에러");
      return false;
    }
  },

  updateEvent: async (todoItem) => {
    const rst = await updateTodoRequest(todoItem);
    if (rst) {
      set((state) => ({
        events: state.events.map((event) =>
          event.id === todoItem?.id ? todoItem : event
        ),
      }));
      return true;
    } else {
      console.error("update 에러");
      return false;
    }
  },
}));
export default useTodoStore;
