package com.wava.worcation.domain.plan.domain;

import com.wava.worcation.domain.worcation.domain.Worcation;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "task", schema = "wava")
public class Plan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "task_id", nullable = false)
    private Long id;

    @Size(max = 100)
    @NotNull
    @Column(name = "task_content", nullable = false, length = 100)
    private String taskContent;

    @NotNull
    @Column(name = "task_start_time", nullable = false)
    private String taskStartTime;

    @NotNull
    @Column(name = "task_end_time", nullable = false)
    private String taskEndTime;

    @Builder.Default
    @NotNull
    @Column(name = "task_is_finish", nullable = false)
    private Boolean taskIsFinish = false;

    @Lob
    @Column(name = "task_important")
    private String taskImportant;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "task_type", nullable = false)
    private PlanType taskType;

    @Size(max = 100)
    @NotNull
    @Column(name = "task_title", nullable = false, length = 100)
    private String taskTitle;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "task_worcation_id", nullable = false)
    private Worcation worcation;

}
