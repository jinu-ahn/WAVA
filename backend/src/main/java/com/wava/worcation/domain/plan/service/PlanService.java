package com.wava.worcation.domain.plan.service;

import com.wava.worcation.domain.plan.dto.PlanRequestDto;
import com.wava.worcation.domain.plan.dto.PlanResponseDto;
import com.wava.worcation.domain.user.domain.User;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

public interface PlanService {
    PlanResponseDto createPlan(final PlanRequestDto planRequestDto, final HttpServletRequest request);

    void deletePlan( Long planId);

    List<PlanResponseDto> viewPlan(final User user);

    PlanResponseDto updatePlan(PlanRequestDto planRequestDto, Long planId);
}
