package com.example.backend.korisnik.explorer;

import com.example.backend.korisnik.UserRepository;
import com.example.backend.korisnik.action.ActionService;
import com.example.backend.korisnik.action.Actions;
import com.example.backend.korisnik.animal.AnimalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ExplorerService {
    private final ActionService actionService;
    private final AnimalService animalService;

    @Autowired
    public ExplorerService(ActionService actionService, AnimalService animalService) {
        this.actionService = actionService;
        this.animalService = animalService;
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
}
