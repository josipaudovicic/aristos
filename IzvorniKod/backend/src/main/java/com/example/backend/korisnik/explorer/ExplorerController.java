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

    @GetMapping(path = "/action/{actionName}")
    public List<Map<String, String>> getMap(@PathVariable String actionName, @RequestHeader("username") String username) {
        return explorerService.getHeatMap(actionName, username);
    }

    @GetMapping(path = "/map")
    public List<Map<String, String>> getMap() {
        //return explorerService.getMap();
        return null;
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
    public void postComment(@PathVariable Long id, @RequestParam("comment") String comment, @RequestParam("username") String username) {
        explorerService.postComment(id, comment, username);
    }


}
