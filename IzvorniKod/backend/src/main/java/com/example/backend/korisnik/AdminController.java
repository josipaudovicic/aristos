package com.example.backend.korisnik;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping()
public class AdminController {
    @Autowired
    private final AdminServiceJpa adminService;
    @Autowired
    public AdminController(AdminServiceJpa adminService) {
        this.adminService = adminService;
    }

    @GetMapping("admin/getAllUsers")
    public List<Map<String, String>> viewAllUsers() {
        return adminService.getUsers();
    }

    @GetMapping("admin/users/{id}")
    public Map<String, String> viewUser(@PathVariable String id) {
        System.out.println(adminService.userById(id));
        return adminService.userById(id);
    }

    @GetMapping("admin/users/toconfirm")
    public List<Map<String, String>> usersToConfirm(@RequestParam(name = "confirmed", required = false) boolean confirmed) {
        return adminService.getUsersToConfirm();
    }

    @PutMapping("/admin/users/{userName}")
    public ResponseEntity<String> confirmUser(@PathVariable String userName) {
        Users user = adminService.getUserById(userName);
        if (user != null) {
            if (adminService.confirm(user)) {
                return ResponseEntity.ok("User succesfully confirmed");
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: User could not be confirmed");
            }
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: User does not exist");
        }

    }

    @DeleteMapping("/admin/users/{username}")
    public ResponseEntity<String> rejectUser(@PathVariable String username) {
        //System.out.println(username);
        Users user = adminService.getUserById(username);
        //System.out.println(user);
        if (user != null) {
            if (adminService.delete(user)) {
                return ResponseEntity.ok("User succesfully rejected");
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: User could not be deleted");
            }
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: User does not exist");
        }
    }

}