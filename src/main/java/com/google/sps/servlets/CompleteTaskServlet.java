package com.google.sps.servlets;

import com.google.cloud.datastore.Datastore;
import com.google.cloud.datastore.DatastoreOptions;
import com.google.cloud.datastore.Entity;
import com.google.cloud.datastore.Key;
import com.google.cloud.datastore.PathElement;

import java.io.IOException;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet responsible for listing contacts. */
@WebServlet("/complete-task")
public class CompleteTaskServlet extends HttpServlet {

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
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
        response.sendError(400, "user not found");
        return;
    }

    String currentTaskID = user.getString("currentTask");
    if (currentTaskID.equals("")) {
        response.sendRedirect("/team?userN=" + userN);
        return;
    }

    System.out.printf("complete task: userN = %s, currentTask = %s \n", userN, currentTaskID);

    user = Entity.newBuilder(user) 
        .set("currentTask", "")
        .build();
    datastore.put(user);


    Key taskKey = datastore.newKeyFactory().addAncestor(PathElement.of("User", userN)).setKind("Task").newKey(currentTaskID);
    Entity task = datastore.get(taskKey);
    if (task == null) {
        response.sendError(400, "task not found");
        return;
    }

    task = Entity.newBuilder(task) 
        .set("end", System.currentTimeMillis())
        .build();
    datastore.put(task);
    
    response.sendRedirect("/team?userN=" + userN);
  }
}