package com.example.backend.korisnik.task;

import com.example.backend.korisnik.action.Actions;
import com.example.backend.korisnik.positions.SearcherPosition;
import com.example.backend.korisnik.vehicle.Vehicle;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class TaskService {

    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public Vehicle getVehicleByActionAndUserName(Actions action, SearcherPosition searcher) {
        List<Task> tasks = taskRepository.findByActionAndUser(action, searcher.getUser());
        for (Task t : tasks) {
            System.out.println("vehicle: " + t.getVehicle().getVehicleName());
        }
        return tasks.get(0).getVehicle();
    }

    public List<Vehicle> getVehiclesByAction(Actions action) {
        List<Task> task = taskRepository.findByAction(action);
        Set<Vehicle> vehicles = new HashSet<>();
        for (Task t : task) {
            vehicles.add(t.getVehicle());
        }
        return List.copyOf(vehicles);
    }
}
