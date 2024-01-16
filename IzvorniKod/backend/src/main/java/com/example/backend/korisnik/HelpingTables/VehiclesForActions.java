package com.example.backend.korisnik.HelpingTables;

import com.example.backend.korisnik.action.Actions;
import com.example.backend.korisnik.vehicle.Vehicle;
import jakarta.persistence.*;

@Entity
public class VehiclesForActions {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long vehicleForActionId;
    @ManyToOne
    @JoinColumn(name = "action_id")
    private Actions action;
    @ManyToOne
    @JoinColumn(name = "vehicle_id")
    private Vehicle vehicle;

    public VehiclesForActions() {
    }

    public VehiclesForActions(Actions action, Vehicle vehicle) {
        this.action = action;
        this.vehicle = vehicle;
    }

    public Long getVehicleForActionId() {
        return vehicleForActionId;
    }

    public void setVehicleForActionId(Long vehicleForActionId) {
        this.vehicleForActionId = vehicleForActionId;
    }

    public Actions getAction() {
        return action;
    }

    public void setAction(Actions action) {
        this.action = action;
    }

    public Vehicle getVehicle() {
        return vehicle;
    }

    public void setVehicle(Vehicle vehicle) {
        this.vehicle = vehicle;
    }
}
