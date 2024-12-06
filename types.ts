type Book = {
  id: number;
  title: string;
  author: string;
  detail: string;
  quantity: number;
};

type BookListInfo = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  books: Book[];
};

type GetBookListResponse = {
  success: boolean;
  data?: BookListInfo;
  error?: string;
};

export type { Book, BookListInfo, GetBookListResponse };
