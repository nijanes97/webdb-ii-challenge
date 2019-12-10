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
    db('cars')
        .then(cars => {
            res.status(200).json(cars);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: "Error retrieving cars" })
        })
})

router.get('/:id', validateCarById, (req, res) => {
    if(req.car){
        res.status(200).json(req.car);
    } else {
        res.status(404).json({ message: 'invalid id' })
    }
});

router.post('/', validateCar, (req, res) => {
    db('cars')
        .insert(req.body)
        .then(ids => {
            db('cars')
                .where({ id: ids[0] })
                .then(newCar => {
                    res.status(200).json(newCar);
                });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: "Error adding new car" });
        });
});

router.put('/:id', validateCar, validateCarById, (req, res) => {
    db('cars')
        .where({ id: req.params.id })
        .update(req.body)
        .then(num => {
            res.status(200).json(`updated ${num} car(s)`);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: "Error updating car" });
        });
});

router.delete('/:id', validateCarById, (req, res) => {
    db('cars')
        .where({ id: req.params.id })
        .del()
        .then(num => {
            res.status(200).json(`removed ${num} car(s)`);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: "Error removing car" });
        });
});

function validateCar(req, res, next) {
    if(!req.body.VIN || !req.body.make || !req.body.model || !req.body.mileage) {
        res.status(400).json({ message: 'Missing required attributes' });
    } else {
        next();
    }
}

function validateCarById(req, res, next) {
    db('cars')
        .where({ id: req.params.id })
        .then(cars => {
            req.car = cars;
            next();
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: "Error retrieving car by id" });
        });
}

module.exports = router;