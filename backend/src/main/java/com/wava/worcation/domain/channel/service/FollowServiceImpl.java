package com.wava.worcation.domain.channel.service;

import com.wava.worcation.common.exception.ResourceNotFoundException;
import com.wava.worcation.domain.channel.domain.Channel;
import com.wava.worcation.domain.channel.domain.Follow;
import com.wava.worcation.domain.channel.dto.info.FollowInfoDto;
import com.wava.worcation.domain.channel.repository.ChannelRepository;
import com.wava.worcation.domain.channel.repository.FollowRepository;
import com.wava.worcation.domain.user.domain.User;
import com.wava.worcation.domain.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Transactional
@RequiredArgsConstructor
public class FollowServiceImpl implements com.wava.worcation.domain.channel.service.FollowService {

    private static final Logger log = LoggerFactory.getLogger(FollowServiceImpl.class);
    private final FollowRepository followRepository;
    private final ChannelRepository channelRepository;
    private final UserRepository userRepository;

    @Override
    public Map<String, Object> follow(Long channelId, Long userId) {
        Map<String, Object> map = new HashMap<>();

        // 채널과 사용자 존재 여부 확인 및 팔로우 객체 생성
        if (
                !followRepository.existsByChannelAndUser(
                    channelRepository.findById(channelId)
                    .orElseThrow(() -> new ResourceNotFoundException("채널 없음")),
                    userRepository.findById(userId)
                    .orElseThrow(() -> new ResourceNotFoundException("유저 없음"))
                    )
        ){
            Follow follow = Follow.builder()
                .user(userRepository.findById(userId)
                        .orElseThrow(() -> new ResourceNotFoundException("유저 없음")))
                .channel(channelRepository.findById(channelId)
                        .orElseThrow(() -> new ResourceNotFoundException("채널 없음")))
                .build();
            followRepository.save(follow);
        }
        else{
            log.info("존재하지 않음");
        }


        // 팔로우 및 팔로워 수 계산
        int followNum = Optional.ofNullable(followRepository.findByUser(userRepository.findById(userId)
                        .orElseThrow(() -> new ResourceNotFoundException("유저 없음"))))
                .map(List::size)
                .orElse(0);

        int followerNum = Optional.ofNullable(followRepository.findByChannel(channelRepository.findById(channelId)
                        .orElseThrow(() -> new ResourceNotFoundException("채널 없음"))))
                .map(List::size)
                .orElse(0);

        // map에 결과 저장
        map.put("follow", followNum);
        map.put("follower", followerNum);  // 'follower'로 수정

        return map;
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
     * @return
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
