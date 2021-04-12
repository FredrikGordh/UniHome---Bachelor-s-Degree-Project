//Enum för att översätta attribut vid sökning
const Attr_Enum = Object.freeze({ "Cykel": "bike", "Diskmaskin": "dishwasher", "Tvättmaskin": "washingmachine", "Wifi": "wifi", "Bastu": "sauna", "Attribut": "Attribut" });
var saved_input;
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

    //Go to login page
    $("#content").on("click", "#get_to_login", function (e) {
        e.preventDefault();
        go_login();
    });

    //Go to login page from registered 
    // $("#registered_page_content").on("click", "#log_in_from_registered_view", function (e) {
    //     e.preventDefault();
    //     alert("hej")
    //     go_login();
    // });

    //Submit register form
    $("#content").on("click", "#register_form_button", function (e) {
        e.preventDefault();
        submit_register_form();
    });

    //Submit register form by pressing ENTER
    $("#content").keyup("#password_register", function (e) {
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
    $("#content").keyup("#password_register", function (e) {
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
    $("#content").keyup("#password_login", function (e) {
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

    //Pay your booked accomodation
    $("#content").on("click", ".payment_button", function (e) {
        e.preventDefault();
        go_payment_page($(this).data('id'), $(this).data('price'));
    });

    //Cancel payment
    $("#content").on("click", "#cancel_payment_button", function (e) {
        e.preventDefault();
        go_my_page();
        load_bookings();
    });

    //Go back from read more to search
    $("#content").on("click", "#read_more_back", function (e) {
        e.preventDefault();
        go_search();
    });


    //Go to create new ad page
    $("#content").on("click", "#new_ad_button", function (e) {
        e.preventDefault();
        go_new_ad_page();
        var input = document.getElementById('upload');
        input.addEventListener('change', showFileName);
    });

    //Reserve ad
    $("#content").on("click", "#reservation_button", function (e) {
        e.preventDefault();
        reserve_ad($(this).data('id'));
        console.log("ok")
    });

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

    //My page: approve tenant
    $("#content").on("click", ".book_ad_button", function (e) {
        e.preventDefault();
        approve_tenant($(this).data("id"));
        load_ads();
    });

    //My page: deny tenant
    $("#content").on("click", ".deny_ad_button", function (e) {
        e.preventDefault();
        deny_tenant($(this).data("id"));
        load_ads();
    });


    //Submit form create new ad
    $("#content").on("click", "#create_new_ad", function (e) {
        e.preventDefault();
        submitAdForm();
    });


});

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

//Function for going to view: Registered
function go_registered_page() {
    $("#content").html($("#successfully_registered_page").html());
}

//Function for going to view: Payment page
function go_payment_page(ad_id, ad_price) {
    $("#content").html($("#payment_page").html());
    $("#display_price").html("Pris att betala: " + ad_price + "kr");

    var stripe = Stripe("pk_test_51IdXd9I1LSmMkwS01UZ3P15rGwgKS2FVNDj7puij4jKSK9qHTzpT6RXuoxwT7R3W2egc2WdFbp31gMXAp2RsqpJO003rUKAs23");

    // The items the customer wants to buy
    var purchase = {
        id: ad_id
      };
    
    // Disable the button until we have Stripe set up on the page
    // document.querySelector("button").disabled = true;
    $("#submit").attr("disabled", true);
    
    fetch('/create-payment-intent', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(purchase)
    })
      .then(function(result) {
        return result.json();
      })
      .then(function(data) {
        var elements = stripe.elements();
        var style = {
          base: {
            color: "#32325d",
            fontFamily: 'Arial, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
              color: "#32325d"
            }
          },
          invalid: {
            fontFamily: 'Arial, sans-serif',
            color: "#fa755a",
            iconColor: "#fa755a"
          }
        };
    
        var card = elements.create("card", { style: style });
        // Stripe injects an iframe into the DOM
        card.mount("#card-element");
    
        card.on("change", function (event) {
            // Disable the Pay button if there are no card details in the Element
            $("#submit").attr("disabled", event.empty);
            document.querySelector("#card-error").textContent = event.error ? event.error.message : "";
        });
    
        var form = document.getElementById("payment-form");
        form.addEventListener("submit", function(event) {
          event.preventDefault();
          // Complete payment when the submit button is clicked
          payWithCard(stripe, card, data.clientSecret);
        });
      });
    
    // Calls stripe.confirmCardPayment
    // If the card requires authentication Stripe shows a pop-up modal to
    // prompt the user to enter authentication details without leaving your page.
    var payWithCard = function(stripe, card, clientSecret) {
        loading(true);
        stripe
          .confirmCardPayment(clientSecret, {
            payment_method: {
              card: card
            }
          })
          .then(function(result) {
            if (result.error) {
              // Show error to your customer
              showError(result.error.message);
            } else {
              // The payment succeeded!
              orderComplete(result.paymentIntent.id);
              booking_paid(ad_id)
              go_successful_payment_page()
            }
          });
    };
    
      /* ------- UI helpers ------- */
    // Shows a success message when the payment is complete
    var orderComplete = function(paymentIntentId) {
        loading(false);
        document
          .querySelector(".result-message a")
          .setAttribute(
            "href",
            "https://dashboard.stripe.com/test/payments/" + paymentIntentId
          );
        document.querySelector(".result-message").classList.remove("hidden");
        // document.querySelector("button").disabled = true;
        $("#submit").attr("disabled", true);
      };
    
    // Show the customer the error from Stripe if their card fails to charge
    var showError = function(errorMsgText) {
        loading(false);
        var errorMsg = document.querySelector("#card-error");
        errorMsg.textContent = errorMsgText;
        setTimeout(function() {
        errorMsg.textContent = "";
        }, 4000);
    };
    
    // Show a spinner on payment submission
    var loading = function(isLoading) {
        if (isLoading) {
        // Disable the button and show a spinner
        //   document.querySelector("button").disabled = true;
            $("#submit").attr("disabled", true);
            document.querySelector("#spinner").classList.remove("hidden");
            document.querySelector("#button-text").classList.add("hidden");
        } else {
            // document.querySelector("button").disabled = false;
            $("#submit").attr("disabled", false);
            document.querySelector("#spinner").classList.add("hidden");
            document.querySelector("#button-text").classList.remove("hidden");
        }
    };
    


    // använda ad_id för att beräkna pris
}

//Function for going to view: Successful payment page
function go_successful_payment_page() {
    $("#content").html($("#successful_payment_page").html());
}

//Function for going to view: Read more ad
function go_read_more_ad_page(ad_id) {
    $("#content").html($("#read_more_ad_page").html());
    load_read_more(ad_id);
    $("#reservation_button").data('id', ad_id)
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

function go_confirmation_page() {

}

//Load account info in my page
function load_account_info() {
    $("#my_page_content").html($("#my_page_account_info").html());
    var user = JSON.parse(sessionStorage.getItem('auth')).user
    $("#my_page_name").html("Fullt namn: " + user.name);
    $("#my_page_email_and_tel").html("Tel: " + user.telephone + " <br>Email: " + user.email);
    if (user.bio) {
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
    load_my_ads_request();

}

//Load account info in my page
function load_bookings() {
    $("#my_page_content").html($("#my_page_bookings").html());
    load_my_bookings_request();

}

function logout() {
    sessionStorage.removeItem('auth');
    go_home();
}


//Function for showing the uploaded picture
function readURL(input) {

    saved_input = input.files[0];

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#imageResult')
                .attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}

$(function () {
    $('#upload').on('change', function () {
        readURL(input);
    });
});

//Function for showing the uploaded image name. 
function showFileName(event) {
    var infoArea = document.getElementById('upload-label');
    var input = event.srcElement;
    var fileName = input.files[0].name;
    print
    infoArea.textContent = 'Filnamn: ' + fileName;
}

function go_new_ad_page() {
    $("#content").html($("#new_ad_page").html());
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

function load_my_ads_request() {
    $.ajax({
        url: host + '/user/ads',
        headers: { "Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token },
        type: 'GET',
        success: function (ads) {
            ads.forEach(element => {
                $("#my_page_ads_container").append(Mustache.render(my_accomodation, element));
                if (element.booked == true) {
                    console.log("booked");
                } else if (element.reserved == true) {
                    get_tenant(element.id);
                }
            });
        }
    })
}

function load_my_bookings_request() {
    $.ajax({
        url: host + '/user/bookings',
        headers: { "Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token },
        type: 'GET',
        success: function (ads) {
            ads.forEach(element => {
                if(element.paid == true) {
                    $("#my_page_bookings_container").append(Mustache.render(my_bookings_paid, element));
                } else {
                    $("#my_page_bookings_container").append(Mustache.render(my_bookings, element));
                }
            });
        }
    })
}

function set_tenant(ad_id) {
    $.ajax({
        url: host + '/ad/' + ad_id + '/tenant',
        headers: { "Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token },
        type: 'PUT',
        success: function (result) {
        }
    })
}

function get_tenant(ad_id) {
    $.ajax({
        url: host + '/ad/' + ad_id + '/tenant',
        headers: { "Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token },
        type: 'GET',
        success: function (result) {
            result["ad_id"] = ad_id;
            $("#my_page_ads_container").append(Mustache.render(tenant, result));
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
            go_registered_page();
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

function update_reserved_status(status, ad_id) {
    $.ajax({
        url: host + '/ad/' + ad_id + '/reserved',
        type: 'PUT',
        data: JSON.stringify(status),
        success: function (ad) {

        }
    })
}

function update_booked_status(status, ad_id) {
    $.ajax({
        url: host + '/ad/' + ad_id + '/booked',
        type: 'PUT',
        data: JSON.stringify(status),
        success: function (ad) {

        }
    })
}

function update_paid_status(status, ad_id) {
    $.ajax({
        url: host + '/ad/' + ad_id + '/paid',
        type: 'PUT',
        data: JSON.stringify(status),
        success: function (ad) {

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

//Function for reservring ad in database: update reserved status --> show ad to host for approval
function reserve_ad(ad_id) {
    update_reserved_status(true, ad_id)
    set_tenant(ad_id);
    go_search();
}

//Function for approving tenant and update status of ad in database
function approve_tenant(ad_id) {
    update_booked_status(true, ad_id)
}

//Function for marking a booking as paid, update status of ad in database
function booking_paid(ad_id) {
    update_paid_status(true, ad_id)
}

//Function for denying tenant and update status of ad in database
function deny_tenant(ad_id) {
    update_reserved_status(false, ad_id)
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



function submitAdForm() {
    var formData = new FormData();

    formData.append("title", $("#titleInput_id").val());
    formData.append("description", $("#descriptionInput_id").val());
    formData.append("neighbourhood", $("#areaInput_id").val());

    formData.append("streetadress", $("#create_ad_street_id").val());
    formData.append("streetnumber", $("#create_ad_streetnumber_id").val());
    formData.append("postalcode", $("#create_ad_postalcode_id").val());
    formData.append("city", $("#create_ad_city_id").val());

    formData.append("startdate", $("#ad_start_id").val());
    formData.append("enddate", $("#ad_end_id").val());

    formData.append("squaremetres", $("#create_ad_kvm_id").val());
    formData.append("price", $("#create_ad_price_id").val());
    formData.append("beds", $("#create_ad_beds_id").val());
    formData.append("accommodationtype", $("#accomodation_Type_Select_id").val());



    var bike = $("#create_ad_bike_id").prop("checked");
    var dishwasher = $("#create_ad_dishwasher_id").prop("checked");
    var wifi = $("#create_ad_wifi_id").prop("checked");
    var sauna = $("#create_ad_sauna_id").prop("checked");
    var washingmachine = $("#create_ad_washingmachine_id").prop("checked");

    var attributes = "";

    if (bike != false) {
        attributes = attributes + "'bike' ";
    }
    if (dishwasher != false) {
        attributes = attributes + "''dishwasher' ";
    }
    if (wifi != false) {
        attributes = attributes + "'wifi' ";
    }
    if (sauna != false) {
        attributes = attributes + "'sauna' ";
    }
    if (washingmachine != false) {
        attributes = attributes + "'washingmachine' ";
    }

    formData.append("attributes", attributes);


    formData.append("file", saved_input);
    saved_input = null;

    $.ajax({
        url: host + '/ad/create',
        type: 'POST',
        headers: { "Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token },
        data: formData,
        processData: false,
        contentType: false,
        success: function (successMessage) {
            go_my_page();
        }
    })

}
