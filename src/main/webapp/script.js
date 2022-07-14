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
  fetch('/list-tasks?userN=bobby').then(response => response.json()).then((allTasks) => {
    const taskListElement = document.getElementById('users');

    console.log(allTasks);
    const curTaskHeader = document.createElement(h2);
    curTaskHeader.innerText = "Current Task";
    taskListElement.append(curTaHeader);
    taskListElement.append(allTasks.currentTask);
    
    const prevTaskHeader = document.createElement(h2);
    prevTaskHeader.innerText = "Previous Tasks";
    allTasks.prevTasks.forEach((task) => {
      taskListElement.appendChild(createTaskElement(task));
    })

    const otherTaskHeader = document.createElement(h2);
    otherTaskHeader.innerText = "Other Members Tasks";
    allTasks.otherTasks.forEach((task) => {
      taskListElement.appendChild(createTaskElement(task));
    })
  });
}

function createTaskElement(task) {  
  const taskElement = document.createElement('div');
  taskElement.className = 'task';

  const br = document.createElement("br");
  const taskTitleElement = document.createElement('h3');
  taskTitleElement.innerText = task.title;

  const taskDescElement = document.createElement('p');
  taskDescElement.innerText = task.desc;

  taskElement.appendChild(taskTitleElement);
  taskElement.appendChild(br);
  taskElement.appendChild(taskDescElement);
  return taskElement;
}