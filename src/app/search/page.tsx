import BookList from "@/components/Book-List";
import SearchBar from "@/components/Search-bar";
import Link from "next/link";
import { Suspense } from "react";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const { query, page } = await searchParams;
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        <Link href={"/"}>Book List</Link>
      </h1>
      <SearchBar />
      <Suspense key={query || ""} fallback={<div>로딩중</div>}>
        <BookList page={Number(page) || 1} query={query} />
      </Suspense>
    </div>
  );
}
