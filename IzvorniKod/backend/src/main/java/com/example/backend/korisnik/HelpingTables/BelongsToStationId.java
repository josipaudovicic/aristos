package com.example.backend.korisnik.HelpingTables;

import java.io.Serializable;

public class BelongsToStationId implements Serializable {
    private String userName;
    private Long stationId;

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
