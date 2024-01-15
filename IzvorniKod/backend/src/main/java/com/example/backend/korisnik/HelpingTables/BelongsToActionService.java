package com.example.backend.korisnik.HelpingTables;

import com.example.backend.korisnik.Users;
import com.example.backend.korisnik.action.ActionService;
import com.example.backend.korisnik.action.Actions;
import com.example.backend.korisnik.vehicle.Vehicle;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BelongsToActionService {
    private final BelongsToActionRepository belongsToActionRepository;
    private final ActionService actionService;

    public BelongsToActionService(BelongsToActionRepository belongsToActionRepository, ActionService actionService) {
        this.belongsToActionRepository = belongsToActionRepository;
        this.actionService = actionService;
    }

    public BelongsToAction save(BelongsToAction belongsToAction) {
        return belongsToActionRepository.save(belongsToAction);
    }

    public List<Users> getTrackers(Actions action) {
        List<BelongsToAction> users = belongsToActionRepository.findByAction(action);
        List<Users> kaoUser = new ArrayList<>();
        for (BelongsToAction b : users){
            kaoUser.add(b.getUser());
        }
        return kaoUser;
    }

    public Vehicle getVehicle(Actions action, Users user) {
        BelongsToAction belongsToAction = belongsToActionRepository.findByActionAndUser(action, user);
        return belongsToAction.getVehicle();
    }

    public List<BelongsToAction> getAllUsers(String actionName) {
        Actions action = actionService.getActionByName(actionName);
        return belongsToActionRepository.findByAction(action);
    }
}
