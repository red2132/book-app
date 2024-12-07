import SearchBar from "@/components/Search-bar";
import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter, useSearchParams } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe("SearchBar 컴포넌트", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue(""),
    });
  });

  it("검색어 입력 필드에 텍스트 입력 가능 여부 확인", () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText("제목 또는 저자 검색");
    fireEvent.change(input, { target: { value: "Harry Potter" } });
    expect(input).toHaveValue("Harry Potter");
  });

  it("검색 버튼을 클릭하면 router.push가 호출되는지 확인", () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText("제목 또는 저자 검색");
    const button = screen.getByText("검색");

    fireEvent.change(input, { target: { value: "Harry Potter" } });
    fireEvent.click(button);

    expect(mockPush).toHaveBeenCalledWith("/search?query=Harry Potter");
  });

  it("엔터 키를 누르면 router.push가 호출되는지 확인", () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText("제목 또는 저자 검색");

    fireEvent.change(input, { target: { value: "Lord of the Rings" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(mockPush).toHaveBeenCalledWith("/search?query=Lord of the Rings");
  });

  it("검색어가 기존 쿼리와 같으면 router.push가 호출 안 하는지 확인", () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: jest.fn().mockReturnValue("existingQuery"),
    });
    render(<SearchBar />);
    const input = screen.getByPlaceholderText("제목 또는 저자 검색");
    const button = screen.getByText("검색");

    fireEvent.change(input, { target: { value: "existingQuery" } });
    fireEvent.click(button);

    expect(mockPush).not.toHaveBeenCalled();
  });
});
