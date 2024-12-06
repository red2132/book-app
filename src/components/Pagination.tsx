"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PageInfo } from "../../types";

export default function Pagination({ currentPage, totalPages }: PageInfo) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const movePage = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    router.push(`${pathname}?${params.toString()}`);
  };
  return (
    <div className="flex justify-center items-center space-x-2">
      <button
        className="px-3 py-1 bg-gray-300 text-gray-700 rounded shadow hover:bg-gray-400 transition disabled:opacity-50"
        disabled={currentPage === 1}
        onClick={() => movePage(currentPage - 1)}
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
          onClick={() => movePage(page)}
        >
          {page}
        </button>
      ))}
      <button
        className="px-3 py-1 bg-gray-300 text-gray-700 rounded shadow hover:bg-gray-400 transition disabled:opacity-50"
        disabled={currentPage === totalPages}
        onClick={() => movePage(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
}
