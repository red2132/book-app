export async function getBookListAction(page: number) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/books?page=${page}`,
    { cache: "force-cache" }
  );

  if (!response.ok) {
    throw new Error(`리뷰 불러오기 실패: ${response.statusText}`);
  }
  return await response.json();
}
