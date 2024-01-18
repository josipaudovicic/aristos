package com.example.backend.korisnik.HelpingTables;

import java.io.Serializable;

public class QualifiedForId implements Serializable {
    private String userName;
    private Long vehicleId;

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Long getVehicleId() {
        return vehicleId;
    }

    public void setVehicleId(Long vehicleId) {
        this.vehicleId = vehicleId;
    }
}
