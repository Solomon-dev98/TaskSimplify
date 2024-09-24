// scripts for the reusable add task-btn and hr that is to be consistent on all pages
function loadContent(page = "tasks") {
  fetch(`/pages/${page}.html`) // Load the specified page
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("content").innerHTML = data;
      if (page === "tasks") {
        addReusableComponents();
        populateDates();
      }
    })
    .catch((error) => console.error("Error loading page:", error));
}



function addReusableComponents() {
  fetch("/pages/reusable.html") // Load reusable component HTML
    .then((response) => response.text())
    .then((data) => {
      const container = document.querySelector(".reusable-container");
      if (container) {
        container.innerHTML = data; // Inject the reusable HTML
      }
    })
    .catch((error) =>
      console.error("Error loading reusable component:", error)
    );
}

document.addEventListener("DOMContentLoaded", () => loadContent());




// Global array to hold tasks
let allTasks = [];
async function fetchTasksFromBackend() {
  try {
    const response = await fetch('/api/tasks');
    if (!response.ok) throw new Error('Network response was not ok');
    allTasks = await response.json(); // Populate global variable
    console.log('Fetched tasks:', allTasks); // Check fetched tasks
    console.log('Total tasks:', allTasks.length); // Check the number of tasks
    displayAllTasks(); // Update UI with fetched tasks
  } catch (error) {
    console.error('Fetch error:', error);
  }
  }
  // Call this function when  the app initializes
  fetchTasksFromBackend();



// Function to handle task submission
async function addTask() {
  const taskTitle = document.getElementById('add-task-title').value;
  const taskDesc = document.getElementById('add-task-desc').value;
  const dueDateInput = document.getElementById('task-due-date').value; 
 // Get value from the date input

 // Convert the due date input to YYYY-MM-DD as the default is in dd//mm/yyyy
  const formattedDueDate = dueDateInput ? new Date(dueDateInput).toISOString().split('T')[0]
  : new Date().toISOString().split('T')[0];


  if (taskTitle.trim() === '') {
    alert('Task title cannot be empty!');
    return;
  }
  console.log({taskTitle, taskDesc, dueDateInput});

  const newTask = {
    title: taskTitle,
    description: taskDesc,
    date: formattedDueDate,
    // Use selected date or default to present day if no date is selected
  };

  // Send the new task to the backend
    const response = await fetch('/api/tasks', {
    method: 'POST', // Use post method to add a new task
    headers: {
      'Content-Type': 'application/json', // Type of content
    },
    body: JSON.stringify(newTask), // Convert task object to JSON
  });
  if (response.ok) {
    // Handle network errors
    const savedTask = await response.json(); // Parse the JSON response
    allTasks.push(savedTask);
    displayAllTasks(); // Refresh the UI
    } else {
    console.error('Error saving task:', responsestatusText); // Log any errors that occur
  }


  // Clear the form
  document.getElementById('add-task-title').value = '';
  document.getElementById('add-task-desc').value = '';
  document.getElementById('task-due-date').value = '';

}

// Function for clearing form fields when cancel button is clicked
function cancelAddTask() {
  document.getElementById("add-task-title").value = "";
  document.getElementById("add-task-desc").value = "";
  document.getElementById('task-due-date').value = '';
}

// Function to add event listeners to the add & cancel task button
const addTaskBtnListener = () => {
  const addTaskBtn = document.getElementById("add-save-task-btn");
  const cancelTaskBtn = document.getElementById("add-cancel-btn");
  if (addTaskBtn && cancelTaskBtn) {
    cancelTaskBtn.addEventListener("click", cancelAddTask);
    addTaskBtn.addEventListener("click", addTask);
  }
}

// Function to remove event listeners from the add & cancel task button
const removeTaskBtnListener = () => {
  const addTaskBtn = document.getElementById("add-save-task-btn");
  const cancelTaskBtn = document.getElementById("add-cancel-btn");
  if (addTaskBtn && cancelTaskBtn) {
    cancelTaskBtn.removeEventListener("click", cancelAddTask);
    addTaskBtn.removeEventListener("click", addTask);
  }
}


//mutation observer to watch for add task modal in DOM
const observer = new MutationObserver((mutationsList, observer) => {
  for (const mutation of mutationsList) {
    if (mutation.type === "childList") {
      // check if modal button is added 
      const addTaskBtn = document.getElementById("add-save-task-btn");
      
      if (addTaskBtn) {
        addTaskBtnListener()
      } else {
        removeTaskBtnListener()
      }
    }
  }
});


// Start observing the document body for changes
observer.observe(document.body, { childList: true, subtree: true });



