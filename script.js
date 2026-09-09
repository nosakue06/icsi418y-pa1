/*
 purpose: to get references to important HTML elements. JavaScript
          needs those references so it can read information from the 
          form and change what appears on the page.
*/

const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const priorityInput = document.getElementById("priority");
const taskList = document.getElementById("task-list");
const message = document.getElementById("message");

/* 
 purpose: it's an array that stores all of the task objects 
          while the webpage is open.
*/

const tasks = [];


/* 
 purpose: this variable gives every task a unique ID. the ID helps 
          JavaScript to determine exactly which task should be either
          completed or deleted.
*/          

let nextTaskId = 1;

/*
 listen for the form being submitted. this happens when user presses 
 the "add task" button.
 */

taskForm.addEventListener("submit",function (event) {
    /*
     normally submitting a form that reloads the page. the
     preventDefault() stops that from happening.
    */ 
    event.preventDefault();

    /*
     purpose: it reads the task name and priority that's 
              been entered by the user.
    */          

    const taskName = taskInput.value.trim();
    const taskPriority = priorityInput.value;

    /*
     purpose: to reject the task if user didn't enter a task name.
    */

    if (taskName === ""){
        message.textContent = "Please enter a task.";
        return;
    }    
       
    /* 
     purpose: it's to clear the error message when 
              a valid task is entered.
    */
   message.textContent = "";

   /*
    purpose: to create an object that represents one task.

    each task stores:
    - a unique ID
    - its name
    - its priority
    - whether it has been completed
    */
    const task = {
        id: nextTaskId,
        name: taskName,
        priority: taskPriority,
        completed: false
    };

    /*
     purpose: to add the new task object to
              the tasks array.
    */
   tasks.push(task);

   /*
    purpose: to increase the ID so the next task
             receives a different number.
    */
   nextTaskId++;

    /* 
     purpose: to update the webpage so the newly
              created task becomes visible.
    */
    displayTasks();

    /*
     purpose: it clears the text input so user 
              can enter another task. 
    */
   taskInput.value = "";

});

/*
 purpose: the displayTasks() controls what tasks currently
          appear on the webpage.
*/
function displayTasks() {
    /*
     purpose: to clear the existing list first. the function then 
              rebuilds the list that uses the current tasks array.
    */
   taskList.innerHTML = "";

   /*
    purpose: it loops through every task that's stored inside 
             the array.
   */
  tasks.forEach(function (task) {
    
    /*
     purpose: it creates one <li> element 
              for the current task.
    */
   const taskItem = document.createElement("li");
   
   taskItem.classList.add("task-item");

   /* 
    purpose: adds a class based on the task priority.
    example: high becomes high-priority
   */
  taskItem.classList.add(task.priority + "-priority");
  
  /*
   if this task has already been completed, then apply the completed
   CSS class.
   */
  if (task.completed) {
      taskItem.classList.add("completed");
  }

  /*
   purpose: to create an element that displays the task name
            and priority.
  */
  const taskInfo = document.createElement("span");
  
  taskInfo.classList.add("task-info");

  taskInfo.textContent =
       `${task.id}. ${task.name} - Priority: ${task.priority}`;

  /*
   purpose: to create the complete button
  */
  const completeButton = document.createElement("button"); 

  completeButton.textContent = "Complete";

  /*
   when the complete is clicked, change the task's completion status.
  */
  completeButton.addEventListener("click", function () {

    task.completed = !task.completed;

    displayTasks();

  });
  
  /* 
   purpose: to create the delete button
  */
  const deleteButton = document.createElement("button");
  
  deleteButton.textContent = "Delete";

  /*
   when the delete is clicked, find the task inside the tasks array
   and remove it
  */
  deleteButton.addEventListener("click", function () {

    const taskIndex = tasks.findIndex(function (item) {
        return item.id === task.id;

    });

    /*
     purpose: its for splice() to remove one item from the array
    */
    tasks.splice(taskIndex, 1);
    
    /*
     purpose: it rebuilds the displayed task list after the task
              has been removed
    */
    displayTasks();

  });
  
  /*
    purpose: to put the text and both buttons inside the task item
  */
  taskItem.appendChild(taskInfo);
  taskItem.appendChild(completeButton);
  taskItem.appendChild(deleteButton);
  
  /*
   in all, place the finished task onto the webpage
  */
  taskList.appendChild(taskItem); 

  });          
              
}          