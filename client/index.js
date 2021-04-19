//Enum för att översätta attribut vid sökning
const Attr_Enum = Object.freeze({ "Cykel": "bike", "Diskmaskin": "dishwasher", "Tvättmaskin": "washingmachine", "Wifi": "wifi", "Bastu": "sauna", "Bekvämligheter": "Bekvämligheter" });
var saved_input;
//-------------------------JQuery events-------------------------

$(document).ready(function () {
    go_home();
    if (sessionStorage.getItem('auth')) {
        $("#sign_in_nav").removeClass('d-md-block');
        $("#sign_in_nav").addClass('d-none');
    }

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

    $("#menu").on("click", "#home_button", function (e) {
        e.preventDefault();
        go_home();
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


    //Burger menu: Go login
    $("#menu").on("click", "#login_button", function (e) {
        e.preventDefault();
        console.log("ok");
        go_login();
    });

    //Burger menu: Log Out
    $("#menu").on("click", "#logout_button", function (e) {
        e.preventDefault();
        logout();
    });

    //Attributes: Dropdown checklist
    $("#content").on("click", ".anchor", function (e) {
        var checkList = $("#attributes_dropdown")[0];
        if (checkList.classList.contains('visible')) {
            checkList.classList.remove('visible');
        } else {
            checkList.classList.add('visible');
        }
    });


    //Go to search page
    $("#content").on("click", "#home_search_submit", function (e) {
        e.preventDefault();
        submit_home_search_form();
    });

    //Go to login page
    $("#content").on("click", "#get_to_login, #help_login_button", function (e) {
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

    //Go register
    $("#content").on("click", "#help_register_button", function (e) {
        e.preventDefault();
        go_register();
    });


    //Submit edit form
    $("#content").on("click", "#edit_form_button", function (e) {
        e.preventDefault();
        submit_edit_form();
    });

    //Submit register form by pressing ENTER
    $("#content").on("keyup", "#password_register", function (e) {
        if (e.keyCode === 13 && $("#content")) {
            submit_register_form();
        }
    });

    //Submit login form
    $("#content").on("click", "#login_form_button", function (e) {
        e.preventDefault();
        submit_login_form();
    });

    //Submit login form by pressing ENTER
    $("#content").on("keyup", "#password_login", function (e) {
        if (e.keyCode === 13) {
            submit_login_form();
        }
    });

    $("#menu, nav").on("click", ".hide-menu", function (e) {
        $("#close-menu").prop("checked", false);
    });

    //Register update of search sort
    $("#content").on("change", ".checkboxupdate, #search_page_select_area, #search_page_select_start, #search_page_select_end, #search_page_sort, #search_page_select_type, #search_ad_bike_id, #search_ad_dishwasher_id, #search_ad_wifi_id, #search_ad_sauna_id, #search_ad_washingmachine_id", function (e) {
        update_search();
    });

    //Go to read more on an ad
    $("#content").on("click", ".read_more_ad_button, .title_id", function (e) {
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
    });

    //Reserve ad
    $("#content").on("click", "#reservation_button", function (e) {
        e.preventDefault();
        start = $("#read_more_select_start").val();
        end = $("#read_more_select_end").val();
        if (start != "" && end != "") {
            if (start != "" && Date.parse(start) < Date.parse($("#read_more_ad_startdate").html()) || end != "" && Date.parse(end) > Date.parse($("#read_more_ad_enddate").html())) {
                alert("Vänligen välj datum inom tidigast in- och utflytt!")
            } else {
                reserve_ad($(this).data('id'), start, end);
            }
        } else {
            alert("Vänligen fyll i datum innan du reserverar!")
        }
    });

    //Route to my page after reservation
    $("#content").on("click", "#reservation_to_mypage_button", function (e) {
        e.preventDefault();
        $('#modal_reservation').modal('hide');
        $('.modal-backdrop').hide();
        go_my_page();
    });

    //Route to search after reservation
    $("#content").on("click", "#reservation_to_search_button", function (e) {
        e.preventDefault();
        $('#modal_reservation').modal('hide');
        $('.modal-backdrop').hide();
        go_search();
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
        go_edit_bio_page();
        // load_account_info();
        $('html, body').animate({
            scrollTop: $("#my_page_content_scrolldown").offset().top
        }, 1000);
    });

    //My page menu: go to history
    $("#content").on("click", "#history_link", function (e) {
        e.preventDefault();
        load_history();
        $('html, body').animate({
            scrollTop: $("#my_page_content_scrolldown").offset().top
        }, 1000);
    });

    //My page menu: go to bookings
    $("#content").on("click", "#bookings_link", function (e) {
        e.preventDefault();
        load_bookings();
        $('html, body').animate({
            scrollTop: $("#my_page_content_scrolldown").offset().top
        }, 1000);
    });

    //My page menu: go to ads
    $("#content").on("click", "#ads_link", function (e) {
        e.preventDefault();
        load_ads();
        $('html, body').animate({
            scrollTop: $("#my_page_content_scrolldown").offset().top
        }, 1000);
    });

    //Home: change area facts: ryd
    $("#content").on("click", "#map_ryd", function (e) {
        e.preventDefault();
        $("#area_facts").html($("#ryd_view").html());
        exists = ($("#home_select_area").children().text().search("Ryd") == -1) ? true : false;
        $("#go_area").toggleClass("d-none", exists);
    });
    //Home: change area facts: lambohov
    $("#content").on("click", "#map_lambohov", function (e) {
        e.preventDefault();
        $("#area_facts").html($("#lambohov_view").html());
        exists = ($("#home_select_area").children().text().search("Lambohov") == -1) ? true : false;
        $("#go_area").toggleClass("d-none", exists);
    });
    //Home: change area facts: valla
    $("#content").on("click", "#map_valla", function (e) {
        e.preventDefault();
        $("#area_facts").html($("#valla_view").html());
        exists = ($("#home_select_area").children().text().search("Valla") == -1) ? true : false;
        $("#go_area").toggleClass("d-none", exists);
    });
    //Home: change area facts: vasastan
    $("#content").on("click", "#map_vasastan", function (e) {
        e.preventDefault();
        $("#area_facts").html($("#vasastan_view").html());
        exists = ($("#home_select_area").children().text().search("Vasastan") == -1) ? true : false;
        $("#go_area").toggleClass("d-none", exists);
    });
    //Home: change area facts: gottfridsberg
    $("#content").on("click", "#map_gottfridsberg", function (e) {
        e.preventDefault();
        $("#area_facts").html($("#gottfridsberg_view").html());
        exists = ($("#home_select_area").children().text().search("Gottfridsberg") == -1) ? true : false;
        $("#go_area").toggleClass("d-none", exists);
    });

    //My page: approve tenant
    $("#content").on("click", ".book_ad_button", function (e) {
        e.preventDefault();
        approve_tenant($(this).data("id"));
        // load_ads();
    });

    //My page: deny tenant
    $("#content").on("click", ".deny_ad_button", function (e) {
        e.preventDefault();
        deny_tenant($(this).data("id"));
        // load_ads();
    });


    //Submit form create new ad
    $("#content").on("click", "#create_new_ad", function (e) {
        e.preventDefault();
        start = Date.parse($("#ad_start_id").val());
        end = Date.parse($("#ad_end_id").val());
        if (start > end) {
            alert("Inflytt måste vara före utflytt");
        } else {
            submitAdForm();
        }
    });

    //Submit form create new ad
    $("#content").on("click", "#read_more_login_button", function (e) {
        e.preventDefault();
        go_login();
    });

    //Go login from nav
    $("nav").on("click", "#sign_in_nav", function (e) {
        e.preventDefault();
        go_login();
    });

    //Go login from nav
    $("#content").on("click", "#go_area", function (e) {
        e.preventDefault();
        search = JSON.parse(sessionStorage.getItem('search'));
        search.area = $(this).data('area');
        sessionStorage.setItem('search', JSON.stringify(search));
        go_search();
    });

    //Go create ad from nav
    $("nav").on("click", "#ad_accomodation_nav, #burger_add_accomodation", function (e) {
        e.preventDefault();
        if (sessionStorage.getItem('auth')) {
            go_my_page();
            go_new_ad_page();
        } else {
            alert('Logga in först!')
        }

    });
});

//--------------------Webbplatskarta-------------------------

//webbplatskarta: Startsida
$("#start-page").on("click", function (e) {
    e.preventDefault();
    go_home();
});

//webbplatskarta: Bli medlem
$("#become-member").on("click", function (e) {
    e.preventDefault();
    go_register();
});

// webbplatskarta: Logga in
$("#log-in").on("click", function (e) {
    e.preventDefault();
    go_login();
});

//webbplatskarta: Vilka är vi
$("#who-are-we").on("click", function (e) {
    e.preventDefault();
    go_about_us_page();
});


//webbplatskarta: Hur funkar det
$("#how-does-it-work").on("click", function (e) {
    e.preventDefault();
    go_help_page();
});

//webbplatskarta: Kontakta oss
$("#contact-us").on("click", function (e) {
    e.preventDefault();
    go_contact_page();
});

//-------------------------Functions-------------------------

//----Nav functions:

//Function for going to view: Home_page
function go_home() {
    $("#content").html($("#home_page").html());
    load_home_search_dropdowns();
    load_burger();
    $("#area_facts").html($("#default_view").html());
    var today = new Date();
    $("#home_select_start").val(today.toISOString().slice(0, 10));
    tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    $("#home_select_end").val(tomorrow.toISOString().slice(0, 10));
    let coord;
    let z;
    if (screen.width < 992) {
        coord = { lat: 58.40241681113258, lng: 15.590244664416542 }
        z = 12.3;
    } else {
        coord = { lat: 58.40241681113258, lng: 15.651244664416542 }
        z = 13;
    }

    let map, popup;
    map = new google.maps.Map(document.getElementById("map"), {
        center: coord,
        zoom: z,
        disableDefaultUI: true,
    });
    const citymap = {
        ryd: {
            center: { lat: 58.41320706527976, lng: 15.566379297129107 },
            size: 60,
        },
        valla: {
            center: { lat: 58.405844557880265, lng: 15.5949486961521 },
            size: 40,
        },
        vasastan: {
            center: { lat: 58.418598933014735, lng: 15.612839650705164 },
            size: 30,
        },
        gottfridsberg: {
            center: { lat: 58.414188119723406, lng: 15.596067756828468 },
            size: 50,
        },
        lambohov: {
            center: { lat: 58.382892422235216, lng: 15.561087706177256 },
            size: 70,
        },
    };
    for (const city in citymap) {
        const cityCircle = new google.maps.Circle({
            strokeColor: "#6be0e0",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#AFEEEE",
            fillOpacity: 0.35,
            map,
            center: citymap[city].center,
            radius: Math.sqrt(citymap[city].size) * 100,
        });
    }
    class Popup extends google.maps.OverlayView {
        constructor(position, content) {
            super();
            this.position = position;
            content.classList.add("popup-bubble");
            // This zero-height div is positioned at the bottom of the bubble.
            const bubbleAnchor = document.createElement("div");
            bubbleAnchor.classList.add("popup-bubble-anchor");
            bubbleAnchor.appendChild(content);
            // This zero-height div is positioned at the bottom of the tip.
            this.containerDiv = document.createElement("div");
            this.containerDiv.classList.add("popup-container");
            this.containerDiv.appendChild(bubbleAnchor);
            // Optionally stop clicks, etc., from bubbling up to the map.
            Popup.preventMapHitsAndGesturesFrom(this.containerDiv);
        }
        /** Called when the popup is added to the map. */
        onAdd() {
            this.getPanes().floatPane.appendChild(this.containerDiv);
        }
        /** Called when the popup is removed from the map. */
        onRemove() {
            if (this.containerDiv.parentElement) {
                this.containerDiv.parentElement.removeChild(this.containerDiv);
            }
        }
        /** Called each frame when the popup needs to draw itself. */
        draw() {
            const divPosition = this.getProjection().fromLatLngToDivPixel(
                this.position
            );
            // Hide the popup when it is far out of view.
            const display =
                Math.abs(divPosition.x) < 4000 && Math.abs(divPosition.y) < 4000
                    ? "block"
                    : "none";

            if (display === "block") {
                this.containerDiv.style.left = divPosition.x + "px";
                this.containerDiv.style.top = divPosition.y + "px";
            }

            if (this.containerDiv.style.display !== display) {
                this.containerDiv.style.display = display;
            }
        }
    }
    popup1 = new Popup(
        new google.maps.LatLng(58.41320706527976, 15.566379297129107),
        document.getElementById("ryd")
    );
    popup2 = new Popup(
        new google.maps.LatLng(58.405844557880265, 15.5949486961521),
        document.getElementById("valla")
    );
    popup3 = new Popup(
        new google.maps.LatLng(58.418598933014735, 15.612839650705164),
        document.getElementById("vasastan")
    );
    popup4 = new Popup(
        new google.maps.LatLng(58.414188119723406, 15.596067756828468),
        document.getElementById("gottfridsberg")
    );
    popup5 = new Popup(
        new google.maps.LatLng(58.382892422235216, 15.561087706177256),
        document.getElementById("lambohov")
    );
    popup1.setMap(map);
    popup2.setMap(map);
    popup3.setMap(map);
    popup4.setMap(map);
    popup5.setMap(map);
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

    $.ajax({
        url: host + '/rentalperiod',
        headers: { "Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token },
        type: 'GET',
        data: {
            id: ad_id
        },
        success: function (amount_of_days) {
            $("#display_payment_info").html("Bokad period: " + amount_of_days + " dagar. Pris per dag: " + ad_price + "kr");
            $("#display_price").html("Totalt pris att betala: " + ad_price * amount_of_days + "kr");
        }
    })

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
        .then(function (result) {
            return result.json();
        })
        .then(function (data) {
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
            form.addEventListener("submit", function (event) {
                event.preventDefault();
                // Complete payment when the submit button is clicked
                payWithCard(stripe, card, data.clientSecret);
            });
        });

    // Calls stripe.confirmCardPayment
    // If the card requires authentication Stripe shows a pop-up modal to
    // prompt the user to enter authentication details without leaving your page.
    var payWithCard = function (stripe, card, clientSecret) {
        loading(true);
        stripe
            .confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card
                }
            })
            .then(function (result) {
                if (result.error) {
                    // Show error to your customer
                    showError(result.error.message);
                } else {
                    // The payment succeeded!
                    orderComplete(result.paymentIntent.id);
                    booking_paid(ad_id);
                    save_payment(ad_id, result.paymentIntent.id);
                    go_successful_payment_page();
                }
            });
    };

    /* ------- UI helpers ------- */
    // Shows a success message when the payment is complete
    var orderComplete = function (paymentIntentId) {
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
    var showError = function (errorMsgText) {
        loading(false);
        var errorMsg = document.querySelector("#card-error");
        errorMsg.textContent = errorMsgText;
        setTimeout(function () {
            errorMsg.textContent = "";
        }, 4000);
    };

    // Show a spinner on payment submission
    var loading = function (isLoading) {
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
    var signedIn = sessionStorage.getItem('auth') != null;
    $("#read_more_reserve").toggleClass('d-none', !signedIn);
    $("#read_more_login").toggleClass('d-none', signedIn);
    load_read_more(ad_id);
    $("#reservation_button").data('id', ad_id);
    $("#read_more_select_start").val(JSON.parse(sessionStorage.getItem('search')).start);
    $("#read_more_select_end").val(JSON.parse(sessionStorage.getItem('search')).end);

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
    $("#my_page_name").html("Namn: " + user.name);
    $("#my_page_email_and_tel").html("Telefonnummer: " + user.telephone + " <br><br>E-mail: " + user.email);

    if (user.bio) {
        $("#my_page_bio_text").css('color', 'white');
        $("#my_page_bio_text").html(user.bio);
    }
    else {
        $("#my_page_bio_text").css('color', 'grey');
        $("#my_page_bio_text").html("Du har inte lagt till någon text om dig själv än, lägg till en personlig biografi genom att klicka på \"Redigera min profil\".");
    }
}

//Load account info in my page
function load_history() {
    $("#my_page_content").html($("#my_page_history").html());
    my_past_bookings();
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
    $("#sign_in_nav").addClass('d-none');
    $("#sign_in_nav").addClass('d-md-block');
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

//Function for showing the uploaded image name. 
function showFileName(event) {
    var infoArea = document.getElementById('upload-label');
    var input = event;
    var fileName = input.files[0].name;
    infoArea.textContent = 'Filnamn: ' + fileName;
}

function go_new_ad_page() {
    $("#content").html($("#new_ad_page").html());
    $("#ad_start_id").val(new Date().toISOString().slice(0, 10));
    $("#ad_end_id").val(new Date().toISOString().slice(0, 10));

}


//-------------------------REQUESTS-------------------------

//----Request variables:

//Global request variable: host
var host = '';

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
            attributes: search.attributes
        },
        success: function (ads) {
            $("#search_result").empty();
            if (ads.length > 0) {
                ads.forEach(element => {
                    element.image = element.image.url;
                    $("#search_result").append(Mustache.render(accomodation, element));
                });
            } else {
                $("#search_result").append("<h3>Ooops, verkar som din sökning inte gav några träffar! Försök igen!</h3>");
            }

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
                if (element.paid == true) {
                    element.image = element.image.url
                    $("#my_page_ads_container").append(Mustache.render(my_accomodation_paid, element));
                } else if (element.booked == false) {
                    element.image = element.image.url
                    $("#my_page_ads_container").append(Mustache.render(my_accomodation, element));
                } else {
                    element.image = element.image.url
                    $("#my_page_ads_container").append(Mustache.render(my_accomodation_booked, element));
                }

                if (element.booked == true) {
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
                if (element.paid == true) {
                    element.image = element.image.url
                    $("#my_page_bookings_container").append(Mustache.render(my_bookings_paid, element));
                } else if (element.booked == false) {
                    element.image = element.image.url
                    $("#my_page_bookings_container").append(Mustache.render(my_bookings, element));
                } else {
                    element.image = element.image.url
                    $("#my_page_bookings_container").append(Mustache.render(my_bookings_booked, element));
                }
            });
        }
    })
}

