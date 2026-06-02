const API_URL = "http://localhost:5000";

async function loadTasks() {
    const response = await fetch(`${API_URL}/tasks`);
    const tasks = await response.json();

    let html = "";

    tasks.forEach(task => {
        html += `
        <div class="task ${task.done ? "done" : ""}">
            <h3>${task.title}</h3>
            <p>${task.description}</p>

            <button onclick="toggleTask(${task.id}, ${!task.done})">
                ${task.done ? "Повернути" : "Виконано"}
            </button>

            <button onclick="deleteTask(${task.id})">
                Видалити
            </button>
        </div>
        `;
    });

    document.getElementById("tasks").innerHTML = html;
}

async function createTask() {
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;

    if (!title) {
        alert("Введіть назву задачі");
        return;
    }

    await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title,
            description
        })
    });

    document.getElementById("title").value = "";
    document.getElementById("description").value = "";

    loadTasks();
}

async function toggleTask(id, done) {
    await fetch(`${API_URL}/tasks/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            done
        })
    });

    loadTasks();
}

async function deleteTask(id) {
    await fetch(`${API_URL}/tasks/${id}`, {
        method: "DELETE"
    });

    loadTasks();
}

loadTasks();