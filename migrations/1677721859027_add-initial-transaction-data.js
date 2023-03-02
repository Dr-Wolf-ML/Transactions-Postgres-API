/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.sql(`
        INSERT INTO transactions (transaction, value, customer_id)
        VALUES 
            ('travel_booking ref 123-abc-def', 200.34, 1),
            ('travel_booking ref 123-abc-def', 83.92, 1),
            ('travel_booking ref 123-abc-def', 499, 1),
            ('travel_booking ref 456-def-ghi', 150.50, 2),
            ('travel_booking ref 456-def-ghi', 150.50, 2),
            ('travel_booking ref 456-def-ghi', 150.50, 2),
            ('travel_booking ref 456-def-ghi', 150.50, 2),
            ('travel_booking ref 456-def-ghi', 150.50, 2),
            ('travel_booking ref 456-def-ghi', 150.50, 2),
            ('travel_booking ref 234-qwe-rty', 400, 3),
            ('travel_booking ref 234-qwe-rty', 300, 3),
            ('travel_booking ref 234-qwe-rty', 50, 4),
            ('travel_booking ref 234-qwe-rty', 50, 4),
            ('travel_booking ref 234-qwe-rty', 50, 4),
            ('travel_booking ref 234-qwe-rty', 50, 4),
            ('travel_booking ref 234-qwe-rty', 50, 4),
            ('travel_booking ref 567-ghj-bnm', 350, 5),
            ('travel_booking ref 567-ghj-bnm', 360, 5),
            ('travel_booking ref 567-ghj-bnm', 370, 5),
            ('travel_booking ref 567-ghj-bnm', 380, 5);
            `);
};

exports.down = (pgm) => {
    pgm.sql(`
        DROP TABLE transactions;
    `);
};
