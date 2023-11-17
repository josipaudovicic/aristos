package com.example.backend.korisnik;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedList;
import java.util.List;

@RestController
@RequestMapping("/backend")
public class AdminController {

    private AdminServiceJpa admin_service;

    @RequestMapping("/getAllUsers")
    public void viewAllUsers() {

    }

    @RequestMapping("/users")
    public List<Users> usersToConfirm(@RequestParam(name = "confirmed", required = true) boolean confirmed) {
        List<Users> usersToConfirm = new LinkedList<>();
        if (confirmed == false) {
            usersToConfirm = admin_service.getUsersToConfirm();
        }
        return usersToConfirm;
    }

    @PutMapping("/users/{userName}")
    public ResponseEntity<String> confirmUser(@PathVariable String userName) {
        Users user = admin_service.getUserById(userName);
        if (user != null) {
            if (admin_service.confirm(user)) {
                return ResponseEntity.ok("User succesfully confirmed");
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: User could not be confirmed");
            }
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: User does not exist");
        }

    }

    @DeleteMapping("/users/{userName}")
    public ResponseEntity<String> rejectUser(@PathVariable String userName) {
        Users user = admin_service.getUserById(userName);
        if (user != null) {
            if (admin_service.delete(user)) {
                return ResponseEntity.ok("User succesfully rejected");
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: User could not be deleted");
            }
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: User does not exist");
        }
    }

}