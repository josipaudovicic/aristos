package com.example.backend.korisnik.action;

import com.example.backend.korisnik.Users;
import com.example.backend.korisnik.station.Station;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ActionRepository extends JpaRepository<Actions, Long> {

    List<Actions> findByActionActiveAndStartedAndStation(boolean active, boolean started, Station station);
    List<Actions> findByStartedAndStation(boolean b, Station station);
    List<Actions> findByUser(Users user);
    Actions findByActionName(String actionName);
}
