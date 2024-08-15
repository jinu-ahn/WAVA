// src/main/java/com/worq/worcation/domain/worcation/dto/WorcationRequestDto.java
package com.wava.worcation.domain.worcation.dto;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WorcationRequestDto {
    private Date start;
    private Date end;
    private String sido;
    private String sigungu;
    private String job;
    private String type;
}
