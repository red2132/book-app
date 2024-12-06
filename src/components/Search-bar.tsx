"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");

  const query = searchParams.get("query");

  useEffect(() => {
    setSearch(query || "");
  }, [query]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    if (!search || query === search) return;
    router.push(`/search?query=${search}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };
  return (
    <div className="mb-6 flex items-center">
      <input
        value={search}
        onChange={onChangeSearch}
        onKeyDown={onKeyDown}
        type="text"
        placeholder="제목 또는 저자 검색"
        className="px-4 py-2 w-5/6 border border-gray-300 rounded shadow"
      />
      <button
        className="w-1/6 px-4 py-2 ml-2 bg-green-600 text-white rounded shadow hover:bg-green-700 transition"
        onClick={onSubmit}
      >
        검색
      </button>
    </div>
  );
}
