var taskCount = 0;
var completedCount = 0;

function updateTaskCount() {
  var taskCountElement = document.getElementById("taskCount");
  taskCountElement.textContent = taskCount;
}

function updateCompletedCount() {
  var completedCountElement = document.getElementById("completedCount");
  completedCountElement.textContent = completedCount;
}

function addTask() {
  var input = document.getElementById("taskInput");
  var task = input.value;
  if (task.trim() !== "") {
    var li = document.createElement("li");

    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", function() {
      if (this.checked) {
        span.style.textDecoration = "line-through";
        moveCheckedItem(li);
        taskCount--;
        completedCount++;
      } else {
        span.style.textDecoration = "none";
        moveUncheckedItem(li);
        taskCount++;
        completedCount--;
      }
      updateTaskCount();
      updateCompletedCount();
    });
    li.appendChild(checkbox);

    var span = document.createElement("span");
    span.textContent = task;
    li.appendChild(span);

    var editButton = document.createElement("button");
    editButton.classList.add("edit-button");
    editButton.innerHTML = '<i class="fas fa-edit"></i>';
    editButton.onclick = function() {
      var newTask = prompt("Edit the task", span.textContent);
      if (newTask && newTask.trim() !== "") {
        span.textContent = newTask;
      }
    };
    li.appendChild(editButton);

    var deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteButton.onclick = function() {
      var section = li.parentNode.id;
      li.parentNode.removeChild(li);
      decrementSectionCount(section);
    };
    li.appendChild(deleteButton);

    var taskList = document.getElementById("taskList");
    taskList.insertBefore(li, taskList.firstChild); // Insert at the top

    taskCount++;
    updateTaskCount();

    input.value = "";
  }
}

function moveCheckedItem(li) {
  var completedTasks = document.getElementById("completedTasks");
  completedTasks.appendChild(li);
}

function moveUncheckedItem(li) {
  var taskList = document.getElementById("taskList");
  taskList.appendChild(li); // Append to the end
}

function handleKeyPress(event) {
  if (event.key === "Enter") {
    addTask();
  }
}

function decrementSectionCount(section) {
  if (section === "taskList") {
    taskCount--;
    updateTaskCount();
  } else if (section === "completedTasks") {
    completedCount--;
    updateCompletedCount();
  }
}
