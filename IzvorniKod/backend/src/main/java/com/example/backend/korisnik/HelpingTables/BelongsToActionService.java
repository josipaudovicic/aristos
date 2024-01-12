package com.example.backend.korisnik.HelpingTables;

import com.example.backend.korisnik.Users;
import com.example.backend.korisnik.action.Actions;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BelongsToActionService {
    private final BelongsToActionRepository belongsToActionRepository;

    public BelongsToActionService(BelongsToActionRepository belongsToActionRepository) {
        this.belongsToActionRepository = belongsToActionRepository;
    }

    public BelongsToAction save(BelongsToAction belongsToAction) {
        return belongsToActionRepository.save(belongsToAction);
    }

    public List<Users> getTrackers(Actions action) {
        return belongsToActionRepository.findByAction(action);
    }
}
