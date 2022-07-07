package com.google.sps.data;

/** a contact message */
public final class Task {

  private final int id;
  private final String userN;
  private final String title;
  private final String desc;
  private final String time;
  private final long timeCreated;
  private final int user_id;

  public Task(String userN, String title, String desc, String time, long timeCreated) {
    this.userN = userN;
    this.title = title;
    this.desc = desc;
    this.time = time;
    this.timeCreated = timeCreated;
    this.user_id = 0;
    this.id = 0;
  }
    
}
