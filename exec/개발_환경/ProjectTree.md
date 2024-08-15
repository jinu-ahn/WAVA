## BackEnd


```
.
├── Dockerfile
├── Jenkinsfile
├── build
│   ├── classes
│   │   └── java
│   │       └── main
│   │           └── com
│   │               └── wava
│   │                   └── worcation
│   │                       ├── WorcationApplication.class
│   │                       ├── common
│   │                       │   ├── aop
│   │                       │   │   └── LoggingAspect.class
│   │                       │   ├── config
│   │                       │   │   ├── RedisConfiguration.class
│   │                       │   │   ├── S3Configuration.class
│   │                       │   │   ├── SecurityConfiguration.class
│   │                       │   │   └── websocket
│   │                       │   │       └── WebSocketConfiguration.class
│   │                       │   ├── exception
│   │                       │   │   ├── CustomException.class
│   │                       │   │   ├── CustomExceptionHandler.class
│   │                       │   │   └── ResourceNotFoundException.class
│   │                       │   ├── infra
│   │                       │   │   └── ServerStatusController.class
│   │                       │   ├── jwt
│   │                       │   │   ├── AuthenticationFilter.class
│   │                       │   │   ├── CustomAccessDeniedHandler.class
│   │                       │   │   ├── CustomAuthenticationEntryPoint.class
│   │                       │   │   ├── JwtExceptionFilter.class
│   │                       │   │   └── TokenProvider.class
│   │                       │   ├── openvidu
│   │                       │   │   ├── controller
│   │                       │   │   │   └── OpenViduController.class
│   │                       │   │   └── service
│   │                       │   │       └── OpenViduService.class
│   │                       │   ├── response
│   │                       │   │   ├── ApiResponse$ApiResponseBuilder.class
│   │                       │   │   ├── ApiResponse.class
│   │                       │   │   └── ErrorCode.class
│   │                       │   ├── s3
│   │                       │   │   └── service
│   │                       │   │       ├── S3ConnectionTest.class
│   │                       │   │       └── S3ImageUpLoadService.class
│   │                       │   └── util
│   │                       │       └── RedisUtil.class
│   │                       └── domain
│   │                           ├── channel
│   │                           │   ├── controller
│   │                           │   │   ├── FollowController.class
│   │                           │   │   ├── GroupChannelController.class
│   │                           │   │   ├── InfoController.class
│   │                           │   │   ├── MapPinController.class
│   │                           │   │   └── PersonalController.class
│   │                           │   ├── domain
│   │                           │   │   ├── Channel$ChannelBuilder.class
│   │                           │   │   ├── Channel.class
│   │                           │   │   ├── ChannelUser$ChannelUserBuilder.class
│   │                           │   │   ├── ChannelUser.class
│   │                           │   │   ├── Companion$CompanionBuilder.class
│   │                           │   │   ├── Companion.class
│   │                           │   │   ├── Feed$FeedBuilder.class
│   │                           │   │   ├── Feed.class
│   │                           │   │   ├── FeedComment$FeedCommentBuilder.class
│   │                           │   │   ├── FeedComment.class
│   │                           │   │   ├── Follow$FollowBuilder.class
│   │                           │   │   ├── Follow.class
│   │                           │   │   ├── Image$ImageBuilder.class
│   │                           │   │   ├── Image.class
│   │                           │   │   ├── Like$LikeBuilder.class
│   │                           │   │   ├── Like.class
│   │                           │   │   ├── MapPin$MapPinBuilder.class
│   │                           │   │   └── MapPin.class
│   │                           │   ├── dto
│   │                           │   │   ├── info
│   │                           │   │   │   ├── CommentRequestDto$CommentRequestDtoBuilder.class
│   │                           │   │   │   ├── CommentRequestDto.class
│   │                           │   │   │   ├── CommentResponseDto$CommentResponseDtoBuilder.class
│   │                           │   │   │   ├── CommentResponseDto.class
│   │                           │   │   │   ├── DescriptionRequestDto$DescriptionRequestDtoBuilder.class
│   │                           │   │   │   ├── DescriptionRequestDto.class
│   │                           │   │   │   ├── FeedRequestDto$FeedRequestDtoBuilder.class
│   │                           │   │   │   ├── FeedRequestDto.class
│   │                           │   │   │   ├── FeedResponseDto$FeedResponseDtoBuilder.class
│   │                           │   │   │   ├── FeedResponseDto.class
│   │                           │   │   │   ├── FeedSortResponseDto$FeedSortResponseDtoBuilder.class
│   │                           │   │   │   ├── FeedSortResponseDto$ImageDto$ImageDtoBuilder.class
│   │                           │   │   │   ├── FeedSortResponseDto$ImageDto.class
│   │                           │   │   │   ├── FeedSortResponseDto.class
│   │                           │   │   │   ├── FollowInfoDto$FollowInfoDtoBuilder.class
│   │                           │   │   │   ├── FollowInfoDto$UserFollowInfoDto$UserFollowInfoDtoBuilder.class
│   │                           │   │   │   ├── FollowInfoDto$UserFollowInfoDto.class
│   │                           │   │   │   ├── FollowInfoDto.class
│   │                           │   │   │   ├── FollowRequestDto.class
│   │                           │   │   │   ├── FollowResponseDto$FollowResponseDtoBuilder.class
│   │                           │   │   │   ├── FollowResponseDto.class
│   │                           │   │   │   ├── ImageInfoDto$ImageInfoDtoBuilder.class
│   │                           │   │   │   ├── ImageInfoDto.class
│   │                           │   │   │   ├── ImageResponseDto$ImageResponseDtoBuilder.class
│   │                           │   │   │   ├── ImageResponseDto.class
│   │                           │   │   │   ├── PersonalResponseDto$PersonalResponseDtoBuilder.class
│   │                           │   │   │   └── PersonalResponseDto.class
│   │                           │   │   ├── request
│   │                           │   │   │   ├── CompanionRequestDto$CompanionRequestDtoBuilder.class
│   │                           │   │   │   ├── CompanionRequestDto.class
│   │                           │   │   │   ├── GroupChannelRequestDto.class
│   │                           │   │   │   ├── MapPinRequestDto$MapPinRequestDtoBuilder.class
│   │                           │   │   │   └── MapPinRequestDto.class
│   │                           │   │   └── response
│   │                           │   │       ├── GroupChannelResponseDto$GroupChannelResponseDtoBuilder.class
│   │                           │   │       ├── GroupChannelResponseDto.class
│   │                           │   │       ├── GroupChannelValidResponseDto$GroupChannelValidResponseDtoBuilder.class
│   │                           │   │       ├── GroupChannelValidResponseDto.class
│   │                           │   │       ├── GroupDetailResponseDto$GroupDetailResponseDtoBuilder.class
│   │                           │   │       ├── GroupDetailResponseDto.class
│   │                           │   │       ├── MapPinResponseDto$MapPinResponseDtoBuilder.class
│   │                           │   │       └── MapPinResponseDto.class
│   │                           │   ├── enums
│   │                           │   │   └── ChannelType.class
│   │                           │   ├── repository
│   │                           │   │   ├── ChannelRepository.class
│   │                           │   │   ├── ChannelUserRepository.class
│   │                           │   │   ├── CompanionRepository.class
│   │                           │   │   ├── FeedCommentRepository.class
│   │                           │   │   ├── FeedRepository.class
│   │                           │   │   ├── FollowRepository.class
│   │                           │   │   ├── ImageRepository.class
│   │                           │   │   ├── LikeRepository.class
│   │                           │   │   └── MapPinRepository.class
│   │                           │   └── service
│   │                           │       ├── FollowService.class
│   │                           │       ├── FollowServiceImpl.class
│   │                           │       ├── GroupChannelService.class
│   │                           │       ├── GroupChannelServiceImpl.class
│   │                           │       ├── InfoService.class
│   │                           │       ├── InfoServiceImpl.class
│   │                           │       ├── MapPinService.class
│   │                           │       ├── MapPinServiceImpl.class
│   │                           │       ├── PersonalService.class
│   │                           │       └── PersonalServiceImpl.class
│   │                           ├── chat
│   │                           │   ├── controller
│   │                           │   │   └── ChatController.class
│   │                           │   ├── domain
│   │                           │   │   ├── Chat$ChatBuilder.class
│   │                           │   │   └── Chat.class
│   │                           │   ├── dto
│   │                           │   │   ├── reqeust
│   │                           │   │   │   └── ChatDto.class
│   │                           │   │   └── response
│   │                           │   │       ├── ChatResponseDto$ChatResponseDtoBuilder.class
│   │                           │   │       └── ChatResponseDto.class
│   │                           │   ├── repository
│   │                           │   │   └── ChatRepository.class
│   │                           │   └── service
│   │                           │       ├── ChatService.class
│   │                           │       └── ChatServiceImpl.class
│   │                           ├── cursor
│   │                           │   ├── controller
│   │                           │   │   └── CursorController.class
│   │                           │   └── dto
│   │                           │       └── request
│   │                           │           └── CursorDto.class
│   │                           ├── plan
│   │                           │   ├── controller
│   │                           │   │   └── PlanController.class
│   │                           │   ├── dao
│   │                           │   │   └── PlanRepository.class
│   │                           │   ├── domain
│   │                           │   │   ├── Plan$PlanBuilder.class
│   │                           │   │   ├── Plan.class
│   │                           │   │   ├── PlanImportant.class
│   │                           │   │   └── PlanType.class
│   │                           │   ├── dto
│   │                           │   │   ├── PlanRequestDto.class
│   │                           │   │   ├── PlanResponseDto$PlanResponseDtoBuilder.class
│   │                           │   │   └── PlanResponseDto.class
│   │                           │   └── service
│   │                           │       ├── PlanService.class
│   │                           │       └── PlanServiceImpl.class
│   │                           ├── user
│   │                           │   ├── controller
│   │                           │   │   └── UserController.class
│   │                           │   ├── domain
│   │                           │   │   ├── AuthUser.class
│   │                           │   │   ├── User$UserBuilder.class
│   │                           │   │   ├── User.class
│   │                           │   │   └── UserAdapter.class
│   │                           │   ├── dto
│   │                           │   │   ├── request
│   │                           │   │   │   ├── LoginRequestDto.class
│   │                           │   │   │   ├── SignUpRequestDto$SignUpRequestDtoBuilder.class
│   │                           │   │   │   └── SignUpRequestDto.class
│   │                           │   │   └── response
│   │                           │   │       ├── GroupUserResponseDto$GroupUserResponseDtoBuilder.class
│   │                           │   │       ├── GroupUserResponseDto.class
│   │                           │   │       ├── LoginResponseDto$LoginResponseDtoBuilder.class
│   │                           │   │       ├── LoginResponseDto.class
│   │                           │   │       ├── TokenDto$TokenDtoBuilder.class
│   │                           │   │       ├── TokenDto.class
│   │                           │   │       ├── UserResponseDto$UserResponseDtoBuilder.class
│   │                           │   │       └── UserResponseDto.class
│   │                           │   ├── repository
│   │                           │   │   └── UserRepository.class
│   │                           │   └── service
│   │                           │       ├── UserDetailsServiceImpl.class
│   │                           │       ├── UserService.class
│   │                           │       └── UserServiceImpl.class
│   │                           └── worcation
│   │                               ├── api
│   │                               │   └── WorcationController.class
│   │                               ├── application
│   │                               │   ├── WorcationService.class
│   │                               │   └── WorcationServiceImpl.class
│   │                               ├── dao
│   │                               │   └── WorcationRepository.class
│   │                               ├── domain
│   │                               │   ├── Worcation$WorcationBuilder.class
│   │                               │   └── Worcation.class
│   │                               ├── dto
│   │                               │   ├── WorcationRequestDto$WorcationRequestDtoBuilder.class
│   │                               │   ├── WorcationRequestDto.class
│   │                               │   ├── WorcationResponseDto$WorcationResponseDtoBuilder.class
│   │                               │   └── WorcationResponseDto.class
│   │                               └── exception
│   │                                   └── WorcationNotFoundException.class
│   ├── generated
│   │   └── sources
│   │       ├── annotationProcessor
│   │       │   └── java
│   │       │       └── main
│   │       └── headers
│   │           └── java
│   │               └── main
│   ├── resources
│   │   └── main
│   │       ├── application.yml
│   │       ├── keystore.p12
│   │       ├── static
│   │       └── templates
```

