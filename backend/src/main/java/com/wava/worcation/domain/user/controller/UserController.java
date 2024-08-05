package com.worq.worcation.domain.user.controller;

import com.worq.worcation.common.response.ApiResponse;
import com.worq.worcation.domain.user.dto.request.LoginRequestDto;
import com.worq.worcation.domain.user.dto.request.SignUpRequestDto;
import com.worq.worcation.domain.user.dto.response.LoginResponseDto;
import com.worq.worcation.domain.user.dto.response.TokenDto;
import com.worq.worcation.domain.user.dto.response.UserResponseDto;
import com.worq.worcation.domain.user.service.UserService;
import com.worq.worcation.domain.worcation.domain.Worcation;
import com.worq.worcation.domain.worcation.dto.WorcationResponseDto;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
@Slf4j
public class UserController {
    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<ApiResponse<UserResponseDto>> signup(@RequestBody SignUpRequestDto requestDto) {
        return userService.signUp(requestDto);
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponseDto>> login(@RequestBody LoginRequestDto loginRequestDto, HttpServletResponse response) {
        return userService.login(loginRequestDto, response);
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<String>> logout(HttpServletRequest request) {
        return userService.logout(request);
    }

    @GetMapping("/reissue")
    public ResponseEntity<ApiResponse<String>> reissue(HttpServletRequest request,HttpServletResponse response) {
        return userService.reissue(request,response);
    }
    @PostMapping("/nickname/check")
    private ResponseEntity<ApiResponse<String>> nickNameCheck(String nickName) {
        return userService.nickNameCheck(nickName);
    }
}
