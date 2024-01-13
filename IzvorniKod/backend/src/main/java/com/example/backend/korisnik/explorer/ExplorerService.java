package com.example.backend.korisnik.explorer;

import com.example.backend.korisnik.HelpingTables.BelongsToActionService;
import com.example.backend.korisnik.UserService;
import com.example.backend.korisnik.Users;
import com.example.backend.korisnik.action.ActionService;
import com.example.backend.korisnik.action.Actions;
import com.example.backend.korisnik.animal.Animal;
import com.example.backend.korisnik.animal.AnimalService;
import com.example.backend.korisnik.comment.UserComment;
import com.example.backend.korisnik.comment.UserCommentService;
import com.example.backend.korisnik.positions.SearcherPosition;
import com.example.backend.korisnik.positions.SearcherPositionService;
import com.example.backend.korisnik.station.Station;
import com.example.backend.korisnik.station.StationService;
import com.example.backend.korisnik.task.TaskService;
import com.example.backend.korisnik.vehicle.Vehicle;
import com.example.backend.korisnik.vehicle.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
public class ExplorerService {
    private final ActionService actionService;
    private final AnimalService animalService;
    private final SearcherPositionService searchersService;
    private final TaskService taskService;
    private final UserCommentService userCommentService;
    private final UserService userService;
    private final BelongsToActionService belongsToActionService;
    private final SearcherPositionService searcherPositionService;
    private final VehicleRepository vehicleRepository;
    private final StationService stationService;

    @Autowired
    public ExplorerService(ActionService actionService, AnimalService animalService, SearcherPositionService searchersService, TaskService taskService, UserCommentService userCommentService, UserService userService, BelongsToActionService belongsToActionService, SearcherPositionService searcherPositionService, VehicleRepository vehicleRepository, StationService stationService) {
        this.actionService = actionService;
        this.animalService = animalService;
        this.searchersService = searchersService;
        this.taskService = taskService;
        this.userCommentService = userCommentService;
        this.userService = userService;
        this.belongsToActionService = belongsToActionService;
        this.searcherPositionService = searcherPositionService;
        this.vehicleRepository = vehicleRepository;
        this.stationService = stationService;
    }

    public List<Map<String, String>> getActions(String username) {
        List<Actions> allActions = actionService.getAllActions(username);

        List<Map<String, String>> returning = new java.util.ArrayList<>(List.of());
        for (Actions action : allActions) {
            Map<String, String> kaoAction = new java.util.HashMap<>();
            kaoAction.put("id", action.getActionId().toString());
            kaoAction.put("actionName", action.getActionName());
            kaoAction.put("actionActive", String.valueOf(action.isActive()));
            kaoAction.put("started", String.valueOf(action.isStarted()));
            kaoAction.put("station", action.getStation().getStationName());
            kaoAction.put("username", action.getUser().getUsername());
            returning.add(kaoAction);
        }

        return returning;

    }

    public List<String> getAnimals() {
        return animalService.findAllDistinctAnimalNames();
    }

    public List<String> getSpecies(String animal) {
        return animalService.findSpecies(animal);
    }

    public Map<String, String> getIndividualById(Long id) {
        return animalService.findAnimalById(id);
    }

    public List<Map<String, String>> getHeatMap(String actionName, String username) {
        Actions action = actionService.getActionByName(actionName);

        List<SearcherPosition> allSearchers = searchersService.findByAction(action.getActionId());
        List<Map<String, String>> returning = new java.util.ArrayList<>(List.of());
        for (SearcherPosition searcher : allSearchers) {
            Map<String, String> kaoSearcher = new java.util.HashMap<>();
            Vehicle vehicle = taskService.getVehicleByActionAndUserName(action, searcher);
            kaoSearcher.put("username", searcher.getUser().getUsername());
            kaoSearcher.put("latitude", searcher.getLatitude().toString());
            kaoSearcher.put("longitude", searcher.getLongitude().toString());
            kaoSearcher.put("vehicleId", vehicle.getVehicleId().toString());
            returning.add(kaoSearcher);
        }

        return returning;
    }

