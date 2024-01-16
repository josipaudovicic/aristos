package com.example.backend.korisnik.station;

import com.example.backend.korisnik.HelpingTables.BelongsToStation;
import com.example.backend.korisnik.HelpingTables.BelongsToStationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

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

    public List<Station> getAllStations() {
        return stationRepository.findAll();
    }

    public List<Station> getUsableStations(){
        Set<Station> usableStations = new HashSet<>();
        List<BelongsToStation> belongsToStations = belongsToStationRepository.findAll();
        for (BelongsToStation belongsToStation : belongsToStations) {
            usableStations.add(stationRepository.findByStationId(belongsToStation.getStationId()));
        }
        return List.copyOf(usableStations);
    }

    public Station getStationByName(String stationName) {
        return stationRepository.findByStationName(stationName);
    }

    public Station getStationById(Long stationId) {
        return stationRepository.findByStationId(stationId);
    }
}
