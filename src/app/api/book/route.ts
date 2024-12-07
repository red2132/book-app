import { NextRequest, NextResponse } from "next/server";
import { deleteBook, getBookById } from "../data";

// 책 상세 정보 출력 API (ID 기반)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    const book = getBookById(Number(id));
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

// DELETE 요청: 책 데이터 삭제
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get("id"));
  if (!id) {
    return NextResponse.json(
      { error: "도서 ID가 필요합니다" },
      { status: 400 }
    );
  }
  deleteBook(id);

  return NextResponse.json({
    message: `도서 ID ${id}(이)가 삭제되었습니다`,
  });
}
