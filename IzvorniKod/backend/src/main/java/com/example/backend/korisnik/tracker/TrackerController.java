package com.example.backend.korisnik.tracker;

import com.example.backend.korisnik.explorer.ExplorerService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "/tracker")
public class TrackerController {
    private final TrackerService trackerService;

    public TrackerController(TrackerService trackerService) {
        this.trackerService = trackerService;
    }


    @GetMapping(path = "/animals")
    public List<String> getAnimals() {
        return trackerService.getAnimals();
    }

    @GetMapping(path = "/animals/species")
    public List<String> getSpecies(@RequestHeader("animal") String animal) {
        return trackerService.getSpecies(animal);
    }

    @GetMapping(path = "/animals/species/{id}")
    public Map<String, String> getIndividualById(@PathVariable Long id) {
        return trackerService.getIndividualById(id);
    }

    @GetMapping(path = "/animals/species/{id}/comments")
    public List<Map<String, String>> getComments(@PathVariable Long id) {
        return trackerService.getComments(id);
    }

    @PostMapping(path = "/animals/species/{id}/comment")
    public void postComment(@PathVariable Long id, @RequestBody Map<String, String> body) {
        trackerService.postComment(id, body.get("comment"), body.get("username"));
    }

    @GetMapping(path = "/action")
    public Map<String, String> getAction(@RequestHeader("username") String username) {
        return trackerService.getAction(username);
    }

    @GetMapping(path = "/action/trackers")
    public List<Map<String, String>> getTrackers(@RequestHeader("actionName") String actionName, @RequestHeader("username") String username) {
        return trackerService.getTrackers(actionName, username);
    }
}
