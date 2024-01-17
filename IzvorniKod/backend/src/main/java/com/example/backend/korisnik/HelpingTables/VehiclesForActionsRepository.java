package com.example.backend.korisnik.HelpingTables;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VehiclesForActionsRepository extends JpaRepository<VehiclesForActions, Long> {
}
