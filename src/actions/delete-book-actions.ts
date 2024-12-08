"use server";

import { revalidateTag } from "next/cache";

/** 도서 삭제 서버 액션 */
export async function deleteBookAction(_: any, formData: FormData) {
  const bookId = formData.get("bookId")?.toString();

  // book id 검사
  if (!bookId) {
    return {
      status: false,
      error: "삭제할 도서가 없습니다",
    };
  }

  // 도서 삭제 delete api 호출
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

    // 해당 태그에 해당하는 데이터 캐시 재검증
    await revalidateTag(`bookPage`);

    return { status: true };
  } catch (error) {
    return {
      status: false,
      error: `도서를 삭제하지 못했습니다: ${error}`,
    };
  }
}
