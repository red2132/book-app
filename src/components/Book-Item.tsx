import Link from "next/link";
import { Book } from "../../types";

export default function BookItem({ book }: { book: Book }) {
  return (
    <div className="flex items-center px-4 py-3bg-white rounded-lg shadow-sm hover:shadow-md transition my-3">
      <Link
        className="flex items-center w-full border-gray-200 transition gap-4 "
        href={`/book/${book.id}`}
        aria-label={`View details for ${book.title}`}
      >
        <div className="w-2/12 font-medium text-gray-700">{book.id}</div>
        <div className="w-5/12 truncate text-gray-800">{book.title}</div>
        <div className="w-2/12 text-gray-600">{book.author}</div>
      </Link>
      <button
        className="w-1/12 px-3 py-1 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-300 transition mb-2"
        aria-label={`Delete book ${book.title}`}
      >
        삭제
      </button>
    </div>
  );
}
