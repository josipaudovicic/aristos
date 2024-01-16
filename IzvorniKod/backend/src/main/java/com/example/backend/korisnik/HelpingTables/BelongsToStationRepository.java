package com.example.backend.korisnik.HelpingTables;

import com.example.backend.korisnik.station.Station;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BelongsToStationRepository extends JpaRepository<BelongsToStation, BelongsToStationId> {
    boolean existsByUserName(String username);
    Long getStationIdByUserName(String userName);
    BelongsToStation findByUserName(String username);
    List<BelongsToStation> findAllByStationId(Long stationId);
}
