//import { ResponseCodes } from "../utils/ResponseCodes.mjs";

import CompanySettings from "../utils/CompanySettings.mjs";

class CompanyOperations {
    constructor(server, port) {
        this.server = server;
        this.port = port;
    }

    async handleRequest(requestType, requestData) {
        try {
            if (typeof this[requestType] === 'function') {
                return await this[requestType](requestData);
            } else {
                return { code: WRONG_REQUEST, data: `${requestType} Wrong type` };
            }
        } catch (error) {
            console.error(error);
            return { code: INTERNAL_ERROR, data: error.message };
        }
    }

    async getManagersMostFactors(data) {
        try {
            const company = this.server.getCompany();
            const managers = await company.getManagersWithMostFactor();
            return { code: SUCCESS, data: JSON.stringify(managers) };
        } catch (error) {
            return { code: INTERNAL_ERROR, data: error.message };
        }
    }

    async getDepartmentsList(data) {
        try {
            const company = this.server.getCompany();
            const departments = await company.getDepartments();
            return { code: SUCCESS, data: JSON.stringify(departments) };
        } catch (error) {
            return { code: INTERNAL_ERROR, data: error.message };
        }
    }

    async getDepartmentSalaryBudget(departmentName) {
        try {
            const company = this.server.getCompany();
            const budget = await company.getDepartmentBudget(departmentName);
            return { code: SUCCESS, data: budget.toString() };
        } catch (error) {
            return { code: INTERNAL_ERROR, data: error.message };
        }
    }

    async getEmployeesByAge(data) {
        // Implement this method
        throw new Error('Method getEmployeesByAge not implemented yet');
    }

    async getEmployeesByDepartment(department) {
        // Implement this method
        throw new Error('Method getEmployeesByDepartment not implemented yet');
    }

    async getEmployeeById(id) {
        try {
            const company = this.server.getCompany();
            const employeeId = parseInt(id);
            CompanySettings.validateEmployeeID(employeeId);
            const employee = await company.getEmployee(employeeId);
            if (!employee) {
                return { code: NOT_FOUND, data: `No data for employee id: ${id}` };
            }
            return { code: SUCCESS, data: JSON.stringify(employee) };
        } catch (error) {
            return { code: INTERNAL_ERROR, data: error.message };
        }
    }

    async getEmployees(data) {
        // Implement this method
        throw new Error('Method getEmployees not implemented yet');
    }

    async fireEmployee(id) {
        try {
            const company = this.server.getCompany();
            const employeeId = parseInt(id);
            CompanySettings.validateEmployeeID(employeeId);
            await company.removeEmployee(employeeId);
            this.server.setDataChanged(true);
            return { code: SUCCESS, data: 'Employee fired' };
        } catch (error) {
            return { code: INTERNAL_ERROR, data: error.message };
        }
    }

    async hireManager(jsonData) {
        try {
            const company = this.server.getCompany();
            const employee = await company.Manager.fromJSON(jsonData);
            await company.addEmployee(employee);
            this.server.setDataChanged(true);
            return { code: SUCCESS, data: 'Manager added' };
        } catch (error) {
            return { code: INTERNAL_ERROR, data: error.message };
        }
    }

    async hireSalesPerson(jsonData) {
        try {
            const company = this.server.getCompany();
            const employee = await company.SalesPerson.fromJSON(jsonData);
            await company.addEmployee(employee);
            this.server.setDataChanged(true);
            return { code: SUCCESS, data: 'Sales Person added' };
        } catch (error) {
            return { code: INTERNAL_ERROR, data: error.message };
        }
    }

    async hireWageEmployee(jsonData) {
        try {
            const company = this.server.getCompany();
            const employee = await company.WageEmployee.fromJSON(jsonData);
            await company.addEmployee(employee);
            this.server.setDataChanged(true);
            return { code: SUCCESS, data: 'Wage Employee added' };
        } catch (error) {
            return { code: INTERNAL_ERROR, data: error.message };
        }
    }

    async hireEmployee(jsonData) {
        try {
            const company = this.server.getCompany();
            const employee = await company.Employee.fromJSON(jsonData);
            await company.addEmployee(employee);
            this.server.setDataChanged(true);
            return { code: SUCCESS, data: 'Employee added' };
        } catch (error) {
            return { code: INTERNAL_ERROR, data: error.message };
        }
    }
}

export default CompanyOperations;
