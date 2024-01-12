package com.example.backend.korisnik.comment;

import com.example.backend.korisnik.Users;
import com.example.backend.korisnik.action.Actions;
import com.example.backend.korisnik.animal.Animal;

import java.io.Serializable;

public class UserCommentId implements Serializable {
    private Animal animal;
    private Users user;
    private Actions action;

    public UserCommentId() {
    }

    public UserCommentId(Animal animal, Users user, Actions action) {
        this.animal = animal;
        this.user = user;
        this.action = action;
    }

    public Animal getAnimal() {
        return animal;
    }

    public void setAnimal(Animal animal) {
        this.animal = animal;
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
}
