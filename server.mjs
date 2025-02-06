import http from "node:http";

import CompanyOperations from "./src/operations/CompanyOperations.mjs";
import Company from "./src/company/Company.mjs";
import Storage from "./src/storage/Storage.mjs";

class Server {
    constructor(storageType) {
        this.company = new Company();
        this.storage = Storage.createStorage(this, storageType);
        this.dataChanged = false;
    }

    async start() {
        await this.loadData();
        this.startHttpServer();
    }

    async loadData() {
        try {
            this.company = await this.storage.load();
        } catch (error) {
            console.error('Error loading data:', error);
        }
    }

    startHttpServer() {
        function parseRequest(req) {
            console.log(req.url, req);
        }

        const server = http.createServer(async (req, res) => {
            const companyOps = new CompanyOperations(this, 3000);

            const { requestType, requestData } = parseRequest(req);

            const result = await companyOps.handleRequest(requestType, requestData);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(result));
        });

        server.listen(3000, () => {
            console.log('Server running on port 3000');
        });
    }

    getCompany() {
        return this.company;
    }

    setCompany(company) {
        this.company = company;
        this.setDataChanged(true);
    }

    setDataChanged(changed) {
        this.dataChanged = changed;
    }

    getDataChanged() {
        this.dataChanged = changed;
    }

    resetDataChanged() {
        this.dataChanged = false;
    }
}

const server = new Server('file');
server.start();