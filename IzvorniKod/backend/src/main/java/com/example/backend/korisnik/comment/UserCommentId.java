package com.example.backend.korisnik.comment;

import java.io.Serializable;

public class UserCommentId implements Serializable {
    private String animal;
    private String user;
    private Long actions;

    public UserCommentId() {
    }

    public UserCommentId(String animal, String user, Long actions) {
        this.animal = animal;
        this.user = user;
        this.actions = actions;
    }

    public String getAnimal() {
        return animal;
    }

    public String getUser() {
        return user;
    }

    public Long getActions() {
        return actions;
    }

    public void setAnimal(String animal) {
        this.animal = animal;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public void setActions(Long actions) {
        this.actions = actions;
    }
}
