
$(document).ready(function() {


    $('#pay').click(function(){
        let data = {
            "amount" : $("#amount").val(),
            "customer" : {
                "name" :  $("#cust-name").val(),
                "email":  $("#cust-email").val(),
                "phone":  $("#cust-phone").val()
            },
            "card" : {
                "number" : $("#card-number").val(),
                "name" : $("#card-name").val(),
                "exp_month" : $("#card-month").val(),
                "exp_year" : $("#card-year").val(),
                "cvv" : $("#card-cvv").val()
            }
        }
        
        $.ajax({
            type: "POST",
            url: "http://localhost:3004/v1/payment",
            data: data,
            success: function(response){
                $(".notification").hide();
                $("#template-3Ds").show();
                // var iframe = document.getElementById('desplay-3Ds'), iframedoc = iframe.contentDocument || iframe.contentWindow.document;
                // iframedoc.body.innerHTML = atob(response["display"]);
                $("#display-3Ds").html(atob(response["display"]));
                $("#template-card").hide()
                $("#preloader").removeClass("is-active");
            },
            error: function(error){
                switch (error.status) {
                    case 400:
                        $(".notification").hide();
                        $(".notification").addClass("is-danger");
                        $("#notification-message").html("Se encontraron errores en la peticion porfavor verifique su información y vuelva a intentar.");
                        $(".notification").show();
                        break;
                    case 401:
                        $(".notification").hide();
                        $(".notification").addClass("is-danger");
                        $("#notification-message").html("Este pago no puede ser procesado por seguridad, comuniquese con el proveedor.");
                        $(".notification").show();
                    case 402:
                        $(".notification").hide();
                        $(".notification").addClass("is-danger");
                        $("#notification-message").html("Se econtraron algunos errores al procesar su pago, vuelva a intentar.");
                        $(".notification").show();
                    case 500:
                        $(".notification").hide();
                        $(".notification").addClass("is-danger");
                        $("#notification-message").html("Servicio no disponible comuniquese con su proveedor.");
                        $(".notification").show();                                                 
                    default:
                        break;
                }
                $("#preloader").removeClass("is-active");
            }
        });


    });
});