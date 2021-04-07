//Enum för att översätta attribut vid sökning
const Attr_Enum = Object.freeze({ "Cykel": "bike", "Diskmaskin": "dishwasher", "Tvättmaskin": "washingmachine", "Wifi": "wifi", "Bastu": "sauna", "Attribut": "Attribut" });

//-------------------------JQuery events-------------------------

$(document).ready(function () {
    go_home();

    //Click on logo to go home
    $("#navbar-logo").click(function (e) {
        e.preventDefault();
        go_home();
    });

    //Using .on()-function since we need to check if the content of #content is loaded before checking for events

    //Burger menu: Go register
    $("#menu").on("click", "#register_button", function (e) {
        e.preventDefault();
        go_register();
    });

    //Burger menu: Go login
    $("#menu").on("click", "#login_button", function (e) {
        e.preventDefault();
        go_login();
    });

    //Burger menu: Go to my page
    $("#menu").on("click", "#my_page_button", function (e) {
        e.preventDefault();
        go_my_page();
    });

    //Burger menu: Go to help page
    $("#menu").on("click", "#help_button", function (e) {
        e.preventDefault();
        go_help_page();
    });

    //Burger menu: Log Out
    $("#menu").on("click", "#logout_button", function (e) {
        e.preventDefault();
        logout();
    });

    //Burger menu: Go to about us page
    $("#menu").on("click", "#about_us_button", function (e) {
        e.preventDefault();
        go_about_us_page();
    });

    //Burger menu: Go to contact page
    $("#menu").on("click", "#contact_button", function (e) {
        e.preventDefault();
        go_contact_page();
        $("#close-menu").prop("checked", false);
    });

    //Go to search page
    $("#content").on("click", "#home_search_submit", function (e) {
        e.preventDefault();
        submit_home_search_form();
    });

    //Submit register form
    $("#content").on("click", "#register_form_button", function (e) {
        e.preventDefault();
        submit_register_form();
    });
    
    //Submit register form by pressing ENTER
    $("#content").keyup("#password_register", function(e) { 
        if (e.keyCode === 13) { 
            submit_register_form();
        } 
    }); 


     //Submit edit form
     $("#content").on("click", "#edit_form_button", function (e) {
        e.preventDefault();
        submit_edit_form();
    });

    //Submit register form by pressing ENTER
    $("#content").keyup("#password_register", function(e) { 
        if (e.keyCode === 13) { 
            submit_register_form();
        } 
    }); 

    //Submit login form
    $("#content").on("click", "#login_form_button", function (e) {
        e.preventDefault();
        submit_login_form();
    });

    //Submit login form by pressing ENTER
    $("#content").keyup("#password_login", function(e) { 
        if (e.keyCode === 13) { 
            submit_login_form();
        } 
    }); 

    $(".hide-menu").click(function (e) {
        $("#close-menu").prop("checked", false);
    });

    //Register update of search sort
    $("#content").on("change", "#search_page_select_area, #search_page_select_start, #search_page_select_end, #search_page_sort, #search_page_select_type, #search_page_select_attr", function (e) {
        update_search();
    });

    //Go to read more on an ad
    $("#content").on("click", ".read_more_ad_button", function (e) {
        e.preventDefault();
        go_read_more_ad_page($(this).data('id'));
    });

    //Go back from read more to search
    $("#content").on("click", "#read_more_back", function (e) {
        e.preventDefault();
        go_search();
    });

})

    //Edit bio
    $("#content").on("click", "#my_page_change_bio_btn", function (e) {
        e.preventDefault();
        go_edit_bio_page();
    });

    //cancel edit bio
    $("#content").on("click", "#cancel_edit_form_btn", function (e) {
        e.preventDefault();
        go_my_page();
        load_account_info();
    });

    //My page menu

    //My page menu: go to account
    $("#content").on("click", "#account_info_link", function (e) {
        e.preventDefault();
        load_account_info();
    });

    //My page menu: go to history
    $("#content").on("click", "#history_link", function (e) {
        e.preventDefault();
        load_history();
    });

    //My page menu: go to bookings
    $("#content").on("click", "#bookings_link", function (e) {
        e.preventDefault();
        load_bookings();
    });

    //My page menu: go to ads
    $("#content").on("click", "#ads_link", function (e) {
        e.preventDefault();
        load_ads();
    });
})

//-------------------------Functions-------------------------

//----Nav functions:

//Function for going to view: Home_page
function go_home() {
    $("#content").html($("#home_page").html());
    load_home_search_dropdowns();
    load_burger();
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
    search = JSON.parse(sessionStorage.getItem('search'));
    load_search_page_search_dropdowns(search);
    load_ads_request(search);

}

//Function for going to view: My page
function go_my_page() {
    $("#content").html($("#my_page").html());
    var name = JSON.parse(sessionStorage.getItem('auth')).user.name
    $("#my_page_greeting").html("Hej " + name + "!");
    
}

//Function for going to view: Contact
function go_contact_page() {
    $("#content").html($("#contact_page").html());
}

//Function for going to view: Help
function go_help_page() {
    $("#content").html($("#help_page").html());
}

//Function for going to view: About us
function go_about_us_page() {
    $("#content").html($("#about_us_page").html());
}

//Function for going to view: Read more ad
function go_read_more_ad_page(ad_id) {
    $("#content").html($("#read_more_ad_page").html());
    load_read_more(ad_id);
}

//Function for going to view: Edit bio
function go_edit_bio_page() {
    $("#my_page_content").html($("#edit_bio_page").html());
    var user = JSON.parse(sessionStorage.getItem('auth')).user
    $("#name_edit").val(user.name);
    $("#gender_edit").val(user.gender)
    $("#phone_edit").val(user.telephone)
    $("#email_edit").val(user.email)
    $("#bio_edit").val(user.bio)


}

//Load account info in my page
function load_account_info() {
    $("#my_page_content").html($("#my_page_account_info").html());
    var user = JSON.parse(sessionStorage.getItem('auth')).user
    $("#my_page_name").html("Fullt namn: " + user.name);
    $("#my_page_email_and_tel").html("Tel: " + user.telephone + " <br>Email: " + user.email);
    if (user.bio){
    $("#my_page_bio_text").css('color', 'white');
    $("#my_page_bio_text").html(user.bio);
    }
    else {
        $("#my_page_bio_text").css('color', 'red');
        $("#my_page_bio_text").html("Du har inte lagt till någon text om dig själv än,<br> lägg till en personlig biografi genom att <br>klicka på \"Redigera min profil\" för större chans att få ditt önskade boende!");
    }

}
//Load account info in my page
function load_history() {
    $("#my_page_content").html($("#my_page_history").html());

}
//Load account info in my page
function load_ads() {
    $("#my_page_content").html($("#my_page_ads").html());

}
//Load account info in my page
function load_bookings() {
    $("#my_page_content").html($("#my_page_bookings").html());

}

function logout() {
    sessionStorage.removeItem('auth');
    go_home();
}


//-------------------------REQUESTS-------------------------

//----Request variables:

//Global request variable: host
var host = 'http://localhost:5000';

//----Requests:

//Function for making a request for all ads from database
function load_ads_request(search, sort = "asc", sort_param = "title") {
    $.ajax({
        url: host + '/ads',
        type: 'GET',
        data: {
            sort: sort,
            sortparam: sort_param,
            start: search.start,
            end: search.end,
            area: search.area,
            type: search.type,
            attributes: Attr_Enum[search.attributes]
        },
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

//Function for making a register request 
function edit_user_request(user) {
    $.ajax({
        url: host + '/user/edit',
        headers: { "Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token }, 
        type: 'PUT',
        data: JSON.stringify(user),
        success: function (response) {
            var temp = sessionStorage.getItem('auth')
            temp = JSON.parse(temp)
            temp.user = user
            temp = JSON.stringify(temp)
            sessionStorage.setItem('auth', temp)
            go_my_page();
            load_account_info();
        }
    })
    
 }


//Function for making a request for all unique areas in database
function load_areas(container) {
    $.ajax({
        url: host + '/areas',
        type: 'GET',
        async: false,
        success: function (areas) {
            areas.forEach(element => {
                $(container).append("<option>" + element + "</option>");
            });
        }
    })
}

//Function for making a request for all unique accomodation types in database
function load_types(container) {
    $.ajax({
        url: host + '/types',
        type: 'GET',
        async: false,
        success: function (types) {
            types.forEach(element => {
                $(container).append("<option>" + element + "</option>");
            });
        }
    })
}

function load_read_more(ad_id) {
    $.ajax({
        url: host + '/ad/' + ad_id,
        type: 'GET',
        success: function (ad) {
            $("#read_more_ad_title").html(ad.title);
            $("#read_more_ad_bio").html(ad.bio);
            $("#read_more_ad_neighbourhood").html(ad.neighbourhood);
            $("#read_more_ad_studentcity").html(ad.studentcity);
            $("#read_more_ad_address").html(ad.address);
            $("#read_more_ad_city").html(ad.ciy);
            $("#read_more_ad_postalcode").html(ad.postalcode);
            $("#read_more_ad_startdate").html(ad.startdate);
            $("#read_more_ad_enddate").html(ad.enddate);
            $("#read_more_ad_squaremetres").html(ad.squaremetres + " m3");
            $("#read_more_ad_price").html(ad.price + " kr");
            $("#read_more_ad_beds").html("Antal sängar " + ad.beds + " st");
            $("#read_more_ad_accommodationtype").html("Typ " + ad.accommodationtype);
            $("#read_more_ad_attributes").html(ad.attributes);
        }
    })
}

//----Functional functions:


//Function for loading all content in hamburger menu
function load_burger() {
    $("#menu").empty();

    if (sessionStorage.getItem('auth') == null) {
        $("#menu").prepend('<a href=""><li id="register_button" class="hide-menu" >Bli medlem</li></a>'
            + '<a href=""><li id="login_button" class="hide-menu" >Logga in</li></a>')
    } else {
        $("#menu").prepend('<a href=""><li id="my_page_button">Mina sidor</li></a>'
            + '<a href=""><li id="logout_button" class="hide-menu" >Logga ut</li></a>')
    }

    $("#menu").append('<a href=""><li id="about_us_button" class="hide-menu" > Vilka är vi</li></a>'
        + '<a href=""><li id="contact_button" class="hide-menu" >Kontakta oss</li></a>'
        + '<a href=""><li id="help_button" class="hide-menu" >Hur funkar det</li></a>')
}

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

function load_attr(container) {
    attributes = ["Cykel", "Wifi", "Diskmaskin", "Tvättmaskin", "Bastu"]
    attributes.forEach(element => {
        $(container).append("<option>" + element + "</option>");
    });
}

//Function for loading data in dropdowns for search from home page
function load_home_search_dropdowns() {
    load_searchable_years();
    load_months("#home_select_start_month");
    load_days("#home_select_length");
    load_areas("#home_select_area");
    load_types("#home_select_type");
    load_attr("#home_select_attr");
}

//Function for loading data in dropdowns for search on search page
function load_search_page_search_dropdowns(search) {
    load_areas("#search_page_select_area");
    load_types("#search_page_select_type");
    load_attr("#search_page_select_attr");
    $("#search_page_select_area").val(search.area);
    $("#search_page_select_start").val(search.start);
    $("#search_page_select_end").val(search.end);
    $("#search_page_select_type").val(search.type);

    $("#search_page_select_attr").val(search.attributes);
}

//Function for loading searchable years when searching for ads
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

function submit_edit_form() {
    var user = {
        name: $("#name_edit").val(),
        gender: $("#gender_edit").val(),
        year: $("#year_edit").val(),
        month: $("#month_edit").val(),
        day: $("#day_register").val(),
        telephone: $("#phone_edit").val(),
        email: $("#email_edit").val(),
        bio: $("#bio_edit").val()
    }
    edit_user_request(user);
}

function submit_login_form() {
    var user = {
        email: $("#email_login").val(),
        password: $("#password_login").val()
    }
    login_request(user);
}

function submit_home_search_form() {
    var search = {
        area: $("#home_select_area").val(),
        start: $("#home_select_start").val(),
        end: $("#home_select_end").val(),
        type: $("#home_select_type").val(),
        attributes: $("#home_select_attr").val()
    }
    sessionStorage.setItem('search', JSON.stringify(search));
    go_search();
}

function update_search() {
    sort = $("#search_page_sort").val();
    if (sort == "A-Ö") {
        sort = "asc"
        sort_param = "title";
    } else if (sort == "Ö-A") {
        sort = "desc";
        sort_param = "title";
    } else if (sort == "Pris ökande") {
        sort = "asc";
        sort_param = "price";
    } else if (sort == "Pris sjunkande") {
        sort = "desc";
        sort_param = "price";
    }
    var search = {
        area: $("#search_page_select_area").val(),
        type: $("#search_page_select_type").val(),
        start: $("#search_page_select_start").val(),
        end: $("#search_page_select_end").val(),
        attributes: $("#search_page_select_attr").val(),
    }
    sessionStorage.setItem('search', JSON.stringify(search));
    sessionStorage.setItem('sort', JSON.stringify(sort));
    sessionStorage.setItem('sort_param', JSON.stringify(sort_param));

    load_ads_request(search, sort, sort_param);
}