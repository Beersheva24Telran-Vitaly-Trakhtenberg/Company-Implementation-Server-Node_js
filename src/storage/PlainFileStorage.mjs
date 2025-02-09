import path from 'path';
import fs from 'fs/promises';

class PlainFileStorage {
    #server;
    #FILE_NAME;
    #DIRECTORY_NAME;
    constructor(server, storage_settings) {
        this.#server = server;
        this.#FILE_NAME = storage_settings.fileName;
        this.#DIRECTORY_NAME = storage_settings.directoryName;
    }

    async getFilePath() {
        try {
            const projectRoot = process.cwd(); // like Paths.get("").toAbsolutePath().toString() for JAVA
            const directoryPath = path.join(projectRoot, this.#DIRECTORY_NAME);
            const filePath = path.join(directoryPath, this.#FILE_NAME);

            await fs.mkdir(directoryPath, { recursive: true });

            await fs.writeFile(filePath, '', { flag: 'a' });

            return path.resolve(filePath);
        } catch (error) {
            console.error('Error in getFilePath:', error);
            throw error;
        }
    }

    async load() {
        try {
            const filePath = await this.getFilePath();
            const data = await fs.readFile(filePath, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.error('Error in load:', error);
            throw error;
        }
    }

    async save(company) {
        try {
            const filePath = await this.getFilePath();
            const data = JSON.stringify(company, null, 2);
            await fs.writeFile(filePath, data);
        } catch (error) {
            console.error('Error in save:', error);
            throw error;
        }
    }

}

export default PlainFileStorage;