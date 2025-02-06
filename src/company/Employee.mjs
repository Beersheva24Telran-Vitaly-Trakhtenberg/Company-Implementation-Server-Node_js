// src/company/Employee.js
class Employee {
    constructor(id, basicSalary, department) {
        this.id = id;
        this.basicSalary = basicSalary;
        this.department = department;
    }

    computeSalary() {
        return this.basicSalary;
    }

    toJSON() {
        return {
            id: this.id,
            basicSalary: this.basicSalary,
            department: this.department
        };
    }

    static fromJSON(jsonObj) {
        return new Employee(jsonObj.id, jsonObj.basicSalary, jsonObj.department);
    }
}

export default Employee;