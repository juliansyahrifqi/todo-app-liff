const addTodoButton = document.querySelector(".add-button");
const todoList = document.querySelector(".todo-list");
const inputTodo = document.querySelector(".add-todo");

const addTodo = () => {
    if(validateInput()) {
        // Create div todo-item
        const todoItem = document.createElement("div");
        todoItem.classList.add("todo-item");
        todoList.appendChild(todoItem);

        // Create todo list
        const newTodoItem = document.createElement("li");
        newTodoItem.innerHTML = inputTodo.value;
        todoItem.appendChild(newTodoItem);

        saveTodo(inputTodo.value);

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
}

const validateInput = () => {
    const input = inputTodo.value;
    let status = false;
    
    if(input !== "" && input !== undefined) {
        status = true;
    }
    
    return status;
}

const saveTodo = (todo) => {
    let todosList;

    if(localStorage.getItem('todos') === null) {
        todosList = [];
    } else {
        todosList = JSON.parse(localStorage.getItem("todos"));
    }

    todosList.push(todo);
    localStorage.setItem("todos", JSON.stringify(todosList));
};

const loadTodoList = () => {
    let todosList;

    if(localStorage.getItem('todos') === null) {
        todosList = [];
    } else {
        todosList = JSON.parse(localStorage.getItem("todos"));
    }

    todosList.forEach((todo) => {
        //Create div todo-item
        const todoItem = document.createElement('div');
        todoItem.classList.add("todo-item");
        todoList.appendChild(todoItem);

        // Create list todo
        const newTodoItem = document.createElement("li");
        newTodoItem.innerHTML = todo;
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

    });
}

const removeLocalTodo = (todo) => {
    let todosList;

    if(localStorage.getItem('todos') === null) {
        todosList = [];
    } else {
        todosList = JSON.parse(localStorage.getItem("todos"));
    }

    const todoElement = todo.children[0].innerText;
    todosList.splice(todosList.indexOf(todoElement), 1);
    localStorage.setItem("todos", JSON.stringify(todosList));
}

document.addEventListener("DOMContentLoaded", () => {
    loadTodoList();
});

addTodoButton.addEventListener('click', (e) => {
    e.preventDefault();
    
    addTodo();
});

todoList.addEventListener('click', (e) => {
    const element = e.target;
    const todoItem = element.parentElement;
    

    if(element.classList[0] === "delete-btn") {
        todoItem.classList.toggle("deleted");
        removeLocalTodo(todoItem);

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

