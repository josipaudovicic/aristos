package com.example.backend.korisnik.action;

import com.example.backend.korisnik.UserService;
import com.example.backend.korisnik.station.Station;
import com.example.backend.korisnik.station.StationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ActionService {
    private final ActionRepository actionRepository;
    private final StationService stationService;

    @Autowired
    public ActionService(ActionRepository actionRepository, StationService stationService) {
        this.actionRepository = actionRepository;
        this.stationService = stationService;
    }

    public List<Actions> getActive(String username){
        Station station = stationService.getStationByUserName(username);
        return actionRepository.findByActionActiveAndStartedAndStation(true, true, station);
    }

    public List<Actions> getNonActive(String username){
        Station station = stationService.getStationByUserName(username);
        return actionRepository.findByActionActiveAndStartedAndStation(false, true, station);
    }

    public List<Actions> getNonStarted(String username){
        Station station = stationService.getStationByUserName(username);
        return actionRepository.findByStartedAndStation(false, station);
    }
}
