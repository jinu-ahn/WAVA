import { typeOptions } from "../dataset";

function TypeRadio({ selected, setSelected }) {
  const handleChange = (e) => {
    setSelected(e.target.value);
  };
  const options = typeOptions;
  return (
    <>
      {/* <!-- TYPE 라디오 그룹 --> */}
      <div className="flex flex-col items-center">
        <span className="label-text mb-2">분류</span>
        <div className="flex">
          {options.map((option) => (
            <div key={option.value} className="form-control m-2">
              <label className="label cursor-pointer flex flex-col items-center">
                <span className="label-text mb-2">{option.label}</span>
                <input
                  type="radio"
                  name="type"
                  value={option.value}
                  className={`radio checked:${option.color}`}
                  checked={selected === option.value}
                  onChange={handleChange}
                />
              </label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default TypeRadio;
