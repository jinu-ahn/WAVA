package com.worq.worcation.domain.channel.service;

import com.worq.worcation.common.Exception.ResourceNotFoundException;
import com.worq.worcation.common.response.ApiResponse;
import com.worq.worcation.domain.channel.domain.Channel;
import com.worq.worcation.domain.channel.dto.info.PersonalResponseDto;
import com.worq.worcation.domain.channel.repository.ChannelRepository;
import com.worq.worcation.domain.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


@Transactional
@Service
@RequiredArgsConstructor
public class PersonalServiceImpl {


    private final ChannelRepository channelRepository;
    private final UserRepository userRepository;
    private final FollowService followService;
    private final InfoService infoService;

    ResponseEntity<ApiResponse<PersonalResponseDto>> ChannelInfo(Long userId){
        Channel channel = channelRepository.findChannelByUserId(userId);

        ResponseEntity<ApiResponse<PersonalResponseDto>> response = ResponseEntity.status(HttpStatus.OK).body(ApiResponse.success(PersonalResponseDto.builder()
                .id(channel.getId())
                .userId(userId)
                .nickName(userRepository.findById(userId).orElseThrow(ResourceNotFoundException::new).getNickName())
                .sido(channel.getChannelSido())
                .sigungu(channel.getChannelSigungu())
                .description(channel.getChannelDescription())
                .profileImage(userRepository.findById(userId).orElseThrow(ResourceNotFoundException::new).getProfileImg())
                .follow(followService.getFollowings(channel.getId()).size())
                .follower(followService.getFollowers(channel.getId()).size())
                .feedCount(infoService.feedCount(userId))
                .build()
        ));

        return response;
    }
}
