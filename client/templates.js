var accomodation = '<a href= "" class = "title_id testamonial accomodation col-9 col-xl-3 mt-3 p-4" data-id="{{id}}">'
    + '<div class="row justify-content-center align-items-center">'
    + '<div class ="col-12">'
    + '<h5>{{title}}</h5>'
    + '<p class = "mt-6"> {{streetaddress}} {{streetnumber}}, {{neighbourhood}}</p>'
    + '</div>'
    + '<div class="col-11 image_ad" style="background-image: url({{image}});"> </div>'



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

var my_accomodation = '<div class="my_accomodation testamonial col-9 mt-3 p-2">'
    + '<div class="row justify-content-center p-3">'
    + '<div class="col-12 col-xl-4">'
    + '<img src="{{image}}">'
    + '</div>'
    + '<div class="col-12 col-xl-5">'
    + '<h4>{{title}}<h4>'
    + '<h5 class = "mt-6"> {{streetaddress}} {{streetnumber}}, {{neighbourhood}}</h5>'
    
    + '<div class = "row justify-content-center">'
    + '<div class="col-6 col-xl-6 headline_startdate">'
    + '<b class="headline_startdate_b{{id}}">Tidigast inflytt</b>'
    + '</div>'
    + '<div class="col-6 col-xl-6 headline_enddate">'
    + '<b class="headline_enddate_b{{id}}">Senast utflytt</b>'
    + '</div>'
    + '</div>'
    + '<div class = "row justify-content-center">'
    + '<div class = "col-6 col-xl-6 read_more_startdate"> '
    + '<p class="read_more_startdate_p{{id}}"> {{startdate}} </p>'
    + '</div>'
    + '<div class ="col-6 col-xl-6 read_more_enddate"> '
    + '<p class="read_more_enddate_p{{id}}"> {{enddate}} </p>'
    + '</div>'
    + '</div>'
    
    +'<div class="col-12 mt-2">'
    +'<div id="accordion">'
    +    '<h5 class="mb-0">'
    +      '<button class="btn btn-default rounded-pill" data-toggle="collapse" data-target="#collapse{{id}}" aria-expanded="false" aria-controls="collapse{{id}}" style="color:white;">'
    +        'L??s mer'
    +      '</button>'
    +    '</h5>'
    
    + '<div id="collapse{{id}}" class="collapse" aria-labelledby="heading{{id}}" data-parent="#accordion">'
    +    '<div class="card-body">'
    + '<p>{{description}}</p>'

    +'<div class = "row justify-content-center mb-4 read_more_attributes">' 
    +          '<i class = "col-2  fas fa-wifi">'
    +            '<i id="wifi-attribute{{id}}"></i>'
    +          '</i>'
    +          '<i class = "col-2 fas fa-utensils">'
    +            '<i id="dishwasher-attribute{{id}}"></i>'
    +          '</i>'
    +          '<i class = "col-2 fas fa-bicycle">'
    +            '<i id="bike-attribute{{id}}"></i>'
    +          '</i>'
    +          '<i class = "col-2 fas fa-tshirt">'
    +            '<i id="washingmachine-attribute{{id}}"></i>'
    +          '</i>'
    +          '<i class = "col-2 fas fa-hot-tub">'
    +            '<i id="sauna-attribute{{id}}"></i>'
    +          '</i>'
    +        '</div>'

    +  '</div>'
    + '</div>'
    +'</div>'
    + '</div>'
    + '</div>'

    
    + '<div class="col-12 col-xl-3">'
    + '<div class="row justify-content-center"'
    + '<div class="col-4 col-xl-12 ">'
    + '<div class="col-8 col-xl-8 search_page_price">'
    + '<i class="fas fa-home"></i>'
    + '</div>'
    + '<div class="col-8 col-xl-8 search_page_price" style=" border-bottom: black solid 1px; text-align: center;">'
    + '<b>{{squaremetres}} kvm </b>'
    + '</div>'

    + '<div class="col-8 col-xl-8 search_page_price">'
    + '<i class="fas fa-bed"></i>'
    + '</div>'
    + '<div class="col-8 col-xl-8 search_page_price" style=" border-bottom: black solid 1px; text-align: center;">'
    + '<b>{{beds}} st </b>'
    + '</div>'

    + '<div class="col-8 col-xl-8 search_page_price">'
    + '<i class="fas fa-building"></i>'
    + '</div>'
    + '<div class="col-8 col-xl-8 search_page_price" style=" border-bottom: black solid 1px; text-align: center;">'
    + '<b> {{accommodationtype}} </b>'
    + '</div>'
    + '</div>'
    + '<div class="col-12 col-xl-12 search_page_price mt-3" >'
    + '<h5 style="text-align: center;">  {{price}} kr/natt </h5>'
    + '</div>'
    + '</div>'
    + '<div class="accomodation_tennant_{{id}} col-12"></div>'
    + '</div>'
    + '</div>';

    var my_bookings = '<div class="my_accomodation testamonial col-9 mt-3 p-2">'
    + '<div class="row justify-content-center p-3">'
    + '<div class="col-12 col-xl-4">'
    + '<img src="{{image}}">'
    + '</div>'
    + '<div class="col-12 col-xl-5">'
    + '<h4>{{title}}<h4>'
    + '<h5 class = "mt-6"> {{streetaddress}} {{streetnumber}}, {{neighbourhood}}</h5>'
    
    + '<div class = "row justify-content-center">'
    + '<div class="col-6 col-xl-6 headline_startdate">'
    + '<b>Inflytt</b>'
    + '</div>'
    + '<div class="col-6 col-xl-6 headline_enddate">'
    + '<b>Utflytt</b>'
    + '</div>'
    + '</div>'
    + '<div class = "row justify-content-center">'
    + '<div class = "col-6 col-xl-6 read_more_startdate"> '
    + '<p> {{tenant_startdate}} </p>'
    + '</div>'
    + '<div class ="col-6 col-xl-6 read_more_enddate"> '
    + '<p> {{tenant_enddate}}</p>'
    + '</div>'
    + '</div>'
    
    +'<div class="col-12 mt-2">'
    +'<div id="accordion">'
    +    '<h5 class="mb-0">'
    +      '<button class="btn btn-default rounded-pill" data-toggle="collapse" data-target="#collapse{{id}}" aria-expanded="false" aria-controls="collapse{{id}}" style="color:white;">'
    +        'L??s mer'
    +      '</button>'
    +    '</h5>'
    
    + '<div id="collapse{{id}}" class="collapse" aria-labelledby="heading{{id}}" data-parent="#accordion">'
    +    '<div class="card-body">'
    + '<p>{{description}}</p>'

    +'<div class = "row justify-content-center mb-4 read_more_attributes">' 
    +          '<i class = "col-2  fas fa-wifi">'
    +            '<i id="wifi-attribute{{id}}"></i>'
    +          '</i>'
    +          '<i class = "col-2 fas fa-utensils">'
    +            '<i id="dishwasher-attribute{{id}}"></i>'
    +          '</i>'
    +          '<i class = "col-2 fas fa-bicycle">'
    +            '<i id="bike-attribute{{id}}"></i>'
    +          '</i>'
    +          '<i class = "col-2 fas fa-tshirt">'
    +            '<i id="washingmachine-attribute{{id}}"></i>'
    +          '</i>'
    +          '<i class = "col-2 fas fa-hot-tub">'
    +            '<i id="sauna-attribute{{id}}"></i>'
    +          '</i>'
    +        '</div>'

    +  '</div>'
    + '</div>'
    +'</div>'
    + '</div>'
    + '</div>'

    
    + '<div class="col-12 col-xl-3">'
    + '<div class="row justify-content-center"'
    + '<div class="col-4 col-xl-12 ">'
    + '<div class="col-8 col-xl-8 search_page_price">'
    + '<i class="fas fa-home"></i>'
    + '</div>'
    + '<div class="col-8 col-xl-8 search_page_price" style=" border-bottom: black solid 1px; text-align: center;">'
    + '<b>{{squaremetres}} kvm </b>'
    + '</div>'

    + '<div class="col-8 col-xl-8 search_page_price">'
    + '<i class="fas fa-bed"></i>'
    + '</div>'
    + '<div class="col-8 col-xl-8 search_page_price" style=" border-bottom: black solid 1px; text-align: center;">'
    + '<b>{{beds}} st </b>'
    + '</div>'

    + '<div class="col-8 col-xl-8 search_page_price">'
    + '<i class="fas fa-building"></i>'
    + '</div>'
    + '<div class="col-8 col-xl-8 search_page_price" style=" border-bottom: black solid 1px; text-align: center;">'
    + '<b> {{accommodationtype}} </b>'
    + '</div>'
    + '</div>'
    + '<div class="col-12 col-xl-12 search_page_price mt-3" >'
    + '<h5 style="text-align: center;">  {{price}} kr/natt </h5>'
    + '</div>'
    + '</div>'
    + '<div class="accomodation_host_{{id}} col-12"></div>'
    + '</div>'
    + '</div>';

