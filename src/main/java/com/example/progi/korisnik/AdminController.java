package com.example.progi.korisnik;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private AdminServiceJpa admin_service;

    @RequestMapping("/getAllUsers")
    public void viewAllUsers() {

    }

    @RequestMapping("/usersToConfirm")
    public void usersToConfirm() {

    }

    @PostMapping("/confirm/")
    public ResponseEntity<String> confirmUser() {
        String username= "";
        Users user = admin_service.getUserById(username);
        return ResponseEntity.ok("User succesfully confirmed");
    }

    @PostMapping("/reject")
    public ResponseEntity<String> rejectUser() {
        String username ="";
        Users user = admin_service.getUserById(username);
        if (admin_service.delete(user)) {
            return ResponseEntity.ok("User succesfully rejected");
        } else {
            return ResponseEntity.ok("Error: User could not be deleted");
        }
    }

}