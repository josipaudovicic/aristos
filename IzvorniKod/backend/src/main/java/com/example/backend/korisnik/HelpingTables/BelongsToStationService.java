package com.example.backend.korisnik.HelpingTables;

public class BelongsToStationService {
    private final BelongsToStationRepository belongsToStationRepository;

    public BelongsToStationService(BelongsToStationRepository belongsToStationRepository) {
        this.belongsToStationRepository = belongsToStationRepository;
    }

    public BelongsToStation save(BelongsToStation belongsToStation) {
        return belongsToStationRepository.save(belongsToStation);
    }
}
