package com.example.backend.korisnik.positions;

import java.io.Serializable;
import java.sql.Timestamp;

public class SearcherPositionId implements Serializable {
    private String userName;
    private Timestamp timeStamp;
    private Long actionId;

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Timestamp getTimeStamp() {
        return timeStamp;
    }

    public void setTimeStamp(Timestamp timeStamp) {
        this.timeStamp = timeStamp;
    }

    public Long getActionId() {
        return actionId;
    }

    public void setActionId(Long actionId) {
        this.actionId = actionId;
    }
}
