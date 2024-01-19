package com.example.backend.korisnik.tracker;

import com.example.backend.korisnik.HelpingTables.*;
import com.example.backend.korisnik.positions.AnimalPosition;
import com.example.backend.korisnik.task.*;
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
import com.example.backend.korisnik.vehicle.Vehicle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class TrackerService {
    private final ActionService actionService;
    private final UserService userService;
    private final AnimalService animalService;
    private final UserCommentService userCommentService;
    private final BelongsToActionService belongsToActionService;
    private final SearcherPositionService searcherPositionService;
    private final TaskService taskService;
    private final TaskCommentService taskCommentService;
    private final TrackerCommentService trackerCommentService;

    @Autowired
    public TrackerService(ActionService actionService, UserService userService, AnimalService animalService, UserCommentService userCommentService, BelongsToActionService belongsToActionService, SearcherPositionService searcherPositionService, TaskService taskService, TaskCommentService taskCommentService, TrackerCommentService trackerCommentService) {
        this.actionService = actionService;
        this.userService = userService;
        this.animalService = animalService;
        this.userCommentService = userCommentService;
        this.belongsToActionService = belongsToActionService;
        this.searcherPositionService = searcherPositionService;
        this.taskService = taskService;
        this.taskCommentService = taskCommentService;
        this.trackerCommentService = trackerCommentService;
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

    public List<Map<String, String>> getComments(Long id) {
        Animal animal = animalService.returnById(id);
        List<UserComment> comments = userCommentService.findByAnimal(animal);
        List<Map<String, String>> returning = new java.util.ArrayList<>(List.of());
        for (UserComment comment : comments) {
            Map<String, String> kaoComment = new java.util.HashMap<>();
            kaoComment.put("username", comment.getUser().getUsername());
            kaoComment.put("comment", comment.getSentComment());
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

    public Map<String, String> getAction(String username) {
        Users user = userService.getUserByUsername(username);
        Actions action = belongsToActionService.findByUser(user);
        Vehicle vehicle = belongsToActionService.getVehicle(action, user);
        Map<String, String> returning = new java.util.HashMap<>();
        if (action != null){
            returning.put("actionName", action.getActionName());
            returning.put("explorerName", action.getUser().getUsername());
            returning.put("vehicleName", vehicle.getVehicleName());
            returning.put("actionId", action.getActionId().toString());
            return returning;
        } else {
            return null;
        }
    }

    public List<Map<String, String>> getTrackers(String actionName, String username) {
        Actions action = actionService.getActionByName(actionName);
        List<Users> users = belongsToActionService.getTrackers(action);
        List<Map<String, String>> returning = new java.util.ArrayList<>(List.of());
        for (Users u : users) {
            if (!Objects.equals(u.getUsername(), username)) {
                SearcherPosition searcherPosition = searcherPositionService.findLatestByUser(u, action);
                Map<String, String> kaoUser = new java.util.HashMap<>();
                kaoUser.put("username", u.getUsername());
                Vehicle vehicle = belongsToActionService.getVehicle(action, u);
                kaoUser.put("vehicle", vehicle.getVehicleName());
                kaoUser.put("longitude", searcherPosition.getLongitude().toString());
                kaoUser.put("latitude", searcherPosition.getLatitude().toString());
                returning.add(kaoUser);
            }
        }
        return returning;
    }

    public List<Map<String, String>> getTasks(String actionName, String username) {
        Actions action = actionService.getActionByName(actionName);
        Users user = userService.getUserByUsername(username);
        List<Task> tasks = taskService.getTasksByActionAndUser(action, user);
        List<Map<String, String>> returning = new java.util.ArrayList<>(List.of());
        for (Task t : tasks) {
            Map<String, String> kaoTask = new java.util.HashMap<>();
            Animal animal = t.getAnimal();
            AnimalPosition animalPosition = animalService.findLatestPosition(animal);
            kaoTask.put("animalName", animal.getAnimalName() + ", id: " + animal.getAnimalId().toString());
            kaoTask.put("animalLongitude", animalPosition.getLongitude().toString());
            kaoTask.put("animalLatitude", animalPosition.getLatitude().toString());
            kaoTask.put("startLongitude", t.getStartLongitude().toString());
            kaoTask.put("startLatitude", t.getStartLatitude().toString());
            kaoTask.put("endLongitude", t.getEndLongitude().toString());
            kaoTask.put("endLatitude", t.getEndLatitude().toString());
            kaoTask.put("taskId", t.getTaskId().toString());
            kaoTask.put("taskText", t.getTaskText());
            kaoTask.put("done", String.valueOf(t.isDone()));
            returning.add(kaoTask);
        }

        return returning;
    }

    public void postTask(String taskId) {
        Task task = taskService.getTaskById(Long.parseLong(taskId));
        task.setDone(true);
        taskService.save(task);
    }

    public List<Map<String, String>> getActionComments(String actionName) {
        Actions action = actionService.getActionByName(actionName);
        List<TrackerComments> comments = trackerCommentService.findByAction(action);
        List<Map<String, String>> returning = new java.util.ArrayList<>(List.of());
        for (TrackerComments comment : comments) {
            Map<String, String> kaoComment = new java.util.HashMap<>();
            kaoComment.put("username", comment.getUser().getUsername());
            kaoComment.put("comment", comment.getComment());
            returning.add(kaoComment);
        }

        return returning;
    }

    public Map<String, String> getMyPosition(String username) {
        Users user = userService.getUserByUsername(username);
        SearcherPosition searcherPosition = searcherPositionService.findLatest(user);
        Map<String, String> kaoPosition = new java.util.HashMap<>();
        kaoPosition.put("longitude", searcherPosition.getLongitude().toString());
        kaoPosition.put("latitude", searcherPosition.getLatitude().toString());
        return kaoPosition;
    }

    public void saveComment(String comment, String username, String actionName) {
        Users user = userService.getUserByUsername(username);
        Actions action = actionService.getActionByName(actionName);
        TrackerComments trackerComment = new TrackerComments(comment, user, action);
        trackerCommentService.save(trackerComment);
    }

    public List<String> getTaskComments(String taskId) {
        Task task = taskService.getTaskById(Long.parseLong(taskId));
        List<TaskComment> comments = taskCommentService.findByTask(task);
        List<String> returning = new java.util.ArrayList<>(List.of());
        for (TaskComment comment : comments) {
            returning.add(comment.getComment());
        }
        return returning;
    }

    public void postMyPosition(String username, String latitude, String longitude, String actionId) {
        Users user = userService.getUserByUsername(username);
        Actions action = actionService.getActionById(Long.parseLong(actionId));
        SearcherPosition searcherPosition = new SearcherPosition(user, action, Double.parseDouble(latitude), Double.parseDouble(longitude));
        searcherPositionService.save(searcherPosition);
    }
}
