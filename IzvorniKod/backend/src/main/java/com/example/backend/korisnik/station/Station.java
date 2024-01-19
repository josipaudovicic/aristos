package com.example.backend.korisnik.station;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
public class Station {
    @Id
    private Long stationId;
    private String stationName;

    public Station() {}

    public Station(Long stationId, String stationName) {
        this.stationId = stationId;
        this.stationName = stationName;
    }



    public Long getStationId() {
        return stationId;
    }

    public void setStationId(Long stationId) {
        this.stationId = stationId;
    }

    public String getStationName() {
        return stationName;
    }

    public void setStationName(String stationName) {
        this.stationName = stationName;
    }
}
