import useDeviceStore from "../../../store/deviceStore";

function GroupInfoModal({ onClose }) {
  const isMobile = useDeviceStore((state) => state.isMobile);

  return (
    <div
      className={`${
        isMobile ? "scale-90 transform origin-top " : ""
      } select-none p-5`}
    ></div>
  );
}

export default GroupInfoModal;
