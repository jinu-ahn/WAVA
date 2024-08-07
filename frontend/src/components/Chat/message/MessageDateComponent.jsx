import React from "react";

function MessageDateComponent({ date }) {
    const formatDate = (dateStr) => {
        const [year, month, day] = dateStr.split(".");
        return `${year}년 ${month}월 ${day}일`;
    };

    return (
        <div className="flex items-center mb-7">
            <div className="flex-grow border-t border-gray-300/75"></div>
            <span className="bg-gray-200/25 px-4 py-1 rounded-xl text-xs">{formatDate(date)}</span>
            <div className="flex-grow border-t border-gray-300/75"></div>
        </div>
    );
};

export default MessageDateComponent;