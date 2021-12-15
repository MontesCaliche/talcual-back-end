import express from 'express';
const router = express.Router();
import Product from '../models/product'
import multer from "multer";
import path from "path";
const {checkAuth} = require('../middlewares/autentication');

const storage = multer.diskStorage({
    destination: path.join(__dirname, "../public/uploads/products-images"),
    filename: (req, file, cb) => {
      const user_id = req.body.user_id;
      const name_product = req.body.productName;
      cb(null, user_id + name_product +"product" + path.extname(file.originalname));
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
  }).single("file-img");

//Obtiene todos los productos registrados en la paltaforma
router.get('/',checkAuth,async(req,res)=>{ 
    try {
        const allProducts = await Product.find()
        res.json(allProducts);
    } catch (error) {
        return res.status(500).send(error);
    }
});  


//Obtener respuestas de un usuario en específico
router.post('/',upload_image,async(req,res)=>{
    const user_id = req.body.user_id;
    const productName = req.body.productName;
    const productPrice = parseFloat(req.body.productPrice);
    const productCity = req.body.productCity;
    const productCategory = req.body.productCategory;
    const productDescription = req.body.productDescription;
    const urlServer = req.body.urlServer;
    const extension = path.extname(req.file.originalname);

    try {
        const userDB = await Product.create({
            user_id,
            productName,
            productPrice,
            productCity,
            productCategory,
            productDescription,
            imageurl:`${urlServer}/uploads/products-images/${user_id}${productName}product${extension}`
        });
        res.json(userDB);
      } catch (error) {
          console.log(error)
        return res.status(500).send(error);
      }

})

module.exports = router;