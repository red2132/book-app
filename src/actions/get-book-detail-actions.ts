/** 도서 상세 정보 서버 액션 */
export async function getBookDetailAction(id: number) {
  // 도서 상세 정보 호출 api
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/book?id=${id}`,
    // 해당 태그를 기준으로 재검증
    { next: { tags: [`bookDetail-${id}`] } }
  );

  if (!response.ok) {
    throw new Error(`상세정보 불러오기 실패: ${response.statusText}`);
  }
  return await response.json();
}
