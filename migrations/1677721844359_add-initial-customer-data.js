/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.sql(`
        INSERT INTO customers (username)
        VALUES 
            ('Alyson14'),
            ('Gia316'),
            ('ReneTravel01'),
            ('Mike-Conner23'),
            ('Tom_Anderson')
    `);
};

exports.down = (pgm) => {
    pgm.sql(`
        DROP TABLE customers;
    `);
};
