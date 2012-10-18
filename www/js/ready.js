function log(msg) {
    var $li = $('<li>').text((new Date()).toISOString() + ' : ' + msg);
    $('#log').append($li);
}

function deviceReady() {
    log('deviceReady(): entry');

    // get the compass info
    var compassHeading;
    var watchId = navigator.compass.watchHeading(
        function(heading) {
            var angle = parseInt(heading.magneticHeading, 10);
            var $city = $('#city');
            var $angle= $('#angle');
            if ( isNaN(angle) ) {
                $city.text('[unknown]');
                $angle.text('?');
            }
            else {
                $city.text(angle);
                $angle.text(angle + '°');
                $('#map').css({
                    'transform' : 'rotate(' + (360 - angle) + 'deg)'
                });
            }
        },
        function() {
            // nothing yet
            // $('#city').text('');
        },
        { frequency : 1000 }
    );

    log('deviceReady(): exit');
}

document.addEventListener('deviceready', deviceReady, false);
