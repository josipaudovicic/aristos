package com.example.backend.korisnik.task;

import com.example.backend.korisnik.Users;
import com.example.backend.korisnik.action.Actions;
import com.example.backend.korisnik.animal.Animal;
import com.example.backend.korisnik.vehicle.Vehicle;
import jakarta.persistence.*;

@Entity
@IdClass(TaskId.class)
public class Task {
    @Id
    private Long taskId;
    @Id
    @ManyToOne
    @JoinColumn(name = "user_name")
    private Users user;
    private String taskText;
    private boolean done;
    @ManyToOne
    @JoinColumn(name = "action_id")
    private Actions action;
    @ManyToOne
    @JoinColumn(name = "animal_id")
    private Animal animal;
    @ManyToOne
    @JoinColumn(name = "vehicle_id")
    private Vehicle vehicle;
}
