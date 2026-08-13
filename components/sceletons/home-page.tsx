import React from "react";

const HomeSceleton = () => {
  return (
    <div className="mx-auto w-full max-w-7xl p-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="group bg-card overflow-hidden rounded-xl border"
          >
            <div className="bg-muted relative aspect-square"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeSceleton;
