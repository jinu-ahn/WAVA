package com.wava.worcation.domain.user.service;

import com.wava.worcation.common.jwt.TokenProvider;
import com.wava.worcation.common.response.ApiResponse;
import com.wava.worcation.common.util.RedisUtil;
import com.wava.worcation.domain.channel.domain.Channel;
import com.wava.worcation.domain.channel.enums.ChannelType;
import com.wava.worcation.domain.channel.repository.ChannelRepository;
import com.wava.worcation.domain.user.domain.User;
import com.wava.worcation.domain.user.dto.request.LoginRequestDto;
import com.wava.worcation.domain.user.dto.request.SignUpRequestDto;
import com.wava.worcation.domain.user.dto.response.LoginResponseDto;
import com.wava.worcation.domain.user.dto.response.TokenDto;
import com.wava.worcation.domain.user.dto.response.UserResponseDto;
import com.wava.worcation.domain.user.repository.UserRepository;
import com.wava.worcation.domain.user.service.UserServiceImpl;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

/**
 * 작성자   : user
 * 작성날짜 : 2024-08-11
 * 설명    :
 */
@ExtendWith(MockitoExtension.class)
class UserServiceImplTest {

    @InjectMocks
    private UserServiceImpl userServiceImpl;

    @Mock
    private UserRepository userRepository;
    @Mock
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    @Mock
    private AuthenticationManager authenticationManager;


    @Mock
    private TokenProvider tokenProvider;
    @Mock
    private RedisUtil redisUtil;
    @Mock
    private ChannelRepository channelRepository;
    @Mock
    private HttpServletResponse httpServletResponse;
    @Mock
    private HttpServletRequest httpServletRequest;

    @Mock
    private UsernamePasswordAuthenticationToken authenticationToken;
    @Mock
    private AuthenticationManagerBuilder managerBuilder;


    @Mock
    private Authentication authentication;

    private SignUpRequestDto requestDto;
    private User user;
    private Channel channel;
    private LoginRequestDto loginRequestDto;
    private TokenDto tokenDto;


    @BeforeEach
    void setUp() {
        loginRequestDto = LoginRequestDto.builder()
                .email("test1586@test.com")
                .password("$2a$10$VJTDditUN6rD9Z4aWuwjb.KeKpcoU.Jj1JBHKKPXHBci0Ika9Q.T.")
                .build();


        requestDto  = SignUpRequestDto.builder()
                .email("test1586@test.com")
                .password("$2a$10$VJTDditUN6rD9Z4aWuwjb.KeKpcoU.Jj1JBHKKPXHBci0Ika9Q.T.")
                .phone("01022222345")
                .nickName("나는야퉁퉁이")
                .sido("서울특별시")
                .sigungu("강동구")
                .build();

        user = User.builder()
                .id(63L)
                .email("test1586@test.com")
                .password("$2a$10$VJTDditUN6rD9Z4aWuwjb.KeKpcoU.Jj1JBHKKPXHBci0Ika9Q.T.")
                .phone("01022222345")
                .nickName("나는야퉁퉁이")
                .sido("서울특별시")
                .sigungu("강동구")
                .roles(List.of("visitor"))
                .profileImg("https://worqbucket.s3.ap-northeast-2.amazonaws.com/53a16f79-ef6d-4809-98a0-2fe245f78c53.jpg")
                .build();

        channel = Channel.builder()
                .user(user)  // user 객체를 설정
                .channelTitle(user.getNickName())  // 유저의 닉네임을 채널 타이틀로 설정
                .channelSido(user.getSido())  // 유저의 시도를 채널 시도로 설정
                .channelSigungu(user.getSigungu())  // 유저의 시군구를 채널 시군구로 설정
                .channelDescription(user.getNickName() + "님의 채널 입니다.")  // 채널 설명 설정
                .channelType(ChannelType.PERSONAL.getCode())  // 채널 타입을 개인 타입으로 설정
                .red(0)  // 채널 색상 값 (red) 설정
                .green(0)  // 채널 색상 값 (green) 설정
                .blue(0)  // 채널 색상 값 (blue) 설정
                .build();  // Channel 객체 빌드


        tokenDto = TokenDto.builder()
                .accessToken("accessToken")
                .refreshToken("refreshToken")
                .refreshTokenExpiresIn(7200L)
                .build();




        authenticationToken = authenticationToken = new
                UsernamePasswordAuthenticationToken(requestDto.getEmail(), requestDto.getPassword());

    }


