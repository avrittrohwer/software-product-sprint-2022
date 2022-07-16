// Copyright 2020 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


function loadTeamView() {
    const params = new URLSearchParams(window.location.search);
    const user = params.get('userN');
    if (user == null || user == "") {
        const otherUser = document.getElementById('logbox');
        otherUser.classList.add("myNotasks");
        otherUser.innerHTML = "<h1 class='text-center' style='padding-top:30%; font-size: 50 vw'>NO USER LOGGED IN </h1> <h4 class='text-center' style='color:gray'>NO INFO TO SHOW</h4><h6 class='text-center' style='color:gray'>CLICK RED BUTTON TO RETURN TO LOG IN</h6>"
        const mytasks = document.getElementById('mytasks');
        mytasks.classList.add("myNotasks");
        mytasks.innerHTML = "<h1 class='text-center' style='padding-top:30%; font-size: 50 vw'>NO USER LOGGED IN </h1> <h4 class='text-center' style='color:gray'>NO INFO TO SHOW</h4><h6 class='text-center' style='color:gray'>CLICK RED BUTTON TO RETURN TO LOG IN</h6>"
        disableBtns(2);
    } else {
        const curtas = document.getElementById("currentTasks");
        curtas.innerText = "CURRENT TASK FOR: " + user.toUpperCase();
        const pastas = document.getElementById("pasttask");
        pastas.innerText = "PAST TASKS FOR: " + user.toUpperCase();
        fetch('/list-tasks?userN=' + user).then(response => response.json()).then((response) => {
            const curTask = document.getElementById('curtask');
            if (response.currentTask) {
                curTask.appendChild(createTaskElement(response.currentTask, user));
                disableBtns(0);
            } else {
                const noCurTaskDiv = document.createElement("div");
                noCurTaskDiv.innerHTML = "<h5 style='padding-top: 10vh' class='text-center text-light noTasks'>NO ON-GOING TASK.<br> Click the yellow button to create a new task!</H4>";
                curTask.appendChild(noCurTaskDiv);
                disableBtns(1);
            }
            const pastTask = document.getElementById('pasttasks');
            if (response.prevTasks.length == 0) {
                const noPrevTaskDiv = document.createElement("div");
                noPrevTaskDiv.innerHTML = "<h5 style='padding-top: 10vh' class='text-center text-light noTasks'>NO PREVIOUS TASKS.</H4>";
                pastTask.appendChild(noPrevTaskDiv);
            } else {
                response.prevTasks.forEach((task) => {
                    pastTask.appendChild(createTaskElement(task, user));
                })
            }
            const taskListElement = document.getElementById('users');
            const logbox = document.getElementById("logbox");
            if (response.otherUsers.length == 0) {
                const noUsersDiv = document.createElement("div");
                noUsersDiv.innerHTML = "<h5 style='padding-top: 35vh' class='text-center text-light noTasks'>NO OTHER BUDDIES :(</H4>";
                logbox.appendChild(noUsersDiv);
            } else {
                response.otherUsers.forEach((user) => {
                    taskListElement.appendChild(createTaskElement(user.currentTask, user.username));
                })
            }
        });
    }
}

function addUserNForm() {
    const params = new URLSearchParams(window.location.search);
    const user = params.get('userN');
    const inputs = document.querySelectorAll(".TaskUserName");
    for (i of inputs) {
        i.setAttribute("value", user);
    }

}


