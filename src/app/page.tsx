import BookItem from "./components/bookItem";

export default function Home() {
  let books = [
    {
      id: 1,
      title: "한 입 크기로 잘라 먹는 리액트",
      author: "이정환",
      detail: "자바스크립트 기초부터 애플리케이션 배포까지",
    },
    {
      id: 2,
      title: "러닝스쿨! 자바스크립트 첫걸음",
      author: "김효빈",
      detail: "처음 프로그래밍을 시작하는 입문자의 눈높이에 맞춘",
    },
    {
      id: 3,
      title: "세상에서 가장 쉬운 코딩책",
      author: "위캔코딩",
      detail: "6개월 만에 비전공자에서 개발자가 된 위캔코딩의 기초 코딩 수업",
    },
    {
      id: 4,
      title: "얄코의 Too Much 친절한 HTML+CSS+자바스크립트",
      author: "고현민",
      detail: "진짜 초보자도 자신 있게 끝낼 수 있도록 제대로 파는",
    },
    {
      id: 5,
      title: "프론트엔드 성능 최적화 가이드",
      author: "유동균",
      detail: "웹 개발 스킬을 한 단계 높여 주는",
    },
    {
      id: 6,
      title: "이펙티브 타입스크립트",
      author: "댄 밴더캄",
      detail: "동작 원리의 이해와 구체적인 조언 62가지",
    },
    {
      id: 7,
      title: "NestJS로 배우는 백엔드 프로그래밍",
      author: "한용재",
      detail: "타입스크립트 환경의 차세대 서버 프레임워크를 만나다",
    },
    {
      id: 8,
      title: "스프링 부트와 AWS로 혼자 구현하는 웹 서비스",
      author: "이동욱",
      detail:
        "인텔리제이, JPA, JUnit 테스트, 그레이들, 소셜 로그인, AWS 인프라로 무중단 배포까지",
    },
    {
      id: 9,
      title: "토비의 스프링 3",
      author: "이일민",
      detail: "스프링 프레임워크 3 기초 원리부터 고급 실전활용까지 완벽 가이드",
    },
    {
      id: 10,
      title: "자바 ORM 표준 JPA 프로그래밍",
      author: "김영한",
      detail:
        "스프링 데이터 예제 프로젝트로 배우는 전자정부 표준 데이터베이스 프레임워크",
    },
    {
      id: 11,
      title: "오브젝트",
      author: "조영호",
      detail: "코드로 이해하는 객체지향 설계",
    },
    {
      id: 12,
      title: "Node.js 교과서",
      author: "조현영",
      detail: "기본기에 충실한 Node.js 18 입문서",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Book List</h1>
      {/* Search Input and Button */}
      <div className="mb-6 flex items-center">
        <input
          type="text"
          placeholder="제목 또는 저자 검색"
          className="px-4 py-2 w-1/3 border border-gray-300 rounded shadow"
        />
        <button className="px-4 py-2 ml-2 bg-green-600 text-white rounded shadow hover:bg-green-700 transition">
          검색
        </button>
      </div>

      <div className="w-full border-t border-gray-300">
        {/* Header Row */}
        <div className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 font-semibold border-b border-gray-300 gap-4">
          <div className="w-1/12">#</div>
          <div className="w-5/12">제목</div>
          <div className="w-4/12">저자</div>
          <div className="w-2/12"></div>
        </div>
        {/* Book Rows */}
        {books.map((book) => (
          <BookItem book={book} key={book.id} />
        ))}
      </div>
      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition">
        도서 추가
      </button>
      {/* Pagination */}
      <div className="flex justify-center items-center space-x-2 mt-4">
        <button className="px-3 py-1 bg-gray-300 text-gray-700 rounded shadow hover:bg-gray-400 transition disabled:opacity-50">
          Previous
        </button>
        <button className="px-3 py-1 bg-gray-300 text-gray-700 rounded shadow hover:bg-gray-400 transition">
          1
        </button>
        <button className="px-3 py-1 bg-gray-300 text-gray-700 rounded shadow hover:bg-gray-400 transition">
          2
        </button>
        <button className="px-3 py-1 bg-gray-300 text-gray-700 rounded shadow hover:bg-gray-400 transition disabled:opacity-50">
          Next
        </button>
      </div>
    </div>
  );
}
