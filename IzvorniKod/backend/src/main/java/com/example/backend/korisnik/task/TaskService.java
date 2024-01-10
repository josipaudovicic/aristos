package com.example.backend.korisnik.task;

import com.example.backend.korisnik.action.Actions;
import com.example.backend.korisnik.positions.SearcherPosition;
import com.example.backend.korisnik.vehicle.Vehicle;
import org.springframework.stereotype.Service;

import java.util.List;

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
}
