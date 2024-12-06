import { NextRequest, NextResponse } from "next/server";
import { books } from "../books/route";

// 책 검색 API (author와 title 기반)
export async function POST(req: NextRequest) {
  try {
    const { searchParam } = await req.json();

    if (!searchParam) {
      return NextResponse.json(
        {
          success: false,
          message: "검색어를 입력해 주세요",
        },
        { status: 400 }
      );
    }

    const filteredBooks = books.filter(
      (book) =>
        book.author.includes(searchParam) || book.title.includes(searchParam)
    );

    if (filteredBooks.length === 0) {
      return NextResponse.json(
        { success: false, message: "검색 결과가 없습니다" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "검색 완료",
      data: filteredBooks,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "잘못된 입력값입니다",
        error: (error as Error).message,
      },
      { status: 400 }
    );
  }
}
