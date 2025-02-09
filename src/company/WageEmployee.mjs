import Employee from './Employee.mjs';

class WageEmployee extends Employee {
    #wage;
    #hours;

    constructor(id, basicSalary, department, wage, hours) {
        super(id, basicSalary, department);
        this.#wage = wage;
        this.#hours = hours;
    }

    getWage() {
        return this.#wage;
    }

    getHours() {
        return this.#hours;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            wage: this.#wage,
            hours: this.#hours,
        };
    }

    static fromJSON(jsonObj) {
        return new WageEmployee(jsonObj.id, jsonObj.basicSalary, jsonObj.department, jsonObj.wage, jsonObj.hours);
    }

    computeSalary() {
        return super.computeSalary() + this.#wage * this.#hours;
    }
}

export default WageEmployee;