package com.example.backend.korisnik.HelpingTables;

import com.example.backend.korisnik.action.Actions;
import com.example.backend.korisnik.task.Task;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrackerCommentService {
    private final TrackerCommentRepository trackerCommentRepository;

    public TrackerCommentService(TrackerCommentRepository trackerCommentRepository) {
        this.trackerCommentRepository = trackerCommentRepository;
    }

    public TrackerComments save(TrackerComments trackerComments) {
        return trackerCommentRepository.save(trackerComments);
    }

    public List<TrackerComments> findByAction(Actions action) {
        return trackerCommentRepository.findByAction(action);
    }
}
