const express = require('express');
const router = express.Router();

//middleware for protected routes
const auth = require('../middleware/auth')
//express validator
const { check, validationResult } = require('express-validator');
const User = require('../models/User')
const SuperHero = require('../models/SuperHeros')




//@route Get api/SuperHeros
//@description Get all logged in user SuperHeros
//@access Private, protected route with auth parameter
router.get('/', auth, async (req, res) => {
    try {
        const superHeros = await SuperHero.find({ user: req.user.id }).sort({ date: -1 });
        res.json(superHeros);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});
//@route Post api/superHeros
//@description Add new super hero to the list
//@access Private
router.post('/', auth,
    [
        check('name', 'Name is Required').not().isEmpty()
    ], async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        //pull data from body
        const { name, humanName, homeTown, age } = req.body;
        try {
            const newSuperHero = new SuperHero({
                name,
                humanName,
                homeTown,
                age,
                user: req.user.id
            });
            const superHero = await newSuperHero.save();
            res.json(superHero);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error')
        }

    });
//@route Put api/SuperHeros/:id
//@description Get all logged in user SuperHeros
//@access Public
router.put('/:id', auth, async (req, res) => {
    const { name, humanName, homeTown, age } = req.body;
    //create superHero object based on user input
    const superHeroFields = {};
    if (name) superHeroFields.name = name;
    if (humanName) superHeroFields.humanName = humanName;
    if (humanName) superHeroFields.homeTown = homeTown;
    if (age) superHeroFields.age = age;

    try {
        //request params in the findById
        let superHero = await SuperHero.findById(req.params.id);
        if (!superHero) return res.status(404).json({ msg: 'SuperHero not found' });

        //make sure user is updating their own SuperHero list
        if (superHero.user.toString() != req.user.id) {
            return res.status(401).json({ msg: 'Not allowed to edit other user SuperHeros. ' });
        }
        superHero = await SuperHero.findByIdAndUpdate(req.params.id, { $set: superHeroFields },
            { new: true });
        res.json(superHero);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }

});
//@route DELETE api/
//@description Get all logged in user SuperHeros
//@access Public
router.delete('/:id', auth, async (req, res) => {
    try {
        //request params in the findById
        let superHero = await SuperHero.findById(req.params.id);
        if (!superHero) return res.status(404).json({ msg: 'SuperHero not found' });

        //make sure user is updating their own SuperHero list
        if (superHero.user.toString() != req.user.id) {
            return res.status(401).json({ msg: 'You can only edit your list of superHeros. ' });
        }
        await SuperHero.findByIdAndRemove(req.params.id);

        res.json({ msg: 'SuperHero was Deleted From DB' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
});

module.exports = router;