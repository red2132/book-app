"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");

  const query = searchParams.get("query");

  // query가 있을 경우 검색어에 query 데이터 세팅
  useEffect(() => {
    setSearch(query || "");
  }, [query]);

  /** 검색어 세팅 */
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  /** 검색어 제출 함수 */
  const onSubmit = () => {
    // 검색어가 기존 검색어와 같을 경우 검색X
    if (query === search) return;

    // 검색어가 없을 경우 alert창 출력
    if (search === "") {
      alert("검색어를 입력해 주세요");
      return;
    }
    router.push(`/search?query=${search}`);
  };

  /** 엔터 키 입력 시 onsubmit 호출  */
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
