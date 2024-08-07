package com.wava.worcation.domain.channel.domain;

import com.wava.worcation.domain.user.domain.User;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
public class Companion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "companion_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @JoinColumn(name = "pin_id")
    private MapPin mapPin;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
    @JoinColumn(name = "user_id")
    private User user;


}
