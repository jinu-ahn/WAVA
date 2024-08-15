1. build.gradle

```jsx
implementation 'io.jsonwebtoken:jjwt-api:0.11.5'
implementation 'io.jsonwebtoken:jjwt-impl:0.11.5'
implementation 'io.jsonwebtoken:jjwt-jackson:0.11.5'
```

1. application.yml

```jsx
jwt:
  access_expiration_time: 3600000 # 1시간 액세스 토큰 만료 시간 설정
  refresh_expiration_time: 604800016 # 1주일 리프레시 토큰 만료 시간 설정
  secret: ${SECRET} # JWT 시크릿 키 설정 (BASE64로 인코딩된 비밀키)
```