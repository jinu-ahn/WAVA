## 목차

- [기술 스택 & 버전 정보](#기술-스택-&-버전-정보)
- [빌드 방법](#빌드-방법)
- [배포 설정](#배포-설정)
- [기타 설정](#기타-설정)



## 기술 스택 & 버전 정보

### Common

1. 이슈 관리: ![Jira](https://img.shields.io/badge/jira-blue?style=for-the-badge&logo=jira&logoColor=white)
2. 형상 관리: ![GitLab](https://img.shields.io/badge/gitlab-orange?style=for-the-badge&logo=gitlab&logoColor=white)
3. 커뮤니케이션: ![Notion](https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white) ![Google Spreadsheet](https://img.shields.io/badge/spread%20sheet-white?style=for-the-badge&logo=google&logoColor=black) ![Discord](https://img.shields.io/badge/discord-5865F2.svg?style=for-the-badge&logo=discord&logoColor=white) ![MatterMost](https://img.shields.io/badge/mattermost-0058CC?style=for-the-badge&logo=mattermost&logoColor=white)

### BackEnd

![IntelliJ](https://img.shields.io/badge/intellij-black?style=for-the-badge&logo=intellijidea&logoColor=white)
![JAVA](https://img.shields.io/badge/JAVA-red?style=for-the-badge&logo=java&logoColor=black)
![Gradle](https://img.shields.io/badge/gradle-black?style=for-the-badge&logo=gradle&logoColor=white) 
![Spring Boot](https://img.shields.io/badge/spring%20boot-green?style=for-the-badge&logo=springboot&logoColor=white)
![Spring Security](https://img.shields.io/badge/spring%20security-green?style=for-the-badge&logo=springsecurity&logoColor=white) 
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JWT&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-blue?style=for-the-badge&logo=mysql&logoColor=white) 
![WebSocket](https://img.shields.io/badge/websocket-yellow?style=for-the-badge&logo=websocket&logoColor=white) 
![STOMP](https://img.shields.io/badge/stomp-yellow?style=for-the-badge&logo=StopStalk&logoColor=white) 
![JUnit](https://img.shields.io/badge/junit-gray?style=for-the-badge&logo=JUNIT5&logoColor=white) 
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=Redis&logoColor=white)  
![Amazon S3](https://img.shields.io/badge/amazone%20s3-red?style=for-the-badge&logo=amazons3&logoColor=white) 
![WebRTC](https://img.shields.io/badge/webRTC-green?style=for-the-badge&logo=webrtc&logoColor=white)

- IntelliJ : 2024.1.4
- SpringBoot: 3.3.2
    - Project Metadata
        - Group:  com.ssafy
        - Artifact: worcation
        - Name: worcation
        - Package Name: com.wava.woraction
- JDK : openjdk 17.0.10 2024-01-16 LTS
- MySQL:  mysql  Ver 9.0.1
- Spring Data JPA: 3.3.2
- Spring Security: 3.3.2
- Redis: 3.3.2
- JWT: 0.11.5
- S3: 1.12.261
- OpenVidu: 2.30
- AOP: 3.3.2
- JUnit: 5

### FrontEnd

![VSCode](https://img.shields.io/badge/vscode-blue?style=for-the-badge&logo=vscode&logoColor=blue)
![Node.js](https://img.shields.io/badge/nodejs-green?style=for-the-badge&logo=node.js&logoColor=white)
![npm](https://img.shields.io/badge/npm-red?style=for-the-badge&logo=npm&logoColor=#CB3837)
![Webpack](https://img.shields.io/badge/webpack-black?style=for-the-badge&logo=webpack&logoColor=#8DD6F9)
![React](https://img.shields.io/badge/react-blue?style=for-the-badge&logo=react&logoColor=#61DAFB)
![Zustand](https://img.shields.io/badge/zustand-orange?style=for-the-badge&logo=zustand&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-blue?style=for-the-badge&logo=tailwindcss&logoColor=#06B6D4)
![Figma](https://img.shields.io/badge/figma-white?style=for-the-badge&logo=figma&logoColor=#F24E1E)
![DaisyUI](https://img.shields.io/badge/daisyui-yellow?style=for-the-badge&logo=daisyui&logoColor=#5A0EF8)

- Visual Studio Code: 1.91.1
- Node.JS: 20.12.2
- npm: 10.5.0
- WebPack
- REACT: 18.3.1
- Zustand: 4.5.4
- TailwindCSS: 3.4.8
- Figma
- OpenVidu: 2.30
- DaisyUI: 4.12.10

### CI/CD

![GitLab](https://img.shields.io/badge/gitlab-orange?style=for-the-badge&logo=gitlab&logoColor=white)
![Jenkins](https://img.shields.io/badge/jenkins-red?style=for-the-badge&logo=jenkins&logoColor=black)
![Nginx](https://img.shields.io/badge/nginx-green?style=for-the-badge&logo=nginx&logoColor=black)
![Docker](https://img.shields.io/badge/docker-skyblue?style=for-the-badge&logo=docker&logoColor=blue)

- GitLab: 17.0.5
- Jenkins: **2.470**
- Nginx: 1.27.0
- Docker: 27.1.1

### WAS

![EC2](https://img.shields.io/badge/EC2-white?style=for-the-badge&logo=amazonec2&logoColor=red)

- EC2:
- CertBot: 0.40.0




## 빌드 방법

### Spring

- gradle
    
    ```java
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
    
- 환경변수
    
    ```yaml
    AWS_ACCESS_KEY_ID
    AWS_SECRET_ACCESS_KEY
    DB_PASSWORD
    DB_URL
    DB_USER
    S3_BUCKET
    SECRET
    SERVER_URL
    OPENVIDU_SECRET
    ```
    
- 빌드방법
    1. intellj build project 클릭
    2. 좌측 gradle - wrapper - gradle-wrapper.jar 파일 확인

### npm

- Package.json
    
    ```json
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
    

### React

- 환경변수

    ```docker
    REACT_APP_SERVER_ADDRESS=https://${SERVER_DOMAIN}:${SERVER_PORT}/api
    REACT_APP_WEBSOCKET_ADDRESS=wss://${SERVER_DOMAIN}:${SERVER_PORT}/api/ws
    REACT_APP_CURSOR_WEBSOCKET_ADDRESS=wss://${SERVER_DOMAIN}:${SERVER_PORT}/api/cursor
    REACT_APP_MARKER_WEBSOCKET_ADDRESS=wss://${SERVER_DOMAIN}:${SERVER_PORT}/api/marker
    REACT_APP_KAKAO_MAPS_API_KEY={YOUR_KAKAO_MAP_KEY}
    REACT_APP_OPENAI_API_KEY={YOUR_OPENAI_KEY}
    REACT_APP_OPENWEATHER_API_KEY={YOUR_OPENWEATHER_KEY}
    ```



## 배포 설정

### 배포 환경 구축

1. ufw 설정
    
    ```bash
    sudo ufw status
    
    //ssh
    sudo ufw allow 22
    
    //nginx
    sudo ufw allow 80
    sudo ufw allow 443
    
    //mysql
    sudo ufw allow 3306
    
    //front
    sudo ufw allow 3000
    //backend(blue, green)
    sudo ufw allow 8080
    sudo ufw allow 8081
    
    //jenkins
    sudo ufw allow 9090
    
    //redis
    sudo ufw allow 6379
    
    //openvidu
    sudo ufw allow 800
    sudo ufw allow 4443
    sudo ufw allow 3478
    sudo ufw allow 5443
    sudo ufw allow 5442
    sudo ufw allow 8888
    sudo ufw allow 5349
    sudo ufw allow 57001:65535
    sudo ufw allow 40000:57000
    
    sudo ufw show added
    sudo ufw enable
    ```
    
2. EC2
    - 사용자 계정 생성
    
    ```sql
    -- work 사용자 삭제 (기존에 존재하는 경우)
    DROP USER IF EXISTS 'work'@'%';
    -- work 사용자 생성 및 권한 부여
    CREATE USER 'work'@'%' IDENTIFIED BY '1Q2W3E4R!!';
    GRANT ALL PRIVILEGES ON *.* TO 'work'@'%' WITH GRANT OPTION;
    -- 변경 사항 적용
    FLUSH PRIVILEGES;
    ```
    
3. MySQL
    
    ```bash
    sudo docker run --name mysql \
      -e MYSQL_ROOT_PASSWORD=1Q2W3E4R!! \
      -e MYSQL_USER=work \
      -e MYSQL_PASSWORD=1Q2W3E4R!! \
      -e MYSQL_DATABASE=wava \
      -d -p 3306:3306 mysql
    ```
    
4. Redis
    
    ```bash
    docker pull redis
    sudo docker run -p 6379:6379 --name redis redis
    docker ps
    docker exec -it redis redis-cli
    ```
    
5. Jenkins
    
    ```bash
    sudo docker run -u 0 --privileged --name jenkins -d \
        -p 9090:8080 -p 50000:50000 \
        -v /var/run/docker.sock:/var/run/docker.sock \
        -v $(which docker):/usr/bin/docker \
        -v /home/jenkins:/var/jenkins_home \
        -v /home/ubuntu/myproject:/home/ubuntu/myproject \
        -e TZ=Asia/Seoul \
        jenkins/jenkins:jdk17
        
    //**Jenkins 데이터 디렉토리 생성**
    mkdir -p /home/ubuntu/jenkins-data
    ```
    
6. Webhook 설정
    - [https://velog.io/@rungoat/CICD-Jenkins와-GitLab-Webhook-설정](https://velog.io/@rungoat/CICD-Jenkins%EC%99%80-GitLab-Webhook-%EC%84%A4%EC%A0%95)

### Nginx

- Nginx 설치

    ```bash
    // Nginx 이미지 받기
    $ docker pull nginx
    
    // Nginx 컨테이너 올리기
    $ docker run --name nginx_server -d -p 443:443 -p 80:80 nginx
    
    // 컨테이너 접속
    $ docker exec -it nginx_server bash
    
    $ apt-get update
    
    // 2개 패키지 설치
    $ apt-get install certbot python3-certbot-nginx
    ```

- default.conf 수정

    ```bash
    // default.conf
    
    server {
        listen       80;
    
        # 수정
        server_name  자신의 도메인;
    
        location / {
            root   /usr/share/nginx/html;
            index  index.html index.htm;
        }
    
        # 이 부분 추가
        location /.well-known/acme-challenge/ {
            allow all;
            root /var/www/certbot;
        }
    
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   /usr/share/nginx/html;
        }
    }
    ```

- 도메인 발급

    ```bash
    certbot --nginx -d i11c204.p.ssafy.io
    ```

- nginx.conf

    ```bash
    server {
    
        server_name i11c204.p.ssafy.io;
    
        location / {
            root   /usr/share/nginx/html;
            index  index.html index.htm;
        }
    
        location /.well-known/acme-challenge/ {
            allow all;
            root /var/www/certbot;
        }
    
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   /usr/share/nginx/html;
        }
    
        listen 443 ssl; # managed by Certbot
        ssl_certificate /etc/letsencrypt/live/i11c204.p.ssafy.io/fullchain.pem; # managed by Certbot
        ssl_certificate_key /etc/letsencrypt/live/i11c204.p.ssafy.io/privkey.pem; # managed by Certbot
        include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
        ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
    
    }
    server {
        if ($host = i11c204.p.ssafy.io) {
            return 301 https://$host$request_uri;
        } # managed by Certbot
    
        listen       80;
    
        server_name i11c204.p.ssafy.io;
        return 404; # managed by Certbot
    
    }
    ```

### 무중단 배포 설정

- Docker Nginx 컨테이너 내부 `/etc/nginx/conf.d/service_env.inc` 생성

    ```bash
    vim service_env.inc  
    
    # service_env.inc
    set $backserver_url back_blue;
    ```

- default.conf 변경

    ```bash
    upstream back_blue{
            server i11c204.p.ssafy.io:8080;
    }
    upstream back_green{
            server i11c204.p.ssafy.io:8081;
    }
    
    map $http_origin $cors_header{
            default "";
            "https://i11c204.p.ssafy.io" "$http_origin";
    }
    
    server {
    
        listen [::]:443 ssl ipv6only=on; # managed by Certbot
        listen 443 ssl; # managed by Certbot
    
        server_name i11c204.p.ssafy.io;
    
        include /etc/nginx/conf.d/service_env.inc; # blue , green 서버이름 변수
    
        root /usr/share/nginx/html; # nginx
        index index.html index.htm;
    
        location / {
           # proxy_set_header X-Real-IP $remote_addr;
           # proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           # proxy_set_header Host $http_host;
           try_files $uri $uri/ /index.html;  # SPA를 위한 설정
        }
    
        location /api {  # blue green settings
            proxy_pass https://$backserver_url;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header Host $http_host;
    
            add_header 'Access-Control-Allow-Origin' $cors_header;
            add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
            add_header 'Access-Control-Allow-Headers' 'Authorization, Content-Type';
            add_header 'Access-Control-Allow-Credentials' 'true';
    
        }
    
        # encrypt get
        location /.well-known/acme-challenge/ {
            allow all;
            root /var/www/certbot;
        }
    
        #error
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   /usr/share/nginx/html;
        }
    
        ssl_certificate /etc/letsencrypt/live/i11c204.p.ssafy.io/fullchain.pem; # managed by Certbot
        ssl_certificate_key /etc/letsencrypt/live/i11c204.p.ssafy.io/privkey.pem; # managed by Certbot
        include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
        ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
    
    }
    
    server {
        listen 9090;
        server_name i11c204.p.ssafy.io;
    
        location / {
            proxy_pass http://i11c204.p.ssafy.io:8080;  # 실제 애플리케이션 서버로 전달
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
    
    server {
        if ($http_host = "i11c204.p.ssafy.io") {
           return https://$host$request_uri;
        }
    
        listen       80;
        listen  [::]:80;
        server_name _;
        return 404; # managed by Certbot
    }
    ```

### 배포 방식

- blue-green 무중단 배포

### Docker

- Dockerfile
    - Backend
        
        ```dockerfile
        # BellSoft Liberica OpenJDK 17 이미지 사용
        FROM bellsoft/liberica-openjdk-alpine:17
        	
        # tzdata 패키지 설치 및 타임존 설정
        RUN apk add --no-cache tzdata && \
            cp /usr/share/zoneinfo/Asia/Seoul /etc/localtime && \
            echo "Asia/Seoul" > /etc/timezone
        
        # JAR 파일 경로 설정
        ARG JAR_FILE=build/libs/*-SNAPSHOT.jar
        ARG SPRING_PROFILES_ACTIVE
        ARG SERVER_ENV
        # 빌드된 JAR 파일을 컨테이너로 복사 .. .
        COPY ${JAR_FILE} app.jar
        
        # 컨테이너 시작 시 실행할 명령어 설정.
        ENTRYPOINT ["java", "-Dspring.profiles.active=${SPRING_PROFILES_ACTIVE}", "-Dserver.env=${SERVER_ENV}", "-Duser.timezone=Asia/Seoul", "-jar", "app.jar"]
        
        ```
        
    - Frontend
        
        ```dockerfile
        FROM node:20 as build
        
        # 작업 디렉토리 설정
        WORKDIR /app
        
        # package.json 및 package-lock.json 복사
        COPY package*.json ./
        
        # 의존성 설치
        RUN npm install
        
        # 소스 복사
        COPY . .
        
        # 환경변수 세팅 
        
        ARG SERVER_DOMAIN
        ARG SERVER_PORT
        
        RUN echo "REACT_APP_SERVER_ADDRESS=https://${SERVER_DOMAIN}:${SERVER_PORT}/api" > .env
        RUN echo "REACT_APP_WEBSOCKET_ADDRESS=wss://${SERVER_DOMAIN}:${SERVER_PORT}/api/ws" >> .env
        RUN echo "REACT_APP_CURSOR_WEBSOCKET_ADDRESS=wss://${SERVER_DOMAIN}:${SERVER_PORT}/api/cursor" >> .env
        RUN echo "REACT_APP_MARKER_WEBSOCKET_ADDRESS=wss://${SERVER_DOMAIN}:${SERVER_PORT}/api/marker" >> .env
        RUN echo "REACT_APP_KAKAO_MAPS_API_KEY=9584401db12054d451fc9e18279c5719" >> .env
        RUN echo "REACT_APP_OPENAI_API_KEY=sk-proj-cc9D19qtc7tEIWjV2EwAT3BlbkFJLO3F8LU1QMtaSibMcxqt" >> .env
        RUN echo "REACT_APP_OPENWEATHER_API_KEY=2ca51a19d54c81ae91eec7c6129d8612" >> .env
        # 애플리케이션 빌드
        RUN npm run build
        
        # 2. 배포 스테이지
        FROM nginx:alpine
        
        # 빌드된 파일을 Nginx html 디렉토리로 복사
        COPY --from=build /app/build /usr/share/nginx/html
        
        # Nginx 실행 명령 
        CMD ["nginx", "-g", "daemon off;"]
        
        ```
        
- Docker Compose
    - docker-compose-blue.yml
        
        ```yaml
        services:
          backend:
            image: evil55/work_backend:latest
            container_name: back_blue
            ports:
              - "8080:8080"
            environment:
              - SPRING_PROFILES_ACTIVE=blue
              - SERVER_ENV=blue
              - SERVER_URL=i11c204.p.ssafy.io
            env_file:
              - .env
            networks:
              - ubuntu_app-network
        
          nginx_server:
            image: evil55/work_frontend:latest
            container_name: nginx_server
            ports:
              - "80:80"
              - "443:443"
            volumes:
              - /home/ubuntu/myproject/nginx.conf:/etc/nginx/conf.d/default.conf  # 올바른 파일 경로 사용
              - /home/ubuntu/myproject/service_env.inc:/etc/nginx/conf.d/service_env.inc
              - /etc/letsencrypt:/etc/letsencrypt  # SSL 인증서 볼륨
              - /var/www/certbot:/var/www/certbot  # Certbot 볼륨
            depends_on:
              - backend
            networks:
              - ubuntu_app-network
        
        networks:
          ubuntu_app-network:
            external: true
        ```
        
    - docker-compose-green.yml
        
        ```yaml
        services:
          backend:
            image: evil55/work_backend:latest
            container_name: back_green
            ports:
              - "8081:8081"
            environment:
              - SPRING_PROFILES_ACTIVE=green
              - SERVER_ENV=green
              - SERVER_URL=i11c204.p.ssafy.io
            env_file:
              - .env
            networks:
              - ubuntu_app-network
        
          nginx_server:
            image: evil55/work_frontend:latest   #
            container_name: nginx_server
            ports:
              - "80:80"
              - "443:443"
            volumes:
              - /home/ubuntu/myproject/nginx.conf:/etc/nginx/conf.d/default.conf  # 올바른 파일 경로 사용
              - /home/ubuntu/myproject/service_env.inc:/etc/nginx/conf.d/service_env.inc
              - /etc/letsencrypt:/etc/letsencrypt  # SSL 인증서 볼륨
              - /var/www/certbot:/var/www/certbot  # Certbot 볼륨
            depends_on:
              - backend
            networks:
              - ubuntu_app-network
        
        networks:
          ubuntu_app-network:
            external: true
        ```

### Jenkins

- Jenkins 파일
    
    ```groovy
    pipeline {
        agent any
    
        environment {
            DOCKER_CREDENTIALS_ID = 'DOCKER_USER' // Docker  Hub 자격 증명 ID
            DOCKER_IMAGE_BACKEND = credentials('work_backend')
            DOCKER_IMAGE_FRONTEND = credentials('work_frontend')
            DOCKER_USERNAME = credentials('DOCKER_USERNAME')
        }
    
        stages {
            stage('Git Clone') {
                steps {
                    echo "Cloning Git repository..."
                    git branch: 'master', credentialsId: 'GITLAB_LOGIN', url: 'https://lab.ssafy.com/s11-webmobile1-sub2/S11P12C204'
                    echo "Git Clone Completed."
                }
            }
    
            stage('Setup Environment and build backend') {
                steps {
                    script {
                        withCredentials([
                            string(credentialsId: 'DB_URL', variable: 'DB_URL'),
                            string(credentialsId: 'DB_USER', variable: 'DB_USER'),
                            string(credentialsId: 'DB_PASSWORD', variable: 'DB_PASSWORD'),
                            string(credentialsId: 'SECRET', variable: 'SECRET'),
                            string(credentialsId: 'SERVER_URL', variable: 'SERVER_URL'),
                            string(credentialsId: 'AWS_ACCESS_KEY_ID', variable: 'AWS_ACCESS_KEY_ID'),
                            string(credentialsId: 'AWS_SECRET_ACCESS_KEY', variable: 'AWS_SECRET_ACCESS_KEY'),
                            string(credentialsId: 'S3_BUCKET', variable: 'S3_BUCKET')
    
                        ]) {
    
                            env.SERVER_URL = "${SERVER_URL}"
                            echo "Building Backend..."
                            sh '''
                                cd backend && chmod +x ./gradlew
                                ./gradlew clean build
    
                            '''
                            echo "Backend build completed"
                        }
                    }
                }
            }
    
            stage('Get Current Port and Set Target Port') {
                steps {
                    script {
    		                sh 'docker ps -a'
                        echo "Get Current Port and Set Target Ports..."
                        def containerInfo = sh(script: "docker ps -a --filter 'name=back_blue' --format '{{.Ports}}'", returnStdout: true).trim()
    
                        def currentPort = '8081' // 초기값 설정(맨처음 도커가 실행 되지 않을 때 blue를 띄우기 위해서 작성)
                        def targetPort = '8080'
                        def currentServerName = 'green'
                        def targetServerName = 'blue'
                        if (containerInfo) {
                            currentPort = containerInfo.split("->")[0].split(":")[1]
                            targetPort = currentPort == '8080' ? '8081' : '8080'
                            currentServerName = currentPort == '8080' ? 'blue' : 'green'
                            targetServerName  = currentServerName =='blue' ? 'green' : 'blue'
    
                            echo "docker current running ok..."
                        }
                        env.CURRENT_PORT = currentPort
                        env.TARGET_PORT = targetPort
                        env.CURRENT_SERVERNAME = currentServerName
                        env.TARGET_SERVERNAME = targetServerName
    
                        echo "Current port: ${currentPort}, Target port: ${targetPort}"
                    }
                }
            }
    
            stage('Docker Login') {
                steps {
                    script {
                        withCredentials([usernamePassword(credentialsId: 'DOCKER_USER', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]){
                            sh 'echo "$DOCKER_PASSWORD" | docker login -u $DOCKER_USERNAME --password-stdin'
                        }
                        echo "Docker Login completed"
                    }
                }
            }
    
            stage('Docker build and push backend') {
                steps {
                    script {
    
                            sh '''
                                cd backend
                                docker build -f Dockerfile -t $DOCKER_USERNAME/work_backend .
                                docker push $DOCKER_USERNAME/work_backend:latest
                            '''
                            echo "Docker backend image build and pushed: $DOCKER_USERNAME/work_backend:latest"
                    }
                }
            }
    
            stage('front build and push') {
                steps {
                    script {
                        dir('frontend') {
    
                            sh '''
                                docker build \
                                --build-arg SERVER_DOMAIN=i11c204.p.ssafy.io \
                                --build-arg SERVER_PORT=${TARGET_PORT} \
                                -t $DOCKER_USERNAME/work_frontend:latest .
                                docker push $DOCKER_USERNAME/work_frontend:latest
                            '''
                        }
    
                    }
                }
            }
    
            stage('Docker Pull Backend Image') {
                steps {
                    script {
                        sh '''
                            cd /home/ubuntu/myproject
                            docker-compose -f docker-compose-${TARGET_SERVERNAME}.yml pull
                        '''
                        echo "Docker backend image pulled: ${TARGET_SERVERNAME}/work_backend:latest"
                    }
                }
            }
    
            stage('Deploy with Docker Compose') {
                steps {
                    script {
                        withCredentials([
                            string(credentialsId: 'DB_URL', variable: 'DB_URL'),
                            string(credentialsId: 'DB_USER', variable: 'DB_USER'),
                            string(credentialsId: 'DB_PASSWORD', variable: 'DB_PASSWORD'),
                            string(credentialsId: 'SECRET', variable: 'SECRET'),
                            string(credentialsId: 'SERVER_URL', variable: 'SERVER_URL'),
                            string(credentialsId: 'AWS_ACCESS_KEY_ID', variable: 'AWS_ACCESS_KEY_ID'),
                            string(credentialsId: 'AWS_SECRET_ACCESS_KEY', variable: 'AWS_SECRET_ACCESS_KEY'),
                            string(credentialsId: 'S3_BUCKET', variable: 'S3_BUCKET'),
                            string(credentialsId: 'OPENVIDU_SECRET', variable: 'OPENVIDU_SECRET')
                        ]) {
                            sh '''
                                cd /home/ubuntu/myproject
    
                                if [ "$(docker ps -q -f name=back_${CURRENT_SERVERNAME})" ]; then
                                   docker-compose -f docker-compose-${CURRENT_SERVERNAME}.yml down
    
                                fi
    
                                echo "DB_URL=$DB_URL" > .env
                                echo "DB_USER=$DB_USER" >> .env
                                echo "DB_PASSWORD=$DB_PASSWORD" >> .env
                                echo "SECRET=$SECRET" >> .env
                                echo "SERVER_URL=$SERVER_URL" >> .env
                                echo "AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID" >> .env
                                echo "AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY" >> .env
                                echo "S3_BUCKET=$S3_BUCKET" >> .env
                                echo "OPENVIDU_SECRET=$OPENVIDU_SECRET" >> .env
    
                                # 타켓서버가 실행 중 또는 exited 되었다면 제거
                                if [ "$(docker ps -a -q -f name=back_${TARGET_SERVERNAME})" ]; then
                                   docker-compose -f docker-compose-${TARGET_SERVERNAME}.yml down
    
                                fi
    
                                docker-compose -f docker-compose-${TARGET_SERVERNAME}.yml up -d
    
                            '''
                        }
                    }
                }
            }
    
            stage('Update Nginx Configuration') {
                steps {
                    script {
                        sh '''
                            docker exec -i nginx_server sh -c "echo 'set \\$backserver_url back_${TARGET_SERVERNAME};' > /etc/nginx/conf.d/service_env.inc"
                            docker exec -i nginx_server sh -c "nginx -s reload"
                        '''
                    }
                }
            }
    
        }
    
        post {
            always {
                echo "Cleaning workspace..."
                deleteDir()
                echo "Workspace cleaned."
            }
        }
    }
    ```
    

### OpenVidu

- OpenVidu 설치

    ```bash
    curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_2.30.0.sh | bash
    ```

- OpenVidu .env 수정

    ```bash
    HTTP_PORT=800
    HTTPS_PORT=4443
    DOMAIN_OR_PUBLIC_IP=i11c204.p.ssafy.io
    OPENVIDU_SECRET=자기 비밀번호
    CERTIFICATE_TYPE=owncert
    CERTIFICATE_FILE=/opt/openvidu/owncert/certificate.cert
    CERTIFICATE_KEY=/opt/openvidu/owncert/private.key
    ```

- `opt/openvidu/openvidu-nginx.conf` 설정

    ```bash
    server {
        listen 800;
        server_name i11c204.p.ssafy.io;
        return 301 https://$host$request_uri;
    }
    
    server {
        listen 4443 ssl;
        server_name i11c204.p.ssafy.io;
    
        ssl_certificate /opt/openvidu/owncert/certificate.cert;
        ssl_certificate_key /opt/openvidu/owncert/certificate.key;
    
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_prefer_server_ciphers on;
    
        location / {
            proxy_pass http://localhost:5442;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    
        location /dashboard/ {
            proxy_pass http://localhost:5442/dashboard/;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
    ```

이제 이 코드를 복사하여 Markdown 문서나 다른 에디터에 붙여 넣으실 수 있습니다.

## 기타 설정