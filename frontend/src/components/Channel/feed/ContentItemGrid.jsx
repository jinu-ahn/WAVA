import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import useDeviceStore from "../../../store/deviceStore";

const ContentItemGrid = ({ loadMore, onSelectContent, contents, loading }) => {
  const isMobile = useDeviceStore((state) => state.isMobile);
  const [ref, inView] = useInView({
    threshold: 1,
  });

  useEffect(() => {
    if (loadMore && inView) {
      loadMore();
    }
  }, [inView, loadMore]);

  return (
    <>
      <div
        className={`grid overflow-y-auto h-full select-none user ${
          isMobile ? "grid-cols-1 gap-y-6" : "grid-cols-2"
        } 2xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 gap-6 p-6`}
      >
        {contents?.map((content, index) => (
          <div className="flex justify-center relative group" key={index}>
            <img
              src={content.imageUrl}
              onClick={() => onSelectContent(content)}
              alt="Content"
              className="rounded-md aspect-square cursor-pointer w-full"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 rounded-md flex items-center justify-center pointer-events-none">
              <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="mr-4">❤️ {content.likes}</span>
                <span>💬 {content.commentsCount}</span>
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <>
            {[...Array(5)].map((_, index) => (
              <div className="flex justify-center animate-pulse " key={index}>
                <div className="rounded-md bg-gray-400 w-full aspect-square" />
              </div>
            ))}
          </>
        )}

        {/* observer */}
        {contents && <div ref={ref} />}
      </div>
    </>
  );
};

export default ContentItemGrid;
