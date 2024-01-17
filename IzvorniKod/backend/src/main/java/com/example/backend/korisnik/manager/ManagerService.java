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

import java.util.*;

@Service
public class ManagerService {
    private final UserRepository userRepository;
    private final UserService userService;
    private final BelongsToStationRepository belongsToStationRepository;
    private final BelongsToStationService belongsToStationService;
    private final QualifiedForRepository qualifiedForRepository;
    private final VehicleRepository vehicleRepository;


    private final VehiclesForActionsRepository vehiclesForActionsRepository;
    private final StationService stationService;
    private final ActionService actionService;


    @Autowired
    public ManagerService(UserRepository userRepository, UserService userService, BelongsToStationRepository belongsToStationRepository, BelongsToStationService belongsToStationService, QualifiedForRepository qualifiedForRepository, StationService stationService, VehicleRepository vehicleRepository, VehiclesForActionsRepository vehiclesForActionsRepository, ActionService actionService) {
        this.userRepository = userRepository;
        this.userService = userService;
        this.belongsToStationRepository = belongsToStationRepository;
        this.belongsToStationService = belongsToStationService;
        this.qualifiedForRepository = qualifiedForRepository;
        this.stationService = stationService;
        this.vehicleRepository = vehicleRepository;
        this.vehiclesForActionsRepository = vehiclesForActionsRepository;
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

    public List<List<String>> getRequests(String username){
        List<Actions> nonStartedActions = actionService.getNonStarted(username);

        Map<String, String> translateVehicles = new HashMap<>();
        translateVehicles.put("foot", "pješke");
        translateVehicles.put("drone", "dronom");
        translateVehicles.put("car", "automobilom");
        translateVehicles.put("motor", "cross motorom");
        translateVehicles.put("ship", "brodom");
        translateVehicles.put("helicopter", "helikopterom");

        List<List<String>> returning = new java.util.ArrayList<>(List.of());
        for (Actions action : nonStartedActions){
            List<String> kaoAction = new ArrayList<>();
            kaoAction.add(action.getActionName());
            kaoAction.add(action.getActionId().toString());

            for (VehiclesForActions pair: vehiclesForActionsRepository.findAll()) {
                String vehicleName = pair.getVehicle().getVehicleName();
                kaoAction.add(translateVehicles.get(vehicleName));
            }
            returning.add(kaoAction);
        }

        return returning;
    }

    public List<String> getTrackersForRequest(String actionId) {
        System.out.println("Looking for searchers on station:");
        long stationId = actionService.getActionById(Long.parseLong(actionId)).getStation().getStationId().longValue();

        List<BelongsToStation> peopleOnStation = belongsToStationRepository.findAll().stream().filter(pair -> (pair.getStationId().longValue() == stationId)).toList();
        System.out.println(peopleOnStation.size());
        peopleOnStation.forEach(pair -> System.out.println(pair.getUserName()));
        return new ArrayList<String>();
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
