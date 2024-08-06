// src/main/java/com/worq/worcation/domain/worcation/dto/WorcationRequestDto.java
package com.wava.worcation.domain.worcation.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Builder
public class WorcationRequestDto {
    private Date start;
    private Date end;
    private String sido;
    private String sigungu;
    private String job;
    private String type;
}
