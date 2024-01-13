package com.example.backend.korisnik;

import com.example.backend.korisnik.HelpingTables.BelongsToStation;
import com.example.backend.korisnik.station.StationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping()
public class AdminController {

    private final AdminServiceJpa adminService;

    @Autowired
    public AdminController(AdminServiceJpa adminService) {
        this.adminService = adminService;
    }

    @GetMapping("admin/getAllUsers")
    public List<Map<String, String>> viewRegisteredUsers() {
        return adminService.getRegisteredUsers();
    }

    @GetMapping("admin/users/{id}")
    public Map<String, String> viewUser(@PathVariable String id) {
        System.out.println(adminService.userById(id));
        return adminService.userById(id);
    }

    @GetMapping("admin/toConfirm")
    public List<Map<String, String>> usersToConfirm(@RequestParam(name = "confirmed", required = false) boolean confirmed) {
        return adminService.getUsersToConfirm();
    }

    @GetMapping("admin/getAllStations")
    public List<Map<String, String>> findAllStations(){
        return adminService.findAllStations();
    }

    @PutMapping("/admin/users/{userName}")
    public ResponseEntity<String> confirmUser(@PathVariable String userName, @RequestBody Map<String, String> confirmationParameters) {
        Users user = adminService.getUserById(userName);
        if (user != null) {
            String stationName = confirmationParameters.get("station");
            System.out.println(stationName);
            if (adminService.confirmUser(user, stationName)) {
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
        Users user = adminService.getUserById(username);
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

    @PutMapping("/admin/changeUserData/{username}")
    public ResponseEntity<String> changeUserData(@PathVariable String username, @RequestBody Map<String, String> newUserData) {
        System.out.print("Username to change ");
        System.out.println(newUserData.get("username"));
        Users user = adminService.getUserById(username);
        if (user != null) {
            adminService.changeUserData(username, newUserData);
            return ResponseEntity.ok("User data succesfully changed");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: User does not exist");
        }
    }

}