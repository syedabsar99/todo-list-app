const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const taskCounter = document.querySelector("#task-count");
const completedTask = document.querySelector("#completed-task");
const searchBox = document.getElementById("search-box");
const themeToggle = document.getElementById("theme-toggle");
document.getElementById("add-btn").addEventListener("click", addTask);
function addTask() {
  if (inputBox.value === "") {
    alert("You must write something!");
  } else {
    let li = document.createElement("li");
    let taskText = document.createElement("span");
    taskText.classList.add("task-text");
    taskText.textContent = inputBox.value;

    li.appendChild(taskText);
    listContainer.appendChild(li);
    updateTaskCount();
    let deleteBtn = document.createElement("span");
    deleteBtn.innerHTML = "\u00d7";
    deleteBtn.classList.add("delete-btn");
    li.appendChild(deleteBtn);
  }
  inputBox.value = "";
  saveData();
}

function updateTaskCount() {
  taskCounter.innerHTML = `Total Tasks :<span class="count-color"> ${listContainer.querySelectorAll("li").length}</span>`;
}
function completedCount() {
  completedTask.innerHTML = `Completed Tasks :<span class="count-color">${listContainer.querySelectorAll(".checked").length}</span>`;
}
function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}
function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");
  updateTaskCount();
  completedCount();
}
showTask();
listContainer.addEventListener("dblclick", function (e) {
  if (e.target.tagName !== "LI") return;

  const li = e.target;

  const currentText = li.innerText.replace("×", "").trim();

  const input = document.createElement("input");

  input.type = "text";
  input.value = currentText;

  li.innerHTML = "";
  li.appendChild(input);

  const deleteBtn = document.createElement("span");
  deleteBtn.innerHTML = "\u00d7";
  deleteBtn.classList.add("delete-btn");

  li.appendChild(deleteBtn);

  input.focus();

  input.addEventListener("blur", () => {
    const newText = input.value.trim() || currentText;

    li.innerHTML = newText;

    const deleteBtn = document.createElement("span");
    deleteBtn.innerHTML = "\u00d7";
    deleteBtn.classList.add("delete-btn");

    li.appendChild(deleteBtn);

    saveData();
  });
});
inputBox.addEventListener("keydown", function (e) {
  if (e.key == "Enter") {
    addTask();
  }
});
listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
      completedCount();
    } else if (e.target.classList.contains("delete-btn")) {
      e.target.parentElement.remove();
      updateTaskCount();
      completedCount();
      saveData();
    }
  },
  false,
);
// Dark Mode

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  themeToggle.textContent = "☀️ Light Mode";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark");
    themeToggle.textContent = "☀️ Light Mode";
  } else {
    localStorage.setItem("theme", "light");
    themeToggle.textContent = "🌙 Dark Mode";
  }
});
searchBox.addEventListener("input", function () {
  const searchValue = searchBox.value.toLowerCase();

  const tasks = listContainer.querySelectorAll("li");

  tasks.forEach((task) => {
    const taskText = task.querySelector(".task-text").textContent.toLowerCase();

    if (taskText.includes(searchValue)) {
      task.style.display = "";
    } else {
      task.style.display = "none";
    }
  });
});
