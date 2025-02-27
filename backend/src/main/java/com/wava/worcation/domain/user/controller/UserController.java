package com.wava.worcation.domain.user.controller;

import com.wava.worcation.common.response.ApiResponse;
import com.wava.worcation.domain.user.dto.request.LoginRequestDto;
import com.wava.worcation.domain.user.dto.request.SignUpRequestDto;
import com.wava.worcation.domain.user.dto.response.LoginResponseDto;
import com.wava.worcation.domain.user.dto.response.UserResponseDto;
import com.wava.worcation.domain.user.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
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
    public ResponseEntity<ApiResponse<UserResponseDto>> signup(@Valid @RequestBody SignUpRequestDto requestDto) {
        return userService.signUp(requestDto);
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponseDto>> login(@Valid @RequestBody LoginRequestDto loginRequestDto, HttpServletResponse response) {
        return userService.login(loginRequestDto, response);
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<String>> logout(HttpServletRequest request) {
        return userService.logout(request);
    }

    @PostMapping("/reissue")
    public ResponseEntity<ApiResponse<String>> reissue(HttpServletRequest request,HttpServletResponse response) {
        return userService.reissue(request,response);
    }

    @PostMapping("/check/nickname/{nickName}")
    public ResponseEntity<ApiResponse<String>> nickNameCheck(@PathVariable(name="nickName") String nickName) {
        return userService.nickNameCheck(nickName);
    }

    @PostMapping("/check/email/{email}")
    public ResponseEntity<ApiResponse<String>> emailCheck(@PathVariable(name="email") String email) {
        return userService.emailCheck(email);
    }

    @PostMapping("/check/phone/{phoneNumber}")
    public ResponseEntity<ApiResponse<String>> phoneNumberCheck(@PathVariable(name="phoneNumber") String phoneNumber) {
        return userService.phoneNumberCheck(phoneNumber);
    }
}
