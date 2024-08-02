package com.worq.worcation.domain.channel.service;

import com.worq.worcation.domain.channel.domain.Follow;
import com.worq.worcation.domain.channel.repository.ChannelRepository;
import com.worq.worcation.domain.channel.repository.FollowRepository;
import com.worq.worcation.domain.user.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class FollowServiceImpl implements FollowService{

    FollowRepository followRepository;
    ChannelRepository channelRepository;
    UserRepository userRepository;

    @Override
    public Map<String, Object> follow(Long channelId, Long userId) {
        Map<String, Object> map = new HashMap<String, Object>();

        Follow follow = Follow.builder()
                .user(userRepository.findById(userId).get())
                .channel(channelRepository.findById(channelId).get())
                .build();
        followRepository.save(follow);

        int followNum = followRepository.findByUser(userRepository.findById(userId).get()).size();
        int followerNum = followRepository.findByChannel(channelRepository.findById(channelId).get()).size();

        map.put("follow", followNum);
        map.put("folllower", followerNum);

        return map;
    }
}
