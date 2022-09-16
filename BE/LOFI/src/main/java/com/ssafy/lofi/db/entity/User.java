package com.ssafy.lofi.db.entity;

import lombok.*;

import javax.persistence.Entity;

@Entity
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User extends BaseEntity{
    private String email;
    private String password;
    private Integer point;
}
