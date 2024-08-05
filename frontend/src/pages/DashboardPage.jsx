import DashboardContent from "../components/Dashboard/DashboardContent";
import Calendar from "../components/Dashboard/Calendar";
import useDeviceStore from "../store/deviceStore";
import { useCallback, useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import useTodoStore from "../store/todoStore";
import Explorer from "../components/common/Explorer";

function DashboardPage() {
  const [recentEvents, setRecentEvents] = useState([]);
  const isMobile = useDeviceStore((state) => state.isMobile);
  const { events } = useTodoStore();
  const calendarRef = useRef(null);

  const handleDatesSet = useCallback(() => {
    let today = dayjs();
    let start = today.subtract(6, "day").startOf("day"); // 일주일 전
    let end = today.add(1, "day").startOf("day"); // 내일의 시작 시점
    let filteredEvents = events.filter((event) => {
      let eventStart = dayjs(event.start);
      return eventStart.isAfter(start) && eventStart.isBefore(end);
    });

    setRecentEvents(filteredEvents);
  }, [events, setRecentEvents]);

  useEffect(() => {
    handleDatesSet();
  }, [handleDatesSet]);

  const handleChangeCalendarView = (viewType) => {
    // let calendarApi = calendarRef.current?.getApi();
    // let events = calendarApi.getEvents();
    // console.log(events);
    // calendarApi.changeView(viewType);
    console.log(recentEvents);
  };

  return (
    <div className="flex h-screen justify-between bg-white">
      <Explorer />

      {!isMobile && (
        <div className="flex-grow w-1/5 min-h-[500px] mx-2 min-w-[200px]">
          <DashboardContent calendarChange={handleChangeCalendarView} />
        </div>
      )}

      <div
        className={`flex-grow ${
          isMobile ? "w-full" : "w-4/5"
        } min-h-[500px] mx-1 my-5`}
      >
        <Calendar calendarRef={calendarRef} />
      </div>
    </div>
  );
}

export default DashboardPage;
