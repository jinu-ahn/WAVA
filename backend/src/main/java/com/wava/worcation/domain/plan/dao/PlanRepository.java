package com.wava.worcation.domain.plan.dao;

import com.wava.worcation.domain.plan.domain.Plan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface PlanRepository extends JpaRepository<Plan,Long> {
    List<Plan> findByWorcationId(Long worcationdId);
    List<Plan> findAllByWorcationIdAndTaskStartTimeStartingWith(Long worcationId, String startTime);
}
