package com.wava.worcation.domain.channel.service;

import com.wava.worcation.common.exception.CustomException;
import com.wava.worcation.common.exception.CustomExceptionHandler;
import com.wava.worcation.common.exception.ResourceNotFoundException;
import com.wava.worcation.common.response.ErrorCode;
import com.wava.worcation.domain.channel.domain.Channel;
import com.wava.worcation.domain.channel.domain.Follow;
import com.wava.worcation.domain.channel.dto.info.FollowInfoDto;
import com.wava.worcation.domain.channel.dto.info.FollowResponseDto;
import com.wava.worcation.domain.channel.repository.ChannelRepository;
import com.wava.worcation.domain.channel.repository.FollowRepository;
import com.wava.worcation.domain.user.domain.User;
import com.wava.worcation.domain.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Transactional
@RequiredArgsConstructor
public class FollowServiceImpl implements com.wava.worcation.domain.channel.service.FollowService {

    private final FollowRepository followRepository;
    private final ChannelRepository channelRepository;
    private final UserRepository userRepository;

    /**
     *
     * @ 작성자   : 최승호
     * @ 작성일   : 2024-08-11
     * @ 설명     : 팔로우 등록
     * @param nickname 팔로우할 유저닉네임
     * @param user 팔로우를 거는 유저객체
     * @return followResponseDto
     */
    @Override
    public FollowResponseDto follow(String nickname, User user) {
        // 닉네임으로 들어온 채널
        Channel channel = channelRepository.findChannelByUserId(userRepository.findByNickName(nickname).getId());

        if (followRepository.existsByChannelAndUser(channel,user)){
            throw new CustomException(ErrorCode.ALREADY_FOLLOWING);
        }
        Follow follow = Follow.builder()
                .user(user)
                .channel(channel)
                .build();
        followRepository.save(follow);

        // 팔로우 및 팔로워 수 계산
        int followNum = Optional.ofNullable(followRepository.findByUser(user))
                .map(List::size)
                .orElse(0);

        int followerNum = Optional.ofNullable(followRepository.findByChannel(channel))
                .map(List::size)
                .orElse(0);

        return FollowResponseDto.builder()
                .nickname(nickname)
                .followingCount(followNum)
                .followerCount(followerNum)
                .build();
    }

    @Override
    public void unFollow(String nickname, User user) {
        Channel channel = channelRepository.findChannelByUserId(userRepository.findByNickName(nickname).getId());

        if (!followRepository.existsByChannelAndUser(channel,user)){
            throw new CustomException(ErrorCode.ALREADY_FOLLOWING);
        }
        else{
            followRepository.deleteByChannelAndUser(channel, user);
        }
    }
    /**
     *
     * @ 작성자   : 최승호
     * @ 작성일   : 2024-08-11
     * @ 설명     :이 채널을 팔로우 하는 사람들 목록 Dto
     * @param usernickname 채널 주인 닉네임
     * @return 채널 닉네임, 팔로워 리스트
     */
    @Override
    public FollowInfoDto getFollowers(String usernickname, User authUser) {
        Channel channel = channelRepository.findChannelByUserId(userRepository.findByNickName(usernickname).getId());
        List<FollowInfoDto.UserFollowInfoDto> followerDtos = new ArrayList<>();
        List<Follow> followers = followRepository.findByChannel(channel);
        for (Follow follow : followers) {
            User user = follow.getUser();

            FollowInfoDto.UserFollowInfoDto dto = FollowInfoDto.UserFollowInfoDto.builder()
                    .userId(user.getId())
                    .profile(user.getProfileImg())
                    .nickname(user.getNickName())
                    .isFollower(followRepository.existsByChannelAndUser(channel,authUser))
                    .build();
            followerDtos.add(dto);
        }
        return FollowInfoDto.builder()
                .nickName(usernickname)
                .userList(followerDtos)
                .build();
    }

    /**
     *
     * @ 작성자   : 최승호
     * @ 작성일   : 2024-08-11
     * @ 설명     : 이 사람이 팔로 하는 계정들 목록 Dto
     * @param usernickname 채널 주인 닉네임
     * @return 팔로하는 계정들 정보 리스트
     */
    @Override
    public FollowInfoDto getFollowings(String usernickname, User authUser) {
        Channel channel = channelRepository.findChannelByUserId(userRepository.findByNickName(usernickname).getId());
        List<FollowInfoDto.UserFollowInfoDto> followerDtos = new ArrayList<>();
        User userInfo = channelRepository.findById(channel.getId()).orElseThrow(()-> new ResourceNotFoundException("채널검색실패")).getUser();
        List<Follow> followers = followRepository.findByUser(userInfo);
        for (Follow follow : followers) {
            User user = follow.getUser();
            FollowInfoDto.UserFollowInfoDto dto = FollowInfoDto.UserFollowInfoDto.builder()
                    .userId(user.getId())
                    .profile(user.getProfileImg())
                    .nickname(user.getNickName())
                    .isFollower(followRepository.existsByChannelAndUser(channel,authUser))
                    .build();
            followerDtos.add(dto);
        }
        return FollowInfoDto.builder()
                .nickName(usernickname)
                .userList(followerDtos)
                .build();
    }

}
