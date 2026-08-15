import React from "react";

const Loading = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="mx-auto w-full max-w-7xl p-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="bg-muted relative aspect-square overflow-hidden rounded-lg"></div>

          {/* Product Info */}
          <div className="flex flex-col bg-muted">
            <div className="mb-4 flex items-center gap-4">
              <div className="flex items-center gap-1 bg-muted"></div>
            </div>

            <div className="mb-6 flex items-baseline gap-4 bg-muted"></div>

            <div className="mb-8 grid grid-cols-2 gap-4 bg-muted">
              <div className="flex items-center gap-2 text-sm bg-muted"></div>
              <div className="flex items-center gap-2 text-sm bg-muted"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
