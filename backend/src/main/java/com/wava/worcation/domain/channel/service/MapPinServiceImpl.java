package com.wava.worcation.domain.channel.service;

import com.wava.worcation.common.exception.CustomException;
import com.wava.worcation.common.response.ErrorCode;
import com.wava.worcation.domain.channel.domain.Channel;
import com.wava.worcation.domain.channel.domain.Companion;
import com.wava.worcation.domain.channel.domain.MapPin;
import com.wava.worcation.domain.channel.dto.request.MapPinRequestDto;
import com.wava.worcation.domain.channel.dto.response.MapPinResponseDto;
import com.wava.worcation.domain.channel.repository.ChannelRepository;
import com.wava.worcation.domain.channel.repository.CompanionRepository;
import com.wava.worcation.domain.channel.repository.MapPinRepository;
import com.wava.worcation.domain.user.domain.User;
import com.wava.worcation.domain.user.dto.response.UserResponseDto;
import com.wava.worcation.domain.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class MapPinServiceImpl implements MapPinService {
    private final ChannelRepository channelRepository;
    private final MapPinRepository mapPinRepository;
    private final UserRepository userRepository;
    private final CompanionRepository companionRepository;

    /**
     * @ 작성자   : 안진우
     * @ 작성일   : 2024-08-09
     * @ 설명     : 공유 지도 핀 생성
     * @param mapPinRequestDto 지도에 생성할 마커 데이터
     * @return 생성한 핀 정보
     * @status 성공 : 201, 실패 : 404, 409
     */
    @Override
    @Transactional(rollbackOn = Exception.class)
    public MapPinResponseDto createPin(final MapPinRequestDto mapPinRequestDto) {
        Channel channel = validateChannel(mapPinRequestDto.getChannelId());
        isPinOrder(mapPinRequestDto.getChannelId(), mapPinRequestDto.getPinOrder());
        MapPin mapPin = mapPinRepository.save(MapPin.builder()
                .channel(channel)
                .lat(mapPinRequestDto.getLat())
                .lng(mapPinRequestDto.getLng())
                .placeName(mapPinRequestDto.getPlaceName())
                .info(mapPinRequestDto.getInfo())
                .pinOrder(mapPinRequestDto.getPinOrder())
                .build());
        List<UserResponseDto> userResponseList = mapPinRequestDto.getUser()
                .stream()
                .map(user -> {
                    User foundUser = userRepository.findById(user.getUserId()).orElseThrow(
                            () -> new CustomException(ErrorCode.USER_NOT_FOUND)
                    );
                    Companion companion = Companion.builder()
                            .user(foundUser)
                            .mapPin(mapPin)
                            .build();
                    companionRepository.save(companion);
                    return UserResponseDto.builder()
                            .id(foundUser.getId())
                            .email(foundUser.getEmail())
                            .phone(foundUser.getPhone())
                            .nickName(foundUser.getNickName())
                            .sido(foundUser.getSido())
                            .sigungu(foundUser.getSigungu())
                            .profile(foundUser.getProfileImg())
                            .build();

                })
                .toList();

        return MapPinResponseDto.builder()
                .pinId(mapPin.getId())
                .channelId(channel.getId())
                .lat(mapPin.getLat())
                .lng(mapPin.getLng())
                .placeName(mapPin.getPlaceName())
                .info(mapPin.getInfo())
                .pinOrder(mapPin.getPinOrder())
                .user(userResponseList)
                .build();
    }

    /**
     * @ 작성자   : 안진우
     * @ 작성일   : 2024-08-09
     * @ 설명     : 공유지도에 마킹되어있는 핀 수정 (동행자, 위치정보)
     * @param pinId 핀 식별 아이디
     * @param mapPinRequestDto 업데이트 할 마커 데이터
     * @return 업데이트한 핀 정보
     * @status 성공 : 200, 실패 : 404
     */
    @Override
    @Transactional(rollbackOn = Exception.class)
    public MapPinResponseDto updatePin(Long pinId, MapPinRequestDto mapPinRequestDto) {
        MapPin mapPin = mapPinRepository.findById(pinId).orElseThrow(
                () -> new CustomException(ErrorCode.NOT_FOUND_MAP_PIN)
        );
        mapPin.update(mapPinRequestDto);
        companionRepository.deleteAllByMapPinId(pinId);

        List<UserResponseDto> userResponseList = mapPinRequestDto.getUser()
                .stream()
                .map(user -> {
                    User newUser = userRepository.findById(user.getUserId()).orElseThrow(
                            () -> new CustomException(ErrorCode.USER_NOT_FOUND)
                    );
                    companionRepository.save(Companion.builder()
                            .mapPin(mapPin)
                            .user(newUser)
                            .build());
                    return UserResponseDto.builder()
                            .id(newUser.getId())
                            .email(newUser.getEmail())
                            .phone(newUser.getPhone())
                            .nickName(newUser.getNickName())
                            .sido(newUser.getSido())
                            .sigungu(newUser.getSigungu())
                            .profile(newUser.getProfileImg())
                            .build();
                })
                .toList();
        return MapPinResponseDto.builder()
                .pinId(mapPin.getId())
                .channelId(mapPin.getChannel().getId())
                .lat(mapPin.getLat())
                .lng(mapPin.getLng())
                .placeName(mapPin.getPlaceName())
                .info(mapPin.getInfo())
                .pinOrder(mapPin.getPinOrder())
                .user(userResponseList)
                .build();
    }

    /**
     * @ 작성자   : 안진우
     * @ 작성일   : 2024-08-09
     * @ 설명     : 공유지도에 마킹된 핀 삭제
     * @param pinId 핀 식별 아이디
     * @return
     * @status 성공 : 200
     */
    @Override
    @Transactional
    public void deletePin(Long pinId) {
        mapPinRepository.findById(pinId).orElseThrow(
                () -> new CustomException(ErrorCode.NOT_FOUND_MAP_PIN)
        );
        mapPinRepository.deleteById(pinId);
    }

    /**
     * @ 작성자   : 안진우
     * @ 작성일   : 2024-08-09
     * @ 설명     : 채널 존재 여부 검증
     * @param channelId 채널 식별 아이디
     * @return 채널 엔티티
     * @status 실패 : 404
     */
    private Channel validateChannel(final Long channelId){
        Channel channel = channelRepository.findById(channelId).orElseThrow(
                () -> new CustomException(ErrorCode.CHANNEL_NOT_FOUND)
        );
        return channel;
    }

    /**
     * @ 작성자   : 안진우
     * @ 작성일   : 2024-08-09
     * @ 설명     : 해당 채널의 핀 순서 중복 검증
     * @param channelId 채널 식별 아이디
     * @param pinId 핀 식별 아이디
     * @return
     * @status 실패 : 409
     */
    private void isPinOrder(final Long channelId, final Long pinId) {
        if(mapPinRepository.existsByPinOrderAndChannelId(pinId,channelId))
            throw new CustomException(ErrorCode.DUPLICATE_PIN_ORDER);
    }

}
