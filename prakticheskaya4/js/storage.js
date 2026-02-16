const Storage = {
    saveCharacter: function (character) {
        localStorage.setItem('rpgCharacter', JSON.stringify(character));
    },
    loadCharacter: function () {
        const data = localStorage.getItem('rpgCharacter');
        return data ? JSON.parse(data) : null;
    },
    saveTasks: function (tasks) {
        localStorage.setItem('rpgTasks', JSON.stringify(tasks));
    },
    loadTasks: function () {
        const data = localStorage.getItem('rpgTasks');
        return data ? JSON.parse(data) : [];
    },
    clearAll: function () {
        localStorage.removeItem('rpgCharacter');
        localStorage.removeItem('rpgTasks');
    }
};
