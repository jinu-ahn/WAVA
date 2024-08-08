package com.wava.worcation.domain.user.domain;

import com.wava.worcation.domain.channel.domain.ChannelUser;
import com.wava.worcation.domain.channel.domain.Companion;
import com.wava.worcation.domain.chat.domain.Chat;
import com.wava.worcation.domain.worcation.domain.Worcation;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long id;

    @OneToOne(mappedBy = "user")
    private Worcation worcation;

    @Column(name = "user_email", nullable = false, unique = true)
    private String email;

    @Column(name = "user_password", nullable = false)
    private String password;

    @Column(name = "user_nickname", nullable = false)
    private String nickName;

    @Column(name = "user_phone", nullable = false, unique = true)
    private String phone;

    @Column(name = "user_favorite_sido", nullable = false)
    private String sido;

    @Column(name = "user_favorite_sigungu", nullable = false)
    private String sigungu;

    @Column(name = "user_photo")
    private String profileImg;

    @Column(name = "user_report_count")
    private Long report;

    @ElementCollection
    private List<String> roles;

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
    private List<Chat> chat;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ChannelUser> channelUsers = new HashSet<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Companion> companions;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.roles.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }
    @Override
    public String getUsername() {
        return this.email;
    }

    public void updateProfileImg(String profileImg) {
        this.profileImg = profileImg;
    }
}
