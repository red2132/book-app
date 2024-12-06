export async function getBookDetailAction(id: number) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/book?id=${id}`,
    { cache: "force-cache" }
  );

  if (!response.ok) {
    throw new Error(`상세정보 불러오기 실패: ${response.statusText}`);
  }
  return await response.json();
}
