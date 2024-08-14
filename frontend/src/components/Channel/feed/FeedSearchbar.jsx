import { useState } from "react";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import Swal from "sweetalert2";

function FeedSearchBar({ searchHandle, searchBarRef, tooltipMessage }) {
  const [searchText, setsearchText] = useState("");
  const [isFetch, setIsFeth] = useState(false);

  const submitHandle = async (e) => {
    if (!searchText || searchText?.length === 0) {
      return Swal.fire({
        position: "center",
        icon: "error",
        title: "검색어를 입력해주세요",
        showConfirmButton: true,
        timer: 2000,
      });
    }
    if (isFetch) return;
    try {
      setIsFeth(true);
      e.preventDefault();
      await searchHandle(searchText);
    } finally {
      setIsFeth(false);
    }
  };
  return (
    <div className="flex items-center justify-center my-5">
      <div className="sm:w-full max-w-md mx-auto flex items-center">
        <form onSubmit={submitHandle} className="flex-grow">
          <label className="input input-bordered flex items-center gap-2">
            <input
              ref={searchBarRef}
              required
              value={searchText}
              onChange={(e) => setsearchText(e.target.value)}
              type="text"
              className="grow"
              placeholder="Search"
            />
            <svg
              onClick={submitHandle}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70 cursor-pointer"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </form>
        <div
          className="ml-2 h-6 w-6 opacity-70 cursor-pointer tooltip tooltip-right z-[10] flex-shrink-0"
          data-tip={tooltipMessage}
        >
          <QuestionMarkCircleIcon />
        </div>
      </div>
    </div>
  );
}

export default FeedSearchBar;
