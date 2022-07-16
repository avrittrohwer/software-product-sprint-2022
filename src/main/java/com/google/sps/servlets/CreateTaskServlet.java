package com.google.sps.servlets;

import com.google.cloud.datastore.Datastore;
import com.google.cloud.datastore.DatastoreOptions;
import com.google.cloud.datastore.Entity;
import com.google.cloud.datastore.Key;
import com.google.cloud.datastore.PathElement;

import java.util.UUID;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/create-task")
public class CreateTaskServlet extends HttpServlet {

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

    // Get the value entered in the form.
    String userN = request.getParameter("userN");
    String title = request.getParameter("title");
    String desc = request.getParameter("desc");
    String time = request.getParameter("time");
    String username = request.getParameter("userN");
    if (username == null){
        
            response.sendError(400, "userN must be set");
            return;
        
    }
    // search for userID from userN in datastore 
    Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
    Key userKey = datastore.newKeyFactory().setKind("User").newKey(username);
    

    Entity user = datastore.get(userKey);
    if (user == null) {
        response.sendError(400, "user not found");
        return;
    }
    String currentTaskID = user.getString("currentTask");
    if (!currentTaskID.equals("")) {
        response.sendError(400, "the user has an active current task, they must complete their current task before creating a new one");
        return;
    }

    System.out.printf("create task: userN = %s \n", username);

    long curTime = System.currentTimeMillis(); 
    String taskID = UUID.randomUUID().toString();

    Key taskKey = datastore.newKeyFactory().addAncestor(PathElement.of("User",username)).setKind("Task").newKey(taskID);
    Entity taskEntity =
        Entity.newBuilder(taskKey)
            .set("title", title)
            .set("desc", desc)
            .set("time", time)
            .set("start", curTime)
            .set("end", curTime)
            .set("taskID", taskID)
            .build();
    datastore.put(taskEntity);

    user = Entity.newBuilder(user) 
        .set("currentTask", taskID)
        .build();
    datastore.put(user);

    // reload page 
    response.sendRedirect("/team?userN=" + username);
  }
}

