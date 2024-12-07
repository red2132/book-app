import { NextRequest, NextResponse } from "next/server";
import { addBook, getBooks } from "../data";

// GET 요청: 책 데이터 목록 반환
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limit = 10; // 페이지당 항목 수
  const page = parseInt(searchParams.get("page") || "1", limit); // 현재 페이지

  const books = getBooks();

  // 데이터 자르기
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedBooks = books.slice(startIndex, endIndex);

  // 응답 데이터
  const response = {
    currentPage: page,
    totalPages: Math.ceil(books.length / limit),
    totalItems: books.length,
    books: paginatedBooks,
  };
  return NextResponse.json({
    success: true,
    message: "책 목록을 가져오는 데 성공했습니다",
    data: response,
  });
}

// POST 요청: 책 데이터 추가
export async function POST(req: NextRequest) {
  try {
    const { title, author, detail, quantity } = await req.json();

    if (!title || !author || !detail || !quantity) {
      return NextResponse.json(
        {
          success: false,
          message: "입력되지 않은 값이 있습니다",
        },
        { status: 404 }
      );
    }

    const newBook = {
      id: Date.now(),
      title,
      author,
      detail,
      quantity,
    };

    addBook(newBook);

    return NextResponse.json({
      success: true,
      message: "성공적으로 도서를 등록했습니다",
      book: newBook,
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
