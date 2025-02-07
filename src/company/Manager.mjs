const Employee = require('./Employee');

class Manager extends Employee {
    #factor;

    constructor(id, basicSalary, department, factor) {
        super(id, basicSalary, department);
        this.#factor = factor;
    }

    computeSalary() {
        return Math.floor(super.computeSalary() * this.#factor);
    }

    getFactor() {
        return this.#factor;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            factor: this.#factor
        };
    }

    static fromJSON(jsonObj) {
        return new Manager(jsonObj.id, jsonObj.basicSalary, jsonObj.department, jsonObj.factor);
    }
}

export default Manager;