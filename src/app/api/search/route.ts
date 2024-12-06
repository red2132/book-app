import { NextResponse } from "next/server";
import { books } from "../books/route";

// 책 검색 API (author와 title 기반)
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limit = 10;
  const page = parseInt(searchParams.get("page") || "1", limit); // 현재 페이지
  const query = searchParams.get("query");

  if (isNaN(page)) {
    return NextResponse.json(
      {
        success: false,
        message: "유효하지 않은 페이지값입니다.",
      },
      { status: 400 }
    );
  }

  // 데이터 필터링(검색)
  const filteredData = books.filter(
    (item) =>
      item.title.toLowerCase().includes((query as string).toLowerCase()) ||
      item.author.toLowerCase().includes((query as string).toLowerCase())
  );

  // 데이터 자르기
  const startIndex = (page - 1) * limit;
  const paginatedData = filteredData.slice(startIndex, startIndex + limit);

  // 응답 데이터
  const response = {
    currentPage: page,
    totalPages: Math.ceil(filteredData.length / limit),
    totalItems: filteredData.length,
    books: paginatedData,
  };

  return NextResponse.json({
    success: true,
    message: "책 목록을 가져오는 데 성공했습니다",
    data: response,
  });
}
