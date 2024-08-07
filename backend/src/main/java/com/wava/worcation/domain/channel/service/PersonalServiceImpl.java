package com.wava.worcation.domain.channel.service;

import com.wava.worcation.common.exception.ResourceNotFoundException;
import com.wava.worcation.common.response.ApiResponse;
import com.wava.worcation.domain.channel.domain.Channel;
import com.wava.worcation.domain.channel.domain.Feed;
import com.wava.worcation.domain.channel.dto.info.FeedSortResponseDto;
import com.wava.worcation.domain.channel.dto.info.PersonalResponseDto;
import com.wava.worcation.domain.channel.repository.*;
import com.wava.worcation.domain.user.domain.User;
import com.wava.worcation.domain.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


@Transactional
@Service
@RequiredArgsConstructor
@Slf4j
public class PersonalServiceImpl implements PersonalService {

    private final ChannelRepository channelRepository;
    private final UserRepository userRepository;
    private final FeedRepository feedRepository;
    private final FeedCommentRepository commentRepository;
    private final LikeRepository likeRepository;
    private final ImageRepository imageRepository;

    private final com.wava.worcation.domain.channel.service.FollowService followService;
    private final com.wava.worcation.domain.channel.service.InfoService infoService;

    @Override
    public ResponseEntity<ApiResponse<PersonalResponseDto>> ChannelInfo(String nickName){
        Long userId = userRepository.findByNickName(nickName).getId();
        Channel channel = channelRepository.findChannelByUserId(userId);
        int feedcount = infoService.feedCount(userId);

        ResponseEntity<ApiResponse<PersonalResponseDto>> response = ResponseEntity.status(HttpStatus.OK).body(ApiResponse.success(PersonalResponseDto.builder()
                .id(channel.getId())
                .userId(userId)
                .nickName(nickName)
                .sido(channel.getChannelSido())
                .sigungu(channel.getChannelSigungu())
                .description(channel.getChannelDescription())
                .profileImage(userRepository.findById(userId).orElseThrow(ResourceNotFoundException::new).getProfileImg())
                .follow(followService.getFollowings(channel.getId()).size())
                .follower(followService.getFollowers(channel.getId()).size())
                .feedCount(feedcount)
                .build()
        ));

        return response;
    }

    @Override
    public Page<FeedSortResponseDto> personalFeed(int pages, String nickName, User user) {
        Pageable pageable = PageRequest.of(pages, 20);
        Channel channel = channelRepository.findChannelByUserId(userRepository.findByNickName(nickName).getId());
        Page<Feed> feedPage = feedRepository.findByChannel(channel,pageable);
        return feedPage.map(feed -> {
            String imageUrl = imageRepository.findFirstByFeedOrderByFeed(feed).getImageUrl();
            int commentsCount = commentRepository.findAllByFeedId(feed.getId()).size();
            boolean isLiked = likeRepository.existsByUserAndFeed(user, feed);
            int likedCount = likeRepository.countByFeed(feed);

            return FeedSortResponseDto.builder()
                    .id(feed.getId())
                    .userid(userRepository.findByNickName(nickName).getId())
                    .likes(feed.getHeart())
                    .imageUrl(imageUrl)
                    .commentsCount(commentsCount)
                    .isLiked(isLiked)
                    .likedCount(likedCount)
                    .build();
        });
    }
}
