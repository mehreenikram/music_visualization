/**
 * Created by Maira on 5/1/15.
 */
function render(songs){
    //this function expects the songs array to be sorted from the oldest to the newest.
    var date = songs[0].timestamp;
    var last_day = songs[songs.length - 1].timestamp;
    var amount_days =  Math.ceil((last_day-date)/(1000*60*60*24));
    var visualization_div = $('#visualization');
    visualization_div.width(21*amount_days);
    $('body').width((21*amount_days)+40)
    var html = '';
    while (date.getTime() < last_day.getTime()) {
        html += '<div class="day" id="'+date.getDate()+'-'+date.getMonth()+'-'+date.getFullYear()+'">';
        html += create_hours_divs(date.getDate()+'-'+date.getMonth()+'-'+date.getFullYear());
        html += '</div>';
        date.setTime(date.getTime() + 86400000);
    }
    visualization_div.append(html);
    $.each(songs, function(i,v){
        var song_date = v.timestamp.getDate()+'-'+v.timestamp.getMonth()+'-'+v.timestamp.getFullYear();

        $('#'+ song_date +'-'+ v.hour).append('<div class="square '+ v.gender+'"><span class="name">'+ v.name+'</span></div>');
    });
    get_squares_size();
}

function create_hours_divs(date) {
    var html = '';
    for (var i=23; i > -1; i--) {
        html += '<div class="hour" id="'+date+'-'+i+'"></div>';
    }
    return html;
}

function get_squares_size(){
    $('.hour').each(function(){
        var squares = $(this).find('.square');
        var amount = squares.length;
        if (amount > 0) {
            var size = 20/amount;
            squares.height(size);
        }
    })
}