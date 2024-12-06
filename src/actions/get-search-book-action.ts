export async function getSearchBookListAction(page: number, query: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/search?page=${page}&query=${query}`,
    { cache: "force-cache" }
  );

  if (!response.ok) {
    throw new Error(`리뷰 불러오기 실패: ${response.statusText}`);
  }
  return await response.json();
}
