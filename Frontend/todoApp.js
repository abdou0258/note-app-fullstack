const searchInput = document.getElementById("input-box");
const addBtn = document.getElementById("add-btn");
const listContainer = document.querySelector(".list");
const formDOM = document.querySelector(".form-control");
const errorDom = document.querySelector(".error-box");

const token = localStorage.getItem("token");
// show all tasks
const showTasks = async () => {
  try {
    // Check if the token is available

    const response = await axios.get("/api", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const tasks = response.data.tasks;

    const allTasks = tasks
      .map((taskName) => {
        const { completed, _id: taskID, task } = taskName;
        return `<div class="task-container ${completed && "task-completed"}">
        <div class="task-name" data-id="${taskID}">
        <input type="checkbox" class="task-checkbox" ${
          completed ? "checked" : ""
        } data-id="${taskID}">
        <p style="${
          completed ? "text-decoration: line-through; color: grey;" : ""
        }">${task}</p>
        </div>
        <div class="task-options">
          <i class="fa-solid fa-pen-to-square edit-btn" style="color: #001f05;margin-right:20px;"></i>
          <i class="fa-solid fa-trash delete-btn" style="color: #a93d3d;" data-id=${taskID}></i>
        </div>
      </div>`;
      })
      .join("");

    listContainer.innerHTML = allTasks;

    //
    const checkboxes = document.querySelectorAll(".task-checkbox");
    checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", handleCheckboxChange);
    });
    //

    // Add click event listener for edit
    const editBtns = document.querySelectorAll(".edit-btn");
    editBtns.forEach((editBtn) => {
      editBtn.addEventListener("click", handleEdit);
    });
  } catch (error) {
    console.log(error);
    listContainer.innerHTML =
      '<h5 class="empty-list">There was an error, please try later....</h5>';
  }
};

const handleCheckboxChange = async (event) => {
  const checkbox = event.target;
  const taskId = checkbox.dataset.id;
  const taskNameElement = document.querySelector(
    `.task-name[data-id="${taskId}"] p`
  );

  if (checkbox.checked) {
    taskNameElement.style.textDecoration = "line-through";
    taskNameElement.style.color = "grey";
  } else {
    taskNameElement.style.textDecoration = "none";
    taskNameElement.style.color = ""; // Reset color to default
  }

  try {
    await axios.patch(
      `/api/${taskId}`,
      {
        completed: checkbox.checked,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.log(error);
    errorDom.innerHTML =
      '<p class="error-p">There was an error, please try later....</p>';
    errorDom.style.textAlign = "center";
    setTimeout(function () {
      errorDom.innerHTML = ""; // Clear the error message
    }, 4000);
  }
};

showTasks();

// create
formDOM.addEventListener("submit", async (e) => {
  e.preventDefault();
  const task = searchInput.value;

  if (!task) {
    return alert("Please enter a task!");
  }
  try {
    await axios.post(
      "/api",
      { task },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    showTasks();
    searchInput.value = "";
  } catch (error) {
    console.log(error);
    errorDom.innerHTML =
      '<p class="error-p">There was an error, please try later....</p>';
    errorDom.style.textAlign = "center";
    setTimeout(function () {
      errorDom.innerHTML = ""; // Clear the error message
    }, 4000);
  }
  // Create new Task in DB
});

// delete
listContainer.addEventListener("click", async (e) => {
  const el = e.target;
  if (el.classList.contains("delete-btn")) {
    const id = el.getAttribute("data-id");
    try {
      await axios.delete(`/api/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      showTasks();
    } catch (error) {
      console.log(error);

      errorDom.innerHTML =
        '<p class="error-p">There was an error, please try later....</p>';
      errorDom.style.textAlign = "center";
      setTimeout(function () {
        errorDom.innerHTML = ""; // Clear the error message
      }, 4000);
    }
  }
});

// handle edit
async function handleEdit(e) {
  const taskContainer = e.target.closest(".task-container");
  const taskName = taskContainer.querySelector(".task-name p");
  const taskId = taskName.parentElement.getAttribute("data-id");
  const newTask = prompt("Edit task:", taskName.innerText);

  // Update the task on the server
  updateTaskOnServer(taskId, newTask);
}

// update task on server
async function updateTaskOnServer(taskId, newTask) {
  try {
    await axios.patch(
      `/api/${taskId}`,
      { task: newTask },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    showTasks();
  } catch (error) {
    console.log(error.message);
    errorDom.innerHTML =
      '<p class="error-p">There was an error, please try later....</p>';
    errorDom.style.textAlign = "center";
    setTimeout(function () {
      errorDom.innerHTML = ""; // Clear the error message
    }, 4000);
  }
}
