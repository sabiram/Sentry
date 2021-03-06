function search() {
    $(".segment").addClass("loading");
    $(".table tbody").empty();
    $.ajax({
        url: "/find-books",
        data: {
            title: $("#searchInput").val()
        },
        type: "GET"
    }).done(function (data) {
        if (data.success === true) {
            $.each(data.rows, function (index, value) {
                addBook(value);
            });
        } else {
            alert(data.message);
        }
    }).always(function (data) {
            $(".segment").removeClass("loading");
    });
}
function addBook(value) {
    var str = '<tr><td><h4 class="ui header"><i class="book icon"></i>'
    str += '<div class="content"><a href="/book/'+value.id+'">'+value.title+'</a>'
    str += '<div class="sub header">'+value.author+'</div></div></h4></td></tr>'
    $(".table tbody").append(str);
}

$(function () { //shorthand document.ready function
    $.ajax({
        url: "/get-books",
        data: {},
        type: "GET"
    }).done(function (data) {
        if (data.success === true) {
            $.each(data.rows, function (index, value) {
                addBook(value);
            });
        } else {
            alert(data.message);
        }
    })
    $("#searchButton").click(function (e) {
            e.preventDefault();
            search();
    });
    $('body').on('keypress', 'input', function(args) {
    if (args.keyCode == 13) {
        $("#searchButton").click();
        return false;
    }
});
});