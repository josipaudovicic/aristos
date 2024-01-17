package com.example.backend.korisnik.HelpingTables;

import org.springframework.stereotype.Service;

@Service
public class VehiclesForActionsService {

        private final VehiclesForActionsRepository vehiclesForActionsRepository;

        public VehiclesForActionsService(VehiclesForActionsRepository vehiclesForActionsRepository) {
            this.vehiclesForActionsRepository = vehiclesForActionsRepository;
        }

        public VehiclesForActions save(VehiclesForActions vehiclesForActions) {
            return vehiclesForActionsRepository.save(vehiclesForActions);
        }
}
