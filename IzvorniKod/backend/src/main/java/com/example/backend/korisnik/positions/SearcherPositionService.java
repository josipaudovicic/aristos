package com.example.backend.korisnik.positions;

import com.example.backend.korisnik.Users;
import com.example.backend.korisnik.action.ActionService;
import com.example.backend.korisnik.action.Actions;
import com.example.backend.korisnik.task.TaskService;
import com.example.backend.korisnik.vehicle.Vehicle;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SearcherPositionService {
    private final SearcherPositionRepository searcherPositionRepository;
    private final ActionService actionService;
    private final TaskService taskService;

    public SearcherPositionService(SearcherPositionRepository searcherPositionRepository, ActionService actionService, TaskService taskService) {
        this.searcherPositionRepository = searcherPositionRepository;
        this.actionService = actionService;
        this.taskService = taskService;
    }

    public SearcherPosition save(SearcherPosition searcherPosition) {
        return searcherPositionRepository.save(searcherPosition);
    }

    public List<SearcherPosition> findByAction(Long actionId) {
        Actions action = actionService.findById(actionId);
        return searcherPositionRepository.findByAction(action);
    }

    public List<SearcherPosition> findByActionAndUser(Actions action, Users user) {
        return searcherPositionRepository.findByActionAndUser(action, user);
    }

    public List<SearcherPosition> findByActionAndVehicle(Actions action, Vehicle vehicle) {
        List<Users> users = taskService.getUsersByActionAndVehicle(action, vehicle);
        List<SearcherPosition> searcherPositions = searcherPositionRepository.findByAction(action);
        List<SearcherPosition> filteredUsers = new java.util.ArrayList<>();
        for (SearcherPosition sp : searcherPositions) {
            if (actionService.isBetweenTime(sp.getTimeStamp(), action) && users.contains(sp.getUser())) {
                filteredUsers.add(sp);
            }
        }
        return filteredUsers;
    }
}
