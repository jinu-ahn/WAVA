import { nanoid } from "nanoid";
import { NavLink } from "react-router-dom";

function ChannelSubExplorer({ children, data, type, addBtn = null }) {
  return (
    <div className="flex flex-col h-full">
      <div className="sticky top-0 bg-white z-10 pb-2">{children}</div>
      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col items-center space-y-2 px-2 pt-2">
          {addBtn}

          {data.map((el) => (
            <NavLink
              tabIndex={-1}
              aria-hidden={true}
              key={nanoid()}
              draggable={false}
              to={`/channel/${type}/${el.id}`}
              className="w-full"
            >
              <button className="w-10 h-10 mx-auto bg-gray-200 rounded-full hover:bg-gray-300 transition-colors duration-200 flex items-center justify-center"></button>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChannelSubExplorer;
