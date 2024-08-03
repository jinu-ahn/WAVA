package com.worq.worcation.domain.channel.service;

import com.worq.worcation.domain.channel.domain.*;
import com.worq.worcation.domain.channel.dto.info.CommentResponseDto;
import com.worq.worcation.domain.channel.dto.info.FeedRequestDto;
import com.worq.worcation.domain.channel.dto.info.FeedResponseDto;
import com.worq.worcation.domain.channel.dto.info.ImageResponseDto;
import com.worq.worcation.domain.channel.repository.*;
import com.worq.worcation.domain.user.domain.User;
import com.worq.worcation.domain.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.*;

@Service
@Transactional
@AllArgsConstructor
public class InfoServiceImpl implements InfoService {

    private final FeedCommentRepository feedCommentRepository;
    private final UserRepository userRepository;
    private final FeedReository feedReository;
    private final ChannelRepository channelRepository;
    private final ImageRepository imageRepository;
    private final LikeRepository likeRepository;

    @Override
    public Void CreateFeed(FeedRequestDto requestDto, List<String> imgUrls) {
        Channel channel = channelRepository.findById(requestDto.getChannelId()).get();
        Feed feed = Feed.builder()
                .heart(0)
                .content(requestDto.getContent())
                .channel(channel)
                .createdAt(Instant.now())
                .build();
        feedReository.save(feed);

        for (String imgUrl : imgUrls){
            Image image = Image.builder()
                    .imageUrl(imgUrl)
                    .feed(feed)
                    .build();

            imageRepository.save(image);
        }
        return null;
    }

    @Override
    public Map<String, Object> createComment(Long userid, Long feedid, String commentContext) {

        Optional<Feed> feedOp = feedReository.findById(feedid);
        Optional<User> userOp = userRepository.findById(userid);

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
        response.put("feedId", feedid);
        response.put("commentContext", commentContext);
        response.put("userid", userid);

        return response;
    }
        return null;
    }

    @Override
    public FeedResponseDto viewFeed(Long feedid, Long userid) {
        Optional<Feed> feedOp = feedReository.findById(feedid);

        if (feedOp.isPresent()) {
            Feed feed = feedOp.get();

            List<FeedComment> feedComments = feedCommentRepository.findByFeedId(feedid);
            List<CommentResponseDto> commentResponseDtos = new ArrayList<>();
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

            List<Image> images = imageRepository.findByFeed(feed);
            List<ImageResponseDto> imageResponseDtos = new ArrayList<>();
            for(Image image : images){

                ImageResponseDto imageDtos = ImageResponseDto.builder()
                        .imageName(image.getImageName())
                        .imageUrl(image.getImageUrl())
                        .build();
                imageResponseDtos.add(imageDtos);
            }

            FeedResponseDto feedResponseDto = FeedResponseDto.builder()
                    .content(feed.getContent())
                    .heart(feed.getHeart())
                    .id(feed.getId())
                    .commentList(commentResponseDtos)
                    .imageList(imageResponseDtos)
                    .build(); // 체이닝을 수정하여 빌더 패턴이 올바르게 동작하도록 수정

            return feedResponseDto;
        }
        return null;
    }

    @Override
    public void likeAdd(Long feedId, Long userId) {
        Like like = Like.builder()
                .user(userRepository.findById(userId).get())
                .channelInfo(feedReository.findById(feedId).get())
                .build();
        likeRepository.save(like);
    }

    @Override
    public void likeDistract(Long feedId, Long userId) {
        Optional<Like> likeOptional = likeRepository.findByUserIdAndFeedId(userId, feedId);
        likeOptional.ifPresent(likeRepository::delete);
    }

    @Override
    public int feedCount(Long userId){
        return channelRepository.findAllById(userId).size();
    }

}
