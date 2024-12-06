type Book = {
  id: number;
  title: string;
  author: string;
  detail: string;
  quantity: number;
};

type PageInfo = {
  currentPage: number;
  totalPages: number;
};
type BookListInfo = {
  totalItems: number;
  books: Book[];
} & PageInfo;

type GetBookListResponse = {
  success: boolean;
  data?: BookListInfo;
  error?: string;
};

export type { Book, BookListInfo, PageInfo, GetBookListResponse };
