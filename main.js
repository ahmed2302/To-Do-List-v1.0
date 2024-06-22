let title = document.querySelector(".input .title");
let content = document.querySelector(".input .content");
let submit = document.querySelector("button");
let list = document.querySelector(".list");
let claerbtn = document.querySelector(".clear");

title.addEventListener("keypress", (event) => {
  if (event.keyCode === 13) submit.click();
});

content.addEventListener("keypress", (event) => {
  if (event.keyCode === 13) submit.click();
});

let arrayOfTasks = [];
if (localStorage.getItem("tasks")) {
  arrayOfTasks = getTaskFromLocalStroage();
  addTaskToPage(arrayOfTasks);
}

list.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    removeTaskFromLocalStorage(e.target.parentElement.getAttribute("data-id"));
    if (arrayOfTasks.length == 0) {
      removeAll();
    }
    e.target.parentElement.remove();
  }
  if (
    e.target.classList.contains("task") ||
    e.target.parentElement.classList.contains("task")
  ) {
    toggleStatus(e.target.getAttribute("data-id"));
    toggleStatus(e.target.parentElement.getAttribute("data-id"));
    e.target.classList.toggle("done");
    e.target.parentElement.classList.toggle("done");
  }
  if (e.target.classList.contains("clear")) {
    removeAll();
  }
});

submit.onclick = function () {
  if (title.value !== "" && content.value !== "") {
    addTaskToArray(title.value, content.value);
    title.value = "";
    content.value = "";
  }
};

function addTaskToArray(title, content) {
  const task = {
    id: Date.now(),
    title: title,
    body: content,
    completed: false,
    time: getTime(),
    date: getDate(),
  };
  arrayOfTasks.push(task);
  addTaskToPage(arrayOfTasks);
  addTaskToLocalStorage(arrayOfTasks);
}

function addTaskToPage(arrayOfTasks) {
  list.innerHTML = "";
  if (arrayOfTasks != "") {
    let clear = document.createElement("span");
    clear.classList.add("clear");
    clear.appendChild(document.createTextNode("Clear"));
    list.appendChild(clear);
  }
  arrayOfTasks.forEach((task) => {
    let tasks = document.createElement("span");
    tasks.classList.add("task");
    if (task.completed) tasks.classList.add("done");
    tasks.setAttribute("data-id", task.id);

    let header = document.createElement("h3");
    header.classList.add("title");
    header.appendChild(document.createTextNode(task.title));
    tasks.appendChild(header);

    let body = document.createElement("p");
    body.classList.add("body");
    body.appendChild(document.createTextNode(task.body));
    tasks.appendChild(body);

    let del = document.createElement("span");
    del.classList.add("del");
    del.appendChild(document.createTextNode("X"));
    tasks.appendChild(del);

    let date = document.createElement("span");
    date.classList.add("date");
    date.appendChild(document.createTextNode(task.date));
    tasks.appendChild(date);

    let time = document.createElement("span");
    time.classList.add("time");
    time.appendChild(document.createTextNode(task.time));
    tasks.appendChild(time);

    list.appendChild(tasks);
  });
}

function addTaskToLocalStorage(arrayOfTasks) {
  localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getTaskFromLocalStroage() {
  let data = localStorage.getItem("tasks");
  if (data) {
    let task = JSON.parse(data);
    addTaskToPage(task);
    return task;
  }
}

function removeTaskFromLocalStorage(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addTaskToLocalStorage(arrayOfTasks);
}

function toggleStatus(taskId) {
  arrayOfTasks.forEach((task) => {
    if (task.id == taskId) {
      task.completed == true
        ? (task.completed = false)
        : (task.completed = true);
    }
  });
  addTaskToLocalStorage(arrayOfTasks);
}

function removeAll() {
  localStorage.clear();
  arrayOfTasks = [];
  list.innerHTML = "";
}

function getDate() {
  let currentDate = new Date();
  let day = String(currentDate.getDate()).padStart(2, "0");
  let month = String(currentDate.getMonth() + 1).padStart(2, "0"); // January is 0!
  let year = currentDate.getFullYear();

  return year + "-" + month + "-" + day;
}

function getTime() {
  let currentDate = new Date();
  let hour = String(currentDate.getHours()).padStart(2, "0");
  let minute = String(currentDate.getMinutes()).padStart(2, "0");
  let second = String(currentDate.getSeconds()).padStart(2, "0");

  return hour + ":" + minute + ":" + second;
}
