package com.wava.worcation.domain.plan.dto;

import com.wava.worcation.domain.plan.domain.PlanType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PlanRequestDto {
    private String title;
    private String content;
    private String start; // JSON에서는 datetime 문자열로 전달되므로 String으로 정의
    private String end; // JSON에서는 datetime 문자열로 전달되므로 String으로 정의
    private String important;
    private PlanType type; // ENUM 타입 정의 필요
    private String className; // DTO만 사용
    private Boolean isFinish;

}
