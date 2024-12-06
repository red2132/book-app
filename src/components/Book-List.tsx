import { getBookListAction } from "@/actions/get-book-list-actions";
import { BookListInfo } from "../../types";
import BookItem from "./Book-Item";
import Pagination from "./Pagination";

export default async function BookList({ page = 1 }: { page?: number }) {
  const responseInfo = await getBookListAction(page);
  const { currentPage, totalPages, totalItems, books }: BookListInfo =
    responseInfo.data;
  return (
    <>
      <p className="flex flex-row-reverse mb-3">총 도서 {totalItems}개</p>
      <div className="w-full border-t border-gray-300">
        {/* Header Row */}
        <div className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 font-semibold border-b border-gray-300 gap-4">
          <div className="w-1/12">#</div>
          <div className="w-5/12">제목</div>
          <div className="w-4/12">저자</div>
          <div className="w-2/12"></div>
        </div>
        {/* Book Rows */}
        {books.map((book) => (
          <BookItem book={book} key={book.id} />
        ))}
      </div>
      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition">
        도서 추가
      </button>
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </>
  );
}
