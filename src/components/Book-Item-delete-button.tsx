"use client";

import { deleteBookAction } from "@/actions/delete-book-actions";
import { useActionState, useEffect } from "react";

export default function BookItemDeleteButton({
  bookId,
  bookTitle,
}: {
  bookId: number;
  bookTitle: string;
}) {
  // form 액션
  const [state, formAction, isPending] = useActionState(deleteBookAction, null);

  // error 처리
  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  // 삭제 전 정말 삭제하는지 확인하는 alert 출력
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const confirmDelete = confirm(
      `도서 "${bookTitle}"(을)를 정말 삭제하시겠습니까?`
    );
    if (confirmDelete) {
      const form = e.currentTarget;
      form.requestSubmit(); // 폼 제출
    }
  };

  return (
    <form action={formAction} onSubmit={handleSubmit}>
      <input name="bookId" value={bookId} hidden readOnly />
      <button
        className="px-3 py-1 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-300 transition mb-2"
        type="submit"
        aria-label={`Delete book ${bookTitle}`}
        disabled={isPending}
      >
        {isPending ? "..." : "삭제"}
      </button>
    </form>
  );
}
