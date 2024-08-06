package com.wava.worcation.domain.plan.controller;

import com.wava.worcation.common.response.ApiResponse;
import com.wava.worcation.common.response.ErrorCode;
import com.wava.worcation.domain.plan.dto.PlanRequestDto;
import com.wava.worcation.domain.plan.dto.PlanResponseDto;
import com.wava.worcation.domain.plan.service.PlanService;
import com.wava.worcation.domain.user.domain.AuthUser;
import com.wava.worcation.domain.user.domain.User;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/plan")
public class PlanController {
    @Autowired
    private PlanService planService;

    @PostMapping("/create")
    public ResponseEntity<ApiResponse<PlanResponseDto>> createPlan(@RequestBody PlanRequestDto planRequestDto, @AuthUser User user){
        try {
            PlanResponseDto response = planService.createPlan(planRequestDto, user);
            return ResponseEntity.status(HttpStatus.OK).body(ApiResponse.success(response));
        } catch (Exception e) {
            log.info(e.getMessage());
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ApiResponse.error(ErrorCode.SERVER_ERROR));
        }
    }
    @DeleteMapping("/delete/{planId}")
    public ResponseEntity<ApiResponse<String>> deletePlan(@PathVariable Long planId){
        try {
            planService.deletePlan(planId);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(ApiResponse.success("Success"));
        } catch (Exception e) {
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ApiResponse.error(ErrorCode.SERVER_ERROR));
        }
    }
    @GetMapping("/view")
    public ResponseEntity<ApiResponse<List<PlanResponseDto>>> viewPlan(@AuthUser User user){
        try {
            List<PlanResponseDto> response = planService.viewPlan(user);
            return ResponseEntity.status(HttpStatus.OK).body(ApiResponse.success(response));
        } catch (Exception e) {
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ApiResponse.error(ErrorCode.SERVER_ERROR));
        }
    }
    @PatchMapping("/update/{planId}")
    public ResponseEntity<ApiResponse<PlanResponseDto>> updatePlan(@RequestBody PlanRequestDto planRequestDto,@PathVariable Long planId){
        try {
            PlanResponseDto response = planService.updatePlan(planRequestDto,planId);
            return ResponseEntity.status(HttpStatus.OK).body(ApiResponse.success(response));
        } catch (Exception e) {
            return  ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ApiResponse.error(ErrorCode.SERVER_ERROR));
        }
    }
}
