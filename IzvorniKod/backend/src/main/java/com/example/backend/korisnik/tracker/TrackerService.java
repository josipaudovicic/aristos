package com.example.backend.korisnik.tracker;

import com.example.backend.korisnik.UserService;
import com.example.backend.korisnik.Users;
import com.example.backend.korisnik.action.ActionService;
import com.example.backend.korisnik.action.Actions;
import com.example.backend.korisnik.animal.Animal;
import com.example.backend.korisnik.animal.AnimalService;
import com.example.backend.korisnik.comment.UserComment;
import com.example.backend.korisnik.comment.UserCommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class TrackerService {
    private final ActionService actionService;
    private final UserService userService;
    private final AnimalService animalService;
    private final UserCommentService userCommentService;

    @Autowired
    public TrackerService(ActionService actionService, UserService userService, AnimalService animalService, UserCommentService userCommentService) {
        this.actionService = actionService;
        this.userService = userService;
        this.animalService = animalService;
        this.userCommentService = userCommentService;
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
}
