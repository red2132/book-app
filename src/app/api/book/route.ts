import { NextRequest, NextResponse } from "next/server";
import { deleteBook, getBookById, updateBook } from "../data";
import { Book } from "../../../../types";

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

// PUT 요청: 책 상세정보 수정
export async function PUT(req: NextRequest) {
  try {
    const { id, title, author, detail, quantity }: Book = await req.json();

    if (!title || !author || !detail || !quantity) {
      return NextResponse.json(
        {
          success: false,
          message: "입력되지 않은 값이 있습니다",
        },
        { status: 404 }
      );
    }
    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "유효하지 않은 Id입니다!",
        },
        { status: 404 }
      );
    }

    const updatedBookInfo = {
      title,
      author,
      detail,
      quantity,
    };

    updateBook(Number(id), updatedBookInfo);

    return NextResponse.json({
      success: true,
      message: "성공적으로 도서를 등록했습니다",
      book: updatedBookInfo,
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
