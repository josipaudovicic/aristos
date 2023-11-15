package com.example.progi.korisnik;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping
public class UserController {

    private final UserService userService;
    private final RolesService rolesService;

    @Autowired
    public UserController(UserService userService, RolesService rolesService) {
        this.userService = userService;
        this.rolesService = rolesService;
    }

    @GetMapping(path = "/register/confirm")
    public String confirm (@RequestParam("token") String token) {
        return userService.confirmToken(token);
    }

    @PostMapping(path = "/register")
    public String register(@RequestBody Map<String, Object> requestBody)
    {
        Users user = new Users();
        user.setUsername((String) requestBody.get("username"));
        user.setEmail((String) requestBody.get("email"));
        user.setPassword((String) requestBody.get("password"));
        user.setName((String) requestBody.get("name"));
        user.setSurname((String) requestBody.get("surname"));

        String roleName = (String) requestBody.get("status");
        Roles role = rolesService.getByName(roleName);
        user.setRole(role);

        user.setAdminCheck(!(role.getId() != 1 && role.getId() != 4));
        user.setEmailCheck(false);

        return userService.addUser(user);
    }

    @PostMapping(path = "/login")
    public ResponseEntity<String> login(@RequestBody Users user) {
        try {
            String redirect = userService.login(user);
            return ResponseEntity.ok("Login successful!");
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }
}
