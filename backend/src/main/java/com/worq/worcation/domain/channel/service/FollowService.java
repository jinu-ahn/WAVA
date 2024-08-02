package com.worq.worcation.domain.channel.service;

import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public interface FollowService {
    Map<String, Object> follow(Long channelId, Long userId);
}
