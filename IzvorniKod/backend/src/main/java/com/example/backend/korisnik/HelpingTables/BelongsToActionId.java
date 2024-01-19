package com.example.backend.korisnik.HelpingTables;

import com.example.backend.korisnik.Users;
import com.example.backend.korisnik.action.Actions;
import java.io.Serializable;

public class BelongsToActionId implements Serializable {
    private Actions action;
    private Users user;

    public BelongsToActionId() {
    }

    public Actions getAction() {
        return action;
    }

    public void setAction(Actions action) {
        this.action = action;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }
}
