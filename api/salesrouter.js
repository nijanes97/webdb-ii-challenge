const express = require('express');
const knex = require('knex');
const router = express.Router();

const db = knex({
    client: 'sqlite3',
    connection: {
        filename: './data/car-dealer.db3'
    },
    useNullAsDefault: true
});

router.get('/', (req, res) => {
    db('sales')
        .then(sales => {
            res.status(200).json(sales);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: "Error retrieving sales" })
        })
})

router.get('/:id', validateSaleById, (req, res) => {
    if(req.sale){
        res.status(200).json(req.sale);
    } else {
        res.status(404).json({ message: 'invalid id' })
    }
});

router.post('/', validateSale, (req, res) => {
    db('sales')
        .insert(req.body)
        .then(ids => {
            db('sales')
                .where({ id: ids[0] })
                .then(newsale => {
                    res.status(200).json(newsale);
                });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: "Error adding new sale" });
        });
});

router.put('/:id', validateSale, validateSaleById, (req, res) => {
    db('sales')
        .where({ id: req.params.id })
        .update(req.body)
        .then(num => {
            res.status(200).json(`updated ${num} sale(s)`);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: "Error updating sale" });
        });
});

router.delete('/:id', validateSaleById, (req, res) => {
    db('sales')
        .where({ id: req.params.id })
        .del()
        .then(num => {
            res.status(200).json(`removed ${num} sale(s)`);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: "Error removing sale" });
        });
});

function validateSale(req, res, next) {
    if(!req.body.seller || !req.body.buyer || !req.body.car || !req.body.price) {
        res.status(400).json({ message: 'Missing required attributes' });
    } else {
        next();
    }
}

function validateSaleById(req, res, next) {
    db('sales')
        .where({ id: req.params.id })
        .then(sales => {
            req.sale = sales;
            next();
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: "Error retrieving sale by id" });
        });
}

module.exports = router;