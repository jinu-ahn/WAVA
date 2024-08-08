package com.wava.worcation.domain.channel.service;

import com.wava.worcation.common.exception.CustomException;
import com.wava.worcation.common.response.ErrorCode;
import com.wava.worcation.domain.channel.domain.Channel;
import com.wava.worcation.domain.channel.domain.Companion;
import com.wava.worcation.domain.channel.domain.MapPin;
import com.wava.worcation.domain.channel.dto.request.CompanionRequestDto;
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
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class MapPinServiceImpl implements MapPinService {
    private final ChannelRepository channelRepository;
    private final MapPinRepository mapPinRepository;
    private final UserRepository userRepository;
    private final CompanionRepository companionRepository;

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

    @Override
    public void deletePin(Long pinId) {
        mapPinRepository.findById(pinId).orElseThrow(
                () -> new CustomException(ErrorCode.NOT_FOUND_MAP_PIN)
        );
        mapPinRepository.deleteById(pinId);
    }

    private Channel validateChannel(final Long channelId){
        Channel channel = channelRepository.findById(channelId).orElseThrow(
                () -> new CustomException(ErrorCode.CHANNEL_NOT_FOUND)
        );
        return channel;
    }

    private void isPinOrder(final Long channelId, final Long pinId) {
        if(mapPinRepository.existsByPinOrderAndChannelId(pinId,channelId))
            throw new CustomException(ErrorCode.DUPLICATE_PIN_ORDER);
    }

}
