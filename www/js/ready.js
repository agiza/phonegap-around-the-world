function log(msg) {
    var $li = $('<li>').text((new Date()).toISOString() + ' : ' + msg);
    $('#log').append($li);
}

function deviceReady() {
    log('deviceReady(): entry');

    function updateMap(heading) {
        var angle = parseInt(heading.magneticHeading, 10);
        var $city = $('#city');
        var $angle= $('#angle');
        if ( isNaN(angle) ) {
            $city.text('[unknown]');
            $angle.text('?');
        }
        else {
            $('#map').css({
                'transform' : 'rotate(' + (360 - angle) + 'deg)'
            });
            $city.text(angle);
            $angle.text('' + angle + '°');
        }
    }
    function noop() {}

    // watch the compass
    var watchId = navigator.compass.watchHeading(updateMap, noop, { frequency : 1000 } );

    if ( false ) {
        var a = 0;
        setInterval(function() {
            a+=5;
            if ( a === 360 ) {
                a = 0;
            }
            updateMap({ magneticHeading : a });
        }, 1000);
    }

    log('deviceReady(): exit');
}

document.addEventListener('deviceready', deviceReady, false);
