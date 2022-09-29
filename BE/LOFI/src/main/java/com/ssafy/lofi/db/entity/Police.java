package com.ssafy.lofi.db.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;

import javax.persistence.Entity;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Police extends BaseEntity{
    @Nullable
    private String name;
    private String address;
    private String pol;
    private String rhkstj;
    private String rnqns;
    private Double lat;
    private Double lon;

    public void update(double lat, double lon){
        this.lat = lat;
        this.lon = lon;
    }
}
