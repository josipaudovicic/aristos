package com.example.backend.korisnik.positions;

import com.example.backend.korisnik.action.ActionService;
import com.example.backend.korisnik.action.Actions;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SearcherPositionService {
    private final SearcherPositionRepository searcherPositionRepository;
    private final ActionService actionService;

    public SearcherPositionService(SearcherPositionRepository searcherPositionRepository, ActionService actionService) {
        this.searcherPositionRepository = searcherPositionRepository;
        this.actionService = actionService;
    }

    public SearcherPosition save(SearcherPosition searcherPosition) {
        return searcherPositionRepository.save(searcherPosition);
    }

    public List<SearcherPosition> findByAction(Long actionId) {
        Actions action = actionService.findById(actionId);
        return searcherPositionRepository.findByAction(action);
    }
}
