package com.example.backend.korisnik.positions;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;

import java.sql.Timestamp;
import java.util.Date;

@Entity
@IdClass(SearcherPositionId.class)
public class SearcherPosition {
    @Id
    private String userName;
    @Id
    private Long actionId;
    @Id
    @Column(columnDefinition = "TIMESTAMP(6) WITHOUT TIME ZONE")
    private Timestamp timeStamp;
    private Double latitude;
    private Double longitude;

    public SearcherPosition(String username, Timestamp timeStamp, double v, double v1) {
        this.userName = username;
        this.timeStamp = timeStamp;
        this.latitude = v;
        this.longitude = v1;
        this.actionId = 1L;
    }

    public SearcherPosition() {
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Long getActionId() {
        return actionId;
    }

    public void setActionId(Long actionId) {
        this.actionId = actionId;
    }

    public Timestamp getTimeStamp() {
        return timeStamp;
    }

    public void setTimeStamp(Timestamp timeStamp) {
        this.timeStamp = timeStamp;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }
}
