package com.wava.worcation.domain.user.service;
import com.wava.worcation.common.jwt.TokenProvider;
import com.wava.worcation.common.response.ApiResponse;
import com.wava.worcation.common.response.ErrorCode;
import com.wava.worcation.common.util.RedisUtil;
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
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final AuthenticationManagerBuilder managerBuilder;
    private final TokenProvider tokenProvider;
    private final RedisUtil redisUtil;

    /**
     * 유저 회원 가입
     * @param requestDto
     * @return ResponseEntity
     */
    @Override
    @Transactional
    public ResponseEntity<ApiResponse<UserResponseDto>> signUp(@Valid final SignUpRequestDto requestDto) {
        if(emailValidate(requestDto.getEmail())) {
            return ResponseEntity.status(ErrorCode.DUPLICATE_EMAIL.getStatus())
                    .body(ApiResponse.error(ErrorCode.DUPLICATE_EMAIL));
        }
        if(phoneNumberValidate(requestDto.getPhone())) {
            return ResponseEntity.status(ErrorCode.DUPLICATE_PHONE_NUMBER.getStatus())
                    .body(ApiResponse.error(ErrorCode.DUPLICATE_PHONE_NUMBER));
        }
        if(nickNameValidate(requestDto.getNickName())) {
            return ResponseEntity.status(ErrorCode.DUPLICATE_NICKNAME.getStatus())
                    .body(ApiResponse.error(ErrorCode.DUPLICATE_NICKNAME));
        }

        String encodedPassword = bCryptPasswordEncoder.encode(requestDto.getPassword());

        User user = userRepository.save(User.builder()
                .email(requestDto.getEmail())
                .phone(requestDto.getPhone())
                .password(encodedPassword)
                .nickName(requestDto.getNickName())
                .sido(requestDto.getSido())
                .sigungu(requestDto.getSigungu())
                .report(0L)
                .roles(Collections.singletonList("VISITOR"))
                .build());

        return ResponseEntity.status(HttpStatus.OK)
                .body(ApiResponse.success(UserResponseDto.builder()
                        .id(user.getId())
                        .email(user.getEmail())
                        .phone(user.getPhone())
                        .nickName(user.getNickName())
                        .sido(user.getSido())
                        .sigungu(user.getSigungu())
                        .build()));

    }

    /**
     * 로그인 : 로그인 성공 시 토큰 발급 및 헤어데 토큰 추가
     * @param requestDto
     * @param response
     * @return ResponseEntity
     */
    @Override
    @Transactional
    public ResponseEntity<ApiResponse<LoginResponseDto>> login(@Valid final LoginRequestDto requestDto, HttpServletResponse response) {
        UsernamePasswordAuthenticationToken authenticationToken = new
                UsernamePasswordAuthenticationToken(requestDto.getEmail(), requestDto.getPassword());

        Authentication authentication = managerBuilder.getObject().authenticate(authenticationToken);

        TokenDto tokenDto = tokenProvider.generateToken(authentication);
        tokenToHeader(tokenDto, response);

        redisUtil.setData(requestDto.getEmail(), tokenDto.refreshToken(), tokenDto.refreshTokenExpiresIn());
        Optional<User> userOpt = userRepository.findByEmail(requestDto.getEmail());
        Worcation worcation = userOpt.get().getWorcation();

        WorcationResponseDto worcationResponseDto = null;
        if (worcation != null) {
            worcationResponseDto = WorcationResponseDto.builder()
                    .worcation(worcation)
                    .build();
        }

        return ResponseEntity.status(HttpStatus.OK)
                .body(ApiResponse.success(LoginResponseDto.builder()
                                .nickName(userOpt.get().getNickName())
                                .profile(userOpt.get().getProfileImg())
                                .isWorcation(worcation != null ? true : false)
                                .worcation(worcationResponseDto)
                                .build()));
    }

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
     * 토큰 재발급
     * @param request
     * @param response
     * @return
     */
    @Override
    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse<String>> reissue(final HttpServletRequest request, final HttpServletResponse response) {
        String accessToken = tokenProvider.resolveToken(request);
        tokenProvider.validateToken(accessToken);
        Authentication authentication = tokenProvider.getAuthentication(accessToken);
        String refreshToken = redisUtil.getData(authentication.getName());

        if(refreshToken == null)
            log.info("토큰이 존재하지 않습니다.");
        if(!Objects.equals(refreshToken, request.getHeader("refreshToken")))
            log.info("유효하지 않은 토큰입니다.");

        TokenDto tokenDto = tokenProvider.generateToken(authentication);
        tokenToHeader(tokenDto,response);

        redisUtil.setData(authentication.getName(),tokenDto.refreshToken(),tokenDto.refreshTokenExpiresIn());

        return ResponseEntity.status(HttpStatus.OK)
                        .body(ApiResponse.success("토큰 재발급 성공"));
    }

    @Override
    @Transactional
    public ResponseEntity<ApiResponse<String>> nickNameCheck(String nickName) {
        if(nickNameValidate(nickName)) {
            return ResponseEntity.status(ErrorCode.DUPLICATE_NICKNAME.getStatus())
                    .body(ApiResponse.error(ErrorCode.DUPLICATE_NICKNAME));
        }
        return ResponseEntity.status(HttpStatus.OK)
                .body(ApiResponse.success("사용가능한 닉네임 입니다."));
    }

    private boolean emailValidate(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if(user.isPresent()) {
            return true;
        }
        return false;
    }
    private boolean phoneNumberValidate(String phone) {
        if(userRepository.findByPhone(phone) != null) {
            return true;
        }
        return false;
    }
    private boolean nickNameValidate(String nickName) {
        if(userRepository.findByNickName(nickName) != null) {
            return true;
        }
        return false;
    }
    private void tokenToHeader(TokenDto tokenDto, HttpServletResponse response){
        response.addHeader("Authorization",tokenDto.accessToken());
        response.addHeader("refreshToken",tokenDto.refreshToken());
    }
}
