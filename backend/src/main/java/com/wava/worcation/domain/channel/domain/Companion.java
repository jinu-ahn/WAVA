package com.wava.worcation.domain.channel.domain;

import com.wava.worcation.domain.user.domain.User;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "companion", indexes = {
        @Index(name = "idx_pin_id", columnList = "pin_id") // 삭제 성능을 높이기 위한 인덱스 설정
})
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
public class Companion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "companion_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pin_id")
    private MapPin mapPin;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;


}
