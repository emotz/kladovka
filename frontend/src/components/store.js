export default {
    state: {
        char: {
            atkSpd: 0,
            dmg: 0,
            critChance: 0,
            critDmg: 0
        }
    },
    setCharAction(newValue) {
        this.state.char = newValue;
    },
    clearCharAction() {
        this.state.char = {};
    }
};