//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

var taskInput = document.getElementById('new-task');//Add a new task.
var addButton = document.querySelector('.add-btn');//new task add button
var incompleteTaskHolder = document.getElementById('incomplete-tasks');//div of .incomplete-tasks
var completedTasksHolder = document.getElementById('completed-tasks');//completed-tasks


//New task list item
var createNewTaskElement = function (taskString) {
	//input (checkbox)
	var newItem = document.createElement('div');

	//input (checkbox)
	var checkBox = document.createElement('input');//checkbx
	//label
	var label = document.createElement('label');//label
	//input (text)
	var editInput = document.createElement('input');//text
	//button.edit
	var editButton = document.createElement('button');//edit button

	//button.delete
	var deleteButton = document.createElement('button');//delete button
	var deleteButtonImg = document.createElement('img');//delete button image

	newItem.className = 'incomplete-tasks__item';

	label.innerText = taskString;
	label.className = 'task incomplete-tasks__label';

	//Each elements, needs appending
	checkBox.type = 'checkbox';
	checkBox.className = 'incomplete-tasks__checkbox';
	editInput.type = 'text';
	editInput.className = 'task incomplete-tasks__input';

	editButton.innerText = 'Edit'; //innerText encodes special characters, HTML does not.
	editButton.className = 'edit-btn';

	deleteButton.className = 'delete-btn';
	deleteButtonImg.src = './remove.svg';
	deleteButtonImg.className = 'delete-btn__img';
	deleteButton.appendChild(deleteButtonImg);


	//and appending.
	newItem.appendChild(checkBox);
	newItem.appendChild(label);
	newItem.appendChild(editInput);
	newItem.appendChild(editButton);
	newItem.appendChild(deleteButton);
	return newItem;
}



var addTask = function () {
	console.log('Add Task...');
	//Create a new list item with the text from the #new-task:
	if (!taskInput.value) return;
	var newItem = createNewTaskElement(taskInput.value);

	//Append newItem to incompleteTaskHolder
	incompleteTaskHolder.appendChild(newItem);
	bindTaskEvents(newItem, taskCompleted);

	taskInput.value = '';

}

//Edit an existing task.

var editTask = function () {
	console.log('Edit Task...');
	console.log("Change 'edit' to 'save'");


	var newItem = this.parentNode;

	var editInput = newItem.querySelector('input[type=text]');
	var label = newItem.querySelector('label');
	var editBtn = newItem.querySelector('.edit-btn');
	var containsClass = newItem.classList.contains('edit-mode');
	//If class of the parent is .edit-mode
	if (containsClass) {

		//switch to .edit-mode
		//label becomes the inputs value.
		label.innerText = editInput.value;
		editBtn.innerText = 'Edit';
	} else {
		editInput.value = label.innerText;
		editBtn.innerText = 'Save';
	}

	//toggle .edit-mode on the parent.
	newItem.classList.toggle('edit-mode');
};


//Delete task.
var deleteTask = function () {
	console.log('Delete Task...');

	var newItem = this.parentNode;
	var div = newItem.parentNode;
	//Remove the parent list item from .incomplete-tasks
	div.removeChild(newItem);

}


//Mark task completed
var taskCompleted = function () {
	console.log('Complete Task...');

	//Append the task list item to the #completed-tasks
	var newItem = this.parentNode;
	completedTasksHolder.appendChild(newItem);
	bindTaskEvents(newItem, taskIncomplete);

}


var taskIncomplete = function () {
	console.log('Incomplete Task...');
	//Mark task as incomplete.
	//When the checkbox is unchecked
	//Append the task list item to the #incompleteTasks.
	var newItem = this.parentNode;
	incompleteTaskHolder.appendChild(newItem);
	bindTaskEvents(newItem, taskCompleted);
}



var ajaxRequest = function () {
	console.log('AJAX Request');
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener('click', addTask);
addButton.addEventListener('click', ajaxRequest);


var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
	console.log('bind list item events');
	//select ListItems children
	var checkBox = taskListItem.querySelector('input[type=checkbox]');
	var editButton = taskListItem.querySelector('.edit-btn');
	var deleteButton = taskListItem.querySelector('.delete-btn');


	//Bind editTask to edit button.
	editButton.onclick = editTask;
	//Bind deleteTask to delete button.
	deleteButton.onclick = deleteTask;
	//Bind taskCompleted to checkBoxEventHandler.
	checkBox.onchange = checkBoxEventHandler;
}

//cycle over incompleteTaskHolder list items
//for each list item
for (var i = 0; i < incompleteTaskHolder.children.length; i++) {

	//bind events to list items chldren(tasksCompleted)
	bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}



//cycle over completedTasksHolder list items
for (var i = 0; i < completedTasksHolder.children.length; i++) {
	//bind events to list items chldren(tasksIncompleted)
	bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.