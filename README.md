# 포켓몬 도감****(feat. React, SCSS, Webpack)****

# 목차

1. 주소 및 Git
2. 프로젝트 개요
    1. 프로젝트 주제
    2. 요구사항
        1. 기술적 요구사항
        2. 기능적 요구사항
    3. 프로젝트 기능소개
3. 프로젝트 구조
4. 회고

# 1. 주소 및 Git

---

주소 : https://pokemon-83d25.web.app/login

Git : https://github.com/Jangcccci/pokemon

# 2. 프로젝트 개요

---

## a. 프로젝트 주제

포켓몬 프로젝트의 의의는 React, SCSS, Webpack 에 대한 지식과 기술을 습득하는 데 있습니다.

기존에 듣고 있는 강의에서 React, Vite, TailWind를 이용한 ‘포켓몬 도감 만들기’라는 파트가 있었습니다. 저는 SCSS와 Webpack 사용법을 익히고 싶어서 설정을 달리하였습니다.

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/9aface1f-bd8c-459b-add4-247e292baa13/6e4cb376-dff7-4244-95cc-3a31f2588d73/Untitled.png)

프로젝트를 진행하면서 Webpack 설정과 React, SCSS 사용법에 익숙해질 수 있으리라 생각했습니다.

개발은 11.06 ~ 11.17 까지 약 2주가 소요됐습니다.

## b. 요구사항

### i. 기술적 요구사항

- React
- Webpack
- SCSS 사용
- Poke API 사용
- Firebase 로그인 사용
    - 구글 로그인

### ii. 기능적 요구사항

- 로그인
    - 로그인 필수
    - 구글 로그인
- 메인 페이지
    - 이름 검색 기능
    - 한 번에 15개의 포켓몬 카드만 보여주고 더보기 클릭 시 15개 씩 추가
    - 포켓몬 카드 클릭 시 상세 페이지로 이동
- 상세 페이지
    - 이미지 클릭 시 속성에 대한 정보 모달창 생성
- 공통
    - 반응형 UI

## c. 프로젝트 기능 소개

### 구글 로그인

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/9aface1f-bd8c-459b-add4-247e292baa13/0544408d-c8b0-4c0b-88cd-4b10de95cf99/Untitled.gif)

- Firebase Authentication 을 이용한 구글 로그인을 구현했습니다.
- 로그인이 완료되면 헤더 창에 로그인한 이용자의 이미지가 나옵니다.

### 메인 페이지

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/9aface1f-bd8c-459b-add4-247e292baa13/6e5fe8c9-b86c-4493-9d28-a98c436b1970/Untitled.gif)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/9aface1f-bd8c-459b-add4-247e292baa13/6ccc9076-640d-40f9-ae87-e802a16494a5/Untitled.gif)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/9aface1f-bd8c-459b-add4-247e292baa13/d4b9ed00-1c35-45c7-8472-0a87bd24e9bf/Untitled.gif)

- 한 번에 15개의 포켓몬 카드가 나열됩니다.
- 더보기 버튼 클릭 시 추가로 15개의 포켓몬 카드가 나열됩니다.
- lazy 이미지를 통해 포켓몬 정보를 받아오기 전에는 …loading 이라는 문구가 나옵니다.
- 포켓몬 이름 검색 기능을 제공합니다.
    - 이름 자동완성 기능을 제공합니다.
    - 이름 검색 후에도 초기에 15개의 포켓몬 카드가 보여지며 더보기 버튼 클릭 시 추가로 15개의 포켓몬 카드가 나열됩니다.
- 포켓몬의 속성에 따라 포켓몬 번호의 글자색과 이름 칸의 배경색이 달리 표시됩니다.
- 포켓몬 카드 클릭 시 포켓몬 상세 페이지로 넘어갑니다.
    - 데이터를 받아오기 전 …Loading이라는 문구가 나오게 됩니다.

### 상세 페이지

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/9aface1f-bd8c-459b-add4-247e292baa13/6d020730-b86d-46db-a273-85c11fb2d58f/Untitled.gif)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/9aface1f-bd8c-459b-add4-247e292baa13/876f0c1e-b763-446b-8ad8-fbdcc573a58b/Untitled.gif)

- 상세 페이지에서는 포켓몬의 속성, 키, 몸무게, 능력치 등을 알 수 있습니다.
- 이미지 클릭 시 해당 포켓몬의 속성에 대한 상세 정보를 확인할 수 있습니다.
- 이전, 다음 버튼을 통해서 포켓몬 정보를 변경할 수 있습니다.

### 로그아웃

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/9aface1f-bd8c-459b-add4-247e292baa13/e65b954b-5a25-45a3-91ec-9bc7bbfa7ff2/Untitled.gif)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/9aface1f-bd8c-459b-add4-247e292baa13/b0163ccd-ca58-4317-84cb-12867476024f/Untitled.gif)

- 이용자의 이미지에 마우스를 올리면 로그아웃 버튼이 나옵니다.
- 로그아웃을 클릭하면 로그인 창으로 넘어갑니다.
- 로그아웃된 상태에서는 다른 페이지에 접근을 시도해도 로그인 페이지로 돌아옵니다.

# 3. 프로젝트 구조

---

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/9aface1f-bd8c-459b-add4-247e292baa13/1eab94c7-ef80-496f-b082-e4ef7172fe2d/Untitled.png)

React의 컴포넌트가 들어가는 components, 각 페이지를 구성하는 pages, 커스텀한 Hook 들이 들어가는 hooks, 이미지 파일은 static 폴더 하위의 images에 넣었습니다.

# 4. 회고

---

프로그래밍을 공부하면 공부할 수록 알아가는 것보다 알아야할 것들이 더 많아지는 것 같습니다. 가끔은 그 방대한 양에 자신감을 잃기도 합니다. 하지만 프로젝트를 통해 새로운 기술을 습득하고 머릿속에 있는 내용들을 구현하는 즐거움이 프로그래밍의 매력인 것 같습니다. 언젠가는 프로그래밍이라는 바다 속에서 자유롭게 헤엄치는 실력을 갖을 수 있을 거라고 믿고 꾸준히 학습하고 개인 프로젝트를 진행하겠습니다.
