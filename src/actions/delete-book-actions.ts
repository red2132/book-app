"use server";

import { revalidateTag } from "next/cache";

export async function deleteBookAction(_: any, formData: FormData) {
  const bookId = formData.get("bookId")?.toString();

  if (!bookId) {
    return {
      status: false,
      error: "삭제할 도서가 없습니다",
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/book?id=${bookId}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // 태그를 기준으로 데이터 캐시 재검증
    await revalidateTag(`bookPage`);

    return { status: true };
  } catch (error) {
    return {
      status: false,
      error: `도서를 삭제하지 못했습니다: ${error}`,
    };
  }
}
