// src/main/java/com/worq/worcation/domain/worcation/dto/WorcationResponseDto.java
package com.wava.worcation.domain.worcation.dto;

import com.wava.worcation.domain.worcation.domain.Worcation;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
public class WorcationResponseDto {
    private Long id;
    private Long userId;
    private Date start;
    private Date end;
    private String sido;
    private String gugun;
    private String job;
    private String type;

    @Builder
    public WorcationResponseDto(Worcation worcation) {
        this.id = worcation.getId();
        this.userId = (worcation.getUser() != null) ? worcation.getUser().getId() : null;
        this.start = worcation.getStart();
        this.end = worcation.getEnd();
        this.sido = worcation.getSido();
        this.gugun = worcation.getGugun();
        this.job = worcation.getJob();
        this.type = worcation.getType();
    }


}
