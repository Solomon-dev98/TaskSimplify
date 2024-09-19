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





// Function to open the modal
function openModal() {
  const modal = document.getElementById('addTaskModal');
  modal.style.display = 'block';
}

// Function to close the modal
function closeModal() {
  const modal = document.getElementById('addTaskModal');
  modal.style.display = 'none';
}

// Function to handle task submission
function addTask() {
  const taskTitle = document.getElementById('task-title').value;
  const taskDesc = document.getElementById('task-desc').value;

  if (taskTitle.trim() === '') {
    alert('Task title cannot be empty!');
    return;
  }

  // Save the task (for now, we will just log it for testing)
  console.log('Task Added:', { taskTitle, taskDesc });

  // Clear the form
  document.getElementById('task-title').value = '';
  document.getElementById('task-desc').value = '';

  // Close the modal
  closeModal();
}

// Function to sort tasks by date (dummy logic for now)
function sortByDate() {
  console.log('Sorting tasks by date...');
  // Add sorting logic here later
}

// DOM content loaded event to attach listeners
document.addEventListener('DOMContentLoaded', function () {
  const addTaskButton = document.getElementById('save-task-btn');
  const cancelBtn = document.getElementById('cancel-btn');
  const sortByDateBtn = document.getElementById('sort-by-date');
  
  // Ensure all buttons exist before adding listeners
  if (addTaskButton && cancelBtn && sortByDateBtn) {
    // Add task event
    addTaskButton.addEventListener('click', addTask);

    // Cancel button closes the modal
    cancelBtn.addEventListener('click', closeModal);

    // Sort by date button event
    sortByDateBtn.addEventListener('click', sortByDate);
  } else {
    console.error('One or more elements not found.');
  }

  // Open modal for inline and reusable buttons
  const inlineAddTaskBtn = document.querySelector('.add-task-inline');
  const reusableAddTaskBtn = document.querySelector('.custom-add-task-btn');
  
  if (inlineAddTaskBtn && reusableAddTaskBtn) {
    inlineAddTaskBtn.addEventListener('click', openModal);
    reusableAddTaskBtn.addEventListener('click', openModal);
  } else {
    console.error('One or more add task buttons not found.');
  }
}
);




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

//Check if there is a saved image in localStorageand load it
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
