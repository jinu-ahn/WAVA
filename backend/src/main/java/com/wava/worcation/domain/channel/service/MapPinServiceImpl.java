package com.wava.worcation.domain.channel.service;

import com.wava.worcation.common.exception.CustomException;
import com.wava.worcation.common.response.ApiResponse;
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
import com.wava.worcation.domain.user.dto.response.GroupUserResponseDto;
import com.wava.worcation.domain.user.dto.response.UserResponseDto;
import com.wava.worcation.domain.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;;
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
        List<GroupUserResponseDto> groupUserList = mapPinRequestDto.getUser()
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
                    return GroupUserResponseDto.builder()
                            .userId(foundUser.getId())
                            .nickName(foundUser.getNickName())
                            .profile(foundUser.getProfileImg())
                            .job(foundUser.getWorcation().getJob())
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
                .user(groupUserList)
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

        List<GroupUserResponseDto> groupUserList = mapPinRequestDto.getUser()
                .stream()
                .map(user -> {
                    User newUser = userRepository.findById(user.getUserId()).orElseThrow(
                            () -> new CustomException(ErrorCode.USER_NOT_FOUND)
                    );
                    companionRepository.save(Companion.builder()
                            .mapPin(mapPin)
                            .user(newUser)
                            .build());
                    return GroupUserResponseDto.builder()
                            .userId(newUser.getId())
                            .nickName(newUser.getNickName())
                            .profile(newUser.getProfileImg())
                            .job(newUser.getWorcation().getJob())
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
                .user(groupUserList)
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

    /**
     * @ 작성자   : 안진우
     * @ 작성일   : 2024-08-10
     * @ 설명     : 채널에 등록된 핀 리스트 가져오기
     * @param channelId 채널 식별 아이디
     * @return 채널 핀 리스트
     * @status 성공 : 200, 실패 : 403, 404
     */
    @Override
    @Transactional
    public List<MapPinResponseDto> getChannelPins(Long channelId) {
        Channel channel = channelRepository.findById(channelId).orElseThrow(
                () -> new CustomException(ErrorCode.CHANNEL_NOT_FOUND)
        );

        List<MapPin> mapPinList = mapPinRepository.findByChannelId(channelId);


        List<MapPinResponseDto> mapPinResponseList = mapPinList.stream()
                .map(pins ->{
                    List<GroupUserResponseDto> groupUserList = companionRepository.findByMapPinId(pins.getId()).stream()
                            .map(user ->
                                    GroupUserResponseDto.builder()
                                            .userId(user.getUser().getId())
                                            .nickName(user.getUser().getNickName())
                                            .profile(user.getUser().getProfileImg())
                                            .job(user.getUser().getWorcation().getJob())
                                            .build()
                            ).collect(Collectors.toList());

                    return MapPinResponseDto.builder()
                            .channelId(channel.getId())
                            .pinId(pins.getId())
                            .lat(pins.getLat())
                            .lng(pins.getLng())
                            .placeName(pins.getPlaceName())
                            .pinOrder(pins.getPinOrder())
                            .info(pins.getInfo())
                            .user(groupUserList)
                            .build();
                }).toList();

        return mapPinResponseList;
    }
}
