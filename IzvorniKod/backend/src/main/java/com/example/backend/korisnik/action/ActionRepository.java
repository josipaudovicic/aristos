package com.example.backend.korisnik.action;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ActionRepository extends JpaRepository<Actions, Long> {

    List<Actions> findByActionActiveAndStarted(boolean active, boolean started);
    List<Actions> findByStarted(boolean b);
}
