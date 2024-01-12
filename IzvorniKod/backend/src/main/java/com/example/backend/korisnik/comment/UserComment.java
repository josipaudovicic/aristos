package com.example.backend.korisnik.comment;

import com.example.backend.korisnik.Users;
import com.example.backend.korisnik.action.Actions;
import com.example.backend.korisnik.animal.Animal;
import jakarta.persistence.*;

@Entity
@IdClass(UserCommentId.class)
public class UserComment {
    @Id
    @ManyToOne
    @JoinColumn(name = "animal_id")
    Animal animal;
    @Id
    @ManyToOne
    @JoinColumn(name = "user_name")
    Users user;
    @Id
    @ManyToOne
    @JoinColumn(name = "action_id")
    Actions action;
    String sentComment;

    public UserComment() {
    }

    public UserComment(Animal animal, Users user, Actions action, String comment) {
        this.animal = animal;
        this.user = user;
        this.action = action;
        this.sentComment = comment;
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

    public void setAction(Actions actions) {
        this.action = actions;
    }

    public String getSentComment() {
        return sentComment;
    }

    public void setSentComment(String sentComment) {
        this.sentComment = sentComment;
    }
}
