package com.wava.worcation.domain.channel.service;


import com.wava.worcation.common.exception.CustomException;
import com.wava.worcation.common.jwt.TokenProvider;
import com.wava.worcation.common.openvidu.service.OpenViduService;
import com.wava.worcation.common.response.ApiResponse;
import com.wava.worcation.common.response.ErrorCode;
import com.wava.worcation.domain.channel.domain.Channel;
import com.wava.worcation.domain.channel.domain.ChannelUser;
import com.wava.worcation.domain.channel.dto.request.GroupChannelRequestDto;
import com.wava.worcation.domain.channel.dto.response.GroupChannelResponseDto;
import com.wava.worcation.domain.channel.dto.response.GroupDetailResponseDto;
import com.wava.worcation.domain.channel.enums.ChannelType;
import com.wava.worcation.domain.channel.repository.ChannelRepository;
import com.wava.worcation.domain.channel.repository.ChannelUserRepository;
import com.wava.worcation.domain.user.domain.User;
import com.wava.worcation.domain.user.dto.response.UserResponseDto;
import com.wava.worcation.domain.user.repository.UserRepository;
import com.wava.worcation.domain.worcation.dao.WorcationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class GroupChannelServiceImpl implements GroupChannelService {

    private final ChannelRepository channelRepository;
    private final UserRepository userRepository;
    private final TokenProvider tokenProvider;
    private final ChannelUserRepository channelUserRepository;
    private final OpenViduService openViduService;
    private final WorcationRepository worcationRepository;


    /**
     *
     * @ 작성자   : user
     * @ 작성일   : 2024-08-03
     * @ 설명     :
     * @param groupChannelRequestDto 모임채널 생성 데이터
     * @param user 유저 객체
     * @return  201
     * @return 만들어진 모임채널 정보
     */
    @Override
    @Transactional
    public ResponseEntity<ApiResponse<GroupChannelResponseDto>> createGroupChannel(GroupChannelRequestDto groupChannelRequestDto, User user) throws Exception {

        Channel channel = Channel.builder()
                .user(user)
                .channelDescription(groupChannelRequestDto.getChannelDescription())
                .channelTitle(groupChannelRequestDto.getChannelTitle())
                .channelType(ChannelType.GROUP.getCode())    //C001 : 그룹 ,  C002 : 피드
                .channelSido(groupChannelRequestDto.getChannelSido())
                .channelSigungu(groupChannelRequestDto.getChannelSigungu())
                .build();

         channelRepository.save(channel);

         channelUserRepository.save(
                 ChannelUser.builder()
                         .user(user)
                         .channel(channel)
                         .build());

         GroupChannelResponseDto groupChannelResponseDto = GroupChannelResponseDto.builder()
                 .channelId(channel.getId())
                 .userId(channel.getUser().getId())
                 .channelDescription(channel.getChannelDescription())
                 .channelTitle(channel.getChannelTitle())
                 .channelSido(channel.getChannelSido())
                 .channelSigungu(channel.getChannelSigungu())
                 .channelMemo(channel.getChannelMemo())
                 .userCount(channelUserRepository.countByChannelId(channel.getId()))
                 .build();

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(groupChannelResponseDto));
    }


    /**
     *
     * @ 작성자   : 이병수
     * @ 작성일   : 2024-08-04
     * @ 설명     : 모든 모임채널 보여주기
     * @return 모든 모임채널 정보
     */
    @Override
    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse<List<GroupChannelResponseDto>>> showAllGroupChannel(User user) {
        List<Channel> channelList = channelRepository.findAllByChannelType(ChannelType.GROUP.getCode(),worcationRepository.findByUserId(user.getId()).getSido());
        List<GroupChannelResponseDto> groupChannelResponseDtoList = new ArrayList<>();
        for (Channel channel : channelList) {
            groupChannelResponseDtoList.add(GroupChannelResponseDto.builder()
                    .channelId(channel.getId())
                    .userId(channel.getUser().getId())
                    .channelDescription(channel.getChannelDescription())
                    .channelTitle(channel.getChannelTitle())
                    .channelSido(channel.getChannelSido())
                    .channelSigungu(channel.getChannelSigungu())
                    .channelMemo(channel.getChannelMemo())
                    .userCount(channelUserRepository.countByChannelId(channel.getId()))
                    .build());
        }
        return ResponseEntity.status(HttpStatus.OK).body(ApiResponse.success(groupChannelResponseDtoList));
    }

    /**
     * 채널 상세 보기
     * @param channelId
     * @return 채널 상세 정보 및 채널에 가입한 유저정보
     */
    @Override
    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse<GroupDetailResponseDto>> getGroupDetail(final Long channelId) {
        Channel channel = channelRepository.findById(channelId).orElseThrow(
                () -> new CustomException(ErrorCode.CHANNEL_NOT_FOUND)
        );

        List<UserResponseDto> userResponseDtoList = channelUserRepository.findByChannelId(channelId)
                .stream()
                .map(user -> UserResponseDto.builder()
                        .id(user.getUser().getId())
                        .email(user.getUser().getEmail())
                        .phone(user.getUser().getPhone())
                        .nickName(user.getUser().getNickName())
                        .sido(user.getUser().getSido())
                        .sigungu(user.getUser().getSigungu())
                        .profile(user.getUser().getProfileImg())
                        .build())
                .toList();

        return ResponseEntity.status(HttpStatus.OK)
                .body(ApiResponse.success(GroupDetailResponseDto.builder()
                        .channelId(channel.getId())
                        .channelTitle(channel.getChannelTitle())
                        .channelDescription(channel.getChannelDescription())
                        .user(userResponseDtoList)
                        .build()));
    }

    @Override
    @Transactional
    public ResponseEntity<ApiResponse<GroupChannelResponseDto>> updateMemo(Long channelId, String memo) {
        Channel channel = channelRepository.findById(channelId).orElseThrow(
                () -> new CustomException(ErrorCode.CHANNEL_NOT_FOUND)
        );

        channel.memoUpdate(memo);

        return ResponseEntity.status(HttpStatus.OK)
                .body(ApiResponse.success(GroupChannelResponseDto.builder()
                        .channelId(channel.getId())
                        .userId(channel.getUser().getId())
                        .channelDescription(channel.getChannelDescription())
                        .channelTitle(channel.getChannelTitle())
                        .channelSido(channel.getChannelSido())
                        .channelSigungu(channel.getChannelSigungu())
                        .channelMemo(channel.getChannelMemo())
                        .userCount(channelUserRepository.countByChannelId(channel.getId()))
                        .build()));
    }

    @Override
    public ResponseEntity<ApiResponse<List<GroupChannelResponseDto>>> userJoinChannel(User user) {
        List<ChannelUser> channelUserList = channelUserRepository.findByUserId(user.getId());

        List<GroupChannelResponseDto> groupChannelResponseList = channelUserList.stream()
                .map(channel -> {
                    return GroupChannelResponseDto.builder()
                            .channelId(channel.getId())
                            .userId(channel.getUser().getId())
                            .channelSido(channel.getChannel().getChannelSido())
                            .channelSigungu(channel.getChannel().getChannelSigungu())
                            .channelTitle(channel.getChannel().getChannelTitle())
                            .channelDescription(channel.getChannel().getChannelDescription())
                            .channelMemo(channel.getChannel().getChannelMemo())
                            .build();
                }).toList();
        return ResponseEntity.status(HttpStatus.OK)
                .body(ApiResponse.success(groupChannelResponseList));
    }


}
