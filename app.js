import express  from 'express';
 const app  = express();
import morgan  from 'morgan';
import cors  from 'cors';
import path  from 'path';
import history  from 'connect-history-api-fallback';

//Midlewares


//traemos la configuracion de la base de datos
require('./database/database');

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Las rutas deben estar antes del history
app.use(require('./routes/user'));
app.use('/login',require('./routes/login'));
app.use('/products',require('./routes/products'));
//Midleware para vue.js router modo history
app.use(history());
//esta configuracion de ruta estatica debe ir despues de history
app.use(express.static(path.join(__dirname,'public')));


//configure port dynamically
app.set('port', process.env.PORT || 3000);

//Call 'port' here
app.listen(app.get('port'), function () {
    console.log("escuchando en el puerto 3000");
})