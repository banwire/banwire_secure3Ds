require('dotenv').config({ path: '.env' })
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const routerV1 = require('./router/v1.router.js');
const port = process.env.PORT;


app.use(cors())
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true,limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(cookieParser());
app.use(express.static('public'));
routerV1(app);

app.listen(port,function () {
    console.log('service personal expenses is runing on port: '+port);
});