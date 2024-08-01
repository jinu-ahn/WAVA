package com.worq.worcation.domain.plan.service;

import com.worq.worcation.domain.plan.dao.PlanRepository;
import com.worq.worcation.domain.plan.domain.Plan;
import com.worq.worcation.domain.plan.dto.PlanRequestDto;
import com.worq.worcation.domain.plan.dto.PlanResponseDto;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PlanServiceImpl implements PlanService {

    @Autowired
    private PlanRepository planRepository;

    public List<Plan> getPlansByDashboardid(Long dashboardId) {
        return planRepository.findByDashboard_id(dashboardId);
    }

    @Override
    public PlanResponseDto createPlan(PlanRequestDto planRequestDto) {
        Plan plan = Plan.builder()
                .taskTitle(planRequestDto.getTitle())
                .taskContent(planRequestDto.getContent())
                .taskStartTime(planRequestDto.getStart())
                .taskEndTime(planRequestDto.getEnd())
                .taskImportant(planRequestDto.getImportant())
                .taskType(planRequestDto.getType())
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
                .build();
    }

    @Override
    public void deletePlan(Long planId) {
        planRepository.deleteById(planId);
    }


    @Override
    public List<PlanResponseDto> viewPlan(Long dashboardId) {
        List<Plan> plans = planRepository.findByDashboard_id(dashboardId);
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
                .dashboard(existingPlan.getDashboard()) // 기존 대시보드 정보 유지
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