function displayAllTasks() {
  const tasksContain = document.getElementById('tasksContainer');
  tasksContain.innerHTML = ''; //Clear previous tasks

  if (allTasks.length === 0) {
    //Show placeholder, icon, and the inline-add-btn if no tasks
    document.getElementById('no-tasks-message').style.display = 'block';
    document.getElementById('task-icon').style.display = 'block';
    document.querySelector('.inline-add-task-btn').style.display = 'block';
  }
  else {
    //Hide placeholder, icon, and the inline-add-btn if there are tasks
    document.getElementById('no-tasks-message').style.display = 'none';
    document.getElementById('task-icon').style.display = 'none';
    document.querySelector('.inline-add-task-btn').style.display = 'none';

    allTasks.forEach(singleTask => {
      // Loop through each task in the allTasks array

      const taskElement = document.createElement('div'); 
      // Create a div element to hold the task
      taskElement.classList.add('task-item'); // Add a class for styling

      const taskTitleElement = document.createElement('h3'); 
      // Create a h3 for the task title
      taskTitleElement.textContent = singleTask.title;

      const taskDescElement = document.createElement('p'); 
      // Create a p element for the task description
      taskDescElement.textContent = singleTask.description;

      const taskDateElement = document.createElement('p');
      taskDateElement.textContent = `Due Date: ${singleTask.date}`;


      // Edit Button
      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.classList.add('btn', 'btn-warning', 'btn-sm', 'me-2');
      editButton.setAttribute('data-bs-toggle', 'modal');
      editButton.setAttribute('data-bs-target', '#editTaskModal');
      editButton.addEventListener('click', () => openEditModal(singleTask));


      // Delete Button
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
      deleteButton.addEventListener('click', () => deleteTask(singleTask.id));



      taskElement.appendChild(taskTitleElement);
      taskElement.appendChild(taskDescElement);
      taskElement.appendChild(taskDateElement);
      taskElement.appendChild(editButton);
      taskElement.appendChild(deleteButton);
      tasksContain.appendChild(taskElement);
    });
      
    }
}



let taskToEdit = null;

function openEditModal(selectedTask) {
  taskToEdit = selectedTask;
  document.getElementById('edit-task-title').value = selectedTask.title;
  document.getElementById('edit-task-desc').value = selectedTask.description;
  document.getElementById('edit-task-due-date').value = selectedTask.date;
}



async function saveTaskChanges() {
  const updatedTitle = document.getElementById('edit-task-title').value;
  const updatedDesc = document.getElementById('edit-task-desc').value;
  const updatedDueDate = document.getElementById('edit-task-due-date').value;

  if (taskToEdit) {
    // Update the Task Object
    taskToEdit.title = updatedTitle;
    taskToEdit.description = updatedDesc;
    taskToEdit.date = updatedDueDate;


    // Send the updated task to the backend
    const response = await fetch(`/api/tasks/${taskToEdit.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskToEdit),
    });

  if (response.ok) {
    displayAllTasks(); // Refresh the task List
    alert('Task updated successfully!');
  } else {
    console.error('Error updating task:', response.statusText);
  }
}
}



async function deleteTask(taskId) {
  const confirmDelete = confirm('Are you sure you want to delete this task?');

  if(confirmDelete) {
    // Send DELETE request to the backend
    const response = await fetch(`/api/tasks/${taskId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      // Remove task from allTasks array
      allTasks = allTasks.filter(task => task.id  !== taskId);
      displayAllTasks(); // Refresh the task List
      alert('Task deleted successfully!');
    } else {
      console.errror('Error deleting task:', response.statusText);
    }
  }
}

  


//Scripts for profile pic selection

//Select the file input, image and a placeholder(if needed)
document.addEventListener("DOMContentLoaded", () => {
const profileInput = document.getElementById("profile-input");
const profilePic = document.getElementById("profile-pic");
const maxFileSize = 1 * 1024 * 1024; //Maximum file size: 1 MB (in bytes)
// const defaultPic = "../assets/images/default-pic.png;" //Default placeholder image;

//Function to validate file size and type
function validateFile(file) {
    const validTypes = ["image/jpeg", "image/png", "image/gif"];

    //Check if the file type is valid (jpeg, png, gif)
    if (!validTypes.includes(file.type)) {
        alert(`please select a valid image file (JPEG, PNG, or GIF).`);
        return false;

    }
    //Check if the file size is less than the maximum size (1 MB)
    if (file.size > maxFileSize) {
        alert(`The file is too large, select an image smaller than 1 MB`);
        return false;

    }
    return true; //if both checks pass the file is valid
}

//Check if there is a saved image in localStorage and load it
const savedImage = localStorage.getItem("profilePic");
if (savedImage) {
    profilePic.src = savedImage; //Set profile picture from localStorage
}


//Listen for file selection and perform validation
profileInput.addEventListener("change", function () {
    const file = profileInput.files[0]; //Get the selected file

    //Check if no file is selected
    if (!file) {
        profilePic.src = "../assets/images/default-pic.png";
        return; //Stop further execution if no file is selected
    }

    //If a file is selected, validate it
    if (file) {
    if (validateFile(file)) {
        const reader = new FileReader();

        //Once the file is sucessfully read, it displays it as a preview
        reader.onload = function (e) {
            const imageSrc = e.target.result; //Get file dta URL
            profilePic.src = imageSrc; //Set the profile pic src to the file's data URL

            //Save the image to localStorage
            localStorage.setItem("profilePic", imageSrc);
        }

        reader.readAsDataURL(file); //Read the file as a data URL
    } else {
        //If the file is invalid, reset to the default placeholder
        profilePic.src = "../assets/images/default-pic.png"; //Reverts to default if file is invalid
        profileInput.value =""; //Clears file input so user can select another file

        //Remove the saved image from localStorage
        localStorage.removeItem("profilePic");
    }


} else {
    //If no file is selected, reset to the default placeholder
    profilePic.src = "../assets/images/default-pic.png"; //Reverts to default if no file is selected

    //Remove the saved image from localStorage
    localStorage.removeItem("profilePic");

}
});
});
