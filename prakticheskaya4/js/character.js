class Character {
    constructor(name) {
        this.name = name;
        this.level = 1;
        this.xp = 0;
    }

    addExperience(amount) {
        this.xp += amount;
        while (this.xp >= this.getXPToNextLevel()) {
            this.xp -= this.getXPToNextLevel();
            this.levelUp();
        }
        this.save();
    }

    levelUp() {
        this.level++;
        alert(`🎉 Поздравляем! ${this.name} достиг уровня ${this.level}!`);
    }

    getXPToNextLevel() {
        return 100 * this.level;
    }

    save() {
        Storage.saveCharacter(this);
    }

    static load() {
        const data = Storage.loadCharacter();
        if (data) {
            const char = new Character(data.name);
            char.level = data.level;
            char.xp = data.xp;
            return char;
        }
        return null;
    }
}
