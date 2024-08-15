    // src/main/java/com/worq/worcation/domain/worcation/domain/Worcation.java
    package com.wava.worcation.domain.worcation.domain;

    import com.wava.worcation.domain.plan.domain.Plan;
    import com.wava.worcation.domain.user.domain.User;
    import com.wava.worcation.domain.worcation.dto.WorcationRequestDto;
    import jakarta.persistence.*;
    import lombok.AllArgsConstructor;
    import lombok.Builder;
    import lombok.Data;
    import lombok.Getter;

    import java.util.Date;
    import java.util.List;

    @Entity
    @Data
    @Builder
    @Getter
    @AllArgsConstructor
    public class Worcation {

        // Getters and Setters
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name="worcation_id")
        private Long id;

        @OneToOne
        @JoinColumn(name = "user_id")
        private User user;
        @Column(name="worcation_start_date")
        private Date start;
        @Column(name="worcation_end_date")
        private Date end;
        @Column(name="worcation_sido")
        private String sido;
        @Column(name="worcation_sigungu")
        private String sigungu;
        @Column(name="worcation_job")
        private String job;
        @Column(name="worcation_type")
        private String type;
        @OneToMany(mappedBy="worcation",fetch = FetchType.EAGER, cascade = CascadeType.ALL)
        private List<Plan> plan;

        public Worcation() {
        }

        public void Update(WorcationRequestDto worcationRequestDto){
            if (worcationRequestDto.getStart() != null) {
                this.start = worcationRequestDto.getStart();
            }
            if (worcationRequestDto.getEnd() != null) {
                this.end = worcationRequestDto.getEnd();
            }
            if (worcationRequestDto.getSido() != null) {
                this.sido = worcationRequestDto.getSido();
            }
            if (worcationRequestDto.getSigungu() != null) {
                this.sigungu = worcationRequestDto.getSigungu();
            }
            if (worcationRequestDto.getJob() != null) {
                this.job = worcationRequestDto.getJob();
            }
            if (worcationRequestDto.getType() != null) {
                this.type = worcationRequestDto.getType();
            }
        }
    }
