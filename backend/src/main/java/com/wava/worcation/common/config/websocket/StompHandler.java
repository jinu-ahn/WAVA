package com.wava.worcation.common.config.websocket;

import com.wava.worcation.common.exception.CustomException;
import com.wava.worcation.common.jwt.TokenProvider;
import com.wava.worcation.common.response.ErrorCode;
import com.wava.worcation.domain.channel.domain.Channel;
import com.wava.worcation.domain.channel.domain.ChannelUser;
import com.wava.worcation.domain.channel.repository.ChannelRepository;
import com.wava.worcation.domain.channel.repository.ChannelUserRepository;
import com.wava.worcation.domain.user.domain.User;
import com.wava.worcation.domain.user.repository.UserRepository;
import io.jsonwebtoken.JwtException;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Component
@Slf4j
public class StompHandler implements ChannelInterceptor {
    private final TokenProvider tokenProvider;
    private final ChannelUserRepository channelUserRepository;
    private final ChannelRepository channelRepository;
    private final UserRepository userRepository;

    @SneakyThrows
    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        switch (accessor.getCommand()) {
            case CONNECT:
                String token = accessor.getFirstNativeHeader("Authorization");
                if(token == null) {
                    throw new IllegalArgumentException("Authorization header is required");
                }
                tokenProvider.validateToken(token.substring(7));
                break;
            case SUBSCRIBE :
                String destination = accessor.getDestination();
                Long roomId = Long.parseLong(destination.substring("/sub/chatroom/".length()));
                List<ChannelUser> channelUsers = channelUserRepository.findByChannelId(roomId);
                String userToken = accessor.getFirstNativeHeader("Authorization");

                if(userToken == null && !tokenProvider.validateToken(userToken.substring(7))) {
                    throw new CustomException(ErrorCode.UNKNOWN_TOKEN);
                }
                String userEmail = tokenProvider.getAuthentication(userToken.substring(7)).getName();

                boolean isSubscriber = channelUsers.stream()
                        .anyMatch(channelUser -> channelUser.getUser().getEmail().equals(userEmail));

                if(!isSubscriber && channelUserRepository.countByChannelId(roomId) <= 4) {
                    Optional<User> userOpt = userRepository.findByEmail(userEmail);
                    Optional<Channel> channelOpt = channelRepository.findById(roomId);
                    channelUserRepository.save(ChannelUser.builder()
                            .user(userOpt.get())
                            .channel(channelOpt.get())
                            .build());
                }
                break;
        }
        return message;
    }


}