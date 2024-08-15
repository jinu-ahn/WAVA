# Project clone
```
git clone https://lab.ssafy.com/s11-webmobile1-sub2/S11P12C204.git
```

# BackEnd

### Intellij 환경변수 설정
```
AWS_ACCESS_KEY_ID= aws access key 입력해주세요; 
AWS_SECRET_ACCESS_KEY= aws secret key 입력해주세요;
DB_PASSWORD=1Q2W3E4R!!;DB_URL=jdbc:mysql://i11c204.p.ssafy.io/wava;DB_USER=work;
S3_BUCKET= 버킷 이름 입력해주세요;
SECRET=uw5YoYHImqUhahQfNWU7VZpPrZ2pQx4kyN6hQkztIiJN/CMfhjnBwcVW3ccDud2e3Dq/xzeCvF4kQ2YUt5Ncpg==;
SERVER_URL=i11c204.p.ssafy.io;
OPENVIDU_SECRET=1Q2W3E4R
```

### application.yml 작성
```
spring:
  profiles:
    active: local # 기본 활성화 프로파일 설정
    group:
      local: local, common # local 프로파일 그룹 설정
      blue: blue, common # blue 프로파일 그룹 설정
      green: green, common # green 프로파일 그룹 설정

server:
  env: blue # 기본 서버 환경 설정
----
# Local environment .
spring:
  config:
    activate:
      on-profile: local # local 프로파일 활성화

server:
  port: 8080 # 로컬 서버 포트 설정
  serverName: local_server # 로컬 서버 이름 설정
  serverAddress: localhost
  
---
# Common settings for all environments
server:
  servlet:
    context-path: /api

spring:
  config:
    activate:
      on-profile: common # common 프로파일 활성화
  datasource:
    url: ${DB_URL} # 데이터베이스 URL (환경 변수 사용)
    username: ${DB_USER} # 데이터베이스 사용자 이름 (환경 변수 사용)
    password: ${DB_PASSWORD} # 데이터베이스 비밀번호 (환경 변수 사용)
    driver-class-name: com.mysql.cj.jdbc.Driver # 데이터베이스 드라이버 클래스 이름 설정

  data:
    redis:
      host: ${SERVER_URL}
      port: 6379

  jpa:
#    show-sql: true # JPA SQL 출력 설정
    database-platform: org.hibernate.dialect.MySQL8Dialect # JPA 데이터베이스 플랫폼 설정
    hibernate:
      ddl-auto: update # Hibernate DDL 자동 설정
      properties:
        hibernate:
          dialect: org.hibernate.dialect.MySQL8Dialect # Hibernate 방언 설정
  servlet:
    multipart:
      max-file-size: 10MB
      max-request-size: 20MB
jwt:
  access_expiration_time: 3600000 # 1시간 액세스 토큰 만료 시간 설정
  refresh_expiration_time: 604800016 # 1주일 리프레시 토큰 만료 시간 설정
  secret: ${SECRET} # JWT 시크릿 키 설정 (환경 변수 사용)

logging:
  level:
    root: info # 루트 로깅 레벨 설정
    com.wava: debug # com.wava 패키지 로깅 레벨 설정

cloud:
  aws:
    s3:
      bucket: ${S3_BUCKET} # S3 버킷 이름 설정 (환경 변수 사용)
    credentials:
      access-key: ${AWS_ACCESS_KEY_ID} # AWS 액세스 키 (환경 변수 사용)
      secret-key: ${AWS_SECRET_ACCESS_KEY} # AWS 시크릿 키 (환경 변수 사용)
    region:
      static: ap-northeast-2 # AWS 리전 설정 (환경 변수 사용)
    stack:
      auto: false # cloud formation 기능을 사용하지 않기 위함

openvidu:
  url: https://i11c204.p.ssafy.io:4443
  secret: ${OPENVIDU_SECRET}
  session:
    inactive-timeout: 31536000

default:
  image: https://raw.githubusercontent.com/tailwindlabs/heroicons/56c073c2c9a66d2e51adb93d8e87e2e941d5b6db/src/20/solid/user-circle.svg
```

