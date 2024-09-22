
// Function to populate the list with dates starting from Monday
function populateDates() {
    const dayOfWeekList = document.getElementById('dayOfWeekList');
    const currentDate = new Date();
    const currentDay = currentDate.getDay(); // Sunday = 0, Monday = 1, etc.
    const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    
    // Calculate the start of the week (Monday)
    let startDayOffset = (currentDay === 0) ? -6 : 1 - currentDay; 
    // If it's Sunday, offset is -6 to start from Monday

    // Set the date to the start of the week (Monday)
    let startDate = new Date(currentDate);
    startDate.setDate(currentDate.getDate() + startDayOffset);

    // Clear any existing items
    dayOfWeekList.innerHTML = '';

    // Loop to add days from Monday to Sunday
    for (let i = 0; i < 7; i++) {
        // Calculate the date for the current day
        let dayNumber = String(startDate.getDate()).padStart(2, '0'); //ensure 2-digit day and month
        let month = String(startDate.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        let year = startDate.getFullYear();
        
        // Create a new list item for the date
        const listItem = document.createElement('li');
        listItem.textContent = `${dayNames[i]} ${dayNumber}`;
        listItem.dataset.date = `${year}-${month}-${dayNumber}`; 
        // Set a custom data attribute for the date

        // Add event listener for date click
        listItem.addEventListener('click', handleDateClick);

        // Append the list item to the list
        dayOfWeekList.appendChild(listItem);

        // Move to the next day
        startDate.setDate(startDate.getDate() + 1);
    }
}

// Function to handle date click
function handleDateClick(event) {
    const selectedDate = event.target.dataset.date; // Get the date from the clicked item

    // Remove 'active' class from all list items
    document.querySelectorAll('#dayOfWeekList li').forEach(li => li.classList.remove('active'));

    // Add 'active' class to the clicked item
    event.target.classList.add('active');
    displayTasksForDate(selectedDate); // Show tasks for the selected date
}

function displayTasksForDate(date) { // Logic for tasks display for dates for a selected date
    const tasksContain = document.getElementById('tasksContainer');
     // Get the tasks container element

    // Filter tasks  for the specific date
    const tasksForDate = allTasks.filter(singleTask => singleTask.date === date); 
    // Compare task dates to the provided date
    tasksContain.innerHTML = ''; // Clear existing content

    if (tasksForDate.length === 0) {
        // If there are no tasks for the selected date, display this below
        tasksContain.innerHTML = `<p>You don't have any tasks for ${date}.</p`;
    }
    else {
        tasksForDate.forEach(singleTask => {
            const taskElement = document.createElement('div');
            // Create a div element to hold the task
            taskElement.classList.add(task-item); // Add a class for styling

            const taskTitleElement = document.createElement('h3');
            taskTitleElement.textContent = singleTask.title;
            // Create a h3 for the task title

            const taskDescElement = document.createElement('p');
            // Create a p element for the task description
            taskDescElement.textContent = singleTask.description;

            const taskDateElement = document.createElement('p'); 
            // Create a p element  for the task date
            taskDateElement.textContent = `Due Date: ${singleTask.date}`; 
            // Display due date

            taskElement.appendChild(taskTitleElement);
            taskElement.appendChild(taskDescElement);
            taskElement.appendChild(taskDateElement);
            tasksContain.appendChild(taskElement);
        });
    }
}
