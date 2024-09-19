
// Function to populate the list with dates starting from Monday
function populateDates() {
    const dayOfWeekList = document.getElementById('dayOfWeekList');
    const currentDate = new Date();
    const currentDay = currentDate.getDay(); // Sunday = 0, Monday = 1, etc.
    const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    
    // Calculate the start of the week (Monday)
    let startDayOffset = (currentDay === 0) ? -6 : 1 - currentDay; // If it's Sunday, offset is -6 to start from Monday

    // Set the date to the start of the week (Monday)
    let startDate = new Date(currentDate);
    startDate.setDate(currentDate.getDate() + startDayOffset);

    // Clear any existing items
    dayOfWeekList.innerHTML = '';

    // Loop to add days from Monday to Sunday
    for (let i = 0; i < 7; i++) {
        // Calculate the date for the current day
        let dayNumber = startDate.getDate();
        let month = startDate.getMonth() + 1; // Months are 0-indexed
        let year = startDate.getFullYear();
        
        // Create a new list item for the date
        const listItem = document.createElement('li');
        listItem.textContent = `${dayNames[i]} ${dayNumber}`;
        listItem.dataset.date = `${year}-${month}-${dayNumber}`; // Set a custom data attribute for the date

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

function displayTasksForDate(date) { //Handle actual tasks logic here for the display
    const tasksContainer = document.getElementById('tasksContainer');
    tasksContainer.innerHTML = `<p>Tasks for ${date} will be displayed here once added.</p>`;
}