const addTodoButton = document.querySelector(".add-button");
const todoList = document.querySelector(".todo-list");
const inputTodo = document.querySelector(".add-todo");


addTodoButton.addEventListener('click', (e) => {
    e.preventDefault();
    
    if(validateInput()) {
        //Create div todo-item
        const todoItem = document.createElement('div');
        todoItem.classList.add("todo-item");
        todoList.appendChild(todoItem);

        // Create list todo
        const newTodoItem = document.createElement("li");
        newTodoItem.innerHTML = inputTodo.value
        todoItem.appendChild(newTodoItem);

        // Create completed button
        const completedButton = document.createElement("button");
        completedButton.classList.add("completed-btn");
        completedButton.innerHTML = "Completed";

        todoItem.appendChild(completedButton);

        // Create delete button
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-btn");
        deleteButton.innerHTML = "Delete";
        todoItem.appendChild(deleteButton);

        // Clear input form
        inputTodo.value = "";
    } else {
        alert("Input todo terlebih dahulu!");
    }
    
});

const validateInput = () => {
    const input = inputTodo.value;
    let status = false;
    
    if(input !== "" && input !== undefined) {
        status = true;
    }
    
    return status;
}

todoList.addEventListener('click', (e) => {
    const element = e.target;
    const todoItem = element.parentElement;
    

    if(element.classList[0] === "delete-btn") {
        todoItem.classList.toggle("deleted");

        todoItem.addEventListener('transitionend', () => {
            todoItem.remove();
        });
    }

    if(element.classList[0] === "completed-btn") {

        if(todoItem.classList.contains("completed")) {
            todoItem.classList.remove("completed");
            element.innerHTML = "Completed";
        } else {
            todoItem.classList.toggle("completed");
            element.innerHTML = "Uncompleted";
            
        }

        
    }
});
