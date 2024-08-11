package com.wava.worcation.domain.channel.controller;

import com.wava.worcation.common.response.ApiResponse;
import com.wava.worcation.domain.channel.dto.info.FollowInfoDto;
import com.wava.worcation.domain.channel.dto.info.FollowRequestDto;
import com.wava.worcation.domain.channel.dto.info.FollowResponseDto;
import com.wava.worcation.domain.channel.service.FollowService;
import com.wava.worcation.domain.user.domain.AuthUser;
import com.wava.worcation.domain.user.domain.User;
import com.wava.worcation.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/channel/follow")
public class FollowController {

    private final FollowService followService;

    private final UserRepository userRepository;

    @PostMapping
    public ResponseEntity<ApiResponse<FollowResponseDto>> follow(@RequestBody FollowRequestDto requestDto, @AuthUser User user) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(ApiResponse.success(followService.follow(requestDto,user)));

    }

    @GetMapping("/{nickname}/follower")
    public ResponseEntity<ApiResponse<FollowInfoDto>> getFollowers(@PathVariable(value = "nickname") String nickname, @AuthUser User user) {

        FollowInfoDto followInfoDto = followService.getFollowers(nickname,user);
        return ResponseEntity.status(HttpStatus.OK).body(ApiResponse.success(followInfoDto));
    }
    @GetMapping("/{nickname}/following")
    public ResponseEntity<ApiResponse<FollowInfoDto>> getFollowings(@PathVariable(value = "nickname") String nickname, @AuthUser User user) {

        FollowInfoDto followInfoDto = followService.getFollowings(nickname,user);
        return ResponseEntity.status(HttpStatus.OK).body(ApiResponse.success(followInfoDto));
    }
}
