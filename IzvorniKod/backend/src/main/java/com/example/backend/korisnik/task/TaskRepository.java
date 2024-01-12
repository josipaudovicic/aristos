package com.example.backend.korisnik.task;

import com.example.backend.korisnik.Users;
import com.example.backend.korisnik.action.Actions;
import com.example.backend.korisnik.vehicle.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, TaskId> {
    List<Task> findByActionAndUser(Actions action, Users user);
    List<Task> findByAction(Actions action);
}
