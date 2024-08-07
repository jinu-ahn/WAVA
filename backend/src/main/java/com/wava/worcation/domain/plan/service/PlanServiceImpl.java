package com.wava.worcation.domain.plan.service;

import com.wava.worcation.common.exception.CustomException;
import com.wava.worcation.common.response.ErrorCode;
import com.wava.worcation.domain.plan.dao.PlanRepository;
import com.wava.worcation.domain.plan.domain.Plan;
import com.wava.worcation.domain.plan.dto.PlanRequestDto;
import com.wava.worcation.domain.plan.dto.PlanResponseDto;
import com.wava.worcation.domain.user.domain.User;
import com.wava.worcation.domain.worcation.dao.WorcationRepository;
import com.wava.worcation.domain.worcation.domain.Worcation;
import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class PlanServiceImpl implements PlanService {

    @Autowired
    private PlanRepository planRepository;
    @Autowired
    private WorcationRepository worcationRepository;


    @Override
    public PlanResponseDto createPlan(PlanRequestDto planRequestDto, User user) {
        Worcation worcation = worcationRepository.findByUserId(user.getId());
        Plan plan = Plan.builder()
                .taskTitle(planRequestDto.getTitle())
                .taskContent(planRequestDto.getContent())
                .taskStartTime(planRequestDto.getStart())
                .taskEndTime(planRequestDto.getEnd())
                .taskImportant(planRequestDto.getImportant())
                .taskType(planRequestDto.getType())
                .taskIsFinish(planRequestDto.getIsFinish())
                .worcation(worcation)
                .build();

        Plan savedPlan = planRepository.save(plan);

        return PlanResponseDto.builder()
                .id(savedPlan.getId())
                .title(savedPlan.getTaskTitle())
                .content(savedPlan.getTaskContent())
                .start(savedPlan.getTaskStartTime())
                .end(savedPlan.getTaskEndTime())
                .important(savedPlan.getTaskImportant())
                .type(savedPlan.getTaskType())
                .className(savedPlan.getTaskImportant())
                .isFinish(savedPlan.getTaskIsFinish())
                .build();
    }

    @Override
    public void deletePlan(Long planId) {
        planRepository.deleteById(planId);
    }

    @Override
    public List<PlanResponseDto> viewPlan(User user) {
        log.info("유저 아이디{}",user.getId());
        Worcation worcation = worcationRepository.findByUserId(user.getId());
        log.info(worcation.toString());
        List<Plan> plans = planRepository.findByWorcationId(worcation.getId());
        log.info("리스트{}",plans.toString());
        return plans.stream()
                .map(plan -> PlanResponseDto.builder()
                        .id(plan.getId())
                        .title(plan.getTaskTitle())
                        .content(plan.getTaskContent())
                        .start(plan.getTaskStartTime())
                        .end(plan.getTaskEndTime())
                        .important(plan.getTaskImportant())
                        .type(plan.getTaskType())
                        .className(plan.getTaskImportant())
                        .isFinish(plan.getTaskIsFinish())
                        .build())
                .collect(Collectors.toList());
    }



    @Override
    public PlanResponseDto updatePlan(PlanRequestDto planRequestDto, Long planId) {
        Plan existingPlan = planRepository.findById(planId)
                .orElseThrow(() -> new CustomException(ErrorCode.PLAN_NOT_FOUND));

        Plan updatedPlan = Plan.builder()
                .id(existingPlan.getId()) // 기존 ID 유지
                .taskTitle(planRequestDto.getTitle())
                .taskContent(planRequestDto.getContent())
                .taskStartTime(planRequestDto.getStart())
                .taskEndTime(planRequestDto.getEnd())
                .taskImportant(planRequestDto.getImportant())
                .taskType(planRequestDto.getType())
                .taskIsFinish(planRequestDto.getIsFinish())
                .worcation(existingPlan.getWorcation()) // 기존 대시보드 정보 유지
                .build();

        updatedPlan = planRepository.save(updatedPlan);

        return PlanResponseDto.builder()
                .id(updatedPlan.getId())
                .title(updatedPlan.getTaskTitle())
                .content(updatedPlan.getTaskContent())
                .start(updatedPlan.getTaskStartTime())
                .end(updatedPlan.getTaskEndTime())
                .important(updatedPlan.getTaskImportant())
                .type(updatedPlan.getTaskType())
                .className(updatedPlan.getTaskImportant())
                .isFinish(updatedPlan.getTaskIsFinish())
                .build();
    }
}