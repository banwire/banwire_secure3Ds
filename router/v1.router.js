
const paymentController =  require("../controller/payment");

function routerV1(app){
    app.get('/', function(req, res){
        res.render('index')
    });

    app.post('/v1/payment', paymentController.payment3Ds);
}


module.exports = routerV1;