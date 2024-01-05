package com.example.backend.korisnik.station;

import org.springframework.data.jpa.repository.JpaRepository;

public interface StationRepository extends JpaRepository<Station, Long> {
    Station findByStationId(Long stationId);

}
