var accomodation = '<a href= "" class = "title_id testamonial accomodation col-9 col-xl-3 mt-3 p-5" data-id="{{id}}">'
    + '<div class="row justify-content-center align-items-center">'
    + '<div class ="col-12">'
    + '<h5>{{title}}</h5>'
    + '<p class = "mt-6"> {{streetaddress}} {{streetnumber}}, {{neighbourhood}}</p>'
    + '</div>'
    + '<div class="col-xl-12 col-12">'
    + '<img src="{{image}}">'
    + '</div>'



    + '<div class="row justify-content-center align-items-center">'

    + '<div class="col-6 search_page_price my-4">'
    + '<i class="fas fa-home"></i>'
    + '<br> <b>{{squaremetres}} kvm </b>'
    + '</div>'
    + '<div class="col-6 search_page_price my-4">'
    + '<i class="fas fa-building"></i>'
    + '<br> <b> {{accommodationtype}} </b>'
    + '</div>'



    + '</div>'
    + '</div>'

    + '<div class="col-12 mt-1">'
    + '<div class = "row justify-content-center ">'
    + '<div class="col-6 col-xl-6 headline_startdate">'
    + '<b>Tidigast inflytt</b>'
    + '</div>'
    + '<div class="col-6 col-xl-6 headline_enddate">'
    + '<b>Senast utflytt</b>'
    + '</div>'
    + '<div class="col-xl-4"></div>'
    + '</div>'
    + '<div class = "row justify-content-center mb-3">'
    + '<div class = "col-6 col-xl-6 read_more_startdate"> '
    + '<p> {{startdate}} </p>'
    + '</div>'
    + '<div class ="col-6 col-xl-6 read_more_enddate"> '
    + '<p> {{enddate}}</p>'
    + '</div>'
    + '</div>'
    + '<div class="col-12 search_page_price">'
    + '<h4>  {{price}} kr/natt </h4>'
    + '</div>'
    + '</div>'

    

    + '</div>'
    + '</a>';

var my_accomodation = '<div class="my_accomodation col-9 mt-3 p-2">'
    + '<div class="row justify-content-center">'
    + '<div class="col-12 col-xl-5">'
    + '<img src="{{image}}">'
    + '</div>'
    + '<div class="col-12 col-xl-5">'
    + '<h4>{{title}}<h4>'
    + '<h5 class = "mt-6"> {{streetaddress}} {{streetnumber}}, {{neighbourhood}}</h5>'
    + '<p>{{description}}</p>'
    + '<div class = "row justify-content-center">'
    + '<div class="col-6 col-xl-6 headline_startdate">'
    + '<b>Tidigast inflytt</b>'
    + '</div>'
    + '<div class="col-6 col-xl-6 headline_enddate">'
    + '<b>Senast utflytt</b>'
    + '</div>'
    + '</div>'
    + '<div class = "row justify-content-center">'
    + '<div class = "col-6 col-xl-6 read_more_startdate"> '
    + '<p> {{startdate}} </p>'
    + '</div>'
    + '<div class ="col-6 col-xl-6 read_more_enddate"> '
    + '<p> {{enddate}}</p>'
    + '</div>'
    + '</div>'
    + '</div>'
    + '<div class="col-12 col-xl-2">'
    + '<div class="row justify-content-center"'
    + '<div class="col-4 col-xl-12 ">'
    + '<div class="col-2 col-xl-12 search_page_price">'
    + '<i class="fas fa-home"></i>'
    + '</div>'
    + '<div class="col-2 col-xl-12 search_page_price">'
    + '<b>{{squaremetres}} kvm </b>'
    + '</div>'
    + '<div class="col-2 col-xl-12 search_page_price">'
    + '<i class="fas fa-building"></i>'
    + '</div>'
    + '<div class="col-2 col-xl-12 search_page_price">'
    + '<b> {{accommodationtype}} </b>'
    + '</div>'
    + '</div>'
    + '<div class="col-2 col-xl-12 search_page_price">'
    + '<h4>  {{price}} kr/natt </h4>'
    + '</div>'
    + '</div>'
    + '<div class="accomodation_tennant_{{id}} col-10"></div>'
    + '</div>'
    + '</div>';

