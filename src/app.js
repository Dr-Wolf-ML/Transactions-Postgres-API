const express = require('express');

const customersRouter = require('./routes/customers');
const transactionsRouter = require('./routes/transactions');

module.exports = () => {
    const app = express();

    app.use(express.json());
    app.use(customersRouter);
    app.use(transactionsRouter);

    return app;
};
