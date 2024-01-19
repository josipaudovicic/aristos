package com.example.backend.korisnik.HelpingTables;

import com.example.backend.korisnik.action.Actions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TrackerCommentRepository extends JpaRepository<TrackerComments, Long> {
    List<TrackerComments> findByAction(Actions action);
}
