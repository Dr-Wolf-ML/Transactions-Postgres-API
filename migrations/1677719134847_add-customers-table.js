/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.sql(`
        CREATE TABLE customers (
            id SERIAL PRIMARY KEY,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            username VARCHAR(30) NOT NULL
        );
    `);
};

exports.down = (pgm) => {
    pgm.sql(`
        DROP TABLE customers;
    `);
};
