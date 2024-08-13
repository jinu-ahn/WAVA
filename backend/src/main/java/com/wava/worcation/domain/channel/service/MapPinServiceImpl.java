package com.wava.worcation.domain.channel.service;

import com.wava.worcation.common.exception.CustomException;
import com.wava.worcation.common.response.ErrorCode;
import com.wava.worcation.domain.channel.domain.Channel;
import com.wava.worcation.domain.channel.domain.MapPin;
import com.wava.worcation.domain.channel.dto.request.MapPinRequestDto;
import com.wava.worcation.domain.channel.dto.response.MapPinResponseDto;
import com.wava.worcation.domain.channel.repository.ChannelRepository;
import com.wava.worcation.domain.channel.repository.MapPinRepository;
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


    @Override
    @Transactional
    public MapPinResponseDto markerFunction(final MapPinRequestDto mapPinRequestDto) {
        if(mapPinRequestDto.getStatus().equals("ADD"))
            return createMarker(mapPinRequestDto);
        if(mapPinRequestDto.getStatus().equals("MODIFY"))
            return updateMarker(mapPinRequestDto);
        if(mapPinRequestDto.getStatus().equals("DELETE"))
            return deleteMarker(mapPinRequestDto.getPinId(), mapPinRequestDto.getStatus());

        throw new CustomException(ErrorCode.NOT_FOUND_MARKER);
    }


    /**
     * @ 작성자   : 안진우
     * @ 작성일   : 2024-08-09
     * @ 설명     : 공유 지도 핀 생성
     * @param mapPinRequestDto 지도에 생성할 마커 데이터
     * @return 생성한 핀 정보
     * @status 성공 : 201, 실패 : 404
     */
    public MapPinResponseDto createMarker(final MapPinRequestDto mapPinRequestDto) {
        Channel channel = validateChannel(mapPinRequestDto.getChannelId());
        MapPin mapPin = mapPinRepository.save(MapPin.builder()
                .id(mapPinRequestDto.getPinId())
                .channel(channel)
                .lat(mapPinRequestDto.getLat())
                .lng(mapPinRequestDto.getLng())
                .placeName(mapPinRequestDto.getPlaceName())
                .info(mapPinRequestDto.getInfo())
                .build());

        return MapPinResponseDto.builder()
                .pinId(mapPin.getId())
                .channelId(channel.getId())
                .lat(mapPin.getLat())
                .lng(mapPin.getLng())
                .placeName(mapPin.getPlaceName())
                .info(mapPin.getInfo())
                .status(mapPinRequestDto.getStatus())
                .build();
    }

    /**
     * @ 작성자   : 안진우
     * @ 작성일   : 2024-08-09
     * @ 설명     : 공유지도에 마킹되어있는 핀 수정 (동행자, 위치정보)
     * @param mapPinRequestDto 업데이트 할 마커 데이터
     * @return 업데이트한 핀 정보
     * @status 성공 : 200, 실패 : 404
     */
    public MapPinResponseDto updateMarker(MapPinRequestDto mapPinRequestDto) {
        MapPin mapPin = mapPinRepository.findById(mapPinRequestDto.getPinId()).orElseThrow(
                () -> new CustomException(ErrorCode.NOT_FOUND_MARKER)
        );
        mapPin.update(mapPinRequestDto);

        return MapPinResponseDto.builder()
                .pinId(mapPin.getId())
                .channelId(mapPin.getChannel().getId())
                .lat(mapPin.getLat())
                .lng(mapPin.getLng())
                .placeName(mapPin.getPlaceName())
                .info(mapPin.getInfo())
                .status(mapPinRequestDto.getStatus())
                .build();
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
                .map(pins -> MapPinResponseDto.builder()
                            .pinId(pins.getId())
                            .channelId(channel.getId())
                            .lat(pins.getLat())
                            .lng(pins.getLng())
                            .placeName(pins.getPlaceName())
                            .info(pins.getInfo())
                            .build()
                ).toList();

        return mapPinResponseList;
    }
    /**
     * @ 작성자   : 안진우
     * @ 작성일   : 2024-08-09
     * @ 설명     : 공유지도에 마킹된 핀 삭제
     * @param pinId 핀 식별 아이디
     * @return
     * @status 성공 : 200
     */
    public MapPinResponseDto deleteMarker(String pinId, String status) {
        MapPin mapPin = mapPinRepository.findById(pinId).orElseThrow(
                () -> new CustomException(ErrorCode.NOT_FOUND_MARKER)
        );
        mapPinRepository.delete(mapPin);

        return MapPinResponseDto.builder()
                .pinId(mapPin.getId())
                .channelId(mapPin.getChannel().getId())
                .lat(mapPin.getLat())
                .lng(mapPin.getLng())
                .placeName(mapPin.getPlaceName())
                .info(mapPin.getInfo())
                .status(status)
                .build();
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


}
