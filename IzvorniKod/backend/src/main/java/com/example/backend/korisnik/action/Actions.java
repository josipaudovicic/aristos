package com.example.backend.korisnik.action;

import com.example.backend.korisnik.Users;
import com.example.backend.korisnik.station.Station;
import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
public class Actions {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long actionId;
    private String actionName;
    private boolean actionActive;
    private boolean started;
    @ManyToOne
    @JoinColumn(name = "userName")
    private Users user;
    @ManyToOne
    @JoinColumn(name = "stationId")
    private Station station;
    private Timestamp startTime;
    private Timestamp endTime;
    @Column(columnDefinition = "boolean default false")
    private boolean sentRequest;

    public Actions() {
    }

    public Actions(String actionName, boolean actionActive, boolean started, Users user, Station station, Timestamp startTime) {
        this.actionName = actionName;
        this.actionActive = actionActive;
        this.started = started;
        this.user = user;
        this.station = station;
        this.startTime = startTime;
    }

    public Actions(String actionName, boolean actionActive, boolean started, Users user, Station station, Timestamp startTime, Timestamp endTime) {
        this.actionName = actionName;
        this.actionActive = actionActive;
        this.started = started;
        this.user = user;
        this.station = station;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    public Long getActionId() {
        return actionId;
    }

    public void setActionId(Long actionId) {
        this.actionId = actionId;
    }

    public String getActionName() {
        return actionName;
    }

    public void setActionName(String actionName) {
        this.actionName = actionName;
    }

    public boolean isActive() {
        return actionActive;
    }

    public void setActive(boolean active) {
        this.actionActive = active;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }

    public boolean isStarted() {
        return started;
    }

    public void setStarted(boolean started) {
        this.started = started;
    }

    public Station getStation() {
        return station;
    }

    public void setStation(Station station) {
        this.station = station;
    }

    public boolean getActionActive() {
        return actionActive;
    }

    public void setActionActive(boolean actionActive) {
        this.actionActive = actionActive;
    }

    public Timestamp getStartTime() {
        return startTime;
    }

    public void setStartTime(Timestamp startTime) {
        this.startTime = startTime;
    }

    public Timestamp getEndTime() {
        return endTime;
    }

    public void setEndTime(Timestamp endTime) {
        this.endTime = endTime;
    }

    public boolean isSentRequest() {
        return sentRequest;
    }

    public void setSentRequest(boolean sentRequest) {
        this.sentRequest = sentRequest;
    }
}
