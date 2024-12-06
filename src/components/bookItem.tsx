import { Book } from "../../types";

export default function BookItem({ book }: { book: Book }) {
  return (
    <div className="flex items-center px-4 py-2 border-b border-gray-300 hover:bg-gray-50 transition gap-4">
      <div className="w-1/12">{book.id}</div>
      <div className="w-5/12">{book.title}</div>
      <div className="w-4/12">{book.author}</div>
      <div className="w-2/12 text-right">
        <button className="px-3 py-1 bg-red-600 text-white rounded shadow hover:bg-red-700 transition">
          삭제
        </button>
      </div>
    </div>
  );
}
