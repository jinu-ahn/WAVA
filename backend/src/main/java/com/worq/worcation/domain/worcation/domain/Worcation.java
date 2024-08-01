    // src/main/java/com/worq/worcation/domain/worcation/domain/Worcation.java
    package com.worq.worcation.domain.worcation.domain;

    import com.worq.worcation.domain.user.domain.User;
    import com.worq.worcation.domain.worcation.dto.WorcationRequestDto;
    import jakarta.persistence.*;
    import lombok.AllArgsConstructor;
    import lombok.Builder;
    import lombok.Data;
    import lombok.Getter;

    import java.util.Date;

    @Entity(name="worcation_info")
    @Data
    @Builder
    @Getter
    @AllArgsConstructor
    public class Worcation {

        // Getters and Setters
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @OneToOne
        @JoinColumn(name = "user_id")
        private User user;
        @Column(name = "worcation_start_date")
        private Date start;
        @Column(name = "worcation_end_date")
        private Date end;
        @Column(name = "worcation_sido")
        private String sido;
        @Column(name = "worcation_sigungu")
        private String gugun;
        @Column(name = "worcation_job")
        private String job;
        @Column(name = "worcation_type")
        private String type;
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
            if (worcationRequestDto.getGugun() != null) {
                this.gugun = worcationRequestDto.getGugun();
            }
            if (worcationRequestDto.getJob() != null) {
                this.job = worcationRequestDto.getJob();
            }
            if (worcationRequestDto.getType() != null) {
                this.type = worcationRequestDto.getType();
            }
        }
    }
