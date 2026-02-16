let character = Character.load();
if (!character) {
    const name = prompt("Введите имя вашего героя:");
    character = new Character(name || "Герой");
    character.save();
}

const taskManager = new TaskManager();

const charName = document.getElementById("charName");
const charLevel = document.getElementById("charLevel");
const charXP = document.getElementById("charXP");
const xpToNextLevel = document.getElementById("xpToNextLevel");
const xpProgress = document.getElementById("xpProgress");

const taskList = document.getElementById("taskList");
const tasksDone = document.getElementById("tasksDone");
const totalXP = document.getElementById("totalXP");

const taskNameInput = document.getElementById("taskName");
const taskDescInput = document.getElementById("taskDesc");
const taskDifficulty = document.getElementById("taskDifficulty");
const addTaskBtn = document.getElementById("addTaskBtn");
const resetBtn = document.getElementById("resetBtn");

function renderCharacter() {
    charName.innerText = character.name;
    charLevel.innerText = character.level;
    charXP.innerText = character.xp;
    xpToNextLevel.innerText = character.getXPToNextLevel();
    xpProgress.style.width = (character.xp / character.getXPToNextLevel() * 100) + "%";
}

function renderTasks() {
    taskList.innerHTML = "";
    taskManager.getTasks().forEach(task => {
        const li = document.createElement("li");
        li.className = task.completed ? "completed" : "";

        li.innerHTML = `
      <span>${task.name} (+${task.xp} XP)</span>
      <span>
        <input type="checkbox" ${task.completed ? "checked" : ""} data-id="${task.id}">
        <button data-id="${task.id}">❌</button>
      </span>
    `;
        taskList.appendChild(li);
    });

    const done = taskManager.getTasks().filter(t => t.completed).length;
    const total = taskManager.getTasks().reduce((sum, t) => sum + t.xp, 0);
    tasksDone.innerText = done;
    totalXP.innerText = total;
}

addTaskBtn.onclick = () => {
    const name = taskNameInput.value.trim();
    if (!name) return alert("Введите название задачи!");
    const desc = taskDescInput.value.trim();
    const xp = parseInt(taskDifficulty.value);
    const task = new Task(name, desc, xp);
    taskManager.addTask(task);
    taskNameInput.value = "";
    taskDescInput.value = "";
    renderTasks();
};

taskList.onclick = (e) => {
    const id = parseInt(e.target.dataset.id);
    if (e.target.tagName === "INPUT") {
        taskManager.toggleTask(id);
        const task = taskManager.getTasks().find(t => t.id === id);
        if (task.completed) character.addExperience(task.xp);
        renderCharacter();
        renderTasks();
    }
    if (e.target.tagName === "BUTTON") {
        taskManager.removeTask(id);
        renderTasks();
    }
};

resetBtn.onclick = () => {
    if (confirm("Вы действительно хотите сбросить прогресс?")) {
        Storage.clearAll();
        location.reload();
    }
};

renderCharacter();
renderTasks();
