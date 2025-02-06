const PlainFileStorage = require('./PlainFileStorage');
const SQLDatabaseStorage = require('./SQLDatabaseStorage');

class Storage {
    static createStorage(server, type) {
        switch (type) {
            case 'file':
                return new PlainFileStorage(server);
            case 'sql':
                return new SQLDatabaseStorage(server);
            default:
                throw new Error('Unknown storage type');
        }
    }

    async save(company) {
        throw new Error('Method not implemented');
    }

    async load() {
        throw new Error('Method not implemented');
    }
}

export default Storage;