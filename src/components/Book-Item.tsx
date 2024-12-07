import Link from "next/link";
import { Book } from "../../types";
import BookItemDeleteButton from "./Book-Item-delete-button";

export default function BookItem({ book }: { book: Book }) {
  return (
    <div className="flex items-center px-4 py-3bg-white rounded-lg shadow-sm hover:shadow-md transition my-3">
      <Link
        className="flex items-center w-full border-gray-200 transition gap-4 "
        href={`/book/${book.id}`}
        aria-label={`View details for ${book.title}`}
      >
        <div className="w-1/12 font-medium text-gray-700">{book.id}</div>
        <div className="w-5/12 truncate text-gray-800">{book.title}</div>
        <div className="w-3/12 text-gray-600">{book.author}</div>
      </Link>
      <div className="w-1/12">
        <BookItemDeleteButton bookId={book.id} bookTitle={book.title} />
      </div>
    </div>
  );
}
