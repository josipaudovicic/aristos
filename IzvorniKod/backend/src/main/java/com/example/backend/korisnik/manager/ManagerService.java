package com.example.backend.korisnik.manager;

import com.example.backend.korisnik.HelpingTables.*;
import com.example.backend.korisnik.UserRepository;
import com.example.backend.korisnik.UserService;
import com.example.backend.korisnik.Users;
import com.example.backend.korisnik.action.ActionRepository;
import com.example.backend.korisnik.action.Actions;
import com.example.backend.korisnik.action.ActionService;
import com.example.backend.korisnik.station.Station;
import com.example.backend.korisnik.station.StationService;
import com.example.backend.korisnik.vehicle.Vehicle;
import com.example.backend.korisnik.vehicle.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Array;
import java.util.*;

@Service
public class ManagerService {
    private final UserRepository userRepository;
    private final UserService userService;
    private final BelongsToStationRepository belongsToStationRepository;
    private final BelongsToStationService belongsToStationService;
    private final QualifiedForRepository qualifiedForRepository;

    private final ActionRepository actionRepository;

    private final BelongsToActionRepository belongsToActionRepository;
    private final VehicleRepository vehicleRepository;


    private final VehiclesForActionsRepository vehiclesForActionsRepository;
    private final StationService stationService;
    private final ActionService actionService;


    @Autowired
    public ManagerService(UserRepository userRepository, UserService userService, BelongsToStationRepository belongsToStationRepository, BelongsToStationService belongsToStationService, QualifiedForRepository qualifiedForRepository, StationService stationService, VehicleRepository vehicleRepository, VehiclesForActionsRepository vehiclesForActionsRepository, BelongsToActionRepository belongsToActionRepository, ActionRepository actionRepository, ActionService actionService) {
        this.userRepository = userRepository;
        this.userService = userService;
        this.belongsToStationRepository = belongsToStationRepository;
        this.belongsToStationService = belongsToStationService;
        this.qualifiedForRepository = qualifiedForRepository;
        this.stationService = stationService;
        this.vehicleRepository = vehicleRepository;
        this.vehiclesForActionsRepository = vehiclesForActionsRepository;
        this.belongsToActionRepository = belongsToActionRepository;
        this.actionRepository = actionRepository;
        this.actionService = actionService;
    }

    public List<Map<String,String>> getTrackers() {
        List<Users> allUsers = userRepository.findAll();
        List<Users> listOfTrackers = allUsers.stream().filter(user -> (user.getRole().getRoleName().equals("Tragač")
                && !belongsToStationRepository.existsByUserName(user.getUsername()))).toList();

        List<Map<String, String>> returning = new java.util.ArrayList<>(List.of());
        for (Users user : listOfTrackers){
            Map<String, String> kaoUser = new HashMap<>();
            kaoUser.put("username",user.getUsername());
            kaoUser.put("email",user.getEmail());
            kaoUser.put("name",user.getName());
            kaoUser.put("surname",user.getSurname());
            kaoUser.put("password",user.getPassword());
            kaoUser.put("role",user.getRole().getRoleName());
            kaoUser.put("file",user.getPhoto());
            returning.add(kaoUser);
        }
        return returning;
    }

    public List<Map<String, String>> getMyTrackers(String managerUsername) {
        List<BelongsToStation> allPairs = belongsToStationService.getAllPairs(managerUsername);
        List<Users> listOfMyTrackers = new ArrayList<>();
        for (BelongsToStation pair : allPairs) {
            if (userService.getRole(pair.getUserName()).equals("Tragač") && !Objects.equals(pair.getUserName(), managerUsername)) {
                listOfMyTrackers.add(userService.getUserByUsername(pair.getUserName()));
            }
        }

        List<Map<String, String>> returning = new java.util.ArrayList<>(List.of());
        for (Users user : listOfMyTrackers){
            Map<String, String> kaoUser = new HashMap<>();
            kaoUser.put("username",user.getUsername());
            kaoUser.put("email",user.getEmail());
            kaoUser.put("name",user.getName());
            kaoUser.put("surname",user.getSurname());
            kaoUser.put("password",user.getPassword());
            kaoUser.put("role",user.getRole().getRoleName());
            kaoUser.put("file",user.getPhoto());
            returning.add(kaoUser);
        }
        return returning;
    }

