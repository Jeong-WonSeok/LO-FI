package com.ssafy.lofi.db.entity;

import com.ssafy.lofi.dto.UserRole;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;

@Entity
@Table(name = "USER")
@Getter
@AllArgsConstructor
@Builder
@DynamicInsert
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private Long id;

    @Column(nullable = false, unique = true, length = 50)
    private String email;

    @Setter
    @Column(nullable = true)
    private String password;

    @Column(nullable = false, length = 50)
    @Enumerated(EnumType.STRING)
    private UserRole role;

    @Column(nullable = true)
    private String provider;

    @Column(nullable = true)
    private int point;

}