var my_accomodation_booked = '<div class="my_accomodation col-9 mt-3 p-2">'
    + '<div class="row">'
    + '<div class="col-12 col-xl-5">'
    + '<img src="{{image}}">'
    + '</div>'
    + '<div class="col-12 col-xl-5">'
    + '<h4>{{title}}<h4>'
    + '<h5 class = "mt-6"> {{streetaddress}} {{streetnumber}}, {{neighbourhood}}</h5>'
    + '<p>{{description}}</p>'
    + '<div class = "row justify-content-center">'
    + '<div class="col-6 col-xl-6 headline_startdate">'
    + '<b>Tidigast inflytt</b>'
    + '</div>'
    + '<div class="col-6 col-xl-6 headline_enddate">'
    + '<b>Senast utflytt</b>'
    + '</div>'
    + '</div>'
    + '<div class = "row justify-content-center">'
    + '<div class = "col-6 col-xl-6 read_more_startdate"> '
    + '<p> {{startdate}} </p>'
    + '</div>'
    + '<div class ="col-6 col-xl-6 read_more_enddate"> '
    + '<p> {{enddate}}</p>'
    + '</div>'
    + '</div>'
    + '<b>Du har godkänt denna reservation, väntar på att hyresgäst ska betala</b>'
    + '</div>'
    + '<div class="col-12 col-xl-2">'
    + '<div class="row justify-content-center"'
    + '<div class="col-4 col-xl-12 ">'
    + '<div class="col-2 col-xl-12 search_page_price">'
    + '<i class="fas fa-home"></i>'
    + '</div>'
    + '<div class="col-2 col-xl-12 search_page_price">'
    + '<b>{{squaremetres}} kvm </b>'
    + '</div>'
    + '<div class="col-2 col-xl-12 search_page_price">'
    + '<i class="fas fa-building"></i>'
    + '</div>'
    + '<div class="col-2 col-xl-12 search_page_price">'
    + '<b> {{accommodationtype}} </b>'
    + '</div>'
    + '</div>'
    + '<div class="col-2 col-xl-12 search_page_price">'
    + '<h4>  {{price}} kr/natt </h4>'
    + '</div>'
    + '</div>'
    + '</div>'
    + '</div>';

var my_accomodation_paid = '<div class="my_accomodation col-9 mt-3 p-2">'
    + '<div class="row">'
    + '<div class="col-12 col-xl-5">'
    + '<img src="{{image}}">'
    + '</div>'
    + '<div class="col-12 col-xl-5">'
    + '<h4>{{title}}<h4>'
    + '<h5 class = "mt-6"> {{streetaddress}} {{streetnumber}}, {{neighbourhood}}</h5>'
    + '<p>{{description}}</p>'
    + '<div class = "row justify-content-center">'
    + '<div class="col-6 col-xl-6 headline_startdate">'
    + '<b>Tidigast inflytt</b>'
    + '</div>'
    + '<div class="col-6 col-xl-6 headline_enddate">'
    + '<b>Senast utflytt</b>'
    + '</div>'
    + '</div>'
    + '<div class = "row justify-content-center">'
    + '<div class = "col-6 col-xl-6 read_more_startdate"> '
    + '<p> {{startdate}} </p>'
    + '</div>'
    + '<div class ="col-6 col-xl-6 read_more_enddate"> '
    + '<p> {{enddate}}</p>'
    + '</div>'
    + '</div>'
    + '<b>Hyresgästen har nu betalt och bokningen är nu sluförd</b>'
    + '</div>'
    + '<div class="col-12 col-xl-2">'
    + '<div class="row justify-content-center"'
    + '<div class="col-4 col-xl-12 ">'
    + '<div class="col-2 col-xl-12 search_page_price">'
    + '<i class="fas fa-home"></i>'
    + '</div>'
    + '<div class="col-2 col-xl-12 search_page_price">'
    + '<b>{{squaremetres}} kvm </b>'
    + '</div>'
    + '<div class="col-2 col-xl-12 search_page_price">'
    + '<i class="fas fa-building"></i>'
    + '</div>'
    + '<div class="col-2 col-xl-12 search_page_price">'
    + '<b> {{accommodationtype}} </b>'
    + '</div>'
    + '</div>'
    + '<div class="col-2 col-xl-12 search_page_price">'
    + '<h4>  {{price}} kr/natt </h4>'
    + '</div>'
    + '</div>'
    + '</div>'
    + '</div>';

