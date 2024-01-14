package com.example.backend.korisnik.vehicle;

import org.springframework.stereotype.Service;

@Service
public class VehicleService {

        private final VehicleRepository vehicleRepository;

        public VehicleService(VehicleRepository vehicleRepository) {
            this.vehicleRepository = vehicleRepository;
        }

        public Vehicle findVehicleById(Long id) {
            return vehicleRepository.findById(id).orElseThrow(() ->
                    new IllegalStateException("Vehicle with id " + id + " does not exist!"));
        }
}
