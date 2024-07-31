package com.worq.worcation.domain.channel.service;

import com.worq.worcation.domain.channel.domain.Channel;
import com.worq.worcation.domain.channel.domain.Feed;
import com.worq.worcation.domain.channel.domain.FeedComment;
import com.worq.worcation.domain.channel.domain.Image;
import com.worq.worcation.domain.channel.dto.FeedRequestDto;
import com.worq.worcation.domain.channel.repository.ChannelRepository;
import com.worq.worcation.domain.channel.repository.FeedCommentRepository;
import com.worq.worcation.domain.channel.repository.FeedReository;
import com.worq.worcation.domain.user.domain.User;
import com.worq.worcation.domain.user.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@AllArgsConstructor
public class InfoServiceImpl implements InfoService {

    private final FeedCommentRepository feedCommentRepository;
    private final UserRepository userRepository;
    private final FeedReository feedReository;
    private final ChannelRepository channelRepository;

    @Override
    public Void CreateFeed(FeedRequestDto requestDto, List<String> imgUrls) {
        Long feedid = requestDto.getFeedId();
        String sido = requestDto.getSido();
        String gugun = requestDto.getGugun();
        String content = requestDto.getContent();
        Long channelId = requestDto.getChannelId();

        Channel channel = channelRepository.findById(channelId).get();


        Feed feed = Feed.builder()
                .heart(0L)
                .content(content)
                .channel(channel)
                .createdAt(Instant.now())
                .build();

        for (String imgUrl : imgUrls){
            Image image = Image.builder()
                    .imageUrl(imgUrl)
                    .feed(feed)
                    .build();
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
}