    @DisplayName("회원가입테스트")
    @Test
    void signUp() {

        //given
        when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.empty());
        when(userRepository.findByPhone(user.getPhone())).thenReturn(null);
        when(userRepository.findByNickName(user.getNickName())).thenReturn(null);
        when(bCryptPasswordEncoder.encode(requestDto.getPassword())).thenReturn(requestDto.getPassword());
        when(userRepository.save(any(User.class))).thenReturn(user);
        when(channelRepository.save(any(Channel.class))).thenReturn(channel);

        //when
        ResponseEntity<ApiResponse<UserResponseDto>> response = userServiceImpl.signUp(requestDto);

        //then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody().getData());
        assertEquals(response.getBody().getData().getEmail(), user.getEmail());
    }


//    @Test
//    void login() {
//        // Mocking the authentication process
//        AuthenticationManager authenticationManager = mock(AuthenticationManager.class);
//
//        when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.of(user));
//        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
//                .thenReturn(authentication);
//        when(tokenProvider.generateToken(authentication)).thenReturn(tokenDto);
//
//        // When
//        ResponseEntity<ApiResponse<LoginResponseDto>> responseEntity = userServiceImpl.login(loginRequestDto, httpServletResponse);
//
//        // Then
//        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
//        assertEquals(user.getNickName(), responseEntity.getBody().getData().getNickName());
//        assertEquals(user.getProfileImg(), responseEntity.getBody().getData().getProfile());
//
//    }

    @DisplayName("로그아웃 테스트")
    @Test
    void logout() {
        when(authentication.getName()).thenReturn(user.getEmail());
        when(tokenProvider.resolveToken(httpServletRequest)).thenReturn(tokenDto.accessToken());
        when(tokenProvider.getAuthentication(tokenDto.accessToken())).thenReturn(authentication);
        doNothing().when(redisUtil).deleteData(user.getEmail());
        when(tokenProvider.getAccessExpiration(tokenDto.accessToken())).thenReturn(123123123L);
        doNothing().when(redisUtil).setData(tokenDto.accessToken(),"logout",123123123L);

        //when
        ResponseEntity<ApiResponse<String>> response = userServiceImpl.logout(httpServletRequest);

        //then
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @DisplayName("토큰 재발급")
    @Test
    void reissue() {
        
        when(authentication.getName()).thenReturn("refreshToken");
        when(httpServletRequest.getHeader("refreshToken")).thenReturn("refreshToken");
        when(tokenProvider.resolveToken(httpServletRequest)).thenReturn(tokenDto.accessToken());
        when(tokenProvider.validateToken(tokenDto.accessToken())).thenReturn(true);
        when(tokenProvider.getAuthentication(tokenDto.accessToken())).thenReturn(authentication); // 하나의 when-thenReturn으로 수정
        when(redisUtil.getData("refreshToken")).thenReturn(tokenDto.refreshToken());
        when(tokenProvider.generateToken(authentication)).thenReturn(tokenDto);
        doNothing().when(redisUtil).setData("refreshToken", tokenDto.refreshToken(), tokenDto.refreshTokenExpiresIn());

        // When
        ResponseEntity<ApiResponse<String>> response = userServiceImpl.reissue(httpServletRequest, httpServletResponse);

        // Then
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(redisUtil.getData("refreshToken"), tokenDto.refreshToken());
    }


}