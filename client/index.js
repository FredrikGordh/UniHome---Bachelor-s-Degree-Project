$(document).ready(function () {
    $("#content").html(Mustache.render(home));
    $("#header").html(Mustache.render(home_header))
})