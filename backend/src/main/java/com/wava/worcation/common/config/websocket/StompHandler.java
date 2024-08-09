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
                String token = accessor.getFirstNativeHeader("Authorization"); // 헤더에서 토큰 가져오기
                if(token == null) {
                    throw new CustomException(ErrorCode.AUTHENTICATION_ERROR); // 인증 실패 에러
                }
                tokenProvider.validateToken(token.substring(7)); // 토큰 검증
                break;
            case SUBSCRIBE :
                String destination = accessor.getDestination(); // SUBSCRIBE로 들어온 매핑 주소 추출
                Long channelId = Long.parseLong(destination.substring("/sub/chatroom/".length())); // 채널아이디 추출
                List<ChannelUser> channelUsers = channelUserRepository.findByChannelId(channelId); // 채널에 가입되어있는 유저 리스트
                String userToken = accessor.getFirstNativeHeader("Authorization"); // 헤더에서 토큰 추출

                if(userToken == null && !tokenProvider.validateToken(userToken.substring(7))) { // 토큰 검증
                    throw new CustomException(ErrorCode.UNKNOWN_TOKEN);
                }
                String userEmail = tokenProvider.getAuthentication(userToken.substring(7)).getName(); // 토큰에서 유저 이메일 추출

                boolean isSubscriber = channelUsers.stream() // 이미 가입되어있는 유저인지 확인
                        .anyMatch(channelUser -> channelUser.getUser().getEmail().equals(userEmail));

                if(!isSubscriber && channelUserRepository.countByChannelId(channelId) <= 4) { // 가입되어있지 않고 채널에 여유 자리가 있다면
                    User user = userRepository.findByEmail(userEmail).orElseThrow(
                            () -> new CustomException(ErrorCode.USER_NOT_FOUND)
                    );
                    Channel joinChannel = channelRepository.findById(channelId).orElseThrow(
                            () -> new CustomException(ErrorCode.CHANNEL_NOT_FOUND)
                    );
                    channelUserRepository.save(ChannelUser.builder() // 채널 가입
                            .user(user)
                            .channel(joinChannel)
                            .build());
                }
                break;
        }
        return message;
    }


}