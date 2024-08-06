package com.wava.worcation.domain.channel.service;

import com.wava.worcation.common.exception.ResourceNotFoundException;
import com.wava.worcation.domain.channel.domain.*;
import com.wava.worcation.domain.channel.dto.info.CommentResponseDto;
import com.wava.worcation.domain.channel.dto.info.FeedResponseDto;
import com.wava.worcation.domain.channel.dto.info.ImageResponseDto;
import com.wava.worcation.domain.channel.repository.*;
import com.wava.worcation.domain.user.domain.User;
import com.wava.worcation.domain.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.*;

@Service
@Transactional
@AllArgsConstructor
public class InfoServiceImpl implements com.wava.worcation.domain.channel.service.InfoService {

    private final com.wava.worcation.domain.channel.repository.FeedCommentRepository feedCommentRepository;
    private final UserRepository userRepository;
    private final com.wava.worcation.domain.channel.repository.FeedReository feedReository;
    private final ChannelRepository channelRepository;
    private final com.wava.worcation.domain.channel.repository.ImageRepository imageRepository;
    private final com.wava.worcation.domain.channel.repository.LikeRepository likeRepository;

    @Override
    public Void CreateFeed(String content, String sido, String sigungu, List<String> imgUrls, User user) {
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
        return null;
    }

    @Override
    public Map<String, Object> createComment(Long userid, Long feedid, String commentContext) {

        Optional<com.wava.worcation.domain.channel.domain.Feed> feedOp = feedReository.findById(feedid);
        Optional<User> userOp = userRepository.findById(userid);

        if (feedOp.isPresent() && userOp.isPresent()) {
            com.wava.worcation.domain.channel.domain.Feed feed = feedOp.get();
            User user = userOp.get();


        com.wava.worcation.domain.channel.domain.FeedComment feedComment = com.wava.worcation.domain.channel.domain.FeedComment.builder()
                .feed(feed)
                .user(user)
                .comment(commentContext)
                .build();

        feedCommentRepository.save(feedComment);

        Map<String, Object> response = new HashMap<>();

        response.put("commentId", feedComment.getId());
        response.put("feedId", feedid);
        response.put("commentContext", commentContext);
        response.put("userid", userid);

        return response;
    }
        return null;
    }

    @Override
    public FeedResponseDto viewFeed(Long feedid, Long userid) {
        Optional<com.wava.worcation.domain.channel.domain.Feed> feedOp = feedReository.findById(feedid);

        if (feedOp.isPresent()) {
            com.wava.worcation.domain.channel.domain.Feed feed = feedOp.get();

            List<com.wava.worcation.domain.channel.domain.FeedComment> feedComments = feedCommentRepository.findByFeedId(feedid);
            List<CommentResponseDto> commentResponseDtos = new ArrayList<>();
            for (com.wava.worcation.domain.channel.domain.FeedComment feedComment : feedComments) {
                CommentResponseDto comment = CommentResponseDto.builder()
                        .comment(feedComment.getComment())
                        .createdAt(feedComment.getCreatedAt())
                        .id(feedComment.getId())
                        .userid(feedComment.getUser().getId())
                        .feedid(feedComment.getFeed().getId())
                        .build();
                commentResponseDtos.add(comment);
            }

            List<Image> images = imageRepository.findByFeed(feed);
            List<ImageResponseDto> imageResponseDtos = new ArrayList<>();
            for(Image image : images){

                ImageResponseDto imageDtos = ImageResponseDto.builder()
                        .imageName(image.getImageName())
                        .imageUrl(image.getImageUrl())
                        .build();
                imageResponseDtos.add(imageDtos);
            }

            return FeedResponseDto.builder()
                    .content(feed.getContent())
                    .heart(feed.getHeart())
                    .id(feed.getId())
                    .commentList(commentResponseDtos)
                    .imageList(imageResponseDtos)
                    .build(); // 체이닝을 수정하여 빌더 패턴이 올바르게 동작하도록 수정

        }
        return null;
    }

    @Override
    public void likeAdd(Long feedId, Long userId) {
        com.wava.worcation.domain.channel.domain.Like like = com.wava.worcation.domain.channel.domain.Like.builder()
                .user(userRepository.findById(userId).orElseThrow(ResourceNotFoundException::new))
                .feed(feedReository.findById(feedId).orElseThrow(ResourceNotFoundException::new))
                .build();
        likeRepository.save(like);
    }

    @Override
    public void likeDistract(Long feedId, Long userId) {
        Optional<com.wava.worcation.domain.channel.domain.Like> likeOptional = likeRepository.findByUserIdAndFeed(userId,feedReository.findById(feedId).orElseThrow(ResourceNotFoundException::new));
        likeOptional.ifPresent(likeRepository::delete);
    }

    @Override
    public int feedCount(Long userId){
        return channelRepository.findAllById(userId).size();
    }

}
