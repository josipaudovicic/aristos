package com.example.backend.korisnik.vehicle;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
    String findVehicleNameByVehicleId(Long vehicleId);
    Vehicle findByVehicleName(String vehicleName);
}
