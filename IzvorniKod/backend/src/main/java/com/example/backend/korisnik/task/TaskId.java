package com.example.backend.korisnik.task;

import com.example.backend.korisnik.Users;

import java.io.Serializable;

public class TaskId implements Serializable {
    private Long taskId;
    private Users user;

    public Long getTaskId() {
        return taskId;
    }

    public void setTaskId(Long taskId) {
        this.taskId = taskId;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }
}
