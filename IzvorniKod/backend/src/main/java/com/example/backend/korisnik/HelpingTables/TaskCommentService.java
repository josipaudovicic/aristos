package com.example.backend.korisnik.HelpingTables;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskCommentService {
    private final TaskCommentRepository taskCommentRepository;

    public TaskCommentService(TaskCommentRepository taskCommentRepository) {
        this.taskCommentRepository = taskCommentRepository;
    }

    public TaskComment save(TaskComment taskComment) {
        return taskCommentRepository.save(taskComment);
    }

    public List<TaskComment> getAllComments() {
        return taskCommentRepository.findAll();
    }
}
