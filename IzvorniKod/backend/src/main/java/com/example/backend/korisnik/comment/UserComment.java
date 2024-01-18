package com.example.backend.korisnik.comment;

import com.example.backend.korisnik.Users;
import com.example.backend.korisnik.action.Actions;
import com.example.backend.korisnik.animal.Animal;
import jakarta.persistence.*;

@Entity
public class UserComment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long commentId;
    @ManyToOne
    @JoinColumn(name = "animal_id")
    Animal animal;
    @ManyToOne
    @JoinColumn(name = "user_name")
    Users user;
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

    public Long getCommentId() {
        return commentId;
    }

    public void setCommentId(Long commentId) {
        this.commentId = commentId;
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
