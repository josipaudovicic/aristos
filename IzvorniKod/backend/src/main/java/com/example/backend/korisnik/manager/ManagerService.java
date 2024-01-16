package com.example.backend.korisnik.manager;

import com.example.backend.korisnik.HelpingTables.BelongsToStation;
import com.example.backend.korisnik.HelpingTables.BelongsToStationRepository;
import com.example.backend.korisnik.HelpingTables.QualifiedFor;
import com.example.backend.korisnik.HelpingTables.QualifiedForRepository;
import com.example.backend.korisnik.UserRepository;
import com.example.backend.korisnik.Users;
import com.example.backend.korisnik.action.Actions;
import com.example.backend.korisnik.action.ActionService;
import com.example.backend.korisnik.vehicle.Vehicle;
import com.example.backend.korisnik.vehicle.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ManagerService {
    private final UserRepository userRepository;
    private final BelongsToStationRepository belongsToStationRepository;
    private final QualifiedForRepository qualifiedForRepository;

    private final VehicleRepository vehicleRepository;
    private final ActionService actionService;


    @Autowired
    public ManagerService(UserRepository userRepository, BelongsToStationRepository belongsToStationRepository, QualifiedForRepository qualifiedForRepository, VehicleRepository vehicleRepository, ActionService actionService) {
        this.userRepository = userRepository;
        this.belongsToStationRepository = belongsToStationRepository;
        this.qualifiedForRepository = qualifiedForRepository;
        this.vehicleRepository = vehicleRepository;
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
        List<Users> allUsers = userRepository.findAll();
        List<Users> listOfMyTrackers = allUsers.stream().filter(user-> (user.getRole().getRoleName().equals("Tragač") &&
                Objects.equals(belongsToStationRepository.getStationIdByUserName(managerUsername), belongsToStationRepository.getStationIdByUserName(user.getUsername())))).toList();

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

    public List<Map<String, String>> getRequests(String username){
        List<Actions> nonStartedActions = actionService.getNonStarted(username);

        List<Map<String, String>> returning = new java.util.ArrayList<>(List.of());
        for (Actions action : nonStartedActions){
            Map<String, String> kaoAction = new HashMap<>();
            kaoAction.put("id",action.getActionId().toString());
            kaoAction.put("name",action.getActionName());
            kaoAction.put("active", action.isActive() ? "true" : "false");
            kaoAction.put("username", action.getUser().getUsername());
            returning.add(kaoAction);
        }

        return returning;
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

}
