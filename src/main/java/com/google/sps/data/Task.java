package com.google.sps.data;

/** a contact message */
public final class Task {

  private final String title;
  private final String desc;
  private final String time;
  private final long start;
  private final long end;

  public Task(String title, String desc, String time, long start, long end) {
    this.title = title;
    this.desc = desc;
    this.time = time;
    this.start = start;
    this.end = end;
  }
    
}
