package com.google.sps.servlets;

import com.google.cloud.datastore.Datastore;
import com.google.cloud.datastore.DatastoreOptions;
import com.google.cloud.datastore.Entity;
import com.google.cloud.datastore.Query;
import com.google.cloud.datastore.QueryResults;
import com.google.gson.Gson;
import com.google.sps.data.Task;
import com.google.sps.data.User;
import com.google.sps.data.Response;
import com.google.cloud.datastore.StructuredQuery.OrderBy;

import java.util.HashMap;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet responsible for listing contacts. */
@WebServlet("/list-tasks")
public class ListTasksServlet extends HttpServlet {

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {

    Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
    String userN = request.getParameter("userN");
    String userID = "";
    String currentTaskID = "";

    // in the case where there is no userN parameter return an error 
    if (userN == null || userN == "") {
        response.sendError(400, "query parameter userN is not defined");
        return;
    }

    Query<Entity> userQuery =
    Query.newEntityQueryBuilder().setKind("User").build();
    QueryResults<Entity> userResults = datastore.run(userQuery);

    List<User> otherUsers = new ArrayList();
    Map<String, String> usersWithCurrentTasks = new HashMap<String, String>();

    while (userResults.hasNext()) {
        Entity entity = userResults.next();
        String duserN = entity.getString("userN");
        String duserID = entity.getString("userID");
        String dcurrentTaskID = entity.getString("currentTask");

        //System.out.printf("list task: userN = %s, userID = %s, currentTask = %s \n", duserN, duserID, dcurrentTaskID);

        if (userN.equals(duserN)) {
            userID = duserID;
            currentTaskID = dcurrentTaskID;
            continue;
        }
        
        if (dcurrentTaskID.equals("")) {
            otherUsers.add(new User(duserN, null));
        }
        else {
            usersWithCurrentTasks.put(dcurrentTaskID, duserN);
        }
    }
    System.out.println("list tasks: " + currentTaskID);

    if (userID == "") {
        response.sendError(400, "no userID found for username");
        return;
    }

    Query<Entity> taskQuery =
        Query.newEntityQueryBuilder().setKind("Task").setOrderBy(OrderBy.desc("start")).build();
    QueryResults<Entity> taskResults = datastore.run(taskQuery);

    Task currentTask = null;
    List<Task> prevTasks = new ArrayList();

    while (taskResults.hasNext()) {
      Entity entity = taskResults.next();
    
      String title = entity.getString("title");
      String desc = entity.getString("desc");
      String time = entity.getString("time");
      long start = entity.getLong("start"); 
      long end = entity.getLong("end");
      String tuserID = entity.getString("userID");
      String taskID = entity.getString("taskID");

      //System.out.printf("list tasks: title = %s, userID = %s, taskID = %s \n", title, tuserID, taskID);
      Task task = new Task(title, desc, time, start, end);
      
      if (userID.equals(tuserID)) {
        if (currentTaskID.equals(taskID)) {
            currentTask = task;
            continue;
        }
        prevTasks.add(task);
        continue;
      }
      
      if (usersWithCurrentTasks.containsKey(taskID)) {
          otherUsers.add(new User (usersWithCurrentTasks.get(taskID), task));
      }
    }
    // there could be users in userswithcurrenttasks where datastore did not have a matching task id 
    // we should return these users with no current task
    
    Response allTasks = new Response(currentTask, prevTasks, otherUsers);

    Gson gson = new Gson();

    response.setContentType("application/json;");
    response.getWriter().println(gson.toJson(allTasks));
  }
}