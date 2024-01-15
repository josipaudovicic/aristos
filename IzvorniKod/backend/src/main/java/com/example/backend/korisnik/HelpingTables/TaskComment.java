package com.example.backend.korisnik.HelpingTables;

import com.example.backend.korisnik.task.Task;
import jakarta.persistence.*;

@Entity
public class TaskComment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long taskCommentId;
    @ManyToOne
    @JoinColumn(name = "task_id")
    private Task task;
    private String comment;

    public TaskComment() {
    }

    public TaskComment(Task task, String comment) {
        this.task = task;
        this.comment = comment;
    }

    public Long getTaskCommentId() {
        return taskCommentId;
    }

    public void setTaskCommentId(Long taskCommentId) {
        this.taskCommentId = taskCommentId;
    }

    public Task getTask() {
        return task;
    }

    public void setTask(Task task) {
        this.task = task;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
