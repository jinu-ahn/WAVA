package com.worq.worcation.domain.channel.controller;

import com.worq.worcation.domain.channel.dto.info.FollowInfoDto;
import com.worq.worcation.domain.channel.dto.info.FollowResponseDto;
import com.worq.worcation.domain.channel.service.FollowService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/channel/follow")
public class FollowController {

    private final FollowService followService;

    @PostMapping
    public ResponseEntity<FollowResponseDto> follow(@RequestParam Long channelId, @AuthenticationPrincipal Long userId) {
        Map<String,Object> map = followService.follow(channelId,userId);
        FollowResponseDto responseDto = new FollowResponseDto();
        responseDto.builder()
                .channelId(channelId)
                .followingCount((Integer)map.get("follow"))
                .followerCount((Integer)map.get("follower"))
                .build();

        return ResponseEntity.status(HttpStatus.CREATED).body(responseDto);
    }

    @GetMapping("/{channelId}/follower")
    public ResponseEntity<FollowInfoDto> getFollowers(@PathVariable Long channelId) {
        List<FollowInfoDto.UserFollowInfoDto> followList = followService.getFollowers(channelId);
        FollowInfoDto responseDto  = FollowInfoDto.builder()
                .Id(channelId)
                .userList(followList)
                .build();
        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }
    @GetMapping("/{userId}/following")
    public ResponseEntity<FollowInfoDto> getFollowings(@PathVariable Long userId) {
        List<FollowInfoDto.UserFollowInfoDto> followList = followService.getFollowings(userId);
        FollowInfoDto responseDto  = FollowInfoDto.builder()
                .Id(userId)
                .userList(followList)
                .build();
        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }
}
