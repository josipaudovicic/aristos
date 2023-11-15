package com.example.progi.korisnik;

import jakarta.persistence.*;

@Entity
@Table
public class Users {
    @Id
    private String username;
    private String email;
    private String password;
    private String name;
    private String surname;
    @ManyToOne
    @JoinColumn(name="id")
    private Roles role;

    public Users(){
    }
    public Users(String username, String email, String password, String name, String surname, String roleName) {
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

}