$(document).ready(function () {
    $("#content").html($("#register_page").html());
    $("#header").html($("#home_header").html());
    load_ads();
    load_years();
    load_months();
    load_days();
})



//Function for loading in all selectable years in register form
function load_years() {
    var year = new Date().getFullYear();
    for (i = 0; i < 100; i++) {
        $("#year_register").append("<option>" + year + "</option>")
        --year;
    }
}

//Function for loading in all selectable months in register form
function load_months() {
    for (i = 1; i < 13; i++) {
        $("#month_register").append("<option>" + i + "</option>")
    }
}

//Function for loading in all selectable days in register form
function load_days() {
    for (i = 1; i < 32; i++) {
        $("#day_register").append("<option>" + i + "</option>")
    }
}

//Global request variable: host
var host = 'http://localhost:5000';

//Function for making a request for all ads from database
function load_ads() {
    $.ajax({
        url: host + '/ads',
        type: 'GET',
        success: function (ads) {
            console.log(ads);
            $("#search_result").empty();
            ads.forEach(element => {
                console.log(element.title);
                $("#search_result").append(Mustache.render(accomodation, element));
            });
        }
    })
}