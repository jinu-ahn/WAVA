package com.wava.worcation.domain.worcation.application;

import com.wava.worcation.domain.user.domain.User;
import com.wava.worcation.domain.worcation.dao.WorcationRepository;
import com.wava.worcation.domain.worcation.domain.Worcation;
import com.wava.worcation.domain.worcation.dto.WorcationRequestDto;
import com.wava.worcation.domain.worcation.dto.WorcationResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class WorcationServiceImpl implements WorcationService {

    @Autowired
    private WorcationRepository worcationRepository;

    @Override
    public ResponseEntity<?> createWorcation(WorcationRequestDto worcationRequestDto, User user) {
        log.info("들어갔나");
        if (!worcationRepository.existsByUserId(user.getId())){
            Worcation worcation = Worcation.builder()
                    .user(user)
                    .start(worcationRequestDto.getStart())
                    .end(worcationRequestDto.getEnd())
                    .sido(worcationRequestDto.getSido())
                    .sigungu(worcationRequestDto.getSigungu())
                    .job(worcationRequestDto.getJob())
                    .type(worcationRequestDto.getType())
                    .build();
            Worcation savedWorcation = worcationRepository.save(worcation);
            return ResponseEntity.ok().body(new WorcationResponseDto(savedWorcation));
        }
        else {return ResponseEntity.status(HttpStatus.CONFLICT).body("중복");
        }
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
