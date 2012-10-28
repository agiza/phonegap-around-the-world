function log(msg) {
    var $li = $('<li>').text((new Date()).toISOString() + ' : ' + msg);
    var $log = $('#log');
    $log.append($li);

    var $lis = $('#log li');
    if ( $lis.size() > 10 ) {
        $($lis[0]).remove();
    }
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
                '-webkit-transform' : 'rotate(' + (360 - angle) + 'deg)',
                'transform'         : 'rotate(' + (360 - angle) + 'deg)'
            });
            $city.text(angle);
            $angle.text(angle + '°');
        }
    }
    function noop() {}

    // watch the compass
    var watchId = navigator.compass.watchHeading(updateMap, noop, { frequency : 100 } );

    log('deviceReady(): exit');
}

document.addEventListener('deviceready', deviceReady, false);

// fake some stuff
if ( false ) {
    var a = 0;
    navigator.compass = {
        watchHeading : function(success, failure, opts) {
            var i = setInterval(function() {
                a += 5;
                if ( a > 360 ) { a -= 360; }
                success({ magneticHeading : a });
            }, opts.frequency);
            return i;
        }
    };
    deviceReady();
}
