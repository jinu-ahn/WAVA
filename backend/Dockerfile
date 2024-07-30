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
# 빌드된 JAR 파일을 컨테이너로 복사 .
COPY ${JAR_FILE} app.jar

# 컨테이너 시작 시 실행할 명령어 설정.
ENTRYPOINT ["java", "-Dspring.profiles.active=${SPRING_PROFILES_ACTIVE}", "-Dserver.env=${SERVER_ENV}", "-Duser.timezone=Asia/Seoul", "-jar", "app.jar"]
