package com.example.backend.korisnik.positions;

import org.springframework.stereotype.Service;

@Service
public class SearcherPositionService {
    private final SearcherPositionRepository searcherPositionRepository;

    public SearcherPositionService(SearcherPositionRepository searcherPositionRepository) {
        this.searcherPositionRepository = searcherPositionRepository;
    }

    public SearcherPosition save(SearcherPosition searcherPosition) {
        return searcherPositionRepository.save(searcherPosition);
    }
}
