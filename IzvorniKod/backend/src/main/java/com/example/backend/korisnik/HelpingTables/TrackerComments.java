package com.example.backend.korisnik.HelpingTables;

import com.example.backend.korisnik.Users;
import com.example.backend.korisnik.action.Actions;
import jakarta.persistence.*;

@Entity
public class TrackerComments {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String comment;
    @ManyToOne
    @JoinColumn(name = "user_name")
    private Users user;
    @ManyToOne
    @JoinColumn(name = "action_id")
    private Actions action;

    public TrackerComments() {
    }

    public TrackerComments(String comment, Users user, Actions action) {
        this.comment = comment;
        this.user = user;
        this.action = action;
    }

    public Long getId() {
        return id;
    }

    public String getComment() {
        return comment;
    }

    public Users getUser() {
        return user;
    }

    public Actions getAction() {
        return action;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public void setUser(Users user) {
        this.user = user;
    }

    public void setAction(Actions action) {
        this.action = action;
    }
}
