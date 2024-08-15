# Blue Server
- blue 환경설정
    
    ```jsx
    spring:
      profiles:
        active: local # 기본 활성화 프로파일 설정
        group:
          local: local, common # local 프로파일 그룹 설정
          blue: blue, common # blue 프로파일 그룹 설정
          green: green, common # green 프로파일 그룹 설정
    
    server:
      env: blue # 기본 서버 환경 설정
    
    ---
    
    # Blue environment
    spring:
      config:
        activate:
          on-profile: blue # blue 프로파일 활성화
    
    server:
      port: 8080 # blue 환경 서버 포트 설정
      serverAddress: ${SERVER_URL} # blue 환경 서버 주소 설정 (환경 변수 사용)
      serverName: blue_server # blue 환경 서버 이름 설정
      env: blue # blue 환경 설정
      ssl:
        enabled: true
        key-store: classpath:keystore.p12
        key-store-password: ${DB_PASSWORD}
        key-store-type: PKCS12
    
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


# Green Server
- green 환경설정
    
    ```jsx
    spring:
      profiles:
        active: local # 기본 활성화 프로파일 설정
        group:
          local: local, common # local 프로파일 그룹 설정
          blue: blue, common # blue 프로파일 그룹 설정
          green: green, common # green 프로파일 그룹 설정
    
    server:
      env: blue # 기본 서버 환경 설정
    ---
    
    # Green environment
    spring:
      config:
        activate:
          on-profile: green # green 프로파일 활성화
    
    server:
      port: 8081 # green 환경 서버 포트 설정
      serverAddress: ${SERVER_URL} # green 환경 서버 주소 설정 (환경 변수 사용)
      serverName: green_server # green 환경 서버 이름 설정
      env: green # green 환경 설정
      ssl:
        enabled: true
        key-store: classpath:keystore.p12
        key-store-password: ${DB_PASSWORD}
        key-store-type: PKCS12
    
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