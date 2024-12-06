export async function getBookListAction(page: number) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/books?page=${page}`,
    { next: { tags: [`bookPage`] } }
  );

  if (!response.ok) {
    throw new Error(`도서 정보 불러오기 실패: ${response.statusText}`);
  }
  return await response.json();
}
