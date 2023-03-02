const express = require('express');
const CustomerRepo = require('../repos/customer-repo');

const router = express.Router();

router.get('/customers', async (req, res) => {
    const customers = await CustomerRepo.find();
    res.send(customers);
});

router.get('/customers/:id', async (req, res) => {
    const { id } = req.params;

    const customer = await CustomerRepo.findById(id);

    if (customer) {
        res.send(customer);
    } else {
        res.sendStatus(404);
    }
});

router.post('/customers', async (req, res) => {
    const { username } = req.body;

    const customer = await CustomerRepo.insert(username);

    res.send(customer);
});

router.put('/customers/:id', async (req, res) => {
    const { id } = req.params;
    const { username } = req.body;

    const customer = await CustomerRepo.update(id, username);

    if (customer) {
        res.send(customer);
    } else {
        res.sendStatus(404);
    }
});

router.delete('/customers/:id', async (req, res) => {
    const { id } = req.params;

    const customer = await CustomerRepo.delete(id);

    if (customer) {
        res.send(customer);
    } else {
        res.sendStatus(404);
    }
});

module.exports = router;
