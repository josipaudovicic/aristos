package com.example.backend.korisnik.HelpingTables;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BelongsToStationService {
    private final BelongsToStationRepository belongsToStationRepository;

    public BelongsToStationService(BelongsToStationRepository belongsToStationRepository) {
        this.belongsToStationRepository = belongsToStationRepository;
    }

    public BelongsToStation save(BelongsToStation belongsToStation) {
        return belongsToStationRepository.save(belongsToStation);
    }

    public List<BelongsToStation> getAllPairs(String managerUsername) {
        BelongsToStation manager = belongsToStationRepository.findByUserName(managerUsername);
        return belongsToStationRepository.findAllByStationId(manager.getStationId());
    }
}
