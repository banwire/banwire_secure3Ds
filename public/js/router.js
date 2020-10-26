$(document).ready(function() {

    //init demo
    $("#template-customer").show()
    $("#template-card").hide()
    $(".notification").hide()
    $("#template-3Ds").hide()


    $('#customer-next').click(function(){
        $("#step-customer-info").removeClass("is-active has-gaps");
        $("#step-card-info").addClass("is-active has-gaps")

        // save amount
        $("#pay-amount").html($("#amount").val());

        // hide component formCustomer.ejs
        $("#template-customer").hide("slow");

        // show component formCard.ejs
        $("#template-card").show()
    });

    $('#pay').click(function(){
        $("#preloader").addClass("is-active");
    });

    $(".notification").click(function(){
        $(this).hide("slow");
    })
});