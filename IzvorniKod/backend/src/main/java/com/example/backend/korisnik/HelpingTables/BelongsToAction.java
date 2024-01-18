package com.example.backend.korisnik.HelpingTables;

import com.example.backend.korisnik.Users;
import com.example.backend.korisnik.action.Actions;
import com.example.backend.korisnik.vehicle.Vehicle;
import jakarta.persistence.*;

@Entity
@IdClass(BelongsToActionId.class)
public class BelongsToAction {
    @Id
    @ManyToOne
    @JoinColumn(name = "action_id")
    private Actions action;
    @Id
    @ManyToOne
    @JoinColumn(name = "user_name")
    private Users user;
    @ManyToOne
    @JoinColumn(name = "vehicle_id")
    private Vehicle vehicle;

    public BelongsToAction() {
    }

    public BelongsToAction(Actions action, Users user, Vehicle vehicle) {
        this.action = action;
        this.user = user;
        this.vehicle = vehicle;
    }

    public Actions getAction() {
        return action;
    }

    public void setAction(Actions action) {
        this.action = action;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }

    public Vehicle getVehicle() {
        return vehicle;
    }

    public void setVehicle(Vehicle vehicle) {
        this.vehicle = vehicle;
    }
}
