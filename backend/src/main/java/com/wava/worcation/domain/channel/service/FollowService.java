package com.wava.worcation.domain.channel.service;

import com.wava.worcation.domain.channel.dto.info.FollowInfoDto;
import com.wava.worcation.domain.channel.dto.info.FollowRequestDto;
import com.wava.worcation.domain.channel.dto.info.FollowResponseDto;
import com.wava.worcation.domain.user.domain.User;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

public interface FollowService {
    FollowResponseDto follow(String nickname, User user);

    FollowInfoDto getFollowers(String usernickname, User user);

    FollowInfoDto getFollowings(String usernickname, User user);

    void unFollow(String nickname, User user);
}
