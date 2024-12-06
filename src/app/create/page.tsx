"use client";

import { createBookAction } from "@/actions/create-book-actions";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

export default function CreateBookBage() {
  const [state, formAction, isPending] = useActionState(createBookAction, null);
  const router = useRouter();
  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  });

  useEffect(() => {
    if (state?.status) {
      router.push("/");
    }
  }, [state]);

  return (
    <form
      className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 space-y-4"
      action={formAction}
    >
      <h1 className="text-xl font-semibold text-gray-800">새로운 도서 추가</h1>

      {/* Book Title */}
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          제목
        </label>
        <input
          disabled={isPending}
          type="text"
          id="title"
          name="title"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>

      {/* Author */}
      <div>
        <label
          htmlFor="author"
          className="block text-sm font-medium text-gray-700"
        >
          저자
        </label>
        <input
          disabled={isPending}
          type="text"
          id="author"
          name="author"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>

      {/* Quantity */}
      <div>
        <label
          htmlFor="quantity"
          className="block text-sm font-medium text-gray-700"
        >
          수량
        </label>
        <input
          disabled={isPending}
          type="number"
          id="quantity"
          name="quantity"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>

      {/* Details */}
      <div>
        <label
          htmlFor="detail"
          className="block text-sm font-medium text-gray-700"
        >
          상세
        </label>
        <textarea
          disabled={isPending}
          id="detail"
          name="detail"
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        ></textarea>
      </div>

      {/* Buttons */}
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
        >
          뒤로
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {isPending ? "저장 중..." : "저장"}
        </button>
      </div>
    </form>
  );
}