var my_past_booking = '<div class="my_accomodation testamonial col-9 mt-3 p-2">'
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
    +'<div class="col-12 mt-2">'
    +'<div id="accordion">'
    +    '<h5 class="mb-0">'
    +      '<button class="btn-danger btn rounded-pill" data-toggle="collapse" data-target="#collapsetenant1{{ad_id}}" aria-expanded="false" aria-controls="collapsetenant1{{ad_id}}" style="background-color: #dc3545; color:white;">'
    +        'Du har en hyresg??st att godk??nna. Tryck f??r mer info.'
    +      '</button>'
    +    '</h5>'
    
    + '<div id="collapsetenant1{{ad_id}}" class="collapse" aria-labelledby="headingtenant1{{ad_id}}" data-parent="#accordion">'
    +    '<div class="card-body">'
    + '<h5>Info om hyresg??sten</h5>'
    + '<p> <b>Namn:</b> {{name}} <br>'
    + '<b>Om hyresg??sten:</b> {{bio}} <br>'
    + '<b>Telefonnummer:</b> {{telephone}} <br>'
    + '<b>Email:</b> {{email}}</p>'
    + '<div class="row">'
    + '<div class="col-6">'
    + '<button type="button" class="book_ad_button rounded-pill btn btn-primary" data-id="{{ad_id}}">Godk??nn</button>'
    + '</div>'
    + '<div class="col-6">'
    + '<button type="button" class="deny_ad_button rounded-pill btn-danger" data-id="{{ad_id}}">Neka</button>'
    + '</div>'
    + '</div>'
    +  '</div>'
    + '</div>'
    +'</div>'
    + '</div>'
    + '</div>'
   
   
    + '</div>';

