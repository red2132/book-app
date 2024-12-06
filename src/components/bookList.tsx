import { BookListInfo } from "../../types";
import BookItem from "./bookItem";

export default async function BookList({ page = 1 }: { page?: number }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/books?page=${page}`
  );

  if (!response.ok) {
    throw new Error(`리뷰 불러오기 실패: ${response.statusText}`);
  }

  const responseInfo = await response.json();
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
      {/* Pagination */}
      <div className="flex justify-center items-center space-x-2">
        <button
          className="px-3 py-1 bg-gray-300 text-gray-700 rounded shadow hover:bg-gray-400 transition disabled:opacity-50"
          disabled={currentPage === 1}
          // onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`px-3 py-1 rounded shadow ${
              page === currentPage
                ? "bg-blue-600 text-white"
                : "bg-gray-300 text-gray-700 hover:bg-gray-400"
            } transition`}
            // onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
        <button
          className="px-3 py-1 bg-gray-300 text-gray-700 rounded shadow hover:bg-gray-400 transition disabled:opacity-50"
          disabled={currentPage === totalPages}
          // onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </>
  );
}
