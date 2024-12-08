/** 도서 검색 정보 서버 액션 */
export async function getSearchBookListAction(page: number, query: string) {
  const response = await fetch(
    // 도서 검색 정보 호출 api
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/search?page=${page}&query=${query}`,
    // 해당 태그를 기준으로 재검증
    { next: { tags: [`bookPage`] } }
  );

  if (!response.ok) {
    throw new Error(`도서정보 불러오기 실패: ${response.statusText}`);
  }
  return await response.json();
}
