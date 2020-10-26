const request = require('request');
var request3Ds = {
    amount: 0.0,
    reference: "",
    concept: "",
    url_response: "",
    customer: {
        email: "",
        name: "",
        phone: ""
    },
    card:{
        number:"",
        name: "",
        exp_month:"",
        exp_year:"",
        cvv:""
    },
    billing:{
        email: null,
        phone: null
    }
}

function payment3Ds(req, res){
     
    request3Ds["amount"] = req.body.amount ? parseFloat(req.body.amount) : 0 ;
    request3Ds["reference"] = `ref-${Math.floor(Math.random() * 50)}`;
    request3Ds["concept"] = "concept test 3Ds";
    request3Ds["url_response"] = "http://localhost:3004";

    if (req.body.customer) {
        request3Ds["customer"]["email"] = req.body.customer.email ? req.body.customer.email: "";
        request3Ds["customer"]["name"] = req.body.customer.name ? req.body.customer.name : "";
        request3Ds["customer"]["phone"] = req.body.customer.phone ? req.body.customer.phone : "";
    }

    if (req.body.card) {
        request3Ds["card"]["number"] = req.body.card.number ? req.body.card.number : "";
        request3Ds["card"]["name"] = req.body.card.name ? req.body.card.name : "";
        request3Ds["card"]["exp_month"] = req.body.card.exp_month ? req.body.card.exp_month : "";
        request3Ds["card"]["exp_year"] = req.body.card.exp_year ? req.body.card.exp_year : "";
        request3Ds["card"]["cvv"] = req.body.card.cvv ? req.body.card.cvv : "";
    }

    if (req.body.billing) {
        request3Ds["billing"]["email"] = req.body.billing.email ? req.body.billing.email : "";
        request3Ds["billing"]["phone"] = req.body.billing.phone ? req.body.billing.phone : ""; 
    }

    ExecPayment(request3Ds)
    .then(respSuccess => res.status(respSuccess.status).json({"display": respSuccess.content}))
    .catch(resError => res.status(resError.status).json({"error": resError.error}));
}

function ExecPayment(request3Ds) {

    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer rBwwfxCk4GKJRqUtxcCvEuqnCFTh53X6'
        },
        json: request3Ds,
        uri: 'http://localhost:3000/v2/charge/secure3Ds'
    }


    return new Promise(function(resolve, reject){
        request(options, function(error, response, body){
            if (!error) {
                if (response.statusCode == 200){
                    resolve({status: 200, content: body["html_body"]})
                } else {
                    reject({status: response.statusCode, error: body["messages"]})
                }
            } else {
                console.log(error)
                reject({ status: 500, error: `Error request banwire provider: ${error}`})
            } 
        })
    });
}




module.exports = {payment3Ds}