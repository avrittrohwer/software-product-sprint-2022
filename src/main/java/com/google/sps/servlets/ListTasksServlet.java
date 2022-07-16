package com.google.sps.servlets;

import com.google.cloud.datastore.Datastore;
import com.google.cloud.datastore.DatastoreOptions;
import com.google.cloud.datastore.Entity;
import com.google.cloud.datastore.Key;
import com.google.cloud.datastore.Query;
import com.google.cloud.datastore.QueryResults;
import com.google.cloud.datastore.PathElement;
import com.google.cloud.datastore.StructuredQuery.PropertyFilter;
import com.google.cloud.datastore.StructuredQuery.OrderBy;
import com.google.gson.Gson;
import com.google.sps.data.Task;
import com.google.sps.data.User;
import com.google.sps.data.Response;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

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

    // in the case where there is no userN parameter return an error 
    if (userN == null || userN == "") {
        response.sendError(400, "query parameter userN is not defined");
        return;
    }

    Key userKey = datastore.newKeyFactory().setKind("User").newKey(userN);
    Entity user = datastore.get(userKey);

    if (user == null) {
        response.sendError(400, "no such user entity found for this username, please create a user");
        return; 
    }
    
    String currentTaskID = user.getString("currentTask");
    Task currentTask = null;
    List<Task> prevTasks = new ArrayList<Task>();

    Query<Entity> currentUserTaskQuery =
        Query.newEntityQueryBuilder()
            .setKind("Task")
            .setFilter(PropertyFilter.hasAncestor(userKey))
            .setOrderBy(OrderBy.desc("start"))
            .build();
    QueryResults<Entity> currentUserTaskResults = datastore.run(currentUserTaskQuery);

    while (currentUserTaskResults.hasNext()) {
        Entity entity = currentUserTaskResults.next();
      
        String title = entity.getString("title");
        String desc = entity.getString("desc");
        String time = entity.getString("time");
        long start = entity.getLong("start"); 
        long end = entity.getLong("end");
        String taskID = entity.getString("taskID");
  
        System.out.printf("current user list tasks: title = %s, taskID = %s \n", title, taskID);
        Task task = new Task(title, desc, time, start, end);
        
        if (currentTaskID.equals(taskID)) {
            currentTask = task;
            continue;
        }
        prevTasks.add(task);
    }

    Query<Entity> userQuery =
    Query.newEntityQueryBuilder()
        .setKind("User")
        .setOrderBy(OrderBy.desc("currentTask"))
        .build();
    QueryResults<Entity> userResults = datastore.run(userQuery);

    List<User> otherUsers = new ArrayList<User>();

    while (userResults.hasNext()) {
        Entity entity = userResults.next();
        String duserN = entity.getString("userN");
        String dcurrentTaskID = entity.getString("currentTask");

        System.out.printf("list task: userN = %s, currentTask = %s \n", duserN, dcurrentTaskID);

        if (userN.equals(duserN)) {
            // current user information obtained in above while loop 
            continue;
        }
        
        if (dcurrentTaskID.equals("")) {
            otherUsers.add(new User(duserN, null));
        }
        else {
            Key taskKey = datastore.newKeyFactory().addAncestor(PathElement.of("User", duserN)).setKind("Task").newKey(dcurrentTaskID);
            Entity task = datastore.get(taskKey);
            if (task == null) {
                otherUsers.add(new User(duserN, null));
                continue;
            }
            System.out.println(task.toString());

            String title = task.getString("title");
            String desc = task.getString("desc");
            String time = task.getString("time");
            long start = task.getLong("start"); 
            long end = task.getLong("end");
            String taskID = task.getString("taskID");

            System.out.printf("other user current task: title = %s, taskID = %s \n", title, taskID);
            otherUsers.add(new User(duserN, new Task(title, desc, time, start, end)));
        }
    }
    
    Response allTasks = new Response(currentTask, prevTasks, otherUsers);

    Gson gson = new Gson();

    response.setContentType("application/json;");
    response.getWriter().println(gson.toJson(allTasks));
  }
}