package com.example.backend.korisnik.explorer;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "/explorer")
public class ExplorerController {

    private final ExplorerService explorerService;

    public ExplorerController(ExplorerService explorerService) {
        this.explorerService = explorerService;
    }

    @GetMapping(path = "/actions")
    public List<Map<String, String>> getActions(@RequestHeader("username") String username) {
        return explorerService.getActions(username);
    }

    @GetMapping(path = "/action/{actionName}/tracker")
    public List<Map<String, String>> getMap(@PathVariable String actionName, @RequestHeader("username") String username) {
        return explorerService.getHeatMapOfTracker(actionName, username);
    }

    @GetMapping(path = "/action/{actionName}/vehicle")
    public List<Map<String, String>> getVehicles(@PathVariable String actionName, @RequestHeader("vehicle") String vehicle) {
        return explorerService.getHeatMapOfVehicle(actionName, vehicle);
    }

    @GetMapping(path = "/action/{actionName}/trackers")
    public Map<String, List<Map<String, String>>> getTrackers(@PathVariable String actionName) {
        return explorerService.getTrackersAndVehicles(actionName);
    }

    @GetMapping(path="/actions/station")
    public List<String> getStations(){
        return explorerService.getStations();
    }

    @GetMapping(path = "/animals")
    public List<String> getAnimals() {
        return explorerService.getAnimals();
    }

    @GetMapping(path = "/animals/species")
    public List<String> getSpecies(@RequestHeader("animal") String animal) {
        return explorerService.getSpecies(animal);
    }

    @GetMapping(path = "/animals/species/{id}")
    public Map<String, String> getIndividualById(@PathVariable Long id) {
        return explorerService.getIndividualById(id);
    }

    @GetMapping(path = "/animals/species/{id}/comments")
    public List<Map<String, String>> getComments(@PathVariable Long id) {
        return explorerService.getComments(id);
    }

    @PostMapping(path = "/animals/species/{id}/comment")
    public void postComment(@PathVariable Long id, @RequestBody Map<String, String> body) {
        explorerService.postComment(id, body.get("comment"), body.get("username"));
    }

    @GetMapping(path = "/map/species")
    public List<Map<String, String>> getMapSpecies(@RequestHeader("animal") String animal) {
        return explorerService.getMapSpecies(animal);
    }

    @GetMapping(path = "/map/species/{id}")
    public List<Map<String, String>> getMapIndividual(@PathVariable Long id) {
        return explorerService.getMapIndividual(id);
    }

    @GetMapping(path = "/action/info/tasks")
    public List<Map<String, String>> getTasks(@RequestHeader("actionName") String action) {
        return explorerService.getTasks(action);
    }

}
