package com.example.backend.korisnik;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Objects;

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
    public String emailConfirm (@RequestParam("token") String token) {
        return userService.confirmToken(token);
    }

    @PostMapping(path = "/register")
    public String register(@RequestPart("username") String username, @RequestPart("email") String email,
                           @RequestPart("password") String password, @RequestPart("status") String roleName,
                           @RequestPart("name") String name, @RequestPart("surname") String surname,
                           @RequestPart("file") MultipartFile image)
    {

        Users user = new Users(username, email, password, name, surname);

        try {
            Path uploadPath = Paths.get(System.getProperty("user.dir"), "src", "main", "resources", "static");
            Path filePath = uploadPath.resolve(Objects.requireNonNull(image.getOriginalFilename()));
            Files.copy(image.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            String photo = "/images/" + image.getOriginalFilename();
            user.setPhoto(photo);
        } catch (Exception e) { throw new IllegalStateException("no photo uploaded!"); }

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