### gradle 확인
```
plugins {
	id 'java'
	id 'org.springframework.boot' version '3.3.2'
	id 'io.spring.dependency-management' version '1.1.6'
}

group = 'com.ssafy'
version = '0.0.1-SNAPSHOT'

java {
	toolchain {
		languageVersion = JavaLanguageVersion.of(17)
	}
}

configurations {
	compileOnly {
		extendsFrom annotationProcessor
	}
}

repositories {
	mavenCentral()
}

dependencies {
	implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
	implementation 'org.springframework.boot:spring-boot-starter-security'
	implementation 'org.springframework.boot:spring-boot-starter-web'
	implementation 'org.springframework.cloud:spring-cloud-starter-aws:2.2.6.RELEASE'
	compileOnly 'org.projectlombok:lombok'
	developmentOnly 'org.springframework.boot:spring-boot-devtools'
	runtimeOnly 'com.mysql:mysql-connector-j'
	annotationProcessor 'org.projectlombok:lombok'
	testImplementation 'org.springframework.boot:spring-boot-starter-test'
	testImplementation 'org.springframework.security:spring-security-test'
	testRuntimeOnly 'org.junit.platform:junit-platform-launcher'

	// validation
	implementation 'org.springframework.boot:spring-boot-starter-validation'

	//JWT
	implementation 'io.jsonwebtoken:jjwt-api:0.11.5'
	implementation 'io.jsonwebtoken:jjwt-impl:0.11.5'
	implementation 'io.jsonwebtoken:jjwt-jackson:0.11.5'

	//redis
	implementation 'org.springframework.boot:spring-boot-starter-data-redis'

	//websocket
	implementation 'org.springframework.boot:spring-boot-starter-websocket'
	implementation 'org.webjars:sockjs-client:1.1.2'
	implementation 'org.webjars:stomp-websocket:2.3.3-1'

	//AWS TEST
	implementation 'com.amazonaws:aws-java-sdk-s3:1.12.261'

	//openvidu
	implementation 'io.openvidu:openvidu-java-client:2.30.0'

	// AOP
	implementation 'org.springframework.boot:spring-boot-starter-aop:3.3.2'

	// Mock
	testImplementation 'org.mockito:mockito-core:4.6.1'
	testImplementation 'org.mockito:mockito-junit-jupiter:4.6.1'
}

tasks.named('test') {
	useJUnitPlatform()
}

```


### Intellij SpringBoot 실행
<br>
<br>


# FrontEnd

### npm install, package.json

```
npm install
```
```
{
  "name": "wava",
  "version": "0.1.2",
  "private": true,
  "dependencies": {
    "@babel/plugin-proposal-private-property-in-object": "^7.21.11",
    "@emotion/react": "^11.13.0",
    "@emotion/styled": "^11.13.0",
    "@fullcalendar/daygrid": "^6.1.15",
    "@fullcalendar/interaction": "^6.1.15",
    "@fullcalendar/react": "^6.1.15",
    "@fullcalendar/timegrid": "^6.1.15",
    "@headlessui/react": "^2.1.2",
    "@heroicons/react": "^2.1.5",
    "@mui/icons-material": "^5.16.7",
    "@mui/material": "^5.16.4",
    "@mui/x-date-pickers": "^7.11.0",
    "@stomp/stompjs": "^7.0.0",
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "axios": "^1.7.3",
    "chart.js": "^4.4.3",
    "dayjs": "^1.11.12",
    "framer-motion": "^11.3.24",
    "lodash.throttle": "^4.1.1",
    "lucide-react": "^0.419.0",
    "nanoid": "^5.0.7",
    "npm": "^10.8.2",
    "openai": "^4.55.1",
    "openvidu-browser": "^2.30.1",
    "react": "^18.3.1",
    "react-chartjs-2": "^5.2.0",
    "react-chrome-dino": "^0.1.3",
    "react-dinosaur-game": "^1.0.0",
    "react-dom": "^18.3.1",
    "react-icons": "^5.2.1",
    "react-intersection-observer": "^9.13.0",
    "react-markdown": "^9.0.1",
    "react-multi-carousel": "^2.8.5",
    "react-router-dom": "^6.25.1",
    "react-scripts": "^5.0.1",
    "remark-gfm": "^4.0.0",
    "sweetalert2": "^11.6.13",
    "sweetalert2-react-content": "^5.0.7",
    "tailwindcss": "^3.4.6",
    "uuid": "^10.0.0",
    "web-vitals": "^2.1.4",
    "workbox-background-sync": "^6.6.0",
    "workbox-broadcast-update": "^6.6.0",
    "workbox-cacheable-response": "^6.6.0",
    "workbox-core": "^6.6.0",
    "workbox-expiration": "^6.6.0",
    "workbox-google-analytics": "^6.6.1",
    "workbox-navigation-preload": "^6.6.0",
    "workbox-precaching": "^6.6.0",
    "workbox-range-requests": "^6.6.0",
    "workbox-routing": "^6.6.0",
    "workbox-strategies": "^6.6.0",
    "workbox-streams": "^6.6.0",
    "ws": "^8.18.0",
    "y-presence": "^0.2.3",
    "y-websocket": "^2.0.4",
    "yjs": "^13.6.18",
    "zustand": "^4.5.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "start:host": "HOST=0.0.0.0 react-scripts start"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "devDependencies": {
    "daisyui": "^4.12.10"
  }
}

```

### .env 파일 작성
```
REACT_APP_SERVER_ADDRESS=https://${SERVER_DOMAIN}:${SERVER_PORT}/api
REACT_APP_WEBSOCKET_ADDRESS=wss://${SERVER_DOMAIN}:${SERVER_PORT}/api/ws
REACT_APP_CURSOR_WEBSOCKET_ADDRESS=wss://${SERVER_DOMAIN}:${SERVER_PORT}/api/cursor
REACT_APP_MARKER_WEBSOCKET_ADDRESS=wss://${SERVER_DOMAIN}:${SERVER_PORT}/api/marker
REACT_APP_KAKAO_MAPS_API_KEY={YOUR_KAKAO_MAP_KEY}
REACT_APP_OPENAI_API_KEY={YOUR_OPENAI_KEY}
REACT_APP_OPENWEATHER_API_KEY={YOUR_OPENWEATHER_KEY}
```

### npm start
```
npm start
```
