# DKation - 디케이테크인 워케이션 추첨 시스템
> 개발 기간 : 2024.07 ~ 2024.08
>
<div align="center">
  <img src="src/app/_assets/images/logo.png" alt="dkation_logo" />
</div>

## ✍🏻 프로젝트 개요

워케이션은 Work와 Vacation의 합성어로, 회사 직원들이 업무와 휴식을 동시에 즐길 수 있도록 돕는 복지 제도입니다. 이 서비스는 직원들에게 주어진 포인트를 활용하여 워케이션 참여 기회를 베팅하고, 랜덤 추첨을 통해 당첨자를 선정하는 시스템입니다.


## 🧑🏻‍💻 배포 정보

배포 URL : https://dkation.com/

|  |                                      관리자                                      |                                     유저                                      |
| :---: |:-----------------------------------------------------------------------------:|:---------------------------------------------------------------------------:|
| 메인 페이지 | <img width="400" alt="admin_main" src="src/app/_assets/images/adminMain.png"> | <img width="400" alt="user_main" src="src/app/_assets/images/userMain.png"> |
| Test ID |                                  dkadmin123                                   |                                 eunzzzzzz1                                  |
| Test PW |                                     12345                                     |                                    12345                                    |


## ⚙️ 기술 스택

<table>
    <thead>
        <tr>
            <th>분류</th>
            <th>기술 스택</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                  <p>프론트엔드</p>
            </td>
            <td>
                  <img src="https://img.shields.io/badge/Next.js-000000?style=flat&logo=Next.js&logoColor=white"/>
                  <img src="https://img.shields.io/badge/typescript-1572B6?style=flat&logo=typescript&logoColor=000000"/>
                  <img src="https://img.shields.io/badge/tailwindcss-1252B6?style=flat&logo=tailwindcss&logoColor=white"/>
                  <img src="https://img.shields.io/badge/react--query-FF4154?style=flat&logo=react-query&logoColor=000000"/>
                  <img src="https://img.shields.io/badge/zod-F8F8FF?style=flat&logo=zod&logoColor=3E67B1"/>
                  <img src="https://img.shields.io/badge/NextAuth-483d8b?style=flat&logo=NextAuth&logoColor=000000"/>
            
</td>
        </tr>
        <tr>
            <td>
                <p>협업</p>
            </td>
            <td>
                <img src="https://img.shields.io/badge/Notion-000000?logo=Notion">
                <img src="https://img.shields.io/badge/Figma-F24E1E?logo=Figma&logoColor=ffffff">
                <img src="https://img.shields.io/badge/Jira-4B89DC?logo=Jira&logoColor=ffffff">
                <img src="https://img.shields.io/badge/Agit-FEE500?logo=Agit">

</table>

<br />

## 🧡 FE 팀원 소개
<table>
  <tr>
    <td align="center" width="150px">
      <a href="https://github.com/eunji0714" target="_blank">
        <img src="https://github.com/eunji0714.png?size=180" alt="신은지" />
      </a>
    </td>
    <td align="center" width="150px">
      <a href="https://github.com/Ginieee" target="_blank">
        <img src="https://github.com/Ginieee.png?size=180" alt="강어진" />
      </a>
    </td>
    <td align="center" width="150px">
      <a href="https://github.com/maylh" target="_blank">
        <img src="https://github.com/maylh.png?size=180" alt="김가현" />
      </a>
    </td>
    
  </tr>
  <tr>
    <td align="center">
      <a href="https://github.com/eunji0714" target="_blank">
        신은지
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/Ginieee" target="_blank">
        강어진
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/maylh" target="_blank">
        김가현
      </a>
    </td>
  </tr>
</table>

<br />

## 🎮 프로젝트 설치 및 실행 방법

### 1. 설치

```bash
$ git clone https://github.com/TEAM-MONGDOL/dkation-fe.git
$ cd dkation-fe
```

