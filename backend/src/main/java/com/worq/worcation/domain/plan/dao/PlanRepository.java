package com.worq.worcation.domain.plan.dao;

import com.worq.worcation.domain.plan.domain.Plan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PlanRepository extends JpaRepository<Plan,Long> {
    List<Plan> findByWorcationId(Long worcationdId);
}
