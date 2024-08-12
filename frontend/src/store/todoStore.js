import { create } from "zustand";
import {
  getTodoList,
  getTodayTodoList,
  createTodoRequest,
  deleteTodoRequest,
  updateTodoRequest,
} from "../api/todoApi";

const useTodoStore = create((set) => ({
  events: [],
  todayEvents: [],
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
      return false;
    }
  },

  fetchTodayEvents: async () => {
    const todayEvents = await getTodayTodoList();
    if (Array.isArray(todayEvents)) {
      set({
        todayEvents,
      });
      return true;
    } else {
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
      const idNum = Number(todoItem.id);
      set((state) => ({
        events: state.events.map((event) =>
          Number(event.id) === idNum ? todoItem : event
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
