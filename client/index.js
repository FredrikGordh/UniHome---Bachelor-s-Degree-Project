//-------------------------JQuery events-------------------------


$(document).ready(function () {
    go_home();


    //----Menu events:

    //Click on logo to go home
    $("#navbar-logo").click(function (e) {
        e.preventDefault();
        go_home();
    });

    //Burger menu: Go register
    $("#register_button").click(function (e) {
        e.preventDefault();
        go_register();
    });

    //Burger menu: Go login
    $("#login_button").click(function (e) {
        e.preventDefault();
        go_login();
    });

    $("#home_search_submit").click(function (e) {
        e.preventDefault();
        go_search();
    });


    //----Other events:

    //Using .on()-function since we need to check if the content of #content is loaded before checking for events

    //Submit register form
    $("#content").on("click", "#register_form_button", function (e) {
        e.preventDefault();
        register_request();
    });

    //Submit login form
    $("#content").on("click", "#login_form_button", function (e) {
        e.preventDefault();
        login_request();
    });
})

//-------------------------REQUESTS-------------------------

//----Request variables:

//Global request variable: host
var host = 'http://localhost:5000';

//----Requests:

//Function for making a request for all ads from database
function load_ads_request() {
    $.ajax({
        url: host + '/ads',
        type: 'GET',
        success: function (ads) {
            $("#search_result").empty();
            ads.forEach(element => {
                $("#search_result").append(Mustache.render(accomodation, element));
            });
        }
    })
}

//Function for making a login request 
function login_request(user) {
    $.ajax({
        url: host + '/user/login',
        type: 'POST',
        data: JSON.stringify(user),
        success: function (response) {
            sessionStorage.setItem('auth', JSON.stringify(response));
            go_home();
        }
    })
}

//Function for making a register request 
function register_request(user) {
    $.ajax({
        url: host + '/user/signup',
        type: 'POST',
        data: JSON.stringify(user),
        success: function (response) {
            go_home();
        }
    })
}


//-------------------------Functions-------------------------

//----Nav functions:

//Function for going to view: Home_page
function go_home() {
    $("#content").html($("#home_page").html());
    load_search_dropdowns();
}

//Function for going to view: Register_page
function go_register() {
    $("#content").html($("#register_page").html());
    load_register_dates();
}

//Function for going to view: Login_page
function go_login() {
    $("#content").html($("#login_page").html());

}

//Function for going to view: Search_result_page
function go_search() {
    $("#content").html($("#search_page").html());
    load_ads_request();
}

//----Functional functions:

//Function for calling all date loaders
function load_register_dates() {
    load_years("#year_register");
    load_months("#month_register");
    load_days("#day_register");
}

//Function for loading in all selectable years in register form
function load_years(container) {
    var year = new Date().getFullYear();
    for (i = 0; i < 100; i++) {
        $(container).append("<option>" + year + "</option>")
        --year;
    }
}

//Function for loading in all selectable months in register form
function load_months(container) {
    for (i = 1; i < 13; i++) {
        $(container).append("<option>" + i + "</option>")
    }
}

//Function for loading in all selectable days in register form
function load_days(container) {
    for (i = 1; i < 32; i++) {
        $(container).append("<option>" + i + "</option>")
    }
}

//Function for loading data in dropdowns for search from home page
function load_search_dropdowns() {
    //add request function for all available areas
    load_searchable_years();
    load_months("#home_select_start_month")
    load_days("#home_select_length")
}

function load_searchable_years() {
    var year = new Date().getFullYear();
    for (i = 0; i < 5; i++) {
        $("#home_select_start_year").append("<option>" + year + "</option>")
        ++year;
    }
}

//Temporary, depends on how we implement how we search.
function load_days(container) {
    for (i = 1; i < 32; i++) {
        $(container).append("<option>" + i + "</option>")
    }
}

//----Form functions:

function submit_register_form() {
    var user = {
        name: $("#name_register").val(),
        gender: $("#gender_register").val(),
        year: $("#year_register").val(),
        month: $("#month_register").val(),
        day: $("#day_register").val(),
        telephone: $("#phone_register").val(),
        email: $("#email_register").val(),
        password: $("#password_register").val()
    }
    register_request(user);
}

function submit_login_form() {
    var user = {
        email: $("#email_login").val(),
        password: $("#password_login").val()
    }
    login_request(user);
}