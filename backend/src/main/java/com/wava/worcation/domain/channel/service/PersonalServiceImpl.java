package com.wava.worcation.domain.channel.service;

import com.wava.worcation.common.exception.CustomException;
import com.wava.worcation.common.response.ErrorCode;
import com.wava.worcation.common.s3.service.S3ImageUpLoadService;
import com.wava.worcation.domain.channel.domain.Channel;
import com.wava.worcation.domain.channel.domain.Feed;
import com.wava.worcation.domain.channel.dto.info.DescriptionRequestDto;
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
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;


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
    private final FollowRepository followRepository;
    private final S3ImageUpLoadService s3ImageUpLoadService;

    @Override
    public PersonalResponseDto channelInfo(String nickName,User user){

        Long userId = userRepository.findByNickName(nickName).getId();
        Channel channel = channelRepository.findChannelByUserId(userId);
        int feedcount = infoService.feedCount(userId);

        return PersonalResponseDto.builder()
                .id(channel.getId())
                .userId(userId)
                .nickName(nickName)
                .sido(channel.getChannelSido())
                .sigungu(channel.getChannelSigungu())
                .description(channel.getChannelDescription())
                .profileImage(userRepository.findById(userId).orElseThrow(()-> new CustomException(ErrorCode.USER_NOT_FOUND)).getProfileImg())
                .follow(followService.getFollowings(nickName,user).getUserList().size())
                .follower(followService.getFollowers(nickName,user).getUserList().size())
                .feedCount(feedcount)
                .isFollowing(followRepository.existsByChannelAndUser(channel,user))
                .build();
    }

    @Override
    public Page<FeedSortResponseDto> personalFeed(int pages, String nickName, User user) {
        Pageable pageable = PageRequest.of(pages, 20,Sort.by(Sort.Direction.DESC, "createdAt"));
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

    @Override
    public String changeProfile(MultipartFile file, User user) {
        try {
            String imageUrl = s3ImageUpLoadService.uploadImage(file);
            user.updateProfileImg(imageUrl);
            userRepository.save(user);
            return imageUrl;
        }
        catch (IOException e) {
            throw new CustomException(ErrorCode.IOEXCEPTION);
        }
    }

    @Override
    public String changeDescription(DescriptionRequestDto description, User user) {

        Channel channel = channelRepository.findByUser(user).orElseThrow(()->new CustomException(ErrorCode.CHANNEL_NOT_FOUND));
        channel.updateDescription(description.getDescription());
        return description.getDescription();
    }
}
