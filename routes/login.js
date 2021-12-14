import express from 'express';
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


import User from '../models/user';

router.post('/', async (req, res) => {

    const body = req.body;

    try {
        const userDB = await User.findOne({ email: body.email });

        if (!userDB) {
            return res.status(404).json({ message: 'email no encontrado' });
        }

        //evaluar la contraseña
        if (!bcrypt.compareSync(body.password, userDB.password)) {
            return res.status(401).json({ message: 'contraseña incorrecta' });
        }

        // Generar Token
        let token = jwt.sign({
            data: userDB
        }, 'talcualUamSecretPassword', { expiresIn: 60 * 60 * 24 * 30 }) // Expira en 30 días

        res.json({
            userDB,
            token
        })

    } catch (error) {
        return res.status(500).json(error);
    }
})


module.exports = router;