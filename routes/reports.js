import express from 'express';
const router = express.Router();
import Report from '../models/report'
import multer from "multer";
import path from "path";
const {checkAuth} = require('../middlewares/autentication');


const storage = multer.diskStorage({
    destination: path.join(__dirname, "../public/uploads/reports_images"),
    filename: (req, file, cb) => {
      const user_id = req.body.user_id;
      const reportTitle = req.body.title;
      cb(null,user_id + reportTitle +"report" + path.extname(file.originalname));
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

  //Obtiene todos los reportes registrados en la paltaforma
router.get('/',checkAuth,async(req,res)=>{ 
  try {
      const allReports = await Report.find()
      res.json(allReports);
  } catch (error) {
      return res.status(500).send(error);
  }
});  



  //Obtener respuestas de un usuario en específico
router.post('/',upload_image,async(req,res)=>{

    const urlServer = req.body.urlServer;
    const extension = path.extname(req.file.originalname);

    try {
        const userDB = await Report.create({
            foreignIdUser:req.body.user_id,
            emailUser:req.body.email,
            title:req.body.title,
            lastPrice:req.body.lastPrice,
            currentPrice:req.body.currentPrice,
            category:req.body.category,
            description:req.body.description,
            imageurl:`${urlServer}/uploads/reports_images/${req.body.user_id}${req.body.title}report${extension}`
        });
        res.json(userDB);
      } catch (error) {
          console.log(error)
        return res.status(500).send(error);
      }

});


module.exports = router;