import { importantOptions, typeOptions } from "../dataset";

function Filters({ filter, setFilter }) {
  const imOptions = [{ label: "ALL", value: "ALL" }, ...importantOptions];
  const tyOptions = [{ label: "ALL", value: "ALL" }, ...typeOptions];

  const typeChangeHandle = (value) => {
    if (value === filter?.type) return;
    setFilter((state) => ({
      ...state,
      type: value,
    }));
  };

  const importantChangeHandle = (value) => {
    if (value === filter?.important) return;
    setFilter((state) => ({
      ...state,
      important: value,
    }));
  };

  return (
    <div className="flex flex-col p-2 space-y-2">
      <div className="flex space-x-2">
        {tyOptions.map((opt) => (
          <button
            key={opt.value}
            value={opt.value}
            className={`btn btn-sm ${
              filter?.type === opt.value
                ? "bg-blue-500 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
            onClick={() => typeChangeHandle(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>
      <div className="flex space-x-2">
        {imOptions.map((opt) => (
          <button
            key={opt.value}
            value={opt.value}
            className={`btn btn-sm ${
              filter?.important === opt.value
                ? "bg-blue-500 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
            onClick={() => importantChangeHandle(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Filters;
