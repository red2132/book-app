/** 도서 목록 서버 액션 */
export async function getBookListAction(page: number) {
  // 도서 목록 정보 호출 api
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/books?page=${page}`,
    // 해당 태그를 기준으로 재검증
    { next: { tags: [`bookPage`] } }
  );

  if (!response.ok) {
    throw new Error(`도서 정보 불러오기 실패: ${response.statusText}`);
  }
  return await response.json();
}
