class Task {
    constructor(name, desc, xp) {
        this.id = Date.now();
        this.name = name;
        this.desc = desc;
        this.xp = xp;
        this.completed = false;
    }
}

class TaskManager {
    constructor() {
        this.tasks = Storage.loadTasks();
    }

    addTask(task) {
        this.tasks.push(task);
        this.save();
    }

    removeTask(id) {
        this.tasks = this.tasks.filter(t => t.id !== id);
        this.save();
    }

    toggleTask(id) {
        const task = this.tasks.find(t => t.id === id);
        if (task) task.completed = !task.completed;
        this.save();
    }

    save() {
        Storage.saveTasks(this.tasks);
    }

    getTasks() {
        return this.tasks;
    }
}
