import express from "express";
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const nodemailer = require("nodemailer");
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../public/uploads/profile_images"),
  filename: (req, file, cb) => {
    const user_id = req.body.user_id;
    cb(null, user_id + "profile-image" + path.extname(file.originalname));
  },
});

const upload_image = multer({
  storage,
  dest: path.join(__dirname, "public/uploads"),
  limits: { fileSize: 3000000 },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname));
    if (mimetype && extname) {
      return cb(null, true);
    }

    cb("El archivo debe ser una imágen válida");
  },
}).single("img_profile");

//para filtrar campos de put
//const _ = require('underscore');

import User from "../models/user";
const { checkAuth, checkAdmin } = require("../middlewares/autentication");


//END POINTS

//POST
router.post("/new-user", async (req, res) => {
  const body = req.body;

  console.log(body)

  body.password = bcrypt.hashSync(req.body.password, saltRounds);

  try {
    const userDB = await User.create(body);
    res.json(userDB);
  } catch (error) {
    return res.status(500).send(error);
  }
});
//saber si existe un usuario
router.get("/findUser/:email", async (req, res) => {
  const email = req.params.email;
  try {
    const result = await User.find({ email: email });

    console.log(result)

    if (result.length != 0) {
      res.json("ok");
    } else {
      res.json("no existe");
    }
  } catch (error) {
    return res.status(500).send(error);
  }
});
































//actualizar datos de un usuario
router.put("/dates/:user_id", async (req, res) => {
  const body = req.body;
  const id = req.params.user_id;

  console.log(body);

  try {
    const result = await User.updateOne({ _id: id }, body);

    res.json(result);
  } catch (error) {
    res.status(500).send(error);
  }
});





//subir imagen
router.put("/upload-image", upload_image, async (req, res) => {
  const user_id = req.body.user_id;
  const extension = path.extname(req.file.originalname);
  const url = req.body.urlServer;

  try {
    const result = await User.updateOne(
      { _id: user_id },
      { img: `${url}/uploads/profile_images/${user_id}profile-image${extension}` }
    );
    res.json(result);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.get('/dates/:email',checkAuth,async(req,res)=>{
    try {
      const email = req.params.email;
      const dateUser = await User.findOne({email:email})

      return res.json(dateUser)
    } catch (error) {
      return res.status(500).send(error);
    }
})

//PUT
router.put("/user/:id", [checkAuth, checkAdmin], async (req, res) => {
  try {
    const _id = req.params.id;
    const body = req.body;

    if (body.password) {
      body.password = bcrypt.hashSync(req.body.password, saltRounds);
    }

    const userDB = await User.findByIdAndUpdate(_id, body, {
      new: true,
      runValidators: true,
    });

    return res.json(userDB);
  } catch (error) {
    return res.status(500).send(error);
  }
});

//info de todos los usuarios
router.get("/users", [checkAuth, checkAdmin], async (req, res) => {
  try {
    const users = await User.find();

    return res.json(users);
  } catch (error) {
    return res.status(500).send(error);
  }
});

//Retorna la información de un usuario
router.get("/user/:id", [checkAuth, checkAdmin], async (req, res) => {
  const id = req.params.id;

  try {
    const info = await User.findOne({ _id: id });

    return res.json(info);
  } catch (error) {
    return res.status(500).send(error);
  }
});



router.post("/recover-password", async (req, res) => {
  const email = req.body.email;

  const userFind = await User.findOne({ email: email });

  if (userFind) {
    let contraseña = Math.random().toString(36).substring(0, 7);

    const encrypPassword = bcrypt.hashSync(contraseña, saltRounds);

    try {
      await User.updateOne({ email: email }, { password: encrypPassword });

      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: "app@oolloo.com.au", // generated ethereal user
          pass: "dexblhrnvkfqwpxt", // generated ethereal password
        },
      });

      transporter.verify().then((res) => {
        console.log("ready for send emails");
      });

      await transporter.sendMail({
        from: '"Forgot password👻" <app@oolloo.com.au', // sender address
        to: email, // list of receivers
        subject: "Forgot contraseña ✔", // Subject line
        html: `
        <h1> Recuperar contraseña</h1>
        <p>Utiliza la siguiente contraseña temporal para ingresar a tu cuenta:</p>
        <p>${contraseña}</p>
    `, // html body
      });

      res.json("Correo de recuperación de contraseña generado");
    } catch (error) {
      return res.send(error);
    }
  } else {
    return res.json("no se encontró el email registrado");
  }
});

module.exports = router;
