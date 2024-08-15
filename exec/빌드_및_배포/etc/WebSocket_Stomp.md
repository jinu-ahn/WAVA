1. build.gradle

```jsx
//websocket
implementation 'org.springframework.boot:spring-boot-starter-websocket'
implementation 'org.webjars:sockjs-client:1.1.2'
implementation 'org.webjars:stomp-websocket:2.3.3-1'
```

1. WebSocketMessageBrokerConfigurer 구현체 생성
2. WebSocket 엔드포인트 설정
3. STOMP prefix 설정