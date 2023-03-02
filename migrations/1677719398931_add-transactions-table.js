/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.sql(`
        CREATE TABLE transactions (
            id SERIAL PRIMARY KEY,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            transaction VARCHAR(30) NOT NULL,
            value REAL NOT NULL,
            customer_id INTEGER NOT NULL
        );
    `);
};

exports.down = (pgm) => {
    pgm.sql(`
        DROP TABLE transactions;
    `);
};
