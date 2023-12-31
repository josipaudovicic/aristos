package com.example.backend.korisnik.action;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ActionService {
    private final ActionRepository actionRepository;

    public ActionService(ActionRepository actionRepository) {
        this.actionRepository = actionRepository;
    }

    public List<Actions> getActive(){
        return actionRepository.findByActionActiveAndStarted(true, true);
    }

    public List<Actions> getNonActive(){
        return actionRepository.findByActionActiveAndStarted(false, true);
    }

    public List<Actions> getNonStarted(){
        return actionRepository.findByStarted(false);
    }
}
