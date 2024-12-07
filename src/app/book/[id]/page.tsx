import { getBookDetailAction } from "@/actions/get-book-detail-actions";
import { Book } from "../../../../types";
import Link from "next/link";
import BackButton from "@/components/Back-Button";

async function BookDetail({ bookId }: { bookId: number }) {
  const responseInfo = await getBookDetailAction(bookId);
  const bookInfo: Book = responseInfo.data;
  const bookInfoJson = JSON.stringify(bookInfo);
  return (
    <div>
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 space-y-4">
        <div className="text-gray-500 text-sm">ID: {bookInfo.id}</div>
        <h1 className="text-xl font-semibold text-gray-800">
          {bookInfo.title}
        </h1>
        <h2 className="text-lg font-medium text-gray-600">
          저자: {bookInfo.author}
        </h2>
        <p className="text-gray-600">
          <span className="font-medium">상세정보:</span> {bookInfo.detail}
        </p>
        <div className="text-gray-700">
          <span className="font-medium">수량:</span> {bookInfo.quantity}
        </div>
        <div className="flex justify-end mt-4 space-x-2">
          <BackButton />
          <Link
            href={{
              pathname: `/book/${bookId}/update`,
              query: { bookInfo: bookInfoJson },
            }}
          >
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              상세정보 수정
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  return (
    <div>
      <BookDetail bookId={id} />
    </div>
  );
}
