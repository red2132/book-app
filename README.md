# 도서 관리 프로젝트

## 프로젝트 실행 방법

1. 코드를 다운받으시고, cmd창에 npm install을 해서 node_modules를 다운받습니다.(node.js가 없으시면 공식 홈페이지에 가서 LTS 버전을 설치하시면 됩니다.)
2. .env 파일을 다운받아 압축을 풀고 프로젝트 파일 폴더에 넣습니다. [.env 다운 링크](https://drive.google.com/file/d/1xSVbl0HXshfLz2CoOiiqLHIUFDPTEqCU/view?usp=sharing)
3. **npm run build로 프로젝트를 빌드합니다.**
4. npm run start로 프로젝트를 실행할 수 있습니다. 배포 버전은 [링크](https://book-app-blue.vercel.app/) 를 누르면 확인하실 수 있습니다.
5. npm run test를 하시면 테스트 코드를 돌려보실 수 있습니다.

## 프로젝트 설명

### 프로젝트 환경

framework: Next.js(15), tailwind(3.4.1)
library: react(19RC)
test: Jest(29.7.0)

![book-project-Chrome-2024-12-07-18-08-10](https://github.com/user-attachments/assets/8fe49ae6-a00b-4057-98e2-c1bd49227863)

### 1. api 구현

우선 next server의 기능을 이용해서 기능 구현에 필요한 api를 간략하게 만들었습니다.
data.ts에는 books 라는 mock 데이터와, 이를 변경할 수 있는 함수들이 들어있습니다.
그리고 각각 경로에 해당하는 route.ts에서 REST 요청을 처리 및 반환합니다.

### 2. 서버 액션 구현

넘겨받은 파라미터나 폼 데이터를 받아 api 호출 양식에 맞게 api를 호출합니다. 에러처리도 여기서 합니다.

### 3. 컴포넌트 구현

기본적으로 최대한 속도 향상을 위해 최대한 서버 컴포넌트가 되도록 작성했으며, 불가피하게 클라이언트 컴포넌트가 사용되어야할 때는 웬만하면 component 폴더 안에 있는 컴포넌트로 따로 분리했습니다.

#### 도서 목록 출력(components/Book-List.tsx)

이 컴포넌트는 query(검색어)를 받으면 검색 api를 호출하고, 없으면 기본 도서 리스트를 출력합니다. 또한 Suspense를 이용해 로딩중일 때는 로딩중 문구가 뜨게 설정해 놓았습니다.

#### 페이지네이션(components/Pagination.tsx)

props로 현재 페이지와 전체 페이지를 받고, 이 정보를 토대로 각 버튼에 맞게 router.push로 화면을 이동시킵니다.

#### 검색 바(components/Search-bar.tsx)

useState에 검색어(query)를 넣어놓고, 검색 버튼을 클릭하거나 Enter를 누르면 해당 url로 이동합니다. 검색어가 없으면 alert, 같은 검색어일 경우 검색하지 않습니다.

#### 도서 등록(book/create/page.tsx)

클라이언트 컴포넌트로 되어있으며, useActionState를 이용해 폼을 처리합니다. isPending을 받아 작업 처리하는 동안 input 및 버튼을 비활성화합니다. 도서 등록에 성공하면 서버액션에서 revalidateTag를 통해 데이터 캐시를 재검증해 데이터가 달라지면 리페치합니다. 그리고 첫 화면으로 이동합니다.

#### 도서 삭제(components/Book-Item-delete-Button.tsx)

기본적인 동작 원리는 도서 등록과 같으며, 삭제하기 전 onSubmit을 통해 정말로 삭제할 건지 한 번 더 체크 후 삭제합니다.

#### 도서 상세정보 수정(book/[id]/update/page.tsx)

useSearchParam을 통해 도서 상세 페이지의 상세정보를 json 형태로 넘겨 받아, useActionState를 통해 폼 데이터를 넘겨줍니다.

#### 기타 페이지 구현(not-found.tsx, error.tsx)

not found이거나 에러가 발생했을 때의 화면도 구현했습니다.

## 테스트 코드 작성

![image](https://github.com/user-attachments/assets/4552e60e-c2af-4495-9f5f-75f81e4e8fd8)
현재 jest가 server component와 sever action은 지원하지 않는다 해서 서버액션을 쓰지 않는 client component인 Pagination.tsx와 Search-bar.tsx에 대한 테스트 코드만 작성했습니다.
