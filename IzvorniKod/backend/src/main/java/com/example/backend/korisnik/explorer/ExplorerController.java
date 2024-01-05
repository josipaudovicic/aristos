package com.example.backend.korisnik.explorer;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    @GetMapping(path = "/map")
    public List<Map<String, String>> getMap() {
        //return explorerService.getMap();
        return null;
    }

    @GetMapping(path = "/animals")
    public List<String> getAnimals() {
        return explorerService.getAnimals();
    }
}
