const CompanySettings = Object.freeze({
    MIN_EMPLOYEE_ID : 100000,
    MAX_EMPLOYEE_ID : 999999,
    MIN_BASIC_SALARY : 5000,
    MAX_BASIC_SALARY : 30000,
    DEPARTMENTS : [ "QA", "Audit", "Development", "Management" ],
    MIN_EMPLOYEE_AGE : 18,
    MAX_EMPLOYEE_AGE : 70,
    MIN_WAGE : 5,
    MAX_WAGE : 50,
    MIN_HOURS : 1,
    MAX_HOURS : 40,
    MIN_PERCENT : 10,
    MAX_PERCENT : 100,
    MIN_SALES : 5,
    MAX_SALES : 99999,
    MIN_FACTOR : 0.1,
    MAX_FACTOR : 1.0,

    isValidDepartment(department) {
        return this.DEPARTMENTS.includes(department);
    },

    isValidEmployeeID(employeeId) {
        return employeeId >= this.MIN_EMPLOYEE_ID && employeeId <= this.MAX_EMPLOYEE_ID;
    },

    isValidBasicSalary(basicSalary) {
        return basicSalary >= this.MIN_BASIC_SALARY && basicSalary <= this.MAX_BASIC_SALARY;
    },

    isValidEmployeeAge(employeeAge) {
        return employeeAge >= this.MIN_EMPLOYEE_AGE && employeeAge <= this.MAX_EMPLOYEE_AGE;
    },

    isValidWage(wage) {
        return wage >= this.MIN_WAGE && wage <= this.MAX_WAGE;
    },


    isValidWageEmployee(wageEmployee) {
        return this.isValidEmployeeID(wageEmployee.employeeId) && this.isValidWage(wageEmployee.wage);
    },

    isValidHours(hours) {
        return hours >= this.MIN_HOURS && hours <= this.MAX_HOURS;
    },

    isValidPercent(percent) {
        return percent >= this.MIN_PERCENT && percent <= this.MAX_PERCENT;
    },

    isValidSales(sales) {
        return sales >= this.MIN_SALES && sales <= this.MAX_SALES;
    },

    isValidFactor(factor) {
        return factor >= this.MIN_FACTOR && factor <= this.MAX_FACTOR;
    },
});

export default CompanySettings;