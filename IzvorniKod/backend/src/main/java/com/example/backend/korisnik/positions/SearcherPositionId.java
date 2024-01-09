package com.example.backend.korisnik.positions;

import com.example.backend.korisnik.Users;
import com.example.backend.korisnik.action.Actions;

import java.io.Serializable;
import java.sql.Timestamp;

public class SearcherPositionId implements Serializable {
    private Users user;
    private Timestamp timeStamp;
    private Actions action;

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }

    public Timestamp getTimeStamp() {
        return timeStamp;
    }

    public void setTimeStamp(Timestamp timeStamp) {
        this.timeStamp = timeStamp;
    }

    public Actions getAction() {
        return action;
    }

    public void setAction(Actions action) {
        this.action = action;
    }
}
