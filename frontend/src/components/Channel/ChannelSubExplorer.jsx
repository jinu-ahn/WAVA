import ChannelSubIcon from "./ChannelSubIcon";

function ChannelSubExplorer({ children, data, type, toolbarBtn = null }) {
  return (
    // <div className="">
    <>
      {children}
      <div className="flex flex-col items-center space-y-2 px-2 pt-2">
        {toolbarBtn}
        {data.map((el) => (
          <ChannelSubIcon key={el?.channelId} type={type} el={el} />
        ))}
      </div>
    </>
    // </div>
  );
}

export default ChannelSubExplorer;
