const SkeletonRoomItem = () => {
  return (
    <div className="bg-white rounded-lg shadow p-4 animate-pulse">
      {/* 제목과 사용자 수 스켈레톤 */}
      <div className="flex justify-between items-center mb-2">
        <div className="h-6 bg-gray-300 rounded w-1/2"></div>
        <div className="h-6 bg-gray-300 rounded w-1/6"></div>
      </div>

      {/* 설명 스켈레톤 */}
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-300 rounded w-2/3 mb-4"></div>

      {/* 버튼 스켈레톤 */}
      <div className="h-10 bg-gray-300 rounded w-full"></div>
    </div>
  );
};
