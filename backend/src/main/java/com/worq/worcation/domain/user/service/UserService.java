package com.worq.worcation.domain.user.service;

import com.worq.worcation.common.response.ApiResponse;
import com.worq.worcation.domain.user.dto.request.LoginRequestDto;
import com.worq.worcation.domain.user.dto.request.SignUpRequestDto;
import com.worq.worcation.domain.user.dto.response.TokenDto;
import com.worq.worcation.domain.user.dto.response.UserResponseDto;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;

public interface UserService {
    ResponseEntity<ApiResponse<UserResponseDto>> signUp(@Valid final SignUpRequestDto requestDto);
    ResponseEntity<ApiResponse<TokenDto>> login(@Valid final LoginRequestDto loginRequestDto, HttpServletResponse response);
    ResponseEntity<ApiResponse<String>> logout(final HttpServletRequest request);
    ResponseEntity<ApiResponse<String>> reissue(final HttpServletRequest request, final HttpServletResponse response);
}
