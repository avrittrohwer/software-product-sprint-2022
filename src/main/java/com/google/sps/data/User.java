package com.google.sps.data;
import com.google.sps.data.Task;

public class User {
    
  private final String username;
  private final Task currentTask;

  public User(String username,  Task currentTask) {
    this.username = username;
    this.currentTask = currentTask;
  }
    
    
}
