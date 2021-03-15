$(document).ready(function () {
    $("#content").html($("#search_page").html());
    $("#header").html($("#home_header").html());
    load_ads();
})

function load_ads() {
    $.ajax({
        url: host + '/ads',
        type: 'GET',
        success: function (ads) {
            ads.array.forEach(element => {
                $("#seach_result").append(Mustache.render(accomodation, element.title));
            });
        }
    })
}