var my_bookings_booked = '<div class="my_accomodation col-9 mt-3 p-2">'
    + '<div class="row">'
    + '<div class="col-12 col-xl-5">'
    + '<img src="{{image}}">'
    + '</div>'
    + '<div class="col-12 col-xl-5">'
    + '<h4>{{title}}<h4>'
    + '<h5 class = "mt-6"> {{streetaddress}} {{streetnumber}}, {{neighbourhood}}</h5>'
    + '<p>{{description}}</p>'
    + '<div class = "row justify-content-center">'
    + '<div class="col-6 col-xl-6 headline_startdate">'
    + '<b>Tidigast inflytt</b>'
    + '</div>'
    + '<div class="col-6 col-xl-6 headline_enddate">'
    + '<b>Senast utflytt</b>'
    + '</div>'
    + '</div>'
    + '<div class = "row justify-content-center">'
    + '<div class = "col-6 col-xl-6 read_more_startdate"> '
    + '<p> {{startdate}} </p>'
    + '</div>'
    + '<div class ="col-6 col-xl-6 read_more_enddate"> '
    + '<p> {{enddate}}</p>'
    + '</div>'
    + '</div>'
    + '<button type="button" class="payment_button" data-id="{{id}}" data-price={{price}} >Betala nu</button>'
    + '</div>'
    + '<div class="col-12 col-xl-2">'
    + '<div class="row justify-content-center"'
    + '<div class="col-4 col-xl-12 ">'
    + '<div class="col-2 col-xl-12 search_page_price">'
    + '<i class="fas fa-home"></i>'
    + '</div>'
    + '<div class="col-2 col-xl-12 search_page_price">'
    + '<b>{{squaremetres}} kvm </b>'
    + '</div>'
    + '<div class="col-2 col-xl-12 search_page_price">'
    + '<i class="fas fa-building"></i>'
    + '</div>'
    + '<div class="col-2 col-xl-12 search_page_price">'
    + '<b> {{accommodationtype}} </b>'
    + '</div>'
    + '</div>'
    + '<div class="col-2 col-xl-12 search_page_price">'
    + '<h4>  {{price}} kr/natt </h4>'
    + '</div>'
    + '</div>'
    + '</div>'
    + '</div>';

    var my_bookings = '<div class="my_accomodation col-9 mt-3 p-2">'
    + '<div class="row">'
    + '<div class="col-12 col-xl-5">'
    + '<img src="{{image}}">'
    + '</div>'
    + '<div class="col-12 col-xl-5">'
    + '<h4>{{title}}<h4>'
    + '<h5 class = "mt-6"> {{streetaddress}} {{streetnumber}}, {{neighbourhood}}</h5>'
    + '<p>{{description}}</p>'
    + '<div class = "row justify-content-center">'
    + '<div class="col-6 col-xl-6 headline_startdate">'
    + '<b>Tidigast inflytt</b>'
    + '</div>'
    + '<div class="col-6 col-xl-6 headline_enddate">'
    + '<b>Senast utflytt</b>'
    + '</div>'
    + '</div>'
    + '<div class = "row justify-content-center">'
    + '<div class = "col-6 col-xl-6 read_more_startdate"> '
    + '<p> {{startdate}} </p>'
    + '</div>'
    + '<div class ="col-6 col-xl-6 read_more_enddate"> '
    + '<p> {{enddate}}</p>'
    + '</div>'
    + '</div>'
    + '<b>Reserverad, väntar på godkännande från värd</b>'
    + '</div>'
    + '<div class="col-12 col-xl-2">'
    + '<div class="row justify-content-center"'
    + '<div class="col-4 col-xl-12 ">'
    + '<div class="col-2 col-xl-12 search_page_price">'
    + '<i class="fas fa-home"></i>'
    + '</div>'
    + '<div class="col-2 col-xl-12 search_page_price">'
    + '<b>{{squaremetres}} kvm </b>'
    + '</div>'
    + '<div class="col-2 col-xl-12 search_page_price">'
    + '<i class="fas fa-building"></i>'
    + '</div>'
    + '<div class="col-2 col-xl-12 search_page_price">'
    + '<b> {{accommodationtype}} </b>'
    + '</div>'
    + '</div>'
    + '<div class="col-2 col-xl-12 search_page_price">'
    + '<h4>  {{price}} kr/natt </h4>'
    + '</div>'
    + '</div>'
    + '</div>'
    + '</div>';

