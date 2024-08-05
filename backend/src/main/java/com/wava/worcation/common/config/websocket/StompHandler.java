package com.worq.worcation.common.config.websocket;

import com.worq.worcation.common.jwt.AuthenticationFilter;
import com.worq.worcation.common.jwt.TokenProvider;
import com.worq.worcation.common.response.ApiResponse;
import com.worq.worcation.common.util.RedisUtil;
import com.worq.worcation.domain.channel.domain.Channel;
import com.worq.worcation.domain.channel.domain.ChannelUser;
import com.worq.worcation.domain.channel.repository.ChannelRepository;
import com.worq.worcation.domain.channel.repository.ChannelUserRepository;
import com.worq.worcation.domain.chat.dto.response.ChatResponseDto;
import com.worq.worcation.domain.chat.service.ChatService;
import com.worq.worcation.domain.user.domain.User;
import com.worq.worcation.domain.user.repository.UserRepository;
import io.jsonwebtoken.JwtException;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.MessageDeliveryException;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.swing.plaf.basic.BasicInternalFrameTitlePane;
import java.nio.file.attribute.UserPrincipalNotFoundException;
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
                    throw new JwtException("토큰이 유효하지 않습니다.");
                }
                String userEmail = tokenProvider.getAuthentication(userToken.substring(7)).getName();

                boolean isSubscriber = channelUsers.stream()
                        .anyMatch(channelUser -> channelUser.getUser().getEmail().equals(userEmail));

                if(!isSubscriber && channelUserRepository.countChannelId(roomId) <= 4) {
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