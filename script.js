const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteTodo);

// fetch API function
const fetchApi = () => {
    todos = []
    axios.get("https://jsonplaceholder.typicode.com/todos")
        .then(response => {
            const responseData = response.data;
            for (let i = 0; i < 5; i++) {
                todos.push(responseData[i].title);
            }
            localStorage.setItem("todos", JSON.stringify(todos))
        })
}


// Add todo Function
function addTodo(e) {
    e.preventDefault();
    if (todoInput.value === "") {
        alert("You must enter a todo!");
        return;
    }
    // Todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // Create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");

    // Append newTodo to toDoDiv
    todoDiv.appendChild(newTodo);

    // Add todo to localStorage
    saveLocalStorage(todoInput.value);

    // Delete Button
    const deleteBtn = document.createElement("button")
    deleteBtn.innerHTML = `<i class="fas fa-trash-alt"></i>`
    deleteBtn.classList.add("delete-btn");
    todoDiv.appendChild(deleteBtn);

    // Append toDo Div to todoList
    todoList.appendChild(todoDiv);

    // Clear todo Input value
    todoInput.value = "";
}

// Delete todo function
function deleteTodo(e) {
    const item = e.target;

    if (item.classList[0] === "delete-btn") {
        const todo = item.parentElement;
        todo.remove();
        removeLocalStorage(todo);
    }

}

// Save to localStorage
function saveLocalStorage(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos))
}

// GET TODO FUNCTION
function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        fetchApi();
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function(todo) {
        // Todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // Create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");

    // Append newTodo to toDoDiv
    todoDiv.appendChild(newTodo);


    // Delete Button
    const deleteBtn = document.createElement("button")
    deleteBtn.innerHTML = `<i class="fas fa-trash-alt"></i>`
    deleteBtn.classList.add("delete-btn");
    todoDiv.appendChild(deleteBtn);

    // Append toDo Div to todoList
    todoList.appendChild(todoDiv);
    })
}

// REMOVE ITEMS FROM LOCAL STORAGE
function removeLocalStorage(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}