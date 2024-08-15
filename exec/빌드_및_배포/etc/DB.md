1. build.gradle

```jsx
runtimeOnly 'com.mysql:mysql-connector-j'
```

1. application.yml

```jsx
spring:
  datasource:
    url: ${DB_URL} # 데이터베이스 URL (환경 변수 사용)
    username: ${DB_USER} # 데이터베이스 사용자 이름 (환경 변수 사용)
    password: ${DB_PASSWORD} # 데이터베이스 비밀번호 (환경 변수 사용)
    driver-class-name: com.mysql.cj.jdbc.Driver # 데이터베이스 드라이버 클래스 이름 설정
```