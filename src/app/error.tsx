"use client";

import { useRouter } from "next/navigation";
import { startTransition, useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    console.error(error.message);
  }, [error]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h3 className="text-xl font-semibold text-red-600 mb-4">
          오류가 발생했습니다.
        </h3>
        <button
          onClick={() => {
            startTransition(() => {
              router.refresh(); // 현재 페이지에 필요한 서버 컴포넌트를 다시 불러옴
              reset(); // 에러상태 초기화
            });
          }}
          className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg shadow hover:bg-red-700 transition"
        >
          다시 시도
        </button>
      </div>
    </div>
  );
}
