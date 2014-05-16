$('#index').live('pagebeforeshow',function(e,data){ 
    $.ajax({url: "http://api.themoviedb.org/2.1/Movie.search/en/json/23afca60ebf72f8d88cdcae2c4f31866/The Goonies",
        dataType: "jsonp",
        jsonpCallback: 'successCallback',
        async: true,
        beforeSend: function() {
            $.mobile.showPageLoadingMsg(true);
        },
        complete: function() {
            $.mobile.hidePageLoadingMsg();
        },
        success: function (result) {
            ajax.parseJSONP(result);
        },
        error: function (request,error) {
            alert('Network error has occurred please try again!');
        }
    });         
});


var ajax = {  
    parseJSONP:function(result){
        //var jsonObj = jQuery.parseJSON(parameters);
        $('#movie-data').append('<li>Movie name:<span> ' + result[0].original_name+ '</span></li>');
        $('#movie-data').append('<li>Popularity:<span> ' + result[0].popularity + '</span></li>');
        $('#movie-data').append('<li>Rating:<span> ' + result[0].rating+ '</span></li>');
        $('#movie-data').append('<li>Overview:<span> ' + result[0].overview+ '</span></li>');
        $('#movie-data').append('<li>Released:<span> ' + result[0].released+ '</span></li>');  
        $('#movie-data').listview('refresh');
        

    var newTheme = 'b';

    $.mobile.activePage.find('.ui-btn, .ui-li, .ui-listview').removeClass('ui-btn-up-a ui-btn-up-b ui-btn-up-c ui-btn-up-d ui-btn-up-e ui-btn-hover-a ui-btn-hover-b ui-btn-hover-c ui-btn-hover-d ui-btn-hover-e').addClass('ui-btn-up-' + newTheme ).attr('data-theme', newTheme );
    $.mobile.activePage.find('.ui-header, .ui-footer').removeClass('ui-bar-a ui-bar-b ui-bar-c ui-bar-d ui-bar-e').addClass('ui-bar-' + newTheme ).attr('data-theme', newTheme );
    $.mobile.activePage.removeClass('ui-body-a ui-body-b ui-body-c ui-body-d ui-body-e').addClass('ui-body-' + newTheme ).attr('data-theme', newTheme );        
        
    }
}
