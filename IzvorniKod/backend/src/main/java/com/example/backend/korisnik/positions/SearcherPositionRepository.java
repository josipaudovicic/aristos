package com.example.backend.korisnik.positions;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SearcherPositionRepository extends JpaRepository<SearcherPosition, SearcherPositionId> {
}
