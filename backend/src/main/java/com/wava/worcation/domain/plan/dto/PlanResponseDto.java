package com.wava.worcation.domain.plan.dto;
import com.wava.worcation.domain.plan.domain.PlanType;
import com.wava.worcation.domain.plan.domain.PlanImportant;
import com.wava.worcation.domain.plan.domain.PlanType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class PlanResponseDto {

    private Long id;
    private String title;
    private String content;
    private String start;
    private String end;
    private PlanImportant important;
    private PlanType type;
    private PlanImportant className; // DTO만 사용
    private Boolean isFinish;

}
