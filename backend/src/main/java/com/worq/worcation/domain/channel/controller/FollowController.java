package com.worq.worcation.domain.channel.controller;

import com.worq.worcation.domain.channel.dto.FollowResponseDto;
import com.worq.worcation.domain.channel.service.FollowService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/{channelId}/follow")
    public ResponseEntity<FollowResponseDto> getFollow(@PathVariable Long channelId) {

    }
    @GetMapping("/{channelId}/follower")
    public ResponseEntity<FollowResponseDto> getFollow(@PathVariable Long channelId) {

    }
}
