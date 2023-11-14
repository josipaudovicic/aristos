package com.example.progi.korisnik;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<Users> getUsers () {
        return userService.getUsers();
    }

    @PostMapping(path = "/register")
    public void register(@RequestBody Users user) {
        userService.addUser(user);
    }
}
