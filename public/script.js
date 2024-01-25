
// Create a new Date object for the current date
const currentDate = new Date();

// Format the current date as a string (YYYY-MM-DD) compatible with the min attribute
const formattedCurrentDate = currentDate.toISOString().split('T')[0];

// Set the minimum date for the 'dueDate' element
document.getElementById('dueDate').min = formattedCurrentDate;



function createTask() {
    const title = document.getElementById('title').value;
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value;
    const dueDate = document.getElementById('dueDate').value;

        // Axios POST request to create a task
     axios.post('/api/tasks', { title, category, description, dueDate })
     .then(response => {
         // Handle success 
         console.log(response.data);
         displayTasks(response.data);
     })
     .catch(error => {
         // Handle error 
         console.error(error);
     });
}

// function displayTasks(tasks) {
//     const taskList = document.getElementById('taskList');
//     taskList.innerHTML = '';

//     tasks.forEach((task, index) => {
//         const taskElement = document.createElement('div');
//         taskElement.classList.add('task');
//         taskElement.classList.add(getTaskColorClass(task.dueDate)); //new
//         taskElement.innerHTML = `
//             <strong>${task.title}</strong><br>
//             Category: ${task.category}<br>
//             Description: ${task.description}<br>
//             Due Date: ${task.dueDate}<br>
//             Completed: ${task.completed ? 'Yes' : 'No'}<br>
//             <button onclick="completeTask(${index})">Complete Task</button>
//             <button onclick="deleteTask(${index})">Delete Task</button>
//         `;
//         taskList.appendChild(taskElement);
//     });
// }


// new
    function displayTasks(tasks) {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';
    
        const filterCategory = document.getElementById('filterCategory').value;
    
        tasks.forEach((task, index) => {
            if (filterCategory === 'all' || task.category === filterCategory) {
                const taskElement = document.createElement('div');
                taskElement.classList.add(getTaskColorClass(task.dueDate));
                taskElement.classList.add('task');
                taskElement.innerHTML = `
                    <strong>${task.title}</strong><br>
                    Category: ${task.category}<br>
                    Description: ${task.description}<br>
                    Due Date: ${task.dueDate}<br>
                    Completed: ${task.completed ? 'Yes' : 'No'}<br>
                    <button onclick="completeTask(${index})">Complete Task</button>
                    <button onclick="deleteTask(${index})">Delete Task</button>
                `;
                taskList.appendChild(taskElement);
            }
        });
    }

    function filterTasksByCategory() {
        // Fetch tasks again and update the display
        axios.get('/api/tasks')
            .then(response => {
                tasks = response.data;
                displayTasks(tasks);
            })
            .catch(error => {
                console.error(error);
            });
    }
    // new
    


function completeTask(index) {
    // tasks[index].completed = true;
    // displayTasks();

    axios.put(`/api/tasks/${index}`)
        .then(response => {
            // Handle success (if needed)
            console.log(response.data);
            displayTasks(response.data);
        })
        .catch(error => {
            // Handle error (if needed)
            console.error(error);
            
        });
}

function deleteTask(index) {
    axios.delete(`/api/tasks/${index}`)
        .then(response => {
            // Handle success (if needed)
            console.log(response.data);
            displayTasks(response.data);
        })
        .catch(error => {
            // Handle error (if needed)
            console.error(error);
        });
    // tasks.splice(index, 1);
    // displayTasks();
}



 // Axios GET request to retrieve tasks
     axios.get('/api/tasks')
     .then(response => {
         // Handle success (if needed)
         tasks = response.data;
         displayTasks(tasks);
     })
     .catch(error => {
         // Handle error (if needed)
         console.error(error);
     });
//////new
     function getTaskColorClass(dueDate) {
        const taskDueDate = new Date(dueDate);
        const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds
    
        if (taskDueDate.getTime() - currentDate.getTime() < oneDay) {
            return 'orange-task';
        } else if (taskDueDate.toISOString().split('T')[0] === formattedCurrentDate) {
            return 'red-task';
        } else {
            return 'default-task';
        }
    }