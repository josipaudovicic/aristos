package com.example.backend.korisnik.HelpingTables;

import com.example.backend.korisnik.Users;
import com.example.backend.korisnik.action.Actions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BelongsToActionRepository extends JpaRepository<BelongsToAction, BelongsToActionId> {
    List<BelongsToAction> findByAction(Actions action);
    BelongsToAction findByActionAndUser(Actions action, Users user);

}