var tenant_booked = '<div class="my_tenant">'
+'<div class="col-12 mt-2">'
+'<div id="accordion">'
+    '<h5 class="mb-0">'
+      '<button id="tenant_button2{{ad_id}}" class="btn-danger btn rounded-pill" data-toggle="collapse" data-target="#collapsetenant2{{ad_id}}" aria-expanded="false" aria-controls="collapsetenant2{{ad_id}}" style="background-color: #dc3545; color:white;">'
+      '</button>'
+    '</h5>'

+ '<div id="collapsetenant2{{ad_id}}" class="collapse" aria-labelledby="headingtenant2{{ad_id}}" data-parent="#accordion">'
+    '<div class="card-body">'
+ '<h5>Info om hyresg??sten</h5>'
+ '<p> <b>Namn:</b> {{name}} <br>'
+ '<b>Om hyresg??sten:</b> {{bio}} <br>'
+ '<b>Telefonnummer:</b> {{telephone}} <br>'
+ '<b>Email:</b> {{email}}</p>'
+ '</div>'
+ '</div>'
+'</div>'
+ '</div>'
+ '</div>'
+ '</div>';

var host_booked = '<div class="my_host">'
+'<div class="col-12 mt-2">'
+'<div id="accordion">'
+    '<h5 class="mb-0">'
+      '<button id="host_button{{ad_id}}" class="btn-danger btn rounded-pill" data-toggle="collapse" data-target="#collapsehost{{ad_id}}" aria-expanded="false" aria-controls="collapsehost{{ad_id}}" style="background-color: #dc3545; color:white;">'
+      '</button>'
+    '</h5>'

+ '<div id="collapsehost{{ad_id}}" class="collapse" aria-labelledby="headinghost{{ad_id}}" data-parent="#accordion">'
+    '<div class="card-body">'
+ '<h5>Info om hyresv??rden</h5>'
+ '<p> <b>Namn:</b> {{name}} <br>'
+ '<b>Om hyresv??rden:</b> {{bio}} <br>'
+ '<b>Telefonnummer:</b> {{telephone}} <br>'
+ '<b>Email:</b> {{email}}</p>'

+ '</div>'
+ '</div>'
+'</div>'
+ '</div>'
+ '</div>'
+ '</div>';

var pay_button = '<div class="col-12 mt-2">'
+ '<button type="button" class="payment_button btn btn-primary rounded-pill" data-id="{{id}}" data-price={{price}} >Betala nu</button>'
+ '</div>'