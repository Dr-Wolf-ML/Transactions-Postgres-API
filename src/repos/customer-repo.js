const pool = require('../pool');
const toCamelCase = require('./utils/to-camel-case');

// Define repo
class CustomerRepo {
    static async find() {
        const { rows } = await pool.query('SELECT * FROM customers');

        return toCamelCase(rows);
    }

    static async findById(id) {
        // Prepared Statement
        const { rows } = await pool.query(
            `
                SELECT * FROM customers
                WHERE id = $1;
            `,
            [id]
        );

        return toCamelCase(rows)[0];
    }

    static async insert(username) {
        const { rows } = await pool.query(
            `
                INSERT INTO customers (username)
                VALUES
                ($1)
                RETURNING *;
            `,
            [username]
        );

        return toCamelCase(rows)[0];
    }

    static async update(id, username) {
        const { rows } = await pool.query(
            `
                UPDATE customers
                SET
                    username = $1
                WHERE id = $2
                RETURNING *;
            `,
            [username, id]
        );

        return toCamelCase(rows)[0];
    }

    static async delete(id) {
        const { rows } = await pool.query(
            `
                DELETE FROM customers
                WHERE id = $1
                RETURNING *;
            `,
            [id]
        );

        return toCamelCase(rows)[0];
    }

    static async count() {
        const { rows } = await pool.query(
            `
                SELECT COUNT(*) FROM customers
            `
        );

        return parseInt(rows[0].count);
    }
}

module.exports = CustomerRepo;
