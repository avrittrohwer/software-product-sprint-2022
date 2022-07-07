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

/**
 * Adds a random greeting to the page.
 */
function addRandomGreeting() {
  const greetings =
      ['Hello world!', '¡Hola Mundo!', '你好，世界！', 'Bonjour le monde!'];

  // Pick a random greeting.
  const greeting = greetings[Math.floor(Math.random() * greetings.length)];

  // Add it to the page.
  const greetingContainer = document.getElementById('greeting-container');
  greetingContainer.innerText = greeting;
}

function loadTeamView() {
  fetch('/list-tasks').then(response => response.json()).then((tasks) => {
    const taskListElement = document.getElementById('users');
    tasks.forEach((task) => {
      taskListElement.appendChild(createTaskElement(task));
    })
  });
}

function loadUserView() {
    fetch('/list-tasks').then(response => response.json()).then((tasks) => {
        const pastTask = document.getElementById('pasttasks');
        const curTask = document.getElementById('curtask');
        const params = new URLSearchParams(window.location.search);
        const user = params.get('userN');
        tasks.forEach((task) => {
            if(task.userN == user){
                pastTask.appendChild(createTaskElement(task));
                curTask.appendChild(createTaskElement(task));
            }
        })
    });
}

//past createTaskElement function
/*
function createTaskElement(task) {  
  const taskElement = document.createElement('div');
  taskElement.className = 'task';

  const br = document.createElement("br");
  const taskTitleElement = document.createElement('h3');
  taskTitleElement.innerText = task.title;

  const taskDescElement = document.createElement('p');
  taskDescElement.innerText = task.desc;

  const taskTimeElement = document.createElement('p');
  taskTimeElement.innerText = task.time.toString();

  taskElement.appendChild(taskTitleElement);
  taskElement.appendChild(br);
  taskElement.appendChild(taskDescElement);
  taskElement.appendChild(br);
  taskElement.appendChild(taskTimeElement);
  return taskElement;
}*/



function createTaskElement(task) {  
    const fulltask = document.createElement('div');
    fulltask.className = 'task';

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
    row1Col1.className = "col-3";
    //dentro de columna 1, poner titulo/user name
    const r1c1h = document.createElement("h6");
    r1c1h.innerText = task.userN;

    //dentro de primera fila, crear columna 2
    const row1Col2 = document.createElement("div");
    row1Col2.className = "col-1";
    //dentro de columna 2, poner icon de flecha
    const r1c2h = document.createElement("i");
    r1c2h.className = "bi bi-arrow-right flech";

    //dentro de primera fila, crear columna 3
    const row1Col3 = document.createElement("div");
    row1Col3.className = "col-7";
    //dentro de columna 3, poner titulo task
    const r1c3h = document.createElement("h6");
    r1c3h.innerText = task.title;

    //dentro de primera fila, crear columna 4
    const row1Col4 = document.createElement("div");
    row1Col4.className = "col-1";
    //dentro de columna 3, poner titulo task
    const r1c4h = document.createElement("p");
    r1c4h.innerText = format_time(task.timeCreated);

    //dentro de texto, crear segunda fila
    const textRow2 = document.createElement("div");
    textRow2.className = "row m-0";

    //dentro de segunda fila, crear columna 1
    const row2Col1 = document.createElement("div");
    row2Col1.className = "col";
    //dentro de columna 1, poner descrip
    const r2c1p = document.createElement("p");
    r2c1p.innerText = "Description: " + task.desc;

    //dentro de segunda fila, crear columna 2
    const row2Col2 = document.createElement("div");
    row2Col2.className = "col";
    //dentro de columna 1, poner descrip
    const r2c2p = document.createElement("p");
    r2c2p.innerText = "Time Goal: " + task.time.toString() + " min";

    row2Col1.appendChild(r2c1p);
    row2Col2.appendChild(r2c2p);
    textRow2.appendChild(row2Col1)
    textRow2.appendChild(row2Col2)

    row1Col1.appendChild(r1c1h);
    row1Col2.appendChild(r1c2h);
    row1Col3.appendChild(r1c3h);
    row1Col4.appendChild(r1c4h);
    textRow1.appendChild(row1Col1);
    textRow1.appendChild(row1Col2);
    textRow1.appendChild(row1Col3);
    textRow1.appendChild(row1Col4);

    text.appendChild(textRow1);
    text.appendChild(textRow2);

    const hr = document.createElement('hr');

    taskElement.appendChild(usPfp);
    taskElement.appendChild(text);

    fulltask.appendChild(taskElement);
    fulltask.appendChild(hr);


    /*const br = document.createElement("br");
    const taskTitleElement = document.createElement('h3');
    taskTitleElement.innerText = task.title;
  
    const taskDescElement = document.createElement('p');
    taskDescElement.innerText = task.desc;
  
    const taskTimeElement = document.createElement('p');
    taskTimeElement.innerText = task.time.toString();
  
    taskElement.appendChild(taskTitleElement);
    taskElement.appendChild(br);
    taskElement.appendChild(taskDescElement);
    

    text.appendChild(text);*/
    return fulltask;
}

function format_time(s) {
    const dtFormat = new Intl.DateTimeFormat('en-GB', {timeStyle: 'short' });
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

  function validateFormUser() {
    let userna = document.forms["username"]["userN"].value;
    if (userna == "username") {
      alert("Enter valid values!!");
      return false;
    }
  }