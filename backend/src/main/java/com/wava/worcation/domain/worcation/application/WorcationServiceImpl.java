package com.wava.worcation.domain.worcation.application;

import com.wava.worcation.domain.worcation.dao.WorcationRepository;
import com.wava.worcation.domain.worcation.domain.Worcation;
import com.wava.worcation.domain.worcation.dto.WorcationRequestDto;
import com.wava.worcation.domain.worcation.dto.WorcationResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WorcationServiceImpl implements WorcationService {

    @Autowired
    private WorcationRepository worcationRepository;

    @Override
    public WorcationResponseDto createWorcation(WorcationRequestDto worcationRequestDto) {
        Worcation worcation = Worcation.builder()
                .start(worcationRequestDto.getStart())
                .end(worcationRequestDto.getEnd())
                .sido(worcationRequestDto.getSido())
                .gugun(worcationRequestDto.getGugun())
                .job(worcationRequestDto.getJob())
                .type(worcationRequestDto.getType())
                .build();

        Worcation savedWorcation = worcationRepository.save(worcation);
        return new WorcationResponseDto(savedWorcation);
    }

    @Override
    public WorcationResponseDto updateWorcation(Long worcationId, WorcationRequestDto worcationRequestDto) { // 수정된 부분
        Worcation worcation = worcationRepository.findById(worcationId)
                .orElseThrow(() -> new RuntimeException("Worcation not found"));

        worcation.Update(worcationRequestDto);

        Worcation updatedWorcation = worcationRepository.save(worcation);
        return new WorcationResponseDto(updatedWorcation);
    }

    @Override
    public void deleteWorcation(Long worcationid) {
        Worcation worcation = worcationRepository.findById(worcationid)
                .orElseThrow(() -> new RuntimeException("Worcation not found"));
        worcationRepository.delete(worcation);
    }
}
