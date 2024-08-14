package com.wava.worcation.domain.user.service;

import com.wava.worcation.common.response.ApiResponse;
import com.wava.worcation.domain.user.dto.request.LoginRequestDto;
import com.wava.worcation.domain.user.dto.request.SignUpRequestDto;
import com.wava.worcation.domain.user.dto.response.LoginResponseDto;
import com.wava.worcation.domain.user.dto.response.UserResponseDto;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;

public interface UserService {
    ResponseEntity<ApiResponse<UserResponseDto>> signUp(@Valid final SignUpRequestDto requestDto);
    ResponseEntity<ApiResponse<LoginResponseDto>> login(@Valid final LoginRequestDto loginRequestDto, HttpServletResponse response);
    ResponseEntity<ApiResponse<String>> logout(final HttpServletRequest request);
    ResponseEntity<ApiResponse<String>> reissue(final HttpServletRequest request, final HttpServletResponse response);
    ResponseEntity<ApiResponse<String>> nickNameCheck(String nickName);
    ResponseEntity<ApiResponse<String>> emailCheck(String email);
    ResponseEntity<ApiResponse<String>> phoneNumberCheck(String phone);
}
