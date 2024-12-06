"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function createBookAction(_: any, formData: FormData) {
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

  if (isNaN(Number(quantity))) {
    return {
      status: false,
      error: "숫자를 입력해 주세요",
    };
  }

  // post api 호출
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/books`,
      {
        method: "POST",
        body: JSON.stringify({ title, author, quantity, detail }),
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
      error: `도서 저장에 실패했습니다: ${error}`,
    };
  }
}
