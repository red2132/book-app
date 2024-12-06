import { Suspense } from "react";
import BookList from "../components/Book-List";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
  }>;
}) {
  const { page } = await searchParams;
  console.log(page);
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Book List</h1>
      {/* Search Input and Button */}
      <div className="mb-6 flex items-center">
        <input
          type="text"
          placeholder="제목 또는 저자 검색"
          className="px-4 py-2 w-5/6 border border-gray-300 rounded shadow"
        />
        <button className="w-1/6 px-4 py-2 ml-2 bg-green-600 text-white rounded shadow hover:bg-green-700 transition">
          검색
        </button>
      </div>
      <Suspense key={page || ""} fallback={<div>로딩중</div>}>
        <BookList page={Number(page || 1)} />
      </Suspense>
    </div>
  );
}
