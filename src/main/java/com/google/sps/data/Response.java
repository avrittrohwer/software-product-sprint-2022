package com.google.sps.data;

import java.util.List;

public final class Response {
    private final Task currentTask;
    private final List<Task> prevTasks;
    private final List<User> otherUsers;
    
    public Response(Task curTask, List<Task> prevTasks, List<User> otherUsers) {
        this.currentTask = curTask;
        this.prevTasks = prevTasks;
        this.otherUsers = otherUsers;
    }
}
