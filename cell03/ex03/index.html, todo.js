// Helper functions for cookie management
function setCookie(name, value, days) {
    const expires = days ? "; expires=" + new Date(Date.now() + days*864e5).toUTCString() : "";
    document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
}

function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
        const [key, val] = cookie.split('=');
        if (key === name) return decodeURIComponent(val);
    }
    return null;
}

function saveList() {
    // Gather all TO DO texts in an array
    const ftList = document.getElementById('ft_list');
    const todos = [];
    for (const child of ftList.children) {
        todos.push(child.textContent);
    }
    // Save as JSON string in cookie for 7 days
    setCookie('todo_list', JSON.stringify(todos), 7);
}

function loadList() {
    const ftList = document.getElementById('ft_list');
    const saved = getCookie('todo_list');
    if (saved) {
        try {
            const todos = JSON.parse(saved);
            for (const todoText of todos.reverse()) {
                addTodo(todoText, false);
            }
        } catch(e) {
            // If cookie corrupted, ignore
            console.error('Failed to parse todo_list cookie:', e);
        }
    }
}

function addTodo(text, save=true) {
    if (!text || text.trim() === "") return;

    const ftList = document.getElementById('ft_list');
    const todoDiv = document.createElement('div');
    todoDiv.textContent = text;
    todoDiv.className = 'todo_item';

    // Insert at the top
    if (ftList.firstChild) {
        ftList.insertBefore(todoDiv, ftList.firstChild);
    } else {
        ftList.appendChild(todoDiv);
    }

    // Add click listener to delete on confirmation
    todoDiv.addEventListener('click', () => {
        const confirmDel = confirm(`Do you want to remove this TO DO?\n\n"${todoDiv.textContent}"`);
        if (confirmDel) {
            todoDiv.remove();
            saveList();
        }
    });

    if (save) {
        saveList();
    }
}

window.onload = () => {
    loadList();

    const newBtn = document.getElementById('newBtn');
    newBtn.addEventListener('click', () => {
        const newTodo = prompt("Enter your new TO DO:");
        if (newTodo && newTodo.trim() !== "") {
            addTodo(newTodo.trim());
        }
    });
};
