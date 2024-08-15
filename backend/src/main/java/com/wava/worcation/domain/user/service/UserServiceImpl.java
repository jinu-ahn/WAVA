package com.wava.worcation.domain.user.service;
import com.wava.worcation.common.exception.CustomException;
import com.wava.worcation.common.jwt.TokenProvider;
import com.wava.worcation.common.response.ApiResponse;
import com.wava.worcation.common.response.ErrorCode;
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
import com.wava.worcation.domain.worcation.domain.Worcation;
import com.wava.worcation.domain.worcation.dto.WorcationResponseDto;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.Collections;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService{
    @Value("${default.image}")
    private String defaultImage;

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final AuthenticationManagerBuilder managerBuilder;
    private final TokenProvider tokenProvider;
    private final RedisUtil redisUtil;
    private final ChannelRepository channelRepository;

    /**
     * @ 작성자   : 안진우
     * @ 작성일   : 2024-07-29
     * @ 설명     : 유저 회원 가입 및 개인 채널 생성
     * @param requestDto 회원 가입 데이터
     * @return 회원가입 된 유저 데이터
     * @status 성공 : 200, 실패 : 409
     */
    @Override
    @Transactional
    public ResponseEntity<ApiResponse<UserResponseDto>> signUp(@Valid final SignUpRequestDto requestDto) {
        emailValidate(requestDto.getEmail()); // 이메일 중복 체크
        phoneNumberValidate(requestDto.getPhone()); // 전화번호 중복 체크
        nickNameValidate(requestDto.getNickName()); // 닉네임 중복 체크

        String encodedPassword = bCryptPasswordEncoder.encode(requestDto.getPassword());

        User user = userRepository.save(User.builder()
                .email(requestDto.getEmail())
                .phone(requestDto.getPhone())
                .password(encodedPassword)
                .nickName(requestDto.getNickName())
                .sido(requestDto.getSido())
                .sigungu(requestDto.getSigungu())
                .profileImg(defaultImage)
                .report(0L)
                .roles(Collections.singletonList("VISITOR"))
                .build());

        channelRepository.save(
                Channel.builder()
                        .user(user)
                        .channelTitle(user.getNickName())
                        .channelSido(user.getSido())
                        .channelSigungu(user.getSigungu())
                        .channelDescription(user.getNickName() + "님의 채널 입니다.")
                        .channelType(ChannelType.PERSONAL.getCode())
                        .red(0)
                        .green(0)
                        .blue(0)
                        .build());

        return ResponseEntity.status(HttpStatus.OK)
                .body(ApiResponse.success(UserResponseDto.builder()
                        .id(user.getId())
                        .email(user.getEmail())
                        .phone(user.getPhone())
                        .nickName(user.getNickName())
                        .sido(user.getSido())
                        .sigungu(user.getSigungu())
                        .profile(user.getProfileImg())
                        .build()));

    }

    /**
     * @ 작성자   : 안진우
     * @ 작성일   : 2024-07-29
     * @ 설명     : 로그인 시 토큰 발급 및 헤더에 Access, Refresh 토큰 추가
     * @param requestDto 로그인할 이메일과 비밀번호
     * @param response 토큰을 헤더에 추가하기 위한 servlet 데이터
     * @return 데이터베이스에 저장된 유저 데이터
     * @status 성공 : 200, 실패 : 401, 404
     */
    @Override
    @Transactional
    public ResponseEntity<ApiResponse<LoginResponseDto>> login(@Valid final LoginRequestDto requestDto, HttpServletResponse response) {
        User user = userRepository.findByEmail(requestDto.getEmail()).orElseThrow(
                () -> new CustomException(ErrorCode.USER_NOT_FOUND)
        );

        UsernamePasswordAuthenticationToken authenticationToken = new
                UsernamePasswordAuthenticationToken(requestDto.getEmail(), requestDto.getPassword());

        Authentication authentication = managerBuilder.getObject().authenticate(authenticationToken);

        TokenDto tokenDto = tokenProvider.generateToken(authentication);
        tokenToHeader(tokenDto, response);

        redisUtil.setData(requestDto.getEmail(), tokenDto.refreshToken(), tokenDto.refreshTokenExpiresIn());
        Worcation worcation = user.getWorcation();

        WorcationResponseDto worcationResponseDto = Optional.ofNullable(user.getWorcation())
                .map(w -> WorcationResponseDto.builder()
                        .worcation(worcation)
                        .build()).orElse(null);

        return ResponseEntity.status(HttpStatus.OK)
                .body(ApiResponse.success(LoginResponseDto.builder()
                                .nickName(user.getNickName())
                                .profile(user.getProfileImg())
                                .isWorcation(worcation != null)
                                .worcation(worcationResponseDto)
                                .build()));
    }

    /**
     * @ 작성자   : 안진우
     * @ 작성일   : 2024-07-29
     * @ 설명     : 로그아웃 시 사용한 AccessToken 블랙리스트 추가
     * @param request 헤더에 있는 토큰을 가져올 수 있는 servlet
     * @return 성공 메세지
     * @status 성공 : 200, 실패 : 401, 403
     */
    @Override
    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse<String>> logout(final HttpServletRequest request) {
        String token = tokenProvider.resolveToken(request); // 헤더에서 AccessToken 가져오기
        Authentication authentication = tokenProvider.getAuthentication(token); // 토큰 인증 후 페이로드에서 유저 정보 추출
        redisUtil.deleteData(authentication.getName()); // 해당 유저의 key 삭제
        Long accessExpiration = tokenProvider.getAccessExpiration(token);// AccessToken의 남은 시간 가져오기
        redisUtil.setData(token,"logout",accessExpiration); // 로그아웃을 하더라도 AccessToken의 시간이 남아있으면 인증이 가능하여 블랙리스트로 추가
        return ResponseEntity.ok(ApiResponse.success("로그아웃 성공"));
    }

    /**
     * @ 작성자   : 안진우
     * @ 작성일   : 2024-07-29
     * @ 설명     : 만료된 Access토큰과 Refresh토큰을 검증 후 토큰 재발급
     * @param request 헤더에 있는 토큰을 가져올 수 있는 servlet
     * @param response 토큰을 헤더에 추가하기 위한 servlet
     * @return 재발급 성공 메세지 및 헤더에 토큰 추가
     * @status 성공 : 200, 실패 : 401, 403
     */
    @Override
    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse<String>> reissue(final HttpServletRequest request, final HttpServletResponse response) {
        String accessToken = tokenProvider.resolveToken(request);
        tokenProvider.validateToken(accessToken);
        Authentication authentication = tokenProvider.getAuthentication(accessToken);
        String refreshToken = redisUtil.getData(authentication.getName());

        if(refreshToken == null)
            throw new CustomException(ErrorCode.UNKNOWN_TOKEN);
        if(!Objects.equals(refreshToken, request.getHeader("refreshToken")))
            throw new CustomException(ErrorCode.WRONG_TYPE_TOKEN);

        TokenDto tokenDto = tokenProvider.generateToken(authentication);
        tokenToHeader(tokenDto,response);

        redisUtil.setData(authentication.getName(),tokenDto.refreshToken(),tokenDto.refreshTokenExpiresIn());

        return ResponseEntity.status(HttpStatus.OK)
                        .body(ApiResponse.success("토큰 재발급 성공"));
    }

    /**
     * @ 작성자   : 안진우
     * @ 작성일   : 2024-07-29
     * @ 설명     : 닉네임 중복 체크
     * @param nickName 사용할 닉네임
     * @return 닉네임 사용 가능 여부 메세지
     * @status 성공 : 200, 실패 : 409
     */
    @Override
    @Transactional
    public ResponseEntity<ApiResponse<String>> nickNameCheck(String nickName) {
        nickNameValidate(nickName);

        return ResponseEntity.status(HttpStatus.OK)
                .body(ApiResponse.success("사용가능한 닉네임 입니다."));
    }

    /**
     * @ 작성자   : 안진우
     * @ 작성일   : 2024-08-14
     * @ 설명     : 이메일 중복 여부
     * @param email 사용할 이메일
     * @return 닉네임 사용 가능 여부 메세지
     * @status 성공 : 200, 실패 : 409
     */
    @Override
    @Transactional
    public ResponseEntity<ApiResponse<String>> emailCheck(String email) {
        emailValidate(email);

        return ResponseEntity.status(HttpStatus.OK)
                .body(ApiResponse.success("사용가능한 이메일 입니다."));
    }

    /**
     * @ 작성자   : 안진우
     * @ 작성일   : 2024-08-14
     * @ 설명     : 전화번호 중복 여부
     * @param phone 사용할 닉네임
     * @return 닉네임 사용 가능 여부 메세지
     * @status 성공 : 200, 실패 : 409
     */
    @Override
    @Transactional
    public ResponseEntity<ApiResponse<String>> phoneNumberCheck(String phone) {
        phoneNumberValidate(phone);

        return ResponseEntity.status(HttpStatus.OK)
                .body(ApiResponse.success("사용가능한 전화번호 입니다."));
    }

    /**
     * @ 작성자   : 안진우
     * @ 작성일   : 2024-07-29
     * @ 설명     : 이메일 중복 체크
     * @param email 사용할 이메일
     * @return
     * @status 실패 : 409
     */
    private void emailValidate(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if(user.isPresent()) {
            throw new CustomException(ErrorCode.DUPLICATE_EMAIL);
        }
    }

    /**
     * @ 작성자   : 안진우
     * @ 작성일   : 2024-07-29
     * @ 설명     : 전화번호 중복 체크
     * @param phone 사용할 이메일
     * @return
     * @status 실패 : 409
     */
    private void phoneNumberValidate(String phone) {
        if(userRepository.findByPhone(phone) != null) {
            throw new CustomException(ErrorCode.DUPLICATE_PHONE_NUMBER);
        }
    }

    /**
     * @ 작성자   : 안진우
     * @ 작성일   : 2024-07-29
     * @ 설명     : 닉네임 중복 체크
     * @param nickName 사용할 이메일
     * @return
     * @status 실패 : 409
     */
    private void nickNameValidate(String nickName) {
        if(userRepository.findByNickName(nickName) != null) {
            throw new CustomException(ErrorCode.DUPLICATE_NICKNAME);
        }
    }

    /**
     * @ 작성자   : 안진우
     * @ 작성일   : 2024-07-29
     * @ 설명     : 헤더에  Access,Refresh토큰 추가
     * @param tokenDto 로그인 시 발급한 토큰 데이터
     * @param response 토큰을 헤더에 추가하기 위한 servlet
     * @return
     */
    private void tokenToHeader(TokenDto tokenDto, HttpServletResponse response){
        response.addHeader("Authorization",tokenDto.accessToken());
        response.addHeader("refreshToken",tokenDto.refreshToken());
    }
}
