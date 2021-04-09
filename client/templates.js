var accomodation = '<div class="accomodation col-10 col-lg-8 mt-3 p-2">'
    + '<h1>{{title}}<h1>'
    + '<h3>{{neighbourhood}}</h3>'
    + '<h3>{{streetaddress}} {{streetnumber}}</h3>'
    + '<p>{{description}}</p>'
    + '<p>{{squaremetres}}</p>'
    + '<p>{{price}} kr</p>'
    + '<button type="button" class="read_more_ad_button" data-id="{{id}}">Läs mer</button>'
    + '</div>';

var my_accomodation = '<div class="my_accomodation col-9 mt-3 p-2">'
    + '<h1>{{title}}<h1>'
    + '<h3>{{neighbourhood}}</h3>'
    + '<h3>{{streetaddress}} {{streetnumber}}</h3>'
    + '<p>{{description}}</p>'
    + '<p>{{squaremetres}}</p>'
    + '<p>{{price}} kr</p>'
    + '</div>';

var my_bookings = '<div class="my_bookings col-9 mt-3 p-2">'
    + '<h1>{{title}}<h1>'
    + '<h3>{{neighbourhood}}</h3>'
    + '<h3>{{streetaddress}} {{streetnumber}}</h3>'
    + '<p>{{description}}</p>'
    + '<p>{{squaremetres}}</p>'
    + '<p>{{price}} kr</p>'
    + '<button type="button" class="payment_button" data-id="{{id}}" data-price={{price}} >Betala nu</button>'
    + '</div>';

var tenant = '<div class="my_tenant col-2 offset-1 mt-3 p-2">'
    + '<h1>{{name}}</h1>'
    + '<button type="button" class="book_ad_button" data-id="{{ad_id}}">Godkänn</button>'
    + '<button type="button" class="deny_ad_button" data-id="{{ad_id}}">Neka</button>'
    + '</div>';