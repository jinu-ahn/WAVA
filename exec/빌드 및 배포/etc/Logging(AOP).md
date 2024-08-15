1. build.gradle

```jsx
// AOP
implementation 'org.springframework.boot:spring-boot-starter-aop:3.3.2'
```

1. application.yml

```jsx
logging:
  level:
    root: info # 루트 로깅 레벨 설정
    com.wava: debug # com.wava 패키지 로깅 레벨 설정
```

1. Aspect 컴포넌트 클래스 생성