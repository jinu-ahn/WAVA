package com.wava.worcation.domain.channel.service;

import com.wava.worcation.common.exception.ResourceNotFoundException;
import com.wava.worcation.domain.channel.domain.Follow;
import com.wava.worcation.domain.channel.dto.info.FollowInfoDto;
import com.wava.worcation.domain.channel.repository.ChannelRepository;
import com.wava.worcation.domain.channel.repository.FollowRepository;
import com.wava.worcation.domain.user.domain.User;
import com.wava.worcation.domain.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@Transactional
public class FollowServiceImpl implements com.wava.worcation.domain.channel.service.FollowService {

    private static final Logger log = LoggerFactory.getLogger(FollowServiceImpl.class);
    @Autowired
    FollowRepository followRepository;
    @Autowired
    ChannelRepository channelRepository;
    @Autowired
    UserRepository userRepository;

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


    @Override
    public List<FollowInfoDto.UserFollowInfoDto> getFollowers(Long channelId) {
        List<FollowInfoDto.UserFollowInfoDto> followerDtos = new ArrayList<>();
        List<Follow> followers = followRepository.findByChannel(channelRepository.findById(channelId).orElseThrow(ResourceNotFoundException::new));
        for (Follow follow : followers) {
            User user = follow.getUser();
            FollowInfoDto.UserFollowInfoDto dto = FollowInfoDto.UserFollowInfoDto.builder()
                    .userId(user.getId())
                    .profile(user.getProfileImg())
                    .nickname(user.getNickName())
                    .build();
            followerDtos.add(dto);
        }
        return followerDtos;
    }

    @Override
    public List<FollowInfoDto.UserFollowInfoDto> getFollowings(Long channelId) {
        List<FollowInfoDto.UserFollowInfoDto> followerDtos = new ArrayList<>();
        User userInfo = channelRepository.findById(channelId).orElseThrow(()-> new ResourceNotFoundException("채널검색실패")).getUser();
        List<Follow> followers = followRepository.findByUser(userInfo);
        for (Follow follow : followers) {
            User user = follow.getUser();
            FollowInfoDto.UserFollowInfoDto dto = FollowInfoDto.UserFollowInfoDto.builder()
                    .userId(user.getId())
                    .profile(user.getProfileImg())
                    .nickname(user.getNickName())
                    .build();
            followerDtos.add(dto);
        }
        return followerDtos;
    }
}
