package com.wava.worcation.domain.plan.service;

import com.wava.worcation.domain.plan.dao.PlanRepository;
import com.wava.worcation.domain.plan.domain.Plan;
import com.wava.worcation.domain.plan.dto.PlanRequestDto;
import com.wava.worcation.domain.plan.dto.PlanResponseDto;
import com.wava.worcation.domain.user.domain.User;
import com.wava.worcation.domain.user.repository.UserRepository;
import com.wava.worcation.domain.worcation.dao.WorcationRepository;
import com.wava.worcation.domain.worcation.domain.Worcation;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authorization.method.AuthorizeReturnObject;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PlanServiceImpl implements PlanService {

    @Autowired
    private PlanRepository planRepository;
    @Autowired
    private WorcationRepository worcationRepository;
    @Autowired
    private UserRepository userRepository;


    @Override
    public PlanResponseDto createPlan(PlanRequestDto planRequestDto, HttpServletRequest request) {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        Optional<User> user = userRepository.findByEmail(email);
        Worcation worcation = worcationRepository.findByUserId(user.get().getId());
        Plan plan = Plan.builder()
                .taskTitle(planRequestDto.getTitle())
                .taskContent(planRequestDto.getContent())
                .taskStartTime(planRequestDto.getStart())
                .taskEndTime(planRequestDto.getEnd())
                .taskImportant(planRequestDto.getImportant())
                .taskType(planRequestDto.getType())
                .taskIsFinish(false)
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
                .className(planRequestDto.getClassName())
                .isFinish(savedPlan.getTaskIsFinish())
                .build();
    }

    @Override
    public void deletePlan(Long planId) {
        planRepository.deleteById(planId);
    }

    @Override
    public List<PlanResponseDto> viewPlan(User user) {
        Worcation worcation = worcationRepository.findByUserId(user.getId());
        List<Plan> plans = planRepository.findByWorcationId(worcation.getId());
        return plans.stream()
                .map(plan -> PlanResponseDto.builder()
                        .id(plan.getId())
                        .title(plan.getTaskTitle())
                        .content(plan.getTaskContent())
                        .start(plan.getTaskStartTime())
                        .end(plan.getTaskEndTime())
                        .important(plan.getTaskImportant())
                        .type(plan.getTaskType())
                        .build())
                .collect(Collectors.toList());
    }



    @Override
    public PlanResponseDto updatePlan(PlanRequestDto planRequestDto, Long planId) {
        Plan existingPlan = planRepository.findById(planId)
                .orElseThrow(() -> new EntityNotFoundException("Plan not found"));

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
                .isFinish(updatedPlan.getTaskIsFinish())
                .build();
    }
}