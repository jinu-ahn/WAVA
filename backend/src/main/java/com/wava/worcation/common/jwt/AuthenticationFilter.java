package com.wava.worcation.common.jwt;

import com.wava.worcation.common.util.RedisUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.ValidationException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * 작성자 : jingu
 * 날짜 : 2024/07/25
 * 설명 : JWT인증을 하기 위해 설치하는 커스텀 필터. UsernamePasswordAuthenticationFilter 이전에 실행
 */
@RequiredArgsConstructor
@Slf4j
public class AuthenticationFilter extends OncePerRequestFilter {
    private final TokenProvider tokenProvider;
    private final RedisUtil redisUtil;

    /**
     * 사용자의 요청을 처리 하기 전 JWT토큰을 확인하고, 유효한 경우 인증 정보를 설정
     * @param request
     * @param response
     * @param filterChain
     * @throws ServletException
     * @throws IOException
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = tokenProvider.resolveToken(request);
        log.info(token);
        if (token != null && tokenProvider.validateToken(token)) {
            Authentication authentication = tokenProvider.getAuthentication(token);
            if (redisUtil.getData(token) != null) {
                // TODO : CustomExcpetion 구현 시 변경 예정
                throw new ValidationException("로그아웃 된 유저입니다.");
            }
            log.info("auth : {}",authentication);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        filterChain.doFilter(request, response);
    }
}