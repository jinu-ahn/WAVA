import { NavLink } from "react-router-dom";

function ChannelSubIcon({ type, el }) {
  const bg = `rgba(${el.r},${el.g},${el.b},0.2)`;
  const hover = `rgba(${el.r},${el.g},${el.b},0.5)`;

  return (
    <NavLink
      tabIndex={-1}
      aria-hidden={true}
      key={el.channelId}
      draggable={false}
      to={`/channel/${type}/${el.channelId}`}
      className="w-full"
    >
      <button
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = hover;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = bg;
        }}
        style={{ backgroundColor: bg }}
        className="transition-colors duration-300 w-10 font-bold h-10 mx-auto rounded-full flex items-center justify-center"
      >
        {el?.channelTitle[0]}
      </button>
    </NavLink>
  );
}

export default ChannelSubIcon;
