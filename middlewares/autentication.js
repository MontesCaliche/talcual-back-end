const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
    const token = req.get('token');

    jwt.verify(token, 'pneumaOollooSecretPassword', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'El usuario no es válido' });
        }

        req.user = decoded.data;
        next();
    });

};

const checkAdmin = (req, res, next) =>{
    const rol = req.user.role;

    console.log(rol)
    if (rol === 'admin'){
        next()
    }else{
        console.log(entre)
        return res.status(401).json({ message: 'El usuario no es válido' });
    }
};

const checkStore = (req, res, next) =>{
    const rol = req.user.role;

    console.log(rol)
    if (rol === 'store'){
        next()
    }else{
        console.log(entre)
        return res.status(401).json({ message: 'El usuario no es válido' });
    }
};

module.exports = { checkAuth, checkAdmin,checkStore };