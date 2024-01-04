package com.example.backend.korisnik.HelpingTables;

import com.example.backend.korisnik.station.Station;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BelongsToStationRepository extends JpaRepository<BelongsToStation, BelongsToStationId> {
    boolean existsByUserName(String username);

    Long getStationIdByUserName(String userName);

    Station findByUserName(String username);
}
