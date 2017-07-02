export default {
    state: {
        char: {
            atkSpd: 1,
            dmg: 2,
            critChance: 3,
            critDmg: 4
        }
    },
    setCharAction(newValue) {
        this.state.char = newValue;
    },
    clearCharAction() {
        this.state.char = {};
    }
};