package com.example.backend.korisnik.HelpingTables;

import com.example.backend.korisnik.task.Task;
import com.example.backend.korisnik.task.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskCommentService {
    private final TaskCommentRepository taskCommentRepository;
    private final TaskService taskService;

    @Autowired
    public TaskCommentService(TaskCommentRepository taskCommentRepository, TaskService taskService) {
        this.taskCommentRepository = taskCommentRepository;
        this.taskService = taskService;
    }

    public TaskComment save(TaskComment taskComment) {
        return taskCommentRepository.save(taskComment);
    }

    public List<TaskComment> getAllComments() {
        return taskCommentRepository.findAll();
    }

    public List<TaskComment> getCommentsWithTaskId(long l) {
        Task task = taskService.getTaskById(l);
        return taskCommentRepository.findAllByTask(task);
    }
}
