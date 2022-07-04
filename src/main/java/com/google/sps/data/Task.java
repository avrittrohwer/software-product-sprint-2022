package com.google.sps.data;

/** a contact message */
public final class Task {

  private final int id;
  private final String title;
  private final String desc;
  private final String time;
  private final int user_id;

  public Task(String title, String desc, String time) {
    this.title = title;
    this.desc = desc;
    this.time = time;
    this.user_id = 0;
    this.id = 0;
  }
    
}
