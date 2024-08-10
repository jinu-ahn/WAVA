import { nanoid } from "nanoid";
import { NavLink } from "react-router-dom";
import { getRandomColor } from "../../util/func";

function ChannelSubExplorer({ children, data, type, toolbarBtn = null }) {
  const colorset = ["red", "yellow", "gray", "green"];
  return (
    <div className="flex flex-col h-full">
      <div className="sticky top-0 bg-blue-50 z-10 pb-2">{children}</div>
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col items-center space-y-2 px-2 pt-2">
          {toolbarBtn}
          {data.map((el, idx) => (
            <NavLink
              tabIndex={-1}
              aria-hidden={true}
              key={nanoid()}
              draggable={false}
              to={`/channel/${type}/${el.channelId}`}
              className="w-full"
            >
              <button
                className={`w-10 font-bold h-10 mx-auto rounded-full  transition-colors duration-200 flex items-center justify-center bg-${
                  colorset[idx % colorset.length]
                }-500 hover:bg-${colorset[idx % colorset.length]}-600 `}
              >
                {el?.channelTitle[0]}
              </button>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChannelSubExplorer;
