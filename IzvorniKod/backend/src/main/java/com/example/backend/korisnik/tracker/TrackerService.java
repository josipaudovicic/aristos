package com.example.backend.korisnik.tracker;

import com.example.backend.korisnik.HelpingTables.BelongsToAction;
import com.example.backend.korisnik.HelpingTables.BelongsToActionService;
import com.example.backend.korisnik.HelpingTables.BelongsToStation;
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

    @Autowired
    public TrackerService(ActionService actionService, UserService userService, AnimalService animalService, UserCommentService userCommentService, BelongsToActionService belongsToActionService, SearcherPositionService searcherPositionService) {
        this.actionService = actionService;
        this.userService = userService;
        this.animalService = animalService;
        this.userCommentService = userCommentService;
        this.belongsToActionService = belongsToActionService;
        this.searcherPositionService = searcherPositionService;
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
}