    public List<Map<String, String>> getComments(Long id) {
        Animal animal = animalService.returnById(id);
        List<UserComment> comments = userCommentService.findByAnimal(animal);
        List<Map<String, String>> returning = new java.util.ArrayList<>(List.of());
        for (UserComment comment : comments) {
            Map<String, String> kaoComment = new java.util.HashMap<>();
            if (Objects.equals(comment.getUser().getRole().getRoleName(), "Tragač")) {
                kaoComment.put("username", comment.getUser().getUsername());
                kaoComment.put("comment", comment.getSentComment());
                kaoComment.put("action", comment.getAction().getActionName());
            } else {
                kaoComment.put("username", comment.getUser().getUsername());
                kaoComment.put("comment", comment.getSentComment());
            }
            returning.add(kaoComment);
        }

        return returning;
    }

    public void postComment(Long id, String comment, String username) {
        Animal animal = animalService.returnById(id);
        Users user = userService.getUserByUsername(username);
        Actions action = actionService.getActionById(0L);
        UserComment userComment = new UserComment(animal, user, action, comment);
        userCommentService.save(userComment);
    }

    public Map<String, List<Map<String, String>>> getTrackersAndVehicles(String actionName) {
        Actions action = actionService.getActionByName(actionName);
        List<Users> trackers = belongsToActionService.getTrackers(action);
        List<Vehicle> vehicles = taskService.getVehiclesByAction(action);
        List<Map<String, String>> asUser = new java.util.ArrayList<>(List.of());
        for (Users tracker : trackers) {
            Map<String, String> kaoTracker = new java.util.HashMap<>();
            kaoTracker.put("username", tracker.getUsername());
            asUser.add(kaoTracker);
        }
        List<Map<String, String>> asVehicle = new java.util.ArrayList<>(List.of());
        for (Vehicle vehicle : vehicles) {
            Map<String, String> kaoVehicle = new java.util.HashMap<>();
            kaoVehicle.put("vehicleId", vehicle.getVehicleId().toString());
            kaoVehicle.put("vehicleName", vehicle.getVehicleName());
            asVehicle.add(kaoVehicle);
        }
        Map<String, List<Map<String, String>>> returning = new java.util.HashMap<>();
        returning.put("trackers", asUser);
        returning.put("vehicles", asVehicle);

        return returning;
    }

    public List<Map<String, String>> getHeatMapOfTracker(String actionName, String username) {
        Actions action = actionService.getActionByName(actionName);
        Users user = userService.getUserByUsername(username);
        List<SearcherPosition> allSearchers = searcherPositionService.findByActionAndUser(action, user);
        List<SearcherPosition> filtered = new java.util.ArrayList<>(List.of());
        for (SearcherPosition searcher : allSearchers) {
            if (actionService.isBetweenTime(searcher.getTimeStamp(), action)) {
                filtered.add(searcher);
            }
        }
        List<Map<String, String>> returning = new java.util.ArrayList<>(List.of());
        for (SearcherPosition searcher : filtered) {
            Map<String, String> kaoSearcher = new java.util.HashMap<>();
            Vehicle vehicle = taskService.getVehicleByActionAndUserName(action, searcher);
            kaoSearcher.put("username", searcher.getUser().getUsername());
            kaoSearcher.put("latitude", searcher.getLatitude().toString());
            kaoSearcher.put("longitude", searcher.getLongitude().toString());
            kaoSearcher.put("vehicleId", vehicle.getVehicleId().toString());
            returning.add(kaoSearcher);
        }

        return returning;
    }

    public List<Map<String, String>> getHeatMapOfVehicle(String actionName, String vehicleName) {
        Actions action = actionService.getActionByName(actionName);
        Vehicle vehicle = vehicleRepository.findByVehicleName(vehicleName);
        List<SearcherPosition> searchersWithVehicle = searcherPositionService.findByActionAndVehicle(action, vehicle);
        List<Map<String, String>> returning = new java.util.ArrayList<>(List.of());
        for (SearcherPosition searcher : searchersWithVehicle) {
            Map<String, String> kaoSearcher = new java.util.HashMap<>();
            kaoSearcher.put("username", searcher.getUser().getUsername());
            kaoSearcher.put("latitude", searcher.getLatitude().toString());
            kaoSearcher.put("longitude", searcher.getLongitude().toString());
            returning.add(kaoSearcher);
        }

        return returning;
    }

    public List<String> getStations() {
        List<Station> allStations = stationService.getUsableStations();
        List<String> returning = new java.util.ArrayList<>(List.of());
        for (Station station : allStations) {
            returning.add(station.getStationName());
        }

        return returning;
    }
}
