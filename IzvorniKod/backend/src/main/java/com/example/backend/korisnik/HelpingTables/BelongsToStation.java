package com.example.backend.korisnik.HelpingTables;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.Table;

@Entity
@Table
@IdClass(BelongsToStationId.class)
public class BelongsToStation {
    @Id
    String userName;
    @Id
    Long stationId;

    public BelongsToStation(){};
    public BelongsToStation(String username, Long stationId) {
        this.userName = username;
        this.stationId = stationId;
    }
    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Long getStationId() {
        return stationId;
    }

    public void setStationId(Long stationId) {
        this.stationId = stationId;
    }
}
