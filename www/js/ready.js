// ----------------------------------------------------------------------------
// generic methods

function log(msg) {
    var $li = $('<li>').text((new Date()).toISOString() + ' : ' + msg);
    var $log = $('#log');
    $log.append($li);

    var $lis = $('#log li');
    if ( $lis.size() > 10 ) {
        $($lis[0]).remove();
    }
}

// ----------------------------------------------------------------------------
// data

var stats = [
    {
        city : 'Taihape',
        population : '2,000',
        area : '26',
        country : 'New Zealand',
        density : '76.92'
    },
    {
        city : 'Beijing',
        population : '19,612,368',
        area : '16,801.25',
        country : 'People\'s Republic of China',
        density : '1,200'
    },
    {
        city : 'Helsinki',
        population : '602,200',
        area : '715.49',
        country : 'Finland',
        density : '1,391.13'
    },
    {
        city : 'Reykjavík',
        population : '119,108',
        area : '777',
        country : 'Iceland',
        density : '436.5'
    },
    {
        city : 'São Paulo',
        population : '11,316,149',
        area : '1,522.986',
        country : 'Brazil',
        density : '7,216.3'
    },
    {
        city : 'Cape Town',
        population : '827,218',
        area : '496.70',
        country : 'South Africa',
        density : '1,700'
    },
    {
        city : 'Boston',
        population : '625,087',
        area : '89.63',
        country : 'United States',
        density : '12,752'
    },
    {
        city : 'Tokyo',
        population : '13,185,502',
        area : '2,187.66',
        country : 'Japan',
        density : '6,000'
    }
];

// ----------------------------------------------------------------------------
// parse.com

// initialise the app (Application ID, JavaScript Key)
Parse.initialize("Rxp5dzTelcnLnQYwLnkLDc1ZWcy3awLOo849Ujys", "hHzW82AsOxRx5sZr7LV80Bvh6odVmbOoATUnrp2L");

// Simple syntax to create a new subclass of Parse.Object.
var AppEvent = Parse.Object.extend("AppEvent");

// ----------------------------------------------------------------------------
// ready

function deviceReady() {
    log('deviceReady(): entry');

    // Create a new instance of the AppEvent, i.e. someone has opened the app
    var openEvent = new AppEvent();
    // openEvent.set("eventName", 'open');
    // openEvent.set("deviceUuid", window.device && window.device.uuid);

    openEvent.save({
        eventName : 'open',
        name      : window.device ? window.device.name     : 'n/a',
        uuid      : window.device ? window.device.uuid     : 'n/a',
        platform  : window.device ? window.device.platform : 'n/a',
        version   : window.device ? window.device.version  : 'n/a'
    }, {
        success : function(event) {
            log('Open Event saved successfully: id=' + event.id);
        },
        failure : function(event, err) {
            log('Open Event save failed: ' + err);
        }
    });

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

        var stat = parseInt(angle/45);
        $('#stat-city').text(stats[stat].city);
        $('#stat-population').text(stats[stat].population);
        $('#stat-area').text(stats[stat].area);
        $('#stat-country').text(stats[stat].country);
        $('#stat-density').text(stats[stat].density);
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
