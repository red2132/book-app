"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
      onClick={() => router.back()}
    >
      뒤로
    </button>
  );
}
