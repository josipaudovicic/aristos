package com.example.backend.korisnik.explorer;

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
import com.example.backend.korisnik.task.TaskService;
import com.example.backend.korisnik.vehicle.Vehicle;
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

    @Autowired
    public ExplorerService(ActionService actionService, AnimalService animalService, SearcherPositionService searchersService, TaskService taskService, UserCommentService userCommentService, UserService userService) {
        this.actionService = actionService;
        this.animalService = animalService;
        this.searchersService = searchersService;
        this.taskService = taskService;
        this.userCommentService = userCommentService;
        this.userService = userService;
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
        UserComment userComment = new UserComment(animal, user, new Actions(), comment);
        userCommentService.save(userComment);
    }
}
