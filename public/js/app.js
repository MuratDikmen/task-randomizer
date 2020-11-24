// Initialization of DOM references

const inputField = document.getElementById("input-field");
const addButton = document.getElementById("add-btn");
const taskList = document.getElementById("tasklist");
const randomizeButton = document.getElementById("randomize-btn");

let tasks;

// Initialization of Storage

const getItemsFromLocalStorage = () => {
  if (localStorage.getItem("tasks") === "") {
    return [];
  } else {
    return JSON.parse(localStorage.getItem("tasks"));
  }
};

const setItemsToLocalStorage = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Event Listeners

inputField.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    if (event.target.value === "") {
      alertUser();
    } else {
      addTask(event.target.value);
      resetInput();
    }
  }
});

addButton.addEventListener("click", (event) => {
  if (inputField.value === "") {
    alertUser();
  } else {
    addTask(inputField.value);
    resetInput();
  }
});

taskList.addEventListener("click", (event) => {
  if (event.target.matches("span.delete-btn")) {
    deleteTask(event.target.parentElement.parentElement.id);
  }
});

randomizeButton.addEventListener("click", (event) => {
  if (tasks.length === 0) {
    alertUser();
  } else {
    randomizeTasks();
    updateTaskList();
  }
});

// CRUD Functions

const addTask = (taskName) => {
  const highestId = tasks.reduce((acc, cur) => (acc.id > cur.id ? acc.id : cur.id), 0);
  const task = {
    id: highestId + 1,
    name: taskName,
  };

  tasks.push(task);
  setItemsToLocalStorage();
  updateTaskList();
};

const deleteTask = (taskId) => {
  tasks = tasks.filter((task) => task.id !== Number(taskId));
  setItemsToLocalStorage();
  updateTaskList();
};

const resetInput = () => {
  inputField.value = "";
  inputField.focus();
};

const randomizeTasks = () => {
  // Fisher-Yaters Shuffle
  let m = tasks.length;
  let t;
  let i;

  while (m) {
    i = Math.floor(Math.random() * m--);
    t = tasks[m];
    tasks[m] = tasks[i];
    tasks[i] = t;
  }
  setItemsToLocalStorage();
  updateTaskList();
};

// UI Functions

const updateTaskList = () => {
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const li = document.createElement("li");
    const div = document.createElement("div");
    const taskName = document.createElement("span");
    const deleteButton = document.createElement("span");

    taskName.innerText = task.name;
    deleteButton.innerText = "X";

    li.id = task.id;
    div.classList = "flex justify-between";
    deleteButton.classList = "cursor-pointer delete-btn";
    div.appendChild(taskName);
    div.appendChild(deleteButton);
    li.appendChild(div);
    taskList.appendChild(li);
  });
};

const alertUser = () => {
  const div = document.createElement("div");
  div.classList = "font-sans text-2xl absolute top-20 font-medium text-center text-gray-400 bg-red-800";
  div.style.top = "5rem";
  div.id = "alert";
  div.appendChild(document.createTextNode("Please add a task first."));
  const inputContainerParent = document.getElementById("input-container").parentElement;
  const appContainer = document.getElementById("app-container");
  appContainer.insertBefore(div, inputContainerParent);
  setTimeout(removeAlert, 2000);
};

const removeAlert = () => {
  document.getElementById("alert").remove();
};

// Init the app

const init = () => {
  console.log("initt");
  tasks = getItemsFromLocalStorage();
  console.log(tasks);
  updateTaskList();
};

init();
