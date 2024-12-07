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
  const [state, formAction, isPending] = useActionState(deleteBookAction, null);

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  });

  return (
    <form action={formAction}>
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
