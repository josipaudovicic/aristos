package com.example.backend.korisnik.manager;

import com.example.backend.korisnik.HelpingTables.BelongsToStation;
import com.example.backend.korisnik.HelpingTables.QualifiedFor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
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
    public List<Map<String, String>> getActiveActions(@RequestHeader("username") String username) {
        return managerService.getActiveActions(username);
    }

    @GetMapping(path = "/activeAction/trackers")
    public Map<String, List<Map<String, String>>> geMyAvailableTrackersForAction(@RequestHeader("actionId") String actionId) {
        List<Map<String, String>> myAvailableTrackers = managerService.getMyAvailableTrackersForAction(actionId);
        List<Map<String, String>> trackersOnAction = managerService.getMyTrackersOnActiveAction(actionId);
        Map<String, List<Map<String, String>>> trackers = new HashMap<>();
        trackers.put("activeTrackers", trackersOnAction);
        trackers.put("availableTrackers", myAvailableTrackers);
        return trackers;
    }

    @GetMapping(path = "/inactiveActions")
    public List<Map<String, String>> getNonActiveActions(@RequestHeader("username") String username) {
        return managerService.getNonActiveActions(username);
    }

    @GetMapping(path = "/requests")
    public List<List<String>> getRequests(@RequestHeader("username") String username) {
        return managerService.getRequests(username);
    }

    @PutMapping(path = "/activeAction/trackers/addTracker")
    public ResponseEntity<String> addTrackerToAction(@RequestBody Map<String, String> requestData) {
        if (managerService.addTrackersToAction(requestData) == true) {
            return ResponseEntity.ok("Trackers successfully added to action");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: could not add trackers to action" +
                    ".");
        }
    }

    @GetMapping(path = "/requests/trackers")
    public List<Map<String, String>> getTrackersForRequest(@RequestHeader("actionId") String actionId) {
        return managerService.getTrackersForRequest(actionId);
    }

    @PostMapping(path = "/requests/submit")
    public ResponseEntity<String> addTrackersToRequest(@RequestBody Map<String, List<String>> requestData) {
        if (managerService.addTrackersToRequest(requestData) == true) {
            return ResponseEntity.ok("Trackers successfully added to request");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: could not add trackers to request.");
        }
    }

    @PutMapping(path = "/mytrackers/{trackerUsername}")
    public ResponseEntity<String> editVehiclesOfTracker(@PathVariable String trackerUsername, @RequestBody Map<String, List<String>> requestData) {
        List<String> editedVehicles = requestData.get("transportModes");
        boolean vehiclesEdited = managerService.editVehiclesOfTracker(trackerUsername, editedVehicles);

        if (vehiclesEdited == true) {
            return ResponseEntity.ok("Vehicles processed");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: Could not add vehicles to tracker.");
        }
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