function createTaskElement(task, username) {
    if (!task) {
        const fulltask = document.createElement('div');
        fulltask.setAttribute("id", 'task');
        const taskElement = document.createElement('div');
        taskElement.className = 'users-drawer  rounded-1';
        //dentro de bloque, poner imagen de perfil
        const usPfp = document.createElement("i");
        usPfp.className = "bi bi-person-circle uspfp";

        //dentro de bloque, crear formato del texto de info
        const text = document.createElement("div");
        text.className = "text";

        //dentro de texto, crear primera fila
        const textRow1 = document.createElement("div");
        textRow1.className = "row m-0";
        //dentro de primera fila, crear columna 1
        const row1Col1 = document.createElement("div");
        row1Col1.className = "col-2 text-center";
        //dentro de columna 1, poner titulo/user name
        const r1c1h = document.createElement("h6");
        r1c1h.innerText = username;

        //dentro de primera fila, crear columna 2
        const row1Col2 = document.createElement("div");
        row1Col2.className = "col-1";
        //dentro de columna 2, poner icon de flecha
        const r1c2h = document.createElement("i");
        r1c2h.className = "bi bi-arrow-right flech";

        //dentro de primera fila, crear columna 3
        const row1Col3 = document.createElement("div");
        row1Col3.className = "col-9 fst-italic text-center";
        //dentro de columna 3, poner titulo task
        const r1c3h = document.createElement("h6");
        r1c3h.innerText = "NO CURRENT TASK FOR " + username.toUpperCase();

        row1Col1.appendChild(r1c1h);
        row1Col2.appendChild(r1c2h);
        row1Col3.appendChild(r1c3h);
        textRow1.appendChild(row1Col1);
        textRow1.appendChild(row1Col2);
        textRow1.appendChild(row1Col3);
        text.appendChild(textRow1);
        const hr = document.createElement('hr');
        taskElement.appendChild(usPfp);
        taskElement.appendChild(text);
        fulltask.appendChild(taskElement);
        fulltask.appendChild(hr);
        return fulltask;
    } else {
        const fulltask = document.createElement('div');
        fulltask.setAttribute("id", 'task');
        //crear bloque de info users
        const taskElement = document.createElement('div');
        taskElement.className = 'users-drawer  rounded-1';
        //dentro de bloque, poner imagen de perfil
        const usPfp = document.createElement("i");
        usPfp.className = "bi bi-person-circle uspfp";

        //dentro de bloque, crear formato del texto de info
        const text = document.createElement("div");
        text.className = "text";

        //dentro de texto, crear primera fila
        const textRow1 = document.createElement("div");
        textRow1.className = "row m-0";
        //dentro de primera fila, crear columna 1
        const row1Col1 = document.createElement("div");
        row1Col1.className = "col-2 ps-1";
        //dentro de columna 1, poner titulo/user name
        const r1c1h = document.createElement("h6");
        r1c1h.innerText = username;

        //dentro de primera fila, crear columna 2
        const row1Col2 = document.createElement("div");
        row1Col2.className = "col-1";
        //dentro de columna 2, poner icon de flecha
        const r1c2h = document.createElement("i");
        r1c2h.className = "bi bi-arrow-right flech";

        //dentro de primera fila, crear columna 3
        const row1Col3 = document.createElement("div");
        row1Col3.className = "col-3";
        //dentro de columna 3, poner titulo task
        const r1c3h = document.createElement("h6");
        r1c3h.innerText = task.title;


        //dentro de primera fila, crear columna 5
        const row1Col4 = document.createElement("div");
        row1Col4.className = "col-4 b ps-2";
        //dentro de columna 3, poner titulo task
        const r1c4h = document.createElement("h6");
        r1c4h.innerText = "Time Goal: " + task.time + " min";

        //dentro de primera fila, crear columna 5
        const row1Col5 = document.createElement("div");
        row1Col5.className = "col-1 text-center";
        //dentro de columna 3, poner titulo task
        const r1c5h = document.createElement("i");
        r1c5h.className = "bi bi-dash-lg";

        //dentro de primera fila, crear columna 4
        const row1Col6 = document.createElement("div");
        row1Col6.className = "col-1";
        //dentro de columna 3, poner titulo task
        const r1c6h = document.createElement("h6");
        r1c6h.innerText = format_time(task.timeCreated);




        //dentro de texto, crear segunda fila
        const textRow2 = document.createElement("div");
        textRow2.className = "row m-0";

        //dentro de segunda fila, crear columna 1
        const row2Col1 = document.createElement("div");
        row2Col1.className = "col-6";
        //dentro de columna 1, poner descrip
        const r2c1p = document.createElement("p");
        r2c1p.innerText = "Description: " + task.desc;

        //dentro de segunda fila, crear columna 3
        const row2Col2 = document.createElement("div");
        row2Col2.className = "col-2 text-center  b";
        //dentro de columna 3, poner collaborate status
        /*COLLABORATE
        const r2c2p = document.createElement("p");
        r2c2p.innerText = "Collaborate: ";
        */

        //dentro de segunda fila, crear columna 4
        const row2Col3 = document.createElement("div");
        row2Col3.className = "col-1";
        //dentro de columna 3, poner collaborate status

        /*const r2c3p = document.createElement("i");

        if (task.colla == "yes") {
            r2c3p.className = "bi bi-check-circle-fill";
            r2c3p.style = "color: green";
        }
        else if (task.colla == "no") {
            r2c3p.className = "bi bi-x-circle-fill";
            r2c3p.style = "color: rgb(150, 60, 60)";
        }
        */
        //dentro de segunda fila, crear columna 2
        const row2Col4 = document.createElement("div");
        row2Col4.className = "col-3 ps-5";
        //dentro de columna 2, poner timegoal
        /*STATUS
        const r2c4p = document.createElement("p");
        r2c4p.innerText = "Status: " + task.status;
        */

        row2Col1.appendChild(r2c1p);
        //row2Col2.appendChild(r2c2p); COLLABORATE
        //row2Col3.appendChild(r2c3p); COLLABORATE ICON
        //row2Col4.appendChild(r2c4p); STATUS
        textRow2.appendChild(row2Col1)
        textRow2.appendChild(row2Col2)
        textRow2.appendChild(row2Col3)
        textRow2.appendChild(row2Col4)

        row1Col1.appendChild(r1c1h);
        row1Col2.appendChild(r1c2h);
        row1Col3.appendChild(r1c3h);
        row1Col4.appendChild(r1c4h);
        row1Col5.appendChild(r1c5h);
        row1Col6.appendChild(r1c6h);
        textRow1.appendChild(row1Col1);
        textRow1.appendChild(row1Col2);
        textRow1.appendChild(row1Col3);
        textRow1.appendChild(row1Col4);
        textRow1.appendChild(row1Col5);
        textRow1.appendChild(row1Col6);

        text.appendChild(textRow1);
        text.appendChild(textRow2);

        const hr = document.createElement('hr');

        taskElement.appendChild(usPfp);
        taskElement.appendChild(text);

        fulltask.appendChild(taskElement);
        fulltask.appendChild(hr);

        return fulltask;
    }
}


