package com.wava.worcation.domain.channel.controller;

import com.wava.worcation.common.response.ApiResponse;
import com.wava.worcation.domain.channel.dto.info.FollowInfoDto;
import com.wava.worcation.domain.channel.dto.info.FollowResponseDto;
import com.wava.worcation.domain.channel.service.FollowService;
import com.wava.worcation.domain.user.domain.AuthUser;
import com.wava.worcation.domain.user.domain.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/channel/follow")
public class FollowController {

    private final FollowService followService;

    @PostMapping("/{nickname}/follow")
    public ResponseEntity<ApiResponse<FollowResponseDto>> follow(@PathVariable(value = "nickname") String nickname, @AuthUser User user) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(ApiResponse.success(followService.follow(nickname,user)));

    }

    @DeleteMapping("/{nickname}/unfollow")
    public ResponseEntity<ApiResponse<?>> unFollow(@PathVariable(value ="nickname") String nickname, @AuthUser User user){
        followService.unFollow(nickname,user);
        return ResponseEntity.ok().body(ApiResponse.success("삭제 성공"));
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
