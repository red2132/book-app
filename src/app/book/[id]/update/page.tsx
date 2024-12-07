import { getBookDetailAction } from "@/actions/get-book-detail-actions";
import UpdateBookUi from "./ui";
import { Book } from "../../../../../types";

export default async function UpdatePage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const responseInfo = await getBookDetailAction(id);
  const bookInfo: Book = responseInfo.data;
  return (
    <div>
      <UpdateBookUi bookInfo={bookInfo} />
    </div>
  );
}