function format_time(s) {
    const dtFormat = new Intl.DateTimeFormat('en-GB', { timeStyle: 'short' });
    return dtFormat.format(s);
}


function validateForm() {
    let tit = document.forms["newTask"]["title"].value;
    let des = document.forms["newTask"]["desc"].value;
    let min = document.forms["newTask"]["time"].value;
    let userna = document.forms["newTask"]["userN"].value;
    if (tit == "" || des == "" || min == "0" || min == "" || userna == "username") {
        alert("Enter valid values!!");
        return false;
    }
}

function validateFormMain() {
    let userna = document.forms["mainForm"]["username"].value;
    if (userna == " " || userna == ""|| userna == "  "|| userna == "   "|| userna == "    ") {
        alert("Enter valid values!!");
        return false;
    }
}


function disableBtns(stat) {
    if (stat == 0) { //NO CREATE BTN = ONGOING TASK(TRUE)
        document.getElementById('createTaskBtn').disabled = true;
        document.getElementById('endTaskBtn').disabled = false;
    }
    else if (stat == 1) { //NO FINISH BTN = ONGOING TASK(FALSE)
        document.getElementById('createTaskBtn').disabled = false;
        document.getElementById('endTaskBtn').disabled = true;
    }
    else if (stat == 2) { //NO CREATE, NO FINISH BTN = NO USER LOGGED IN
        document.getElementById('createTaskBtn').disabled = true;
        document.getElementById('endTaskBtn').disabled = true;
    }
}

/*FOR THE SELECT USER DROPDOWN
function validateFormUser() {
    let userna = document.forms["username"]["userN"].value;
    if (userna == "username") {
        alert("Enter valid values!!");
        return false;
    }
}
*/
