package com.google.sps.servlets;

import com.google.cloud.datastore.Datastore;
import com.google.cloud.datastore.DatastoreOptions;
import com.google.cloud.datastore.Key;
import com.google.cloud.datastore.Entity;
import com.google.cloud.datastore.FullEntity;
import com.google.cloud.datastore.Query;
import com.google.cloud.datastore.QueryResults;
import com.google.cloud.datastore.KeyFactory;
import com.google.cloud.datastore.NullValue;
import com.google.sps.data.User;

import java.util.UUID;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/create-user")
public class CreateUserServlet extends HttpServlet {

  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

    // Get the value entered in the form.
    String username = request.getParameter("username").trim();

    if (username == null || username == "") {
        response.sendError(400, "empty username");
    }

    Datastore datastore = DatastoreOptions.getDefaultInstance().getService();
    Key userKey = datastore.newKeyFactory().setKind("User").newKey(username);
    Entity user = datastore.get(userKey);

    if (user == null) {
        String userID = UUID.randomUUID().toString();
        KeyFactory keyFactory = datastore.newKeyFactory().setKind("User");
        FullEntity taskEntity =
            Entity.newBuilder(keyFactory.newKey(username))
                .set("userN", username)
                .set("userID", userID)
                .set("currentTask", "")
                .build();
        datastore.put(taskEntity);
    }
 
    response.sendRedirect("/team?userN=" + username);
  }
}

