"use server";

import { revalidateTag } from "next/cache";

export async function updateBookAction(_: any, formData: FormData) {
  const id = formData.get("id")?.toString();
  const title = formData.get("title")?.toString();
  const author = formData.get("author")?.toString();
  const quantity = formData.get("quantity")?.toString();
  const detail = formData.get("detail")?.toString();

  if (!title || !author || !quantity || !detail) {
    return {
      status: false,
      error: "모든 내용을 빠짐없이 작성해 주세요",
    };
  }

  if (!id) {
    return {
      status: false,
      error: "유효하지 않은 아이디입니다!",
    };
  }

  if (isNaN(Number(quantity))) {
    return {
      status: false,
      error: "수량은 숫자를 입력해 주세요",
    };
  }

  // post api 호출
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/book?id=${id}`,
      {
        method: "PUT",
        body: JSON.stringify({ id, title, author, quantity, detail }),
      }
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // 태그를 기준으로 데이터 캐시 재검증
    await revalidateTag(`bookDetail-${id}`);

    return { status: true };
  } catch (error) {
    return {
      status: false,
      error: `도서 상세정보 수정에 실패했습니다: ${error}`,
    };
  }
}
