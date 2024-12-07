import Pagination from "@/components/Pagination";
import { render, screen, fireEvent } from "@testing-library/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe("Pagination 컴포넌트", () => {
  const mockPush = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (usePathname as jest.Mock).mockReturnValue("/test-path");
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
  });

  it("Previous 버튼이 첫 페이지일 때 비활성화되는지 확인", () => {
    render(<Pagination currentPage={1} totalPages={5} />);
    const previousButton = screen.getByText("Previous");
    expect(previousButton).toBeDisabled();
  });

  it("Next 버튼이 마지막 페이지일 때 비활성화되는지 확인", () => {
    render(<Pagination currentPage={5} totalPages={5} />);
    const nextButton = screen.getByText("Next");
    expect(nextButton).toBeDisabled();
  });

  it("클릭된 페이지 버튼이 올바른 쿼리 파라미터로 router.push를 호출하는지 확인", () => {
    render(<Pagination currentPage={2} totalPages={5} />);
    const pageButton = screen.getByText("3");
    fireEvent.click(pageButton);
    expect(mockPush).toHaveBeenCalledWith("/test-path?page=3");
  });

  it("Next 버튼이 클릭될 때 올바른 쿼리 파라미터로 router.push를 호출하는지 확인", () => {
    render(<Pagination currentPage={2} totalPages={5} />);
    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);
    expect(mockPush).toHaveBeenCalledWith("/test-path?page=3");
  });

  it("현재 페이지는 다른 스타일로 렌더링되는지 확인", () => {
    render(<Pagination currentPage={3} totalPages={5} />);
    const currentPageButton = screen.getByText("3");
    expect(currentPageButton).toHaveClass("bg-blue-600 text-white");
  });
});
