package com.wava.worcation.domain.channel.controller;

import com.wava.worcation.domain.channel.dto.info.FollowInfoDto;
import com.wava.worcation.domain.channel.dto.info.FollowRequestDto;
import com.wava.worcation.domain.channel.dto.info.FollowResponseDto;
import com.wava.worcation.domain.channel.service.FollowService;
import com.wava.worcation.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/channel/follow")
public class FollowController {

    private final FollowService followService;

    private final UserRepository userRepository;

    @PostMapping
    public ResponseEntity<FollowResponseDto> follow(@RequestBody FollowRequestDto requestDto, @AuthenticationPrincipal UserDetails userDetails) {
        Long channelId = requestDto.getChannelId();
        String email = userDetails.getUsername();
        Long userId = userRepository.findByEmail(email).get().getId();
        Map<String,Object> map = followService.follow(channelId,userId);
        FollowResponseDto responseDto;
        responseDto =  FollowResponseDto.builder()
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
    @GetMapping("/{channelId}/following")
    public ResponseEntity<FollowInfoDto> getFollowings(@PathVariable Long channelId) {
        List<FollowInfoDto.UserFollowInfoDto> followList = followService.getFollowings(channelId);
        FollowInfoDto responseDto  = FollowInfoDto.builder()
                .Id(channelId)
                .userList(followList)
                .build();
        return ResponseEntity.status(HttpStatus.OK).body(responseDto);
    }
}
