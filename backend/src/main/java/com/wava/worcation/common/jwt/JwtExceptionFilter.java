package com.wava.worcation.common.jwt;

import com.wava.worcation.common.response.ApiResponse;
import com.wava.worcation.common.response.ErrorCode;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtExceptionFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        response.setCharacterEncoding("UTF-8");
        response.setContentType("application/json");
        try{
            doFilter(request, response, filterChain);
        } catch (JwtException e) {
            ErrorCode errorCode = ErrorCode.UNKNOWN_TOKEN;

            if(e.getMessage().equals(ErrorCode.EXPIRED_TOKEN.getMessage())) {
                errorCode = ErrorCode.EXPIRED_TOKEN;
            } else if(e.getMessage().equals(ErrorCode.UNKNOWN_TOKEN.getMessage())){
                errorCode = ErrorCode.UNKNOWN_TOKEN;
            } else if(e.getMessage().equals(ErrorCode.WRONG_TYPE_TOKEN.getMessage())){
                errorCode = ErrorCode.WRONG_TYPE_TOKEN;
            } else if(e.getMessage().equals(ErrorCode.UNSUPPORTED_TOKEN.getMessage())){
                errorCode = ErrorCode.UNSUPPORTED_TOKEN;
            }
            ApiResponse<String> apiResponse = ApiResponse.error(errorCode);
            response.setStatus(errorCode.getStatus().value());
            response.getWriter().write(apiResponse.toJson()); // ApiResponse의 toJson() 메서드를 사용하여 JSON으로 변환
        }

    }
}
