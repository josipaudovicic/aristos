package com.example.backend.korisnik.manager;

import com.example.backend.korisnik.HelpingTables.BelongsToStation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @GetMapping(path = "/station")
    public Map<String, String> getStation(@RequestHeader("username") String username) {
        return managerService.getStation(username);
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


    @PutMapping(path = "/tracker/{trackerUsername}")
    public ResponseEntity<String> addVehiclesToTrackers(@PathVariable String trackerUsername, @RequestBody Map<String, List<String>> requestData) {
        List<String> vehicles = requestData.get("transportModes");
        boolean vehiclesAdded = managerService.addVehiclesToTracker(trackerUsername, vehicles);

        if (vehiclesAdded == true) {
            return ResponseEntity.ok("Vehicles processed");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: Could not add vehicles to tracker.");
        }
    }

    @PostMapping(path = "/{managerUsername}/station/addTrackers")
    public ResponseEntity<String> addTrackersToStation(@PathVariable String managerUsername, @RequestBody Map<String, List<String>> requestData) {
        List<String> trackersList = requestData.get("selectedTrackers");
        System.out.println(trackersList);
        long stationId = managerService.getStationId(managerUsername);
        System.out.println(stationId);

        if (stationId != -1) {
            for (String trackerUsername : trackersList) {
                System.out.println("Tracker username");
                boolean added = managerService.addTrackerToStation(trackerUsername, stationId);

                if (added == false) {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: User could not be added to station.");
                }
            }
            return ResponseEntity.ok("Trackers processed");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: Manager has no station.");
        }
    }

}
