## 배포


### 배포 환경 구축

1. ufw 설정
    
    ```jsx
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
    
2. ec2
    - 사용자 계정 생성
    
    ```jsx
    - - work 사용자 삭제 (기존에 존재하는 경우)
    DROP USER IF EXISTS 'work'@'%';
    - - work 사용자 생성 및 권한 부여
    CREATE USER 'work'@'%' IDENTIFIED BY '1Q2W3E4R!!';
    GRANT ALL PRIVILEGES ON *.* TO 'work'@'%' WITH GRANT OPTION;
    - - 변경 사항 적용
    FLUSH PRIVILEGES;
    ```
    
3. mysql
    
    ```jsx
    sudo docker run --name mysql \
      -e MYSQL_ROOT_PASSWORD=1Q2W3E4R!! \
      -e MYSQL_USER=work \
      -e MYSQL_PASSWORD=1Q2W3E4R!! \
      -e MYSQL_DATABASE=wava \
      -d -p 3306:3306 mysql
    ```
    
4. redis
    
    ```jsx
    docker pull redis
    sudo docker run -p 6379:6379 --name redis redis
    docker ps
    docker exec -it redis redis-cli
    ```
    
5. jenkins
    
    ```jsx
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
    
6. webhook설정
    - https://velog.io/@rungoat/CICD-Jenkins와-GitLab-Webhook-설정

1. nginx
- nginx 설치

```jsx
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

```jsx
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

```jsx
certbot —-nginx -d i11c204.p.ssafy.io
```

- nginx.conf

```jsx

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

1. 무중단 배포 설정
- docker nignx 컨테이너 내부  /etc/ngnix/conf.d/service_env 생성

```jsx
vim service_env.inc  

# service_env.inc
set $backserver_url back_blue;
```

- default.conf 변경

```jsx
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
    
    
    #location /ws {
    #proxy_pass http://$backserver_url/ws;
    #proxy_set_header X-Real-IP $remote_addr;
    #proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    #proxy_set_header Host $http_host;

    #Websocket support
    #proxy_http_version 1.1;
    #proxy_set_header Upgrade $http_upgrade;
    #proxy_set_header Connection "upgrade";
    #}

  
    

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

<br>
<br>
### 배포 방식

- blue-green 무중단 배포

### Docker

- Dockerfile
    - backend
        
        ```jsx
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
        
    - frontend
        
        ```jsx
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
        
        ```jsx
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
        
        ```jsx
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
    
    ```jsx
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
     //       stage('Health Check') {
     //           steps {
     //               script {
     //                   def status = sh(script: '''
     //                       curl -s -o http://${SERVER_URL}:${TARGET_PORT}/infra/hc
     //                   ''', returnStdout: true).trim()
    //
     //                   if (${status} ) {
    //                        echo "Health check failed with status code: ${status}"
    //                        sh "docker-compose -f docker-compose-${TARGET_SERVERNAME}.yml down"
    //                    } else {
     //                       echo "Health check passed with status code: ${status}"
    //                    }
    //                }
     //           }
     //       }
    
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
    

Nginx

- Nginx.conf
    
    ```jsx
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
        
        
        #location /ws {
        #proxy_pass http://$backserver_url/ws;
        #proxy_set_header X-Real-IP $remote_addr;
        #proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        #proxy_set_header Host $http_host;
    
        #Websocket support
        #proxy_http_version 1.1;
        #proxy_set_header Upgrade $http_upgrade;
        #proxy_set_header Connection "upgrade";
        #}
    
      
        
    
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
    

Openvidu

- openvidu 설치

```jsx
curl https://s3-eu-west-1.amazonaws.com/aws.openvidu.io/install_openvidu_2.30.0.sh | bash
```

- openvidu .env 수정

```jsx
HTTP_PORT=800
HTTPS_PORT=4443
DOMAIN_OR_PUBLIC_IP=i11c204.p.ssafy.io                                                                                                                           s to OpenVidu Dashboard
OPENVIDU_SECRET=자기 비밀번호
CERTIFICATE_TYPE=owncert
CERTIFICATE_FILE=/opt/openvidu/owncert/certificate.cert
CERTIFICATE_KEY=/opt/openvidu/owncert/private.key
```

- opt/openvidu/openvidu-nginx.conf 설정

```jsx
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