    public List<Map<String, String>> getActiveActions(String username) {
        List<Actions> activeActions = actionService.getActive(username);

        List<Map<String, String>> returning = new ArrayList<>(List.of());
        for (Actions action : activeActions){
            Map<String, String> kaoAction = new HashMap<>();
            kaoAction.put("id",action.getActionId().toString());
            kaoAction.put("name",action.getActionName());
            kaoAction.put("active", action.isActive() ? "true" : "false");
            kaoAction.put("username", action.getUser().getUsername());
            returning.add(kaoAction);
        }

        return returning;
    }

    public List<Map<String, String>> getNonActiveActions(String username) {
        List<Actions> activeActions = actionService.getNonActive(username);

        List<Map<String, String>> returning = new java.util.ArrayList<>(List.of());
        for (Actions action : activeActions){
            Map<String, String> kaoAction = new HashMap<>();
            kaoAction.put("id",action.getActionId().toString());
            kaoAction.put("name",action.getActionName());
            kaoAction.put("active", action.isActive() ? "true" : "false");
            kaoAction.put("username", action.getUser().getUsername());
            returning.add(kaoAction);
        }

        return returning;
    }

    public List<Map<String, String>> getMyAvailableTrackersForAction(String actionId) {
        return getTrackersForRequest(actionId);
    }

    public List<Map<String, String>> getMyTrackersOnActiveAction(String actionId) {
        List<Map<String, String>> trackersOnAction = new ArrayList<>();
        Actions action = actionRepository.getReferenceById(Long.parseLong(actionId));

        if (action.getActionActive() == true) {
            for (BelongsToAction pair: belongsToActionRepository.findAll()) {
                if (pair.getAction().getActionId().toString().equals(actionId)) {
                    Map<String, String> newSearcher = new HashMap<>();
                    Users tracker = pair.getUser();
                    newSearcher.put("username", tracker.getUsername());
                    newSearcher.put("email", tracker.getEmail());
                    newSearcher.put("name", tracker.getName());
                    newSearcher.put("surname", tracker.getSurname());
                    newSearcher.put("password", tracker.getPassword());
                    newSearcher.put("role", tracker.getRole().getRoleName());
                    newSearcher.put("file", tracker.getPhoto());
                    trackersOnAction.add(newSearcher);
                }
            }
        }

        return trackersOnAction;
    }

    public boolean addTrackersToAction(Map<String, String> requestData) {
        String actionId = requestData.get("actionId");
        List<String> actionsId = new ArrayList<>();
        actionsId.add(actionId);

        String username = requestData.get("trackerId");
        List<String> usernames = new ArrayList<>();
        usernames.add(username);

        Map<String, List<String>> newRequestData = new HashMap<>();
        newRequestData.put("actionId", actionsId);
        newRequestData.put("selectedTrackers", usernames);
        return addTrackersToRequest(newRequestData);
    }

    public List<List<String>> getRequests(String username){
        String stationId = belongsToStationRepository.findByUserName(username).getStationId().toString();
        List<Actions> allActionsOnStation = actionRepository.findAll().stream().filter(action -> (action.getStation().getStationId().toString().equals(stationId))).toList();

        Map<String, String> translateVehicles = new HashMap<>();
        translateVehicles.put("foot", "pješke");
        translateVehicles.put("drone", "dronom");
        translateVehicles.put("car", "automobilom");
        translateVehicles.put("motor", "cross motorom");
        translateVehicles.put("ship", "brodom");
        translateVehicles.put("helicopter", "helikopterom");

        List<List<String>> returning = new java.util.ArrayList<>(List.of());
        for (Actions action : allActionsOnStation){
            if (actionHasNotrackers(action.getActionId().toString())) {
                System.out.println(action.getActionName());
                List<String> kaoAction = new ArrayList<>();
                kaoAction.add(action.getActionName());
                kaoAction.add(action.getActionId().toString());

                for (VehiclesForActions pair : vehiclesForActionsRepository.findAll()) {
                    System.out.println(pair.getAction().getActionId());
                    System.out.println(action.getActionName());
                    System.out.println("------------");
                    if (pair.getAction().getActionId().longValue() == action.getActionId().longValue()) {
                        String vehicleName = pair.getVehicle().getVehicleName();
                        kaoAction.add(translateVehicles.get(vehicleName));
                    }
                }

                if (kaoAction.size() > 2) {
                    returning.add(kaoAction);
                }
            }
        }

        return returning;
    }

    public boolean addTrackersToRequest(Map<String, List<String>> requestData) {
        String actionId = requestData.get("actionId").get(0);
        List<String> requestedVehicles = new ArrayList<>();
        vehiclesForActionsRepository.findAll().stream().filter(pair -> (pair.getAction()).getActionId().toString().equals(actionId)).toList().forEach(pair -> requestedVehicles.add(pair.getVehicle().getVehicleId().toString()));
        //System.out.print("Requested vehicles: ");
        //System.out.println(requestedVehicles);

        Map<String, List<String>> trackersQualifications = new HashMap<>();
        List<String> sentTrackers = requestData.get("selectedTrackers");
        sentTrackers.forEach(tracker -> trackersQualifications.put(tracker, new ArrayList<>()));

        for (String tracker : trackersQualifications.keySet()) {
            for (QualifiedFor qualification : qualifiedForRepository.findAll()) {
                if (qualification.getUserName().equals(tracker)) {
                    List<String> oldList = trackersQualifications.get(tracker);
                    oldList.add(qualification.getVehicleId().toString());
                    trackersQualifications.put(tracker, oldList);
                }
            }
        }
        //System.out.print("Qualified for: ");
        //System.out.println(trackersQualifications);
        for (String tracker : trackersQualifications.keySet()) {
            boolean foundVehicle = false;
            for (String trackerVehicle : trackersQualifications.get(tracker)) {
                for (String vehicle : requestedVehicles) {
                    if (vehicle.equals(trackerVehicle)) {
                        Users newUser = userRepository.getReferenceById(tracker);
                        Actions newAction = actionService.getActionById(Long.parseLong(actionId));
                        Vehicle newVehicle = vehicleRepository.getReferenceById(Long.parseLong(vehicle));
                        BelongsToAction newEntry = new BelongsToAction(newAction, newUser, newVehicle);
                        belongsToActionRepository.save(newEntry);
                        foundVehicle = true;
                        break;
                    }
                }
                if (foundVehicle == true) {
                    break;
                }
            }
        }

        return true;
    }

    public List<Map<String, String>> getTrackersForRequest(String actionId) {
        List<Map<String, String>> trackersForRequest = new ArrayList<>();
        System.out.println("Looking for searchers on station:");
        long stationId = actionService.getActionById(Long.parseLong(actionId)).getStation().getStationId().longValue();

        List<BelongsToStation> peopleOnStation = belongsToStationRepository.findAll().stream().filter(pair -> (pair.getStationId().longValue() == stationId)).toList();
        System.out.println(peopleOnStation.size());
        //peopleOnStation.forEach(pair -> System.out.println(pair.getUserName()));
        List<BelongsToStation> trackersOnStation = peopleOnStation.stream().filter(pair -> (userRepository.getReferenceById(pair.getUserName()).getRole().getRoleName().equals("Tragač") && trackerIsOnActiveAction(pair.getUserName()) == false && trackerIsQualifiedForAction(actionId, pair.getUserName()))).toList();
        trackersOnStation.forEach(pair -> System.out.println(pair.getUserName()));
        trackersOnStation.stream().filter(pair -> (trackerIsQualifiedForAction(actionId, pair.getUserName()) == true)).toList().forEach(pair -> {
                                                                                                        Map<String, String> newSearcher = new HashMap<>();
                                                                                                        newSearcher.put("username", userRepository.getReferenceById(pair.getUserName()).getUsername());
                                                                                                        newSearcher.put("email", userRepository.getReferenceById(pair.getUserName()).getEmail());
                                                                                                        newSearcher.put("name", userRepository.getReferenceById(pair.getUserName()).getName());
                                                                                                        newSearcher.put("surname", userRepository.getReferenceById(pair.getUserName()).getSurname());
                                                                                                        newSearcher.put("password", userRepository.getReferenceById(pair.getUserName()).getPassword());
                                                                                                        newSearcher.put("role", userRepository.getReferenceById(pair.getUserName()).getRole().getRoleName());
                                                                                                        newSearcher.put("file", userRepository.getReferenceById(pair.getUserName()).getPhoto());
                                                                                                        trackersForRequest.add(newSearcher);
                                                                                                        });
        return trackersForRequest;
    }

    public boolean actionHasNotrackers(String actionId) {
        for (BelongsToAction pair : belongsToActionRepository.findAll()) {
            if (pair.getAction().getActionId().toString().equals(actionId)) {
                return false;
            }
        }
        return true;
    }

    public boolean trackerIsOnActiveAction(String username) {
        List<String> actionIdHistory = new ArrayList<>();

        for (BelongsToAction pair : belongsToActionRepository.findAll()) {
            if (pair.getUser().getUsername().equals(username)) {
                actionIdHistory.add(pair.getAction().getActionId().toString());
            }
        }

        List<String> uniqueActions = actionIdHistory.stream().distinct().toList();
        for (String actionId : uniqueActions) {
            if (actionRepository.getReferenceById(Long.parseLong(actionId)).getActionActive() == true) {
                return true;
            }
        }
        return false;
    }

    public boolean trackerIsQualifiedForAction(String actionId, String trackerUsername) {
        List<String> requestedVehicles = new ArrayList<>();
        vehiclesForActionsRepository.findAll().stream().filter(pair -> (pair.getAction().getActionId().equals(Long.parseLong(actionId)))).toList().forEach(pair -> requestedVehicles.add(pair.getVehicle().getVehicleName()));

        if (requestedVehicles.isEmpty()) {
            return true;
        } else {
            List<String> trackerQualifiedFor = new ArrayList<>();
            qualifiedForRepository.findAll().stream().filter(pair -> (pair.getUserName().equals(trackerUsername))).toList().forEach(pair -> trackerQualifiedFor.add(vehicleRepository.getReferenceById(pair.getVehicleId()).getVehicleName()));

            for (String vehicle : trackerQualifiedFor) {
                if (requestedVehicles.contains(vehicle)) {
                    return true;
                }
            }
        }
        return false;
    }
    public long getStationId(String username) {
        System.out.println("Searching for manager in repository");
        for (BelongsToStation pair : belongsToStationRepository.findAll()) {
            System.out.println(pair);
            if (pair.getUserName().equals(username)) {
                return pair.getStationId().longValue();
            }
        }
        return -1;
    }

    public boolean editVehiclesOfTracker(String username, List<String> vehicles) {
        for (QualifiedFor pair : qualifiedForRepository.findAll()) {
            if (pair.getUserName().equals(username)) {
                qualifiedForRepository.delete(pair);
            }
        }

        return this.addVehiclesToTracker(username, vehicles);
    }

    public boolean addVehiclesToTracker(String trackerUsername, List<String> vehicles) {
        Map<String, String> translateVehicles = new HashMap<>();
        translateVehicles.put("pješke", "foot");
        translateVehicles.put("dronom", "drone");
        translateVehicles.put("automobilom", "car");
        translateVehicles.put("cross motorom", "motor");
        translateVehicles.put("brodom", "ship");
        translateVehicles.put("helikopterom", "helicopter");

        for (String vehicle: vehicles) {
            String translated = translateVehicles.get(vehicle);
            Long translatedId = vehicleRepository.findByVehicleName(translated).getVehicleId();
            QualifiedFor newEntry = new QualifiedFor(trackerUsername, translatedId);
            qualifiedForRepository.save(newEntry);
        }
        return true;
    }

    public boolean addTrackerToStation(String trackerUsername, long stationId) {
        System.out.println(trackerUsername);
        if (userRepository.existsById(trackerUsername) == false) {
            return false;
        }
        BelongsToStation newEntry = new BelongsToStation(trackerUsername, stationId);
        belongsToStationRepository.save(newEntry);
        return true;
    }

    public Map<String, String> getStation(String username) {
        BelongsToStation manager = belongsToStationService.getPair(username);
        Station station = stationService.getStationById(manager.getStationId());
        Map<String, String> stationMap = new HashMap<>();
        stationMap.put("station", station.getStationName());
        return stationMap;
    }
}
