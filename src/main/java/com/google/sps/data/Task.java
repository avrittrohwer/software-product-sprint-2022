package com.google.sps.data;

/** a contact message */
public final class Task {

  private final Int id;
  private final String title;
  private final String desc;
  private final Int time;
  private final Int user_id;

  public Contact(String title, String desc, Int time) {
    this.title = title;
    this.desc = desc;
    this.time = time;
  }
    
}
