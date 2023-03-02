const { randomBytes } = require('crypto');
const { default: migrate } = require('node-pg-migrate');
const format = require('pg-format');
const pool = require('../pool');

const defaultParams = {
    host: 'localhost',
    port: 5432,
    database: 'transactions-test',
    user: 'wolf',
    password: '',
};

class TestContext {
    constructor(roleName) {
        this.roleName = roleName;
    }

    static async build() {
        // Generate a random Role name
        const roleName = 'a' + randomBytes(4).toString('hex');

        // Connect to PG as usual
        await pool.connect(defaultParams);

        // Create a new Role
        await pool.query(
            format('CREATE ROLE %I WITH LOGIN PASSWORD %L;', roleName, roleName)
        );

        // Create a Schema with the same name
        await pool.query(
            format('CREATE SCHEMA %I AUTHORIZATION %I;', roleName, roleName)
        );

        // Disconnect entirely from PG
        await pool.close();

        // Run migrations in the new Schema
        await migrate({
            schema: roleName,
            direction: 'up',
            log: () => {},
            noLock: true,
            dir: 'migrations',
            databaseUrl: {
                host: 'localhost',
                port: 5432,
                database: defaultParams.database,
                user: roleName,
                password: roleName,
            },
        });

        // Connect to PG as the newly created Role
        await pool.connect({
            host: 'localhost',
            port: 5432,
            database: defaultParams.database,
            user: roleName,
            password: roleName,
        });

        return new TestContext(roleName);
    }

    async goodBye() {
        // Disonnect from PG
        await pool.close();

        // Reconnect as Root User
        await pool.connect(defaultParams);

        // Delete the Schema we created
        await pool.query(format('DROP SCHEMA %I CASCADE;', this.roleName));

        // Delete the Role we created
        await pool.query(format('DROP ROLE %I;', this.roleName));

        // Disconnect entirely from PG
        await pool.close();
    }
}

module.exports = TestContext;
