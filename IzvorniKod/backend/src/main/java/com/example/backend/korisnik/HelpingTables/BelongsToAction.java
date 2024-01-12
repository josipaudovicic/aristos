package com.example.backend.korisnik.HelpingTables;

import com.example.backend.korisnik.Users;
import com.example.backend.korisnik.action.Actions;
import jakarta.persistence.*;

@Entity
@IdClass(BelongsToActionId.class)
public class BelongsToAction {
    @Id
    @ManyToOne
    @JoinColumn(name = "action_id")
    private Actions action;
    @Id
    @ManyToOne
    @JoinColumn(name = "user_name")
    private Users user;

    public BelongsToAction() {
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
