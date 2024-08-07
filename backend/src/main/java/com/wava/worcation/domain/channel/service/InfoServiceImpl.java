package com.wava.worcation.domain.channel.service;

import com.wava.worcation.common.exception.ResourceNotFoundException;
import com.wava.worcation.domain.channel.domain.*;
import com.wava.worcation.domain.channel.dto.info.CommentResponseDto;
import com.wava.worcation.domain.channel.dto.info.FeedResponseDto;
import com.wava.worcation.domain.channel.dto.info.FeedSortResponseDto;
import com.wava.worcation.domain.channel.dto.info.ImageResponseDto;
import com.wava.worcation.domain.channel.repository.ChannelRepository;
import com.wava.worcation.domain.channel.repository.LikeRepository;
import com.wava.worcation.domain.user.domain.User;
import com.wava.worcation.domain.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.*;
import java.util.Map;

@Slf4j
@Service
@Transactional
@AllArgsConstructor
public class InfoServiceImpl implements com.wava.worcation.domain.channel.service.InfoService {

    private final com.wava.worcation.domain.channel.repository.FeedCommentRepository feedCommentRepository;
    private final UserRepository userRepository;
    private final ChannelRepository channelRepository;
    private final LikeRepository likeRepository;
    private final com.wava.worcation.domain.channel.repository.FeedReository feedReository;
    private final com.wava.worcation.domain.channel.repository.ImageRepository imageRepository;

    @Override
    public void CreateFeed(String content, String sido, String sigungu, List<String> imgUrls, User user) {
        Channel channel = channelRepository.findChannelByUserId(user.getId());
        com.wava.worcation.domain.channel.domain.Feed feed = com.wava.worcation.domain.channel.domain.Feed.builder()
                .heart(0)
                .content(content)
                .channel(channel)
                .createdAt(Instant.now())
                .build();
        feedReository.save(feed);

        for (String imgUrl : imgUrls){
            com.wava.worcation.domain.channel.domain.Image image = com.wava.worcation.domain.channel.domain.Image.builder()
                    .imageUrl(imgUrl)
                    .feed(feed)
                    .build();

            imageRepository.save(image);
        }
    }

    @Override
    public Map<String, Object> createComment(Long userId, Long feedId, String commentContext) {

        Optional<Feed> feedOp = feedReository.findById(feedId);
        Optional<User> userOp = userRepository.findById(userId);
        if (feedOp.isPresent() && userOp.isPresent()) {
            Feed feed = feedOp.get();
            User user = userOp.get();


        FeedComment feedComment = FeedComment.builder()
                .feed(feed)
                .user(user)
                .comment(commentContext)
                .build();

        feedCommentRepository.save(feedComment);

        Map<String, Object> response = new HashMap<>();

        response.put("commentId", feedComment.getId());
        response.put("feedId", feedId);
        response.put("commentContext", commentContext);
        response.put("userid", userId);

        return response;
    }
        return null;
    }

    @Override
    public FeedResponseDto viewFeed(Long feedId, User user) {
        Optional<com.wava.worcation.domain.channel.domain.Feed> feedOp = feedReository.findById(feedId);
        if (feedOp.isPresent()) {
            Feed feed = feedOp.get();
            List<FeedComment> feedComments = feedCommentRepository.findAllByFeedId(feedId);
            List<CommentResponseDto> commentResponseDtos = new ArrayList<>();
            log.info("댓글리스트완료{}", feedComments);
            for (FeedComment feedComment : feedComments) {
                CommentResponseDto comment = CommentResponseDto.builder()
                        .comment(feedComment.getComment())
                        .createdAt(feedComment.getCreatedAt())
                        .id(feedComment.getId())
                        .userid(feedComment.getUser().getId())
                        .feedid(feedComment.getFeed().getId())
                        .build();
                commentResponseDtos.add(comment);
            }
            log.info("댓글입력완료{}", feedOp);
            List<Image> images = imageRepository.findByFeed(feed);
            List<ImageResponseDto> imageResponseDtos = new ArrayList<>();
            log.info("이미지검색완료{}", images);
            boolean islike = likeRepository.existsByUserAndFeed(user,feed);

            for(Image image : images){

                ImageResponseDto imageDtos = ImageResponseDto.builder()
                        .imageName(image.getImageName())
                        .imageUrl(image.getImageUrl())
                        .build();
                imageResponseDtos.add(imageDtos);
            }
            log.info("이미지 배열 완료") ;
            return FeedResponseDto.builder()
                    .content(feed.getContent())
                    .heart(feed.getHeart())
                    .id(feed.getId())
                    .commentList(commentResponseDtos)
                    .imageList(imageResponseDtos)
                    .likedCount(feed.getHeart())
                    .isLiked(islike)
                    .build();

        }
        return null;
    }

    @Override
    public void likeAdd(Long feedId, User user) {
        Like like = Like.builder()
                .user(user)
                .feed(feedReository.findById(feedId).orElseThrow(ResourceNotFoundException::new))
                .build();
        likeRepository.save(like);
    }

    @Override
    public void likeDistract(Long feedId, User user) {
        Optional<com.wava.worcation.domain.channel.domain.Like> likeOptional = likeRepository.findByUserAndFeed(user,feedReository.findById(feedId).orElseThrow(ResourceNotFoundException::new));
        likeOptional.ifPresent(likeRepository::delete);
    }

    @Override
    public FeedSortResponseDto sortFeed(Long feedId, User user) {
        return null;
    }

    @Override
    public int feedCount(Long userId){
        return channelRepository.findAllById(userId).size();
    }

}
