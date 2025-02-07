const Employee = require('./Employee');

class SalesPerson extends WageEmployee {
    #percent;
    #sales;
    constructor(id, basicSalary, department, wage, hours, percent, sales) {
        super(id, basicSalary, department, wage, hours);
        this.#percent = percent;
        this.#sales = sales;
    }

    getPercent() {
        return this.#percent;
    }

    getSales() {
        return this.#sales;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            percent: this.#percent,
            sales: this.#sales
        };
    }

    static fromJSON(jsonObj) {
        return new SalesPerson(jsonObj.id, jsonObj.basicSalary, jsonObj.department, jsonObj.wage, jsonObj.hours, jsonObj.percent, jsonObj.sales);
    }

    computeSalary() {
        return (super.computeSalary() + this.#sales * this.#percent / 100);
    }

}