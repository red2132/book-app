import { NextRequest, NextResponse } from "next/server";

// Mock 데이터
let books = [
  {
    id: 1,
    title: "한 입 크기로 잘라 먹는 리액트",
    author: "이정환",
    detail: "자바스크립트 기초부터 애플리케이션 배포까지",
    quantity: 1,
  },
  {
    id: 2,
    title: "러닝스쿨! 자바스크립트 첫걸음",
    author: "김효빈",
    detail: "처음 프로그래밍을 시작하는 입문자의 눈높이에 맞춘",
    quantity: 1,
  },
  {
    id: 3,
    title: "세상에서 가장 쉬운 코딩책",
    author: "위캔코딩",
    detail: "6개월 만에 비전공자에서 개발자가 된 위캔코딩의 기초 코딩 수업",
    quantity: 1,
  },
  {
    id: 4,
    title: "얄코의 Too Much 친절한 HTML+CSS+자바스크립트",
    author: "고현민",
    detail: "진짜 초보자도 자신 있게 끝낼 수 있도록 제대로 파는",
    quantity: 1,
  },
  {
    id: 5,
    title: "프론트엔드 성능 최적화 가이드",
    author: "유동균",
    detail: "웹 개발 스킬을 한 단계 높여 주는",
    quantity: 1,
  },
  {
    id: 6,
    title: "이펙티브 타입스크립트",
    author: "댄 밴더캄",
    detail: "동작 원리의 이해와 구체적인 조언 62가지",
    quantity: 1,
  },
  {
    id: 7,
    title: "NestJS로 배우는 백엔드 프로그래밍",
    author: "한용재",
    detail: "타입스크립트 환경의 차세대 서버 프레임워크를 만나다",
    quantity: 1,
  },
  {
    id: 8,
    title: "스프링 부트와 AWS로 혼자 구현하는 웹 서비스",
    author: "이동욱",
    detail:
      "인텔리제이, JPA, JUnit 테스트, 그레이들, 소셜 로그인, AWS 인프라로 무중단 배포까지",
    quantity: 1,
  },
  {
    id: 9,
    title: "토비의 스프링 3",
    author: "이일민",
    detail: "스프링 프레임워크 3 기초 원리부터 고급 실전활용까지 완벽 가이드",
    quantity: 1,
  },
  {
    id: 10,
    title: "자바 ORM 표준 JPA 프로그래밍",
    author: "김영한",
    detail:
      "스프링 데이터 예제 프로젝트로 배우는 전자정부 표준 데이터베이스 프레임워크",
    quantity: 1,
  },
  {
    id: 11,
    title: "오브젝트",
    author: "조영호",
    detail: "코드로 이해하는 객체지향 설계",
    quantity: 1,
  },
  {
    id: 12,
    title: "Node.js 교과서",
    author: "조현영",
    detail: "기본기에 충실한 Node.js 18 입문서",
    quantity: 1,
  },
];

let bookIdIndex = 12;

// GET 요청: 책 데이터 목록 반환
export async function GET(req: Request) {
  //링크 양식(예시) : http://localhost:3000/api/books?page=1
  const { searchParams } = new URL(req.url);
  const limit = 10; // 페이지당 항목 수
  const page = parseInt(searchParams.get("page") || "1", limit); // 현재 페이지

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
      id: ++bookIdIndex,
      title,
      author,
      detail,
      quantity,
    };

    books.push(newBook);

    return NextResponse.json({
      success: true,
      message: "Book added successfully.",
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

// DELETE 요청: 책 데이터 삭제
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = parseInt(searchParams.get("id") || "");

  if (!id) {
    return NextResponse.json(
      { error: "ID is required to delete a book." },
      { status: 400 }
    );
  }

  const initialLength = books.length;
  books = books.filter((book) => book.id !== id);

  if (books.length === initialLength) {
    return NextResponse.json(
      { error: `No book found with ID ${id}.` },
      { status: 404 }
    );
  }

  return NextResponse.json({
    message: `Book with ID ${id} deleted successfully.`,
  });
}

export { books };