### 2. .env.local 추가
```bash
NEXT_PUBLIC_SERVER_URL=http://210.109.53.168:8080
NEXTAUTH_SECRET=kUp1byNb0kKEXOiTgT7Sw0DlT0toOykEt1u/vgwxAWg=
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_KAKAO_API_KEY=ce3f0cff684353522017918a797cdbf3
SENTRY_AUTH_TOKEN=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
```

### 2. 실행

```bash
$ npm install
$ npm run dev
```

</br>

## 🚀 핵심 기능 및 FE 기술적 도전

### NextAuth & Middleware

> 로그인 권한 및 토큰 관리, 권한에 따른 라우팅 처리

- 로그인 시 토큰을 쿠키에 저장하여, 해당 토큰을 활용해 유저를 파악함
- 유저 계정과 어드민 권한을 구분하여 각 페이지별 라우팅에 사용
- 메인페이지와 로그인페이지 외의 모든 페이지는 최소 유저 권한을 필요로 하며, `/admin` 으로 시작하는 관리자 페이지는 관리자 권한을 필요로 함
- 권한을 지니지 않았으나 권한이 필요한 페이지에 접근하였을 경우, 로그인 페이지로 리다이렉트 처리

### Daum Postcode & KakaoMap

> 워케이션 장소 등록 및 조회를 위한 도로명 주소 검색, 지도 기능

- 워케이션 장소를 등록/수정할 시 도로명 주소 검색 기능을 추가하여 간편히 장소를 선택할 수 있게 함
- 선택된 장소의 위도, 경도 좌표를 이용하여 카카오맵 위에 마커 표시
- 사용자는 해당 장소의 대략적인 위치를 파악할 수 있음
### 필터링 및 정렬

> 필요한 정보를 효과적으로 선택하고 조회할 수 있도록 각 목록 페이지에 조건 필터링 및 정렬 기능 구현

- 각 항목에 대해 사용자의 목적에 맞게 체크박스, 라디오 버튼, 캘린더 등 다양한 형식의 필터를 제공
- 필터링을 통해 특정 조건에 맞는 항목만 표시하며, 다중 필터를 적용하여 더욱 정교한 검색 결과를 제공
- 정렬 기능을 추가하여, 사용자가 항목을 원하는 기준(예: 날짜, 별점 등)으로 정렬할 수 있게 하여 데이터 접근성과 탐색을 향상

###  무한스크롤

> react-query의 useInfinityQuery 훅을 사용한 무한스크롤 구현

-  유저 페이지의 내 워케이션 신청 내역, 어드민 단체 포인트 지급을 위한 대상 선택, 배너 리스트 조회 시 무한 스크롤을 적용하여 사용자 경험 향상
- initialPageParam을 설정하여 데이터를 로드할 때 기본 페이지 및 크기를 정의하고, getNextPageParam 함수를 통해 다음 페이지의 파라미터를 계산
-  다음 페이지의 데이터가 없다면 불필요한 API 요청을 하지 않음

### 애니메이션

> 다양한 애니메이션 효과를 활용하여 부드러운 시각적 효과를 제공하고 시뮬레이션을 구현

- 어드민 네비게이션 바, 장소 선택 드롭다운, FQA 아코디언 메뉴 등에 애니메이션을 적용해 사용자 경험을 보다 부드럽고 편리하게 개선
- 워케이션 당첨 시뮬레이션을 애니메이션을 적용하여 각 사용자의 배팅 비율과 당첨 인덱스를 공개함으로써 당첨 과정의 투명성을 증명

</aside>

</br>

## ⚒️ 폴더구조
```
- app
    └── (route)
    │   ├── (user)
    │   │   ├── (with-layout)
    │   │   └── (without-layout)
    │   └── admin
    │       ├── (with-layout)
    │       └── error
    └── _assets
    │   ├── icons
    │   └── images
    └── _components
    │   ├── admin
    │   ├── common
    │   │   ├── atoms
    │   │   ├── containers				
    │   │   └── modules
    │   └── user   
    └── _constants
    └── _hooks
    │   ├── admin
    │   ├── common				
    │   └── user 
    └── _types
    └── api
	 └── auth
             └── [...nextauth]
```
</aside>

<br />
