package com.example.backend.korisnik.task;

import com.example.backend.korisnik.Users;
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

    public List<Users> getUsersByActionAndVehicle(Actions action, Vehicle vehicle) {
        List<Task> task = taskRepository.findByActionAndVehicle(action, vehicle);
        Set<Users> users = new HashSet<>();
        for (Task t : task) {
            users.add(t.getUser());
        }
        return List.copyOf(users);
    }

    public List<Task> getTasks(Actions action) {
        return taskRepository.findByAction(action);
    }

    public void save(Task task) {
        taskRepository.save(task);
    }

    public Task getTaskById(long l) {
        return taskRepository.findById(l).orElseThrow( () -> new RuntimeException("Task with id " + l + " does not exist!") );
    }

    public void delete(Task task) {
        taskRepository.delete(task);
    }

    public List<Task> getTasksByActionAndUser(Actions action, Users user) {
        return taskRepository.findByActionAndUser(action, user);
    }
}
