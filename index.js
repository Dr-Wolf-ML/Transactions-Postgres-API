const app = require('./src/app');
const pool = require('./src/pool');

const db = 'transactions';

pool.connect({
    host: 'localhost',
    port: 5432,
    database: db,
    user: 'wolf',
    password: '',
})
    .then(() => {
        app().listen('4000', () => {
            console.log(`Successfully connected to DB '${db}'`);
            console.log('App listening on port 4000...');
        });
    })
    .catch((err) => {
        console.error('Connection to DB failed with Error: ', err);
    });
