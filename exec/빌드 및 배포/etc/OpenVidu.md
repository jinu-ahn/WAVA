1. build.gradle

```jsx
//openvidu
implementation 'io.openvidu:openvidu-java-client:2.30.0'
```

1. application.yml

```jsx
openvidu:
  url: https://i11c204.p.ssafy.io:4443
  secret: ${OPENVIDU_SECRET}
  session:
    inactive-timeout: 31536000
```