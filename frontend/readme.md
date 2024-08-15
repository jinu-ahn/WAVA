# Frontend folder

# Created by PWA C-R-A

## Stack

1. PWA -> npx create-react-app pwa-react --template cra-template-pwa
<!-- 이미 PWA 설정된 템플릿을 사용해서 세팅 단순화 https://velog.io/@osohyun0224/React-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EC%97%90-PWA-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0 + 서비스워커 설정-->
2. Zustand
   npm i zustand

3. Tailwind
npm i tailwindcss @heroicons/react
<!-- 아이콘 v1 v2 둘 다 필요할수도 있음, 에러나면 그 때 해도 늦지 않을듯 -->
4. Headless-ui
   npm i @headlessui/react
   <!-- npx tailwindcss init -->

5. react-router-dom
npm i react-router-dom
<!-- 404설정도 할 것... -->

6. react-beautiful-dnd
npm i react-beautiful-dnd
<!-- 드래그앤드랍/사용안할수도 있는데 번들링 하면서 빼주겠지 -->

7. nanoid
npm i nanoid
<!-- 요즘은 uuid보다 nanoid쓴다길래... -->

8. fullcalendar
   npm i @fullcalendar/daygrid @fullcalendar/interaction @fullcalendar/react @fullcalendar/timegrid
   <!-- 달력 -->

   react-bootstrap-daterangepicker
   <!--
   npm i zustand tailwindcss @heroicons/react @headlessui/react react-router-dom react-beautiful-dnd nanoid @fullcalendar/daygrid @fullcalendar/interaction @fullcalendar/react @fullcalendar/timegrid axios
    -->

9. +@ MUI 필요한 컴포넌트만 설치?(필요한거 알아서 설치하고 추가하기...)
npm i @emotion/react @emotion/styled @mui/lab @mui/material @mui/x-date-pickers dayjs
<!-- date picker, time picker, mui 기본 종속성(emotion 등), 날짜 유틸(dayjs) -->

10. 인피니티 스크롤 관련 라이브러리(어떤거 쓸지 미정,,, 직접 만들어도 되고요...)

11. 스위트 얼러트 쓰실래요...???
    <!--
    npm install --save sweetalert2 sweetalert2-react-content
    https://sweetalert2.github.io/
     -->
    <!-- npm install @mui/material @emotion/react @emotion/styled -->

## init

1. zustand 설정 -> store 폴더 분리(User정보, promotion정보(데이터), 알림정보, 테마정보 등)
2. zustand 기능별 분리(보통 이렇게 쓸 듯)
3. tailwind 설정 + css -> config 설정, 기본 css 설정
4. 혹시 모를 portal 설정 -> index.html // 나중에 metadata 변경
5. env 설정(process env 하나루 퉁치면 될 듯)

<!--
plus env 사용법
.env 위치는 프로젝트의 최상위 루트
변수명은 REACT_APP_을 앞에 작성
ex)
REACT_APP_API_KEY="API_KEY"

컴포넌트에서 사용법 process.env 로 접근
ex)
process.env.REACT_APP_API_KEY

env 파일의 변경이 있을 경우 프론트 재시작하기
 -->
