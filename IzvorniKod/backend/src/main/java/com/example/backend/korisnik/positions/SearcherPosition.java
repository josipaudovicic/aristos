package com.example.backend.korisnik.positions;

import com.example.backend.korisnik.Users;
import com.example.backend.korisnik.action.Actions;
import jakarta.persistence.*;
import java.sql.Timestamp;
import java.util.Date;

@Entity
@IdClass(SearcherPositionId.class)
public class SearcherPosition {
    @Id
    @ManyToOne
    @JoinColumn(name = "user_name")
    private Users user;
    @Id
    @ManyToOne
    @JoinColumn(name = "action_id")
    private Actions action;
    @Id
    @Column(columnDefinition = "TIMESTAMP(6) WITHOUT TIME ZONE")
    private Timestamp timeStamp;
    private Double latitude;
    private Double longitude;

    public SearcherPosition() {
    }

    public SearcherPosition(Users user, Actions action, Double latitude, Double longitude) {
        this.user = user;
        this.action = action;
        this.timeStamp = new Timestamp((System.currentTimeMillis()));
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }

    public Actions getAction() {
        return action;
    }

    public void setAction(Actions action) {
        this.action = action;
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
