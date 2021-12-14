const mongoose = require('mongoose');

let url = 'mongodb://localhost:27017/talcualDB'
let url2 = 'mongodb+srv://Admin:Admin1234@talcualcluster.cgqaf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(url2, {useUnifiedTopology: true, useNewUrlParser: true})
    .then(db => console.log('Base de datos conectada :)'))
    .catch(err => console.error(err));