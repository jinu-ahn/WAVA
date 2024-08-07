package com.wava.worcation.domain.channel.service;

import com.wava.worcation.common.exception.ResourceNotFoundException;
import com.wava.worcation.common.response.ApiResponse;
import com.wava.worcation.domain.channel.domain.Channel;
import com.wava.worcation.domain.channel.dto.info.PersonalResponseDto;
import com.wava.worcation.domain.channel.repository.ChannelRepository;
import com.wava.worcation.domain.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


@Transactional
@Service
@RequiredArgsConstructor
public class PersonalServiceImpl implements PersonalService {

    private final ChannelRepository channelRepository;
    private final UserRepository userRepository;
    private final com.wava.worcation.domain.channel.service.FollowService followService;
    private final com.wava.worcation.domain.channel.service.InfoService infoService;

    @Override
    public ResponseEntity<ApiResponse<PersonalResponseDto>> ChannelInfo(Long userId){
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
