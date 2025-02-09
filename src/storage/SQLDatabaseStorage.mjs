import knex from 'knex';

class SQLDatabaseStorage {
    #server;
    #db_host;
    #db_name;
    #user_name;
    #user_pass;
    #connection;
    constructor(server, storage_settings) {
        this.#server = server;
        this.#db_host = storage_settings.db_host;
        this.#db_name = storage_settings.db_name;
        this.#user_name = storage_settings.user_name;
        this.#user_pass = storage_settings.user_pass;
    }

    async connect() {
        const dbConnectionConfig = {
            "client": "mysql",
            "connection": {
                "host": this.#db_host,
                "user": this.#user_name,
                "password": this.#user_pass,
                "database": this.#db_name
            },
            pool: {
                min: 2,
                max: 10,
                createTimeoutMillis: 3000,
                acquireTimeoutMillis: 30000,
                idleTimeoutMillis: 30000,
                reapIntervalMillis: 1000,
                createRetryIntervalMillis: 100,
            },
            migrations: {
                tableName: 'knex_migrations',
                directory: './migrations'
            },
            debug: process.env.NODE_ENV !== 'production',
            postProcessResponse: (result, queryContext) => {
                // ToDo - perform action under results of request
                return result;
            }
        };
        try {
            this.#connection = await knex(dbConnectionConfig);
            console.log('Successfully connected to the database.');
        } catch (error) {
            console.error('Failed to connect to the database:', error);
            this.#connection = null;
            throw error;
        }
    }

    async disconnect() {
        if (this.#connection) {
            await this.#connection.destroy();
            console.log('Database connection closed.');
        }
    }

    async load() {
        // ToDo
    }

    async save(company) {
        // ToDo
    }
}

export default SQLDatabaseStorage;