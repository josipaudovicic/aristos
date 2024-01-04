package com.example.backend.korisnik.station;

import com.example.backend.korisnik.HelpingTables.BelongsToStationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StationService {
    private final StationRepository stationRepository;
    private final BelongsToStationRepository belongsToStationRepository;

    @Autowired
    public StationService(StationRepository stationRepository, BelongsToStationRepository belongsToStationRepository) {
        this.stationRepository = stationRepository;
        this.belongsToStationRepository = belongsToStationRepository;
    }

    public Station getStation(Long stationId){
        return stationRepository.findByStationId(stationId);
    }

    public Station getStationByUserName(String username){
        return stationRepository.findByStationId(belongsToStationRepository.findByUserName(username).getStationId());
    }
}
