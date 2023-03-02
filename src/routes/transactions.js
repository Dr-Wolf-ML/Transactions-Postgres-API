const express = require('express');
const TransactionRepo = require('../repos/transaction-repo');

const router = express.Router();

// get all transactions
router.get('/transactions', async (req, res) => {
    const transactions = await TransactionRepo.find();
    res.send(transactions);
});

// get a transaction by transaction ID
router.get('/transactions/:id', async (req, res) => {
    const { id } = req.params;

    const transaction = await TransactionRepo.findById(id);

    if (transaction) {
        res.send(transaction);
    } else {
        res.sendStatus(404);
    }
});

// get all transactions by customer ID
router.get('/transactions/customer/:id', async (req, res) => {
    const { id } = req.params;
    console.log('req.params: ', req.params);
    console.log('id: ', id);

    const transaction = await TransactionRepo.findByCustomerId(id);

    if (transaction) {
        res.send(transaction);
    } else {
        res.sendStatus(404);
    }
});

// router.post('/transactions', async (req, res) => {
//     const { transaction, value } = req.body;

//     const transaction = await TransactionRepo.insert(username);

//     res.send(transaction);
// });

// router.put('/transactions/:id', async (req, res) => {
//     const { id } = req.params;
//     const { username } = req.body;

//     const transaction = await TransactionRepo.update(id, username);

//     if (transaction) {
//         res.send(transaction);
//     } else {
//         res.sendStatus(404);
//     }
// });

router.delete('/transactions/:id', async (req, res) => {
    const { id } = req.params;

    const transaction = await TransactionRepo.delete(id);

    if (transaction) {
        res.send(transaction);
    } else {
        res.sendStatus(404);
    }
});

module.exports = router;
