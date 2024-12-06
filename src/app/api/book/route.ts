import { NextRequest, NextResponse } from "next/server";
import { books } from "../books/route";

// 책 상세 정보 출력 API (ID 기반)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    const book = books.find((b) => b.id === parseInt(id));
    if (!book) {
      return NextResponse.json(
        { success: false, message: `해당하는 아이디가 없습니다` },
        { status: 404 }
      );
    }
    return NextResponse.json({
      success: true,
      message: "책 상세정보 출력 완료",
      data: book,
    });
  }
  return NextResponse.json(
    { success: false, message: `book ID를 확인해 주세요` },
    { status: 404 }
  );
}
