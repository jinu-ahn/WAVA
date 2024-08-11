import ChannelSubIcon from "./ChannelSubIcon";

function ChannelSubExplorer({ children, data, type, toolbarBtn = null }) {
  return (
    <div className="flex flex-col h-full">
      <div className="sticky top-0 bg-blue-50 z-10 pb-2">{children}</div>
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col items-center space-y-2 px-2 pt-2">
          {toolbarBtn}
          {data.map((el) => (
            <ChannelSubIcon key={el?.channelId} type={type} el={el} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChannelSubExplorer;