var my_bookings_paid = '<div class="my_accomodation col-9 mt-3 p-2">'
    + '<div class="row">'
    + '<div class="col-12 col-xl-5">'
    + '<img src="{{image}}">'
    + '</div>'
    + '<div class="col-12 col-xl-5">'
    + '<h4>{{title}}<h4>'
    + '<h5 class = "mt-6"> {{streetaddress}} {{streetnumber}}, {{neighbourhood}}</h5>'
    + '<p>{{description}}</p>'
    + '<div class = "row justify-content-center">'
    + '<div class="col-6 col-xl-6 headline_startdate">'
    + '<b>Tidigast inflytt</b>'
    + '</div>'
    + '<div class="col-6 col-xl-6 headline_enddate">'
    + '<b>Senast utflytt</b>'
    + '</div>'
    + '</div>'
    + '<div class = "row justify-content-center">'
    + '<div class = "col-6 col-xl-6 read_more_startdate"> '
    + '<p> {{startdate}} </p>'
    + '</div>'
    + '<div class ="col-6 col-xl-6 read_more_enddate"> '
    + '<p> {{enddate}}</p>'
    + '</div>'
    + '</div>'
    + '<b>Boendet är betalat</b>'
    + '</div>'
    + '<div class="col-12 col-xl-2">'
    + '<div class="row justify-content-center"'
    + '<div class="col-4 col-xl-12 ">'
    + '<div class="col-2 col-xl-12 search_page_price">'
    + '<i class="fas fa-home"></i>'
    + '</div>'
    + '<div class="col-2 col-xl-12 search_page_price">'
    + '<b>{{squaremetres}} kvm </b>'
    + '</div>'
    + '<div class="col-2 col-xl-12 search_page_price">'
    + '<i class="fas fa-building"></i>'
    + '</div>'
    + '<div class="col-2 col-xl-12 search_page_price">'
    + '<b> {{accommodationtype}} </b>'
    + '</div>'
    + '</div>'
    + '<div class="col-2 col-xl-12 search_page_price">'
    + '<h4>  {{price}} kr/natt </h4>'
    + '</div>'
    + '</div>'
    + '</div>'
    + '</div>';

var my_past_booking = '<div class="my_accomodation col-9 mt-3 p-2">'
    + '<div class="row">'
    + '<div class="col-12 col-xl-5">'
    + '<img src="{{image}}">'
    + '</div>'
    + '<div class="col-12 col-xl-5">'
    + '<h4>{{title}}<h4>'
    + '<h5 class = "mt-6"> {{streetaddress}} {{streetnumber}}, {{neighbourhood}}</h5>'
    + '<p>{{description}}</p>'
    + '<div class = "row justify-content-center">'
    + '<div class="col-6 col-xl-6 headline_startdate">'
    + '<b>Tidigast inflytt</b>'
    + '</div>'
    + '<div class="col-6 col-xl-6 headline_enddate">'
    + '<b>Senast utflytt</b>'
    + '</div>'
    + '</div>'
    + '<div class = "row justify-content-center">'
    + '<div class = "col-6 col-xl-6 read_more_startdate"> '
    + '<p> {{startdate}} </p>'
    + '</div>'
    + '<div class ="col-6 col-xl-6 read_more_enddate"> '
    + '<p> {{enddate}}</p>'
    + '</div>'
    + '</div>'
    + '<p>Betalningsreferens: {{id}}</p>'
    + '</div>'
    + '<div class="col-12 col-xl-2">'
    + '<div class="row justify-content-center"'
    + '<div class="col-4 col-xl-12 ">'
    + '<div class="col-2 col-xl-12 search_page_price">'
    + '<i class="fas fa-home"></i>'
    + '</div>'
    + '<div class="col-2 col-xl-12 search_page_price">'
    + '<b>{{squaremetres}} kvm </b>'
    + '</div>'
    + '<div class="col-2 col-xl-12 search_page_price">'
    + '<i class="fas fa-building"></i>'
    + '</div>'
    + '<div class="col-2 col-xl-12 search_page_price">'
    + '<b> {{accommodationtype}} </b>'
    + '</div>'
    + '</div>'
    + '<div class="col-2 col-xl-12 search_page_price">'
    + '<h4>  {{price}} kr/natt </h4>'
    + '</div>'
    + '</div>'
    + '</div>'
    + '</div>';

var load_my_payments = '<div class="my_accomodation col-9 mt-3 p-2">'
    + '<h1>{{ad_title}} <h1>'
    + '<h3>{{payment_price}} kr </h3>'
    + '<p>Betalningsreferens: {{id}}</p>'
    + '</div>';

var tenant = '<div class="my_tenant">'
    + '<h5>{{name}}</h5>'
    + '<p>{{bio}}</p>'
    + '<p>{{telephone}}</p>'
    + '<p>{{email}}</p>'
    + '<div class="row">'
    + '<div class="col-6">'
    + '<button type="button" class="book_ad_button rounded-pill" data-id="{{ad_id}}">Godkänn</button>'
    + '</div>'
    + '<div class="col-6">'
    + '<button type="button" class="deny_ad_button rounded-pill" data-id="{{ad_id}}">Neka</button>'
    + '</div>'
    + '</div>'
    + '</div>';