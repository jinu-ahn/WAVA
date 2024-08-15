1. application.yml

```jsx
spring:
  servlet:
    multipart:
      max-file-size: 10MB # 파일당 최댓값
      max-request-size: 20MB # 전체 리퀘스트 파일 최댓값
```