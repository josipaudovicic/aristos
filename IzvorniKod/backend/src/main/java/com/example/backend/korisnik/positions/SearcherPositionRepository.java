package com.example.backend.korisnik.positions;

import com.example.backend.korisnik.Users;
import com.example.backend.korisnik.action.Actions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SearcherPositionRepository extends JpaRepository<SearcherPosition, SearcherPositionId> {
    List<SearcherPosition> findByAction(Actions action);
    List<SearcherPosition> findByActionAndUser(Actions action, Users user);
}
