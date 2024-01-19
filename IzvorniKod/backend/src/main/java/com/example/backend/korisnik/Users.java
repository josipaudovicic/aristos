package com.example.backend.korisnik;

import com.example.backend.korisnik.token.ConfirmationToken;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.Collection;

@Entity
@Table
public class Users {
    @Id
    private String username;
    @Column(unique = true)
    private String email;
    private String password;
    private String name;
    private String surname;
    @ManyToOne
    @JoinColumn(name = "role_id")
    private Roles role;
    private boolean emailCheck;
    private boolean adminCheck;
    private String photo;

    public Users() {
    }

    public Users(String username, String email, String password, String name, String surname) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.name = name;
        this.surname = surname;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public Roles getRole() {
        return role;
    }

    public void setRole(Roles role) {
        this.role = role;
    }

    public boolean isEmailCheck() {
        return emailCheck;
    }

    public void setEmailCheck(boolean emailCheck) {
        this.emailCheck = emailCheck;
    }

    public boolean isAdminCheck() {
        return adminCheck;
    }

    public void setAdminCheck(boolean adminCheck) {
        this.adminCheck = adminCheck;
    }

    @OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private Collection<ConfirmationToken> confirmationToken;

    public Collection<ConfirmationToken> getConfirmationToken() {
        return confirmationToken;
    }

    public void setConfirmationToken(Collection<ConfirmationToken> confirmationToken) {
        this.confirmationToken = confirmationToken;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }
}