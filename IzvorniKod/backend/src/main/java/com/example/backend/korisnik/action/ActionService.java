package com.example.backend.korisnik.action;

import com.example.backend.korisnik.UserService;
import com.example.backend.korisnik.Users;
import com.example.backend.korisnik.station.Station;
import com.example.backend.korisnik.station.StationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@Service
public class ActionService {
    private final ActionRepository actionRepository;
    private final StationService stationService;
    private final UserService userService;

    @Autowired
    public ActionService(ActionRepository actionRepository, StationService stationService, UserService userService) {
        this.actionRepository = actionRepository;
        this.stationService = stationService;
        this.userService = userService;
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

    public List<Actions> getAllActions(String username){
        Users user = userService.getUserByUsername(username);
        return actionRepository.findByUser(user);
    }

    public Actions getActionByName(String actionName) {
        return actionRepository.findByActionName(actionName);
    }

    public Actions findById(Long actionId) {
        return actionRepository.findById(actionId).orElse(null);
    }

    public Actions getActionById(Long actionId) {
        return actionRepository.findById(actionId).orElse(null);
    }

    public boolean isBetweenTime(Timestamp time, Actions action) {
        if (!action.getActionActive()){
            return time.after(action.getStartTime()) && time.before(action.getEndTime());
        }
        return time.after(action.getStartTime());
    }

    public void save(Actions action) {
        actionRepository.save(action);
    }
}
