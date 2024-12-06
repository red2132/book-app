import { Suspense } from "react";
import BookList from "../components/Book-List";
import SearchBar from "@/components/Search-bar";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
  }>;
}) {
  const { page } = await searchParams;
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Book List</h1>
      <SearchBar />
      <Suspense key={page || ""} fallback={<div>로딩중</div>}>
        <BookList page={Number(page || 1)} />
      </Suspense>
    </div>
  );
}
