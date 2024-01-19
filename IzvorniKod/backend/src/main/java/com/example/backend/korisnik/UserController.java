package com.example.backend.korisnik;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.HashMap;
import java.util.Map;
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
    public String emailConfirm(@RequestParam("token") String token) {
        return userService.confirmToken(token);
    }

    @GetMapping(path = "/mail")
    public Map<String, String> mail(@RequestParam("token") String token) {
        Map<String, String> map = new HashMap<>();
        map.put("username", userService.mail(token));
        map.put("role", userService.getRole(userService.mail(token)));
        return map;
    }

    @GetMapping
    public String hello() {
        return "Hello world";
    }

    @PostMapping(path = "/register")
    public String register(@RequestPart("username") String username, @RequestPart("email") String email,
                           @RequestPart("password") String password, @RequestPart("status") String roleName,
                           @RequestPart("name") String name, @RequestPart("surname") String surname,
                           @RequestPart("file") MultipartFile image) {

        Users user = new Users(username, email, password, name, surname);

        System.out.println("Trying to add user");
        try {
            Path uploadPath = Paths.get(System.getProperty("user.dir"), "src", "main", "resources", "static");
            System.out.println("1");
            Path filePath = uploadPath.resolve(username);
            System.out.println("2");
            System.out.println(image);
            System.out.println(filePath);
            Files.copy(image.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            System.out.println("3");
            String photo = "/images/" + username;
            System.out.println("4");
            user.setPhoto(photo);
            System.out.println("5");
        } catch (Exception e) {
            throw new IllegalStateException("no photo uploaded!");
        }

        Roles role = rolesService.getByName(roleName);
        user.setRole(role);
        System.out.println("Role set");
        user.setAdminCheck(!(role.getId() != 1 && role.getId() != 4));
        user.setEmailCheck(false);

        System.out.println("Everything went fine. Adding the user.");
        return userService.addUser(user);
    }

    @PostMapping(path = "/login")
    public boolean login(@RequestParam("username") String username, @RequestParam("password") String password) {
        return userService.login(username, password);
    }

    @GetMapping(path="/waitEmail")
    public boolean waitEmail(@RequestHeader("username") String username){
        return userService.checkEmail(username);
    }

    @GetMapping(path="/emailChecked")
    public int waitAdmin(@RequestHeader("username") String username){
       return userService.checkAdmin(username);
    }

    @GetMapping("/images/{imageName}")
    public ResponseEntity<Resource> getUserImage(@PathVariable String imageName) {
        try {
            Path imagePath = Paths.get(System.getProperty("user.dir"), "src", "main", "resources", "static", imageName);
            Resource resource = new UrlResource(imagePath.toUri());

            return ResponseEntity.ok()
                    .body(resource);
        } catch (MalformedURLException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/role")
    public Map<String, String> getRole(@RequestHeader("username") String username){
        Map<String, String> map = new HashMap<>();
        String role = userService.getRole(username);
        if (Objects.equals(role, "Admin")) {
            map.put("role", "admin");
        } else if (Objects.equals(role, "Voditelj postaje")) {
            map.put("role", "manager");
        } else if (Objects.equals(role, "Istraživač")) {
            map.put("role", "explorer");
        } else if (Objects.equals(role, "Tragač")) {
            map.put("role", "tracker");
        }
        return map;
    }

    @GetMapping("/profile")
    public Map<String, String> getProfile(@RequestHeader("username") String username){
        return userService.getProfile(username);
    }

    @PutMapping("/save-profile-changes")
    public void saveProfileChanges(@RequestHeader("username") String username, @RequestBody Map<String, String> user){
        userService.saveProfileChanges(username, user);
    }

    @GetMapping("/animalImages/{imageName}")
    public ResponseEntity<Resource> getAnimalImage(@PathVariable String imageName) {
        try {
            Path imagePath = Paths.get(System.getProperty("user.dir"), "src", "main", "resources", "static", "animals", imageName);
            Resource resource = new UrlResource(imagePath.toUri());

            return ResponseEntity.ok()
                    .body(resource);
        } catch (MalformedURLException e) {
            return ResponseEntity.notFound().build();
        }
    }

}
