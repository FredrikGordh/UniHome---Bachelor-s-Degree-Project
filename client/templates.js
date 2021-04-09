var accomodation = '<div class="accomodation col-10 col-lg-8 mt-3 p-5">'
    + '<h1>{{title}}<h1>'
    + '<h3>{{neighbourhood}}</h3>'
    + '<div class="row">'
    + '<div class="col-12 col-lg-6">'
    + '<img src="{{image}}">'
    + '</div>'
    + '<div class="col-12 col-lg-4">'
    + '<h3>{{streetaddress}} {{streetnumber}}</h3>'
    + '<p>{{description}}</p>'
    + '<p>{{squaremetres}}</p>'
    + '<p>{{price}} kr</p>'
    + '</div>'
    + '</div>'
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

var tenant = '<div class="my_tenant col-2 offset-1 mt-3 p-2">'
    + '<h1>{{name}}</h1>'
    + '<button type="button" class="book_ad_button" data-id="{{ad_id}}">Godkänn</button>'
    + '<button type="button" class="deny_ad_button" data-id="{{ad_id}}">Neka</button>'
    + '</div>';