function my_past_bookings() {
    $.ajax({
        url: host + '/past-bookings',
        headers: { "Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token },
        type: 'GET',
        success: function (bookings) {
            bookings.forEach(element => {
                $.ajax({
                    url: host + '/payments',
                    headers: { "Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token },
                    type: 'GET',
                    data: {
                        id: element.id
                    },
                    success: function (payment) {
                        element.image = element.image.url;
                        element['id'] = payment.id;
                        $("#my_page_history_container").append(Mustache.render(my_past_booking, element));
                    }
                })
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
            $(".accomodation_tennant_" + ad_id).append(Mustache.render(tenant, result));
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
            $("#sign_in_nav").removeClass('d-md-block');
            $("#sign_in_nav").addClass('d-none');
            go_home()

        }
        , error: function () {
            $("#login_failed_container").html("Dina inloggningsuppgifter är felaktiga.");
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
        },
        statusCode: {
            500: function () {
                alert('fyll i alla fält horunge');
            },
            409: function () {
                $("#register_failed_container").html("Den här email-adressen används redan!");
            }
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

//Payment functions

//Function for saving payment info in the database
function save_payment(ad_id, paymentIntentId) {
    $.ajax({
        url: host + '/payments',
        headers: { "Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token },
        type: 'POST',
        data: JSON.stringify({ "ad_id": ad_id, "paymentID": paymentIntentId }),
        success: function (response) {
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
            $("#read_more_ad_description").html(ad.description);
            $("#read_more_ad_neighbourhood").html(ad.neighbourhood)
            // $("#read_more_ad_studentcity").html(ad.studentcity);
            $("#read_more_ad_streetaddress").html(ad.streetaddress + " " + ad.streetnumber + ", " + ad.postalcode + ", " + ad.city);
            $("#read_more_ad_startdate").html(ad.startdate);
            $("#read_more_ad_enddate").html(ad.enddate);
            $("#read_more_ad_squaremetres").html(ad.squaremetres + " kvm");
            $("#read_more_ad_price").html(ad.price + " kr");
            $("#read_more_ad_beds").html(ad.beds + " st");
            $("#read_more_ad_accommodationtype").html(ad.accommodationtype);
            $("#read_more_ad_attributes").html(ad.attributes);
            $("#readmore_img").attr("src", ad.image.url);

            if (ad.attributes.wifi) {
                $("#wifi-attribute").html("<i class='fas fa-check' style='color:lightgreen;'> </i>");
            } else {
                $("#wifi-attribute").html("<i class='fas fa-times' style='color:lightsalmon;'> </i>");
            }
            if (ad.attributes.dishwasher) {
                $("#dishwasher-attribute").html("<i class='fas fa-check' style='color:lightgreen;'> </i>");
            } else {
                $("#dishwasher-attribute").html("<i class='fas fa-times' style='color:lightsalmon;'> </i>");
            }
            if (ad.attributes.washingmachine) {
                $("#washingmachine-attribute").html("<i class='fas fa-check' style='color:lightgreen;'> </i>");
            } else {
                $("#washingmachine-attribute").html("<i class='fas fa-times' style='color:lightsalmon;'> </i>");
            }
            if (ad.attributes.bike) {
                $("#bike-attribute").html("<i class='fas fa-check' style='color:lightgreen;'> </i>");
            } else {
                $("#bike-attribute").html("<i class='fas fa-times' style='color:lightsalmon;'> </i>");
            }
            if (ad.attributes.sauna) {
                $("#sauna-attribute").html("<i class='fas fa-check' style='color:lightgreen;'> </i>");
            } else {
                $("#sauna-attribute").html("<i class='fas fa-times' style='color:lightsalmon;'> </i>");
            }


            parameters = "address=" + ad.streetnumber + "%20" + ad.streetaddress + "%20" + ad.city + "%20" + "Sweden";
            $.ajax({
                url: "https://maps.googleapis.com/maps/api/geocode/json?" + parameters + "&key=AIzaSyD0L9KI4onjHguu5jOrMCCxOVFL97XQwFs",
                type: 'GET',
                success: function (coordinates) {
                    var coord = coordinates.results[0].geometry.location;
                    let map, popup;
                    map2 = new google.maps.Map(document.getElementById("read_more_map"), {
                        zoom: 13.2,
                        center: coord,
                        // disableDefaultUI: true,

                    });
                    // The marker, positioned at the address
                    const marker = new google.maps.Marker({
                        position: coord,
                        map: map2,
                    });

                }
            })
            // console.log(coord);
        }
    })

}

function update_reserved_status(status, ad_id, start_date, end_date) {
    data = {
        status: status,
        start: start_date,
        end: end_date
    }
    $.ajax({
        url: host + '/ad/' + ad_id + '/reserved',
        type: 'PUT',
        data: JSON.stringify(data),
        success: function (ad) {

        }
    })
}

function update_reserved_status_denied(status, ad_id) {
    $.ajax({
        url: host + '/ad/' + ad_id + '/denied',
        type: 'PUT',
        data: JSON.stringify(status),
        success: function (ad) {
            load_ads();
        }
    })
}


function update_booked_status(status, ad_id) {
    $.ajax({
        url: host + '/ad/' + ad_id + '/booked',
        type: 'PUT',
        data: JSON.stringify(status),
        success: function (ad) {
            load_ads();
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

    $("#menu").append('<a href=""><li id="about_us_button" class="hide-menu">Om oss</li></a>'
        + '<a href=""><li id="contact_button" class="hide-menu">Kontakta oss</li></a>'
        + '<a href=""><li id="help_button" class="hide-menu">Hur funkar det</li></a>')

    if (sessionStorage.getItem('auth') == null) {
        $("#menu").prepend('<a href=""><li id="register_button" class="hide-menu">Bli medlem</li></a>'
            + '<a href=""><li id="login_button" class="hide-menu d-block d-md-none">Logga in</li></a>')
    } else {
        $("#menu").prepend('<a href=""><li id="my_page_button" class="hide-menu">Mina sidor</li></a>'
            + '<a href=""><li id="logout_button" class="hide-menu">Logga ut</li></a>')
    }

    $("#menu").prepend('<a href=""><li id="home_button" class="hide-menu">Hem</li></a>'
        + '<a href=""><li id="burger_add_accomodation" class="hide-menu d-block d-md-none">Lägg upp boende</li></a>')
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
    // load_attr("#home_select_attr");
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
    var attrib = search.attributes.split("-"), i;

    for (i = 0; i < attrib.length; i++) {
        $("#search_ad_" + attrib[i] + "_id").prop("checked", true);
        console.log("#search_ad_" + attrib[i] + "_id")
    }
}

//Function for reservring ad in database: update reserved status --> show ad to host for approval
function reserve_ad(ad_id, start, end) {
    update_reserved_status(true, ad_id, start, end)
    set_tenant(ad_id);
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
    update_reserved_status_denied(false, ad_id)
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
        attributes: get_wanted_attributes_home()
    }
    if (Date.parse(search.start) > Date.parse(search.end) && search.start != "" && search.end != "") {
        alert("Inflytt måste vara före utflytt");
    } else {
        sessionStorage.setItem('search', JSON.stringify(search));
        go_search();
    }
}

function get_wanted_attributes() {
    var bike = $("#search_ad_bike_id").prop("checked");
    var dishwasher = $("#search_ad_dishwasher_id").prop("checked");
    var wifi = $("#search_ad_wifi_id").prop("checked");
    var sauna = $("#search_ad_sauna_id").prop("checked");
    var washingmachine = $("#search_ad_washingmachine_id").prop("checked");
    var attributes = "";

    if (bike != false) {
        attributes = attributes + "bike-";
    }
    if (dishwasher != false) {
        attributes = attributes + "dishwasher-";
    }
    if (wifi != false) {
        attributes = attributes + "wifi-";
    }
    if (sauna != false) {
        attributes = attributes + "sauna-";
    }
    if (washingmachine != false) {
        attributes = attributes + "washingmachine-";
    }
    if (attributes.charAt(attributes.length - 1) == '-') {
        attributes = attributes.slice(0, -1);
    }

    if (attributes == "") {
        attributes = "Bekvämligheter";
    }

    return attributes

}

function get_wanted_attributes_home() {
    var attributes = ""
    $("input[name=attr]").each(function () {
        if (this.checked) {
            attributes = this.value + "-" + attributes
        }
    })
    if (attributes == "") {
        attributes = "Bekvämligheter"
    }
    else {
        attributes = attributes.substring(0, attributes.length - 1)
    }
    return attributes

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
        attributes: get_wanted_attributes()
    }

    if (search.start > search.end && search.start != "" && search.end != "") {
        alert("Inflytt måste vara före utflytt");
    } else {
        sessionStorage.setItem('search', JSON.stringify(search));
        sessionStorage.setItem('sort', JSON.stringify(sort));
        sessionStorage.setItem('sort_param', JSON.stringify(sort_param));

        load_ads_request(search, sort, sort_param);
    }
}

function submitAdForm() {
    var formData = new FormData();

    formData.append("title", $("#titleInput_id").val());
    formData.append("description", $("#descriptionInput_id").val());
    formData.append("neighbourhood", $("#areaInput_id").val());

    formData.append("streetaddress", $("#create_ad_street_id").val());
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
        attributes = attributes + "bike ";
    }
    if (dishwasher != false) {
        attributes = attributes + "dishwasher ";
    }
    if (wifi != false) {
        attributes = attributes + "wifi ";
    }
    if (sauna != false) {
        attributes = attributes + "sauna ";
    }
    if (washingmachine != false) {
        attributes = attributes + "washingmachine ";
    }
    if (attributes.charAt(attributes.length - 1) == ' ') {
        attributes = attributes.slice(0, -1);
    }

    formData.append("attributes", attributes);


    formData.append("file", saved_input);
    if (saved_input !== undefined) {
        $.ajax({
            url: host + '/ad/create',
            type: 'POST',
            headers: { "Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token },
            data: formData,
            processData: false,
            contentType: false,
            success: function (successMessage) {
                go_my_page();
                saved_input = null;
            },
            statusCode: {
                500: function () {
                    alert('fyll i alla fält horunge');
                },
            }
        })
    } else {
        alert('Du måste ladda upp en bild!')
    }


}
