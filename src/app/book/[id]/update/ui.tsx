"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { Book } from "../../../../../types";
import { updateBookAction } from "@/actions/update-book-actions";
import BackButton from "@/components/Back-Button";

export default function UpdateBookUi({ bookInfo }: { bookInfo: Book }) {
  const [state, formAction, isPending] = useActionState(updateBookAction, null);
  const [title, setTitle] = useState(bookInfo.title);
  const [author, setAuthor] = useState(bookInfo.author);
  const [quantity, setQuantity] = useState(bookInfo.quantity);
  const [detail, setDetail] = useState(bookInfo.detail);
  const router = useRouter();
  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  useEffect(() => {
    if (state?.status) {
      router.back();
    }
  }, [router, state]);

  return (
    <form
      className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 space-y-4"
      action={formAction}
    >
      <h1 className="text-xl font-semibold text-gray-800">도서 정보 수정</h1>
      <input type="text" name="id" value={bookInfo.id} hidden readOnly />
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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
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
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
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
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        ></textarea>
      </div>

      {/* Buttons */}
      <div className="flex justify-end space-x-3">
        <BackButton />
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
