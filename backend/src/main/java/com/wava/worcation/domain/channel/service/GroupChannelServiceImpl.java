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
    private final ChannelUserRepository channelUserRepository;
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
    public ResponseEntity<ApiResponse<GroupChannelResponseDto>> createGroupChannel(final GroupChannelRequestDto groupChannelRequestDto, final User user) {

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
     * @param user 유저 객체
     * @return 모든 모임채널 정보
     * @status 성공 : 200
     */
    @Override
    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse<List<GroupChannelResponseDto>>> showAllGroupChannel(final User user) {
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
                    .channelType(channel.getChannelType())
                    .userCount(channelUserRepository.countByChannelId(channel.getId()))
                    .build());
        }
        return ResponseEntity.status(HttpStatus.OK).body(ApiResponse.success(groupChannelResponseDtoList));
    }

    /**
     * @ 작성자   : 안진우
     * @ 작성일   : 2024-08-09
     * @ 설명     : 채널 상세 정보
     * @param channelId 채널 식별 아이디
     * @return 채널 상세 정보 및 채널에 가입한 유저정보
     * @status 성공 : 200 , 실패 : 404
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

    /**
     * @ 작성자   : 안진우
     * @ 작성일   : 2024-08-09
     * @ 설명     : 그룹 채널 내 공유 메모 업데이트 함수
     * @param channelId 채널 식별 아이디
     * @param memo 공유 지도에서 작성한 메모 데이터
     * @return 업데이트한 메모 정보 및 기존 채널 정보
     * @status 성공 : 200, 실패 : 404
     */

    @Override
    @Transactional
    public ResponseEntity<ApiResponse<GroupChannelResponseDto>> updateMemo(final Long channelId, final String memo) {
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
                        .channelType(channel.getChannelType())
                        .userCount(channelUserRepository.countByChannelId(channel.getId()))
                        .build()));
    }

    /**
     * @ 작성자   : 안진우
     * @ 작성일   : 2024-08-09
     * @ 설명     : 유저가 가입한 채널 리스트 가져오기
     * @param user 유저 객체
     * @return 가입한 채널 리스트
     * @status 성공 : 200
     */

    @Override
    @Transactional
    public ResponseEntity<ApiResponse<List<GroupChannelResponseDto>>> userJoinChannel(final User user) {
        List<ChannelUser> channelUserList = channelUserRepository.findByUserId(user.getId());

        List<GroupChannelResponseDto> groupChannelResponseList = channelUserList.stream()
                .map(channel -> {
                    return GroupChannelResponseDto.builder()
                            .channelId(channel.getChannel().getId())
                            .userId(channel.getUser().getId())
                            .channelSido(channel.getChannel().getChannelSido())
                            .channelSigungu(channel.getChannel().getChannelSigungu())
                            .channelTitle(channel.getChannel().getChannelTitle())
                            .channelDescription(channel.getChannel().getChannelDescription())
                            .channelMemo(channel.getChannel().getChannelMemo())
                            .channelType(channel.getChannel().getChannelType())
                            .userCount(channelUserRepository.countByChannelId(channel.getChannel().getId()))
                            .build();
                }).toList();
        return ResponseEntity.status(HttpStatus.OK)
                .body(ApiResponse.success(groupChannelResponseList));
    }

    /**
     * @ 작성자   : 최승호
     * @ 작성일   : 2024-08-09
     * @ 설명     : 전체 채널 목록 중 현재 진행중인 워케이션 위치 기준으로 제목 및 내용에 검색어가 포함된 채널 검색
     * @param user 유저 객체
     * @param content 검색어
     * @return 검색 채널 목록
     * @status 성공 : 200
     */
    @Override
    public ResponseEntity<ApiResponse<List<GroupChannelResponseDto>>> searchChannel(final User user, final String content) {
        List<Channel> channelList = channelRepository.searchChannelByInsert(content, ChannelType.GROUP.getCode(),worcationRepository.findByUserId(user.getId()).getSido());
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


}
