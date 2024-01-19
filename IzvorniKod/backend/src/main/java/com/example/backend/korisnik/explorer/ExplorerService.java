package com.example.backend.korisnik.explorer;

import com.example.backend.korisnik.HelpingTables.*;
import com.example.backend.korisnik.UserService;
import com.example.backend.korisnik.Users;
import com.example.backend.korisnik.action.ActionService;
import com.example.backend.korisnik.action.Actions;
import com.example.backend.korisnik.animal.Animal;
import com.example.backend.korisnik.animal.AnimalService;
import com.example.backend.korisnik.comment.UserComment;
import com.example.backend.korisnik.comment.UserCommentService;
import com.example.backend.korisnik.positions.AnimalPosition;
import com.example.backend.korisnik.positions.SearcherPosition;
import com.example.backend.korisnik.positions.SearcherPositionService;
import com.example.backend.korisnik.station.Station;
import com.example.backend.korisnik.station.StationService;
import com.example.backend.korisnik.task.Task;
import com.example.backend.korisnik.task.TaskService;
import com.example.backend.korisnik.vehicle.Vehicle;
import com.example.backend.korisnik.vehicle.VehicleRepository;
import com.example.backend.korisnik.vehicle.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
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
    private final VehicleService vehicleService;
    private final StationService stationService;
    private final TaskCommentService taskCommentService;
    private final VehiclesForActionsService vehiclesForActionsService;

    @Autowired
    public ExplorerService(ActionService actionService, AnimalService animalService, SearcherPositionService searchersService, TaskService taskService, UserCommentService userCommentService, UserService userService, BelongsToActionService belongsToActionService, SearcherPositionService searcherPositionService, VehicleRepository vehicleRepository, VehicleService vehicleService, StationService stationService, TaskCommentService taskCommentService, VehiclesForActionsService vehiclesForActionsService) {
        this.actionService = actionService;
        this.animalService = animalService;
        this.searchersService = searchersService;
        this.taskService = taskService;
        this.userCommentService = userCommentService;
        this.userService = userService;
        this.belongsToActionService = belongsToActionService;
        this.searcherPositionService = searcherPositionService;
        this.vehicleRepository = vehicleRepository;
        this.vehicleService = vehicleService;
        this.stationService = stationService;
        this.taskCommentService = taskCommentService;
        this.vehiclesForActionsService = vehiclesForActionsService;
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
            kaoAction.put("sentRequest", String.valueOf(action.isSentRequest()));
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
                kaoComment.put("commentId", comment.getCommentId().toString());
            } else {
                kaoComment.put("username", comment.getUser().getUsername());
                kaoComment.put("comment", comment.getSentComment());
                kaoComment.put("commentId", comment.getCommentId().toString());
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
        List<Vehicle> vehicles = belongsToActionService.getVehicles(action);
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
        SearcherPosition latest = searcherPositionService.findLatestByUser(user, action);
        List<SearcherPosition> filtered = new java.util.ArrayList<>(List.of());
        for (SearcherPosition searcher : allSearchers) {
            if (actionService.isBetweenTime(searcher.getTimeStamp(), action)) {
                filtered.add(searcher);
            }
        }
        List<Map<String, String>> returning = new java.util.ArrayList<>(List.of());
        for (SearcherPosition searcher : filtered) {
            Map<String, String> kaoSearcher = new java.util.HashMap<>();
            Vehicle vehicle = belongsToActionService.getVehicle(action, user);
            kaoSearcher.put("username", searcher.getUser().getUsername());
            kaoSearcher.put("latitude", searcher.getLatitude().toString());
            kaoSearcher.put("longitude", searcher.getLongitude().toString());
            kaoSearcher.put("vehicleId", vehicle.getVehicleId().toString());
            kaoSearcher.put("latestLatitude", latest.getLatitude().toString());
            kaoSearcher.put("latestLongitude", latest.getLongitude().toString());
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
            kaoSearcher.put("vehicleId", vehicle.getVehicleId().toString());
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

    public List<Map<String, String>> getMapSpecies(String animal) {
        List<AnimalPosition> animalPositions = animalService.getAnimalPositions(animal);
        List<Map<String, String>> returning = new java.util.ArrayList<>(List.of());
        for (AnimalPosition animalPosition : animalPositions) {
            Map<String, String> kaoAnimal = new java.util.HashMap<>();
            kaoAnimal.put("latitude", animalPosition.getLatitude().toString());
            kaoAnimal.put("longitude", animalPosition.getLongitude().toString());
            kaoAnimal.put("animalName", animalPosition.getAnimal().getAnimalName());
            returning.add(kaoAnimal);
        }

        return returning;
    }

    public List<Map<String, String>> getMapIndividual(Long id) {
        List<AnimalPosition> animalPositions = animalService.getSingleAnimalPositions(id);
        List<Map<String, String>> returning = new java.util.ArrayList<>(List.of());
        for (AnimalPosition animalPosition : animalPositions) {
            Map<String, String> kaoAnimal = new java.util.HashMap<>();
            kaoAnimal.put("latitude", animalPosition.getLatitude().toString());
            kaoAnimal.put("longitude", animalPosition.getLongitude().toString());
            kaoAnimal.put("animalName", animalPosition.getAnimal().getAnimalName());
            kaoAnimal.put("animalId", animalPosition.getAnimal().getAnimalId().toString());
            returning.add(kaoAnimal);
        }

        return returning;
    }

    public List<Map<String, String>> getTasks(String actionName) {
        Actions action = actionService.getActionByName(actionName);
        List<Task> tasks = taskService.getTasks(action);
        List<Map<String, String>> returning = new java.util.ArrayList<>(List.of());
        for (Task task : tasks) {
            Map<String, String> kaoTask = new java.util.HashMap<>();
            kaoTask.put("taskId", task.getTaskId().toString());
            kaoTask.put("taskText", task.getTaskText());
            kaoTask.put("username", task.getUser().getUsername());
            kaoTask.put("vehicleName", vehicleService.findVehicleById(task.getVehicle().getVehicleId()).getVehicleName());
            kaoTask.put("animalName", task.getAnimal().getAnimalName());
            kaoTask.put("done", String.valueOf(task.isDone()));
            returning.add(kaoTask);
        }

        return returning;
    }

    public List<Map<String, String>> getAllTaskComments(String taskId) {
        List<TaskComment> comments = taskCommentService.getCommentsWithTaskId(Long.parseLong(taskId));
        List<Map<String, String>> returning = new java.util.ArrayList<>(List.of());
        for (TaskComment comment : comments) {
            Map<String, String> kaoComment = new java.util.HashMap<>();
            kaoComment.put("taskId", comment.getTask().getTaskId().toString());
            kaoComment.put("comment", comment.getComment());
            kaoComment.put("username", comment.getUser().getUsername());
            returning.add(kaoComment);
        }

        return returning;
    }

    public void postAction(String actionName, String username, String stationId) {
        Station station = stationService.getStationByName(stationId);
        Users user = userService.getUserByUsername(username);
        Actions action = new Actions(actionName, true, true, user, station, new Timestamp(System.currentTimeMillis()), null);
        actionService.save(action);
    }

    public void deleteComment(Long animalId, String comment, String username, String commentId) {
        UserComment userComment = userCommentService.findByCommentId(Long.parseLong(commentId));
        userCommentService.delete(userComment);
    }

    public Map<String, List<String>> getUsersAndAnimals(String actionName) {
        List<BelongsToAction> belongsToActions = belongsToActionService.getAllUsers(actionName);
        List<Animal> animal = animalService.getAllAnimals();
        Map<String, List<String>> returning = new java.util.HashMap<>();
        List<String> users = new java.util.ArrayList<>(List.of());
        List<String> animals = new java.util.ArrayList<>(List.of());
        for (BelongsToAction belongsToAction : belongsToActions) {
            users.add(belongsToAction.getUser().getUsername());
        }
        for (Animal animal1 : animal) {
            animals.add(animal1.getAnimalName() + ", id: " + animal1.getAnimalId().toString());
        }
        returning.put("users", users);
        returning.put("animals", animals);
        
        return returning;
    }


    public void postTask(String actionName, String taskText, String username, String animalName, String startLatitude, String startLongitude, String endLatitude, String endLongitude) {
        Actions action = actionService.getActionByName(actionName);
        Users user = userService.getUserByUsername(username);
        Animal animal = animalService.getAnimalByName(animalName);
        Vehicle vehicle = belongsToActionService.getVehicle(action, user);
        Task task = new Task(taskText, false, action, user, animal, vehicle, Double.parseDouble(startLatitude), Double.parseDouble(startLongitude), Double.parseDouble(endLatitude), Double.parseDouble(endLongitude));
        taskService.save(task);
    }

    public void deleteTask(String taskId) {
        Task task = taskService.getTaskById(Long.parseLong(taskId));
        taskService.delete(task);
    }

    public void saveComment(String taskId, String comment, String username) {
        Users user = userService.getUserByUsername(username);
        Task task = taskService.getTaskById(Long.parseLong(taskId));
        TaskComment taskComment = new TaskComment(task, comment, user);
        taskCommentService.save(taskComment);
    }

    public void endAction(String actionName) {
        Actions action = actionService.getActionByName(actionName);
        action.setActive(false);
        action.setEndTime(new Timestamp(System.currentTimeMillis()));
        actionService.save(action);
    }

    public List<Map<String, String>> getVehicles() {
        List<Vehicle> vehicles = vehicleService.getAllVehicles();
        List<Map<String, String>> returning = new java.util.ArrayList<>(List.of());
        for (Vehicle vehicle : vehicles) {
            Map<String, String> kaoVehicle = new java.util.HashMap<>();
            kaoVehicle.put("vehicleId", vehicle.getVehicleId().toString());
            kaoVehicle.put("vehicleName", vehicle.getVehicleName());
            returning.add(kaoVehicle);
        }

        return returning;

    }

    public void postRequest(List<String> body, String actionName) {
        Actions action = actionService.getActionByName(actionName);
        action.setSentRequest(true);
        actionService.save(action);
        for (String vehicleId : body) {
            Vehicle vehicle = vehicleService.findVehicleById(Long.parseLong(vehicleId));
            VehiclesForActions vehiclesForAction = new VehiclesForActions(action, vehicle);
            vehiclesForActionsService.save(vehiclesForAction);
        }
    }

    public Map<String, Double> getAnimalPositions(String animalId) {
        Animal animal = animalService.returnById(Long.parseLong(animalId));
        AnimalPosition animalPosition = animalService.findLatestPosition(animal);
        Map<String, Double> returning = new java.util.HashMap<>();
        returning.put("latitude", animalPosition.getLatitude());
        returning.put("longitude", animalPosition.getLongitude());

        return returning;
    }
}
