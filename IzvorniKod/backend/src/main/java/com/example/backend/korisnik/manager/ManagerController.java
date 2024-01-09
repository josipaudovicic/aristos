package com.example.backend.korisnik.manager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "/manager")
public class ManagerController {

    private final ManagerService managerService;

    @Autowired
    public ManagerController(ManagerService managerService) {
        this.managerService = managerService;
    }

    @GetMapping(path = "/trackers")
    public List<Map<String, String>> getTrackers(@RequestHeader("username") String username){
        return managerService.getTrackers();
    }

    @GetMapping(path = "/mytrackers")
    public List<Map<String, String>> getMyTrackers(@RequestHeader("username") String username) {
        return managerService.getMyTrackers(username);
    }

    @GetMapping(path = "/activeActions")
    public List<Map<String, String>> getActions(@RequestHeader("username") String username) {
        return managerService.getActiveActions(username);
    }

    @GetMapping(path = "/inactiveActions")
    public List<Map<String, String>> getNonActiveActions(@RequestHeader("username") String username) {
        return managerService.getNonActiveActions(username);
    }

    @GetMapping(path = "/requests")
    public List<Map<String, String>> getRequests(@RequestHeader("username") String username) {
        return managerService.getRequests(username);
    }

    @PostMapping(path = "/addTrackerPosition")
    public String addTrackerPosition(@RequestParam("username") String username, @RequestParam("latitude") String latitude, @RequestParam("longitude") String longitude) {
        return  managerService.saveTrackerPosition(username, Double.valueOf(latitude), Double.valueOf(longitude));
    }
}