## FrontEnd
```

frontend
├─ .gitignore
├─ dockerfile
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ public
│  ├─ assets
│  │  ├─ bgbg.webp
│  │  ├─ 기대효과
│  │  │  ├─ 기대효과.webp
│  │  │  └─ 도표
│  │  │     ├─ chart.webp
│  │  │     ├─ 삶의 질 개선.webp
│  │  │     ├─ 생산성 향상.webp
│  │  │     ├─ 직무 만족도 증대.webp
│  │  │     └─ 직원 복지 향상.webp
│  │  ├─ 메인
│  │  │  ├─ fire.webp
│  │  │  ├─ talk.webp
│  │  │  ├─ 개인 채널.webp
│  │  │  ├─ 대시보드.webp
│  │  │  ├─ 모임 채널.webp
│  │  │  └─ 진행중인 워케이션.webp
│  │  └─ 팜플렛
│  │     ├─ 강원 팜플렛.webp
│  │     ├─ 더 휴일 팜플렛.webp
│  │     ├─ 데스커 팜플렛.webp
│  │     ├─ 부산 팜플렛.webp
│  │     ├─ 서울 팜플렛.webp
│  │     ├─ 어촌체험 휴양마을 팜플렛.webp
│  │     ├─ 전북 팜플렛.webp
│  │     ├─ 제주 팜플렛.webp
│  │     └─ 충남 팜플렛.webp
│  ├─ icons
│  │  ├─ wava-16x16.png
│  │  ├─ wava-192x192.png
│  │  ├─ wava-32x32.png
│  │  ├─ wava-512x512.png
│  │  └─ wava-64x64.png
│  ├─ index.html
│  ├─ manifest.json
│  ├─ robots.txt
│  ├─ wavalogo.png
│  ├─ wavalogoR.png
│  ├─ 글래스.webp
│  ├─ 글래스10.webp
│  ├─ 글래스2.webp
│  ├─ 글래스3.webp
│  ├─ 글래스4.webp
│  ├─ 글래스5.webp
│  ├─ 글래스6.webp
│  ├─ 글래스7.webp
│  ├─ 글래스8.webp
│  └─ 글래스9.webp
├─ readme.md
├─ src
│  ├─ api
│  │  ├─ channelFeedApi.js
│  │  ├─ chatApi.js
│  │  ├─ createWorcationApi.js
│  │  ├─ dummy.js
│  │  ├─ groupChannelAPI.js
│  │  ├─ helper.js
│  │  ├─ todoApi.js
│  │  └─ userApi.js
│  ├─ App.js
│  ├─ App.test.js
│  ├─ components
│  │  ├─ Channel
│  │  │  ├─ ChannelSubExplorer.jsx
│  │  │  ├─ ChannelSubIcon.jsx
│  │  │  ├─ feed
│  │  │  │  ├─ ArrowButton.jsx
│  │  │  │  ├─ ContentDrawer.jsx
│  │  │  │  ├─ ContentItemGrid.jsx
│  │  │  │  ├─ CreateContentDrawer.jsx
│  │  │  │  ├─ FeedHeader.jsx
│  │  │  │  ├─ FeedSearchbar.jsx
│  │  │  │  ├─ FollowDrawer.jsx
│  │  │  │  ├─ NoContent.jsx
│  │  │  │  ├─ NoResult.jsx
│  │  │  │  └─ ProfileIconBtn.jsx
│  │  │  ├─ group
│  │  │  │  ├─ ChannelRoomItem.jsx
│  │  │  │  ├─ ChannelUserComponent.jsx
│  │  │  │  ├─ ControllerComponent.jsx
│  │  │  │  ├─ CreateGroupChannel.jsx
│  │  │  │  ├─ cursor
│  │  │  │  │  ├─ constants.js
│  │  │  │  │  ├─ Cursor.jsx
│  │  │  │  │  ├─ Cursors.jsx
│  │  │  │  │  ├─ MyCursor.jsx
│  │  │  │  │  └─ y.js
│  │  │  │  ├─ GroupInfoModal.jsx
│  │  │  │  ├─ MapComponent.jsx
│  │  │  │  ├─ pin
│  │  │  │  │  └─ MyPin.jsx
│  │  │  │  └─ SkeletonRoomItem.jsx
│  │  │  └─ LoadingSpinner.jsx
│  │  ├─ Chat
│  │  │  ├─ ChatComponent.jsx
│  │  │  ├─ ChatInputComponent.jsx
│  │  │  └─ message
│  │  │     ├─ MessageDateComponent.jsx
│  │  │     ├─ MyMessageComponent.jsx
│  │  │     └─ OtherMessageComponent.jsx
│  │  ├─ common
│  │  │  ├─ customDatePicker.jsx
│  │  │  ├─ customModal.jsx
│  │  │  ├─ Explorer.jsx
│  │  │  ├─ Footer.jsx
│  │  │  ├─ LoginMenu.jsx
│  │  │  ├─ MobileExplorer.jsx
│  │  │  ├─ MobileLoginMenu.jsx
│  │  │  └─ Navbar.jsx
│  │  ├─ Dashboard
│  │  │  ├─ Calendar
│  │  │  │  ├─ DateRangePicker.jsx
│  │  │  │  ├─ Filters.jsx
│  │  │  │  ├─ ImportantRadio.jsx
│  │  │  │  ├─ TodoModal.jsx
│  │  │  │  └─ TypeRadio.jsx
│  │  │  ├─ Calendar.css
│  │  │  ├─ Calendar.jsx
│  │  │  ├─ DashboardContent.jsx
│  │  │  ├─ dataset.js
│  │  │  ├─ GetLoc.jsx
│  │  │  ├─ Graph
│  │  │  │  ├─ GraphView.jsx
│  │  │  │  └─ useCountUp.jsx
│  │  │  ├─ TypingEffect.css
│  │  │  ├─ TypingEffect.jsx
│  │  │  ├─ Weather.jsx
│  │  │  └─ WeatherService.jsx
│  │  ├─ Home
│  │  │  ├─ AnimatedDiv.jsx
│  │  │  └─ Carousel.jsx
│  │  ├─ Login
│  │  │  └─ LoginComponent.jsx
│  │  ├─ NotFound
│  │  │  └─ .gitkeep
│  │  ├─ portal
│  │  │  └─ portalTest.jsx
│  │  ├─ Signup
│  │  │  └─ SignupComponent.jsx
│  │  ├─ VideoChat
│  │  │  ├─ OvVideo.js
│  │  │  ├─ UserVideo.css
│  │  │  ├─ UserVideoComponent.js
│  │  │  ├─ VideoChat.jsx
│  │  │  └─ VideoChatFunction.jsx
│  │  └─ Worcation
│  │     └─ SidoSigunguSelector.jsx
│  ├─ index.css
│  ├─ index.js
│  ├─ pages
│  │  ├─ Channel
│  │  │  ├─ Feed
│  │  │  │  ├─ FeedAroundPage.jsx
│  │  │  │  └─ FeedPersonalPage.jsx
│  │  │  └─ Group
│  │  │     └─ GroupDiscoverPage.jsx
│  │  ├─ DashboardPage.jsx
│  │  ├─ GroupChannelPage.jsx
│  │  ├─ HomePage.jsx
│  │  ├─ LoginPage.jsx
│  │  ├─ NotFoundPage.jsx
│  │  ├─ SignupPage.jsx
│  │  └─ Worcation.jsx
│  ├─ reportWebVitals.js
│  ├─ service-worker.js
│  ├─ serviceWorkerRegistration.js
│  ├─ setupTests.js
│  ├─ store
│  │  ├─ authStore.js
│  │  ├─ channelStore.js
│  │  ├─ chatStore.js
│  │  ├─ deviceStore.js
│  │  ├─ gptStore.js
│  │  ├─ todoStore.js
│  │  └─ userStore.js
│  └─ util
│     ├─ assistant-logic.js
│     ├─ func.js
│     ├─ gpt.js
│     ├─ http-commons.js
│     ├─ http-status.js
│     └─ test-data.js
└─ tailwind.config.js
```