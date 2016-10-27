/**
 * Created by vigne on 10/27/2016.
 */
var map;
var marker;
var points = [];
var mapOptions;
var markers = [];
var markerCluster;
var darkMapStyle = [
  {
    "featureType": "administrative",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#444444"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.neighborhood",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.province",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "landscape",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "landscape.man_made",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "lightness": -35
      },
      {
        "gamma": 3.16
      },
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "landscape.natural.landcover",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "hue": "#ff0000"
      },
      {
        "saturation": 15
      },
      {
        "lightness": 90
      },
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.attraction",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "stylers": [
      {
        "saturation": -100
      },
      {
        "lightness": 45
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "hue": "#ff0000"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "lightness": "83"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "stylers": [
      {
        "visibility": "simplified"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "lightness": 100
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit.station.airport",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit.station.bus",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "water",
    "stylers": [
      {
        "color": "#24282b"
      },
      {
        "lightness": -45
      },
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "saturation": "-70"
      },
      {
        "lightness": "27"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  }
];
var currentKeyword = null;
var clusterOptions;
/*var lightMapStyle = [
   {
      "featureType":"administrative",
      "elementType":"labels.text.fill",
      "stylers":[
         {
            "color":"#444444"
         }
      ]
   },
   {
      "featureType":"administrative.province",
      "elementType":"labels",
      "stylers":[
         {
            "visibility":"off"
         }
      ]
   },
   {
      "featureType":"administrative.locality",
      "elementType":"labels",
      "stylers":[
         {
            "visibility":"off"
         }
      ]
   },
   {
      "featureType":"administrative.neighborhood",
      "elementType":"labels",
      "stylers":[
         {
            "visibility":"off"
         }
      ]
   },
   {
      "featureType":"administrative.land_parcel",
      "elementType":"labels",
      "stylers":[
         {
            "visibility":"off"
         }
      ]
   },
   {
      "featureType":"landscape",
      "elementType":"all",
      "stylers":[
         {
            "color":"#f2f2f2"
         }
      ]
   },
   {
      "featureType":"landscape.man_made",
      "elementType":"geometry.fill",
      "stylers":[
         {
            "lightness":"-37"
         },
         {
            "gamma":"2.78"
         }
      ]
   },
   {
      "featureType":"landscape.natural.landcover",
      "elementType":"geometry.fill",
      "stylers":[
         {
            "hue":"#ff0000"
         },
         {
            "saturation":"15"
         },
         {
            "lightness":"91"
         }
      ]
   },
   {
      "featureType":"poi",
      "elementType":"all",
      "stylers":[
         {
            "visibility":"off"
         }
      ]
   },
   {
      "featureType":"poi",
      "elementType":"labels",
      "stylers":[
         {
            "visibility":"off"
         }
      ]
   },
   {
      "featureType":"poi.attraction",
      "elementType":"labels",
      "stylers":[
         {
            "visibility":"off"
         }
      ]
   },
   {
      "featureType":"poi.park",
      "elementType":"labels",
      "stylers":[
         {
            "visibility":"off"
         }
      ]
   },
   {
      "featureType":"road",
      "elementType":"all",
      "stylers":[
         {
            "saturation":-100
         },
         {
            "lightness":45
         }
      ]
   },
   {
      "featureType":"road",
      "elementType":"geometry.fill",
      "stylers":[
         {
            "hue":"#ff0000"
         }
      ]
   },
   {
      "featureType":"road",
      "elementType":"labels",
      "stylers":[
         {
            "visibility":"off"
         }
      ]
   },
   {
      "featureType":"road.highway",
      "elementType":"all",
      "stylers":[
         {
            "visibility":"simplified"
         }
      ]
   },
   {
      "featureType":"road.highway",
      "elementType":"geometry",
      "stylers":[
         {
            "lightness":"100"
         }
      ]
   },
   {
      "featureType":"road.highway",
      "elementType":"labels",
      "stylers":[
         {
            "visibility":"off"
         }
      ]
   },
   {
      "featureType":"road.arterial",
      "elementType":"geometry.fill",
      "stylers":[
         {
            "lightness":"83"
         }
      ]
   },
   {
      "featureType":"road.arterial",
      "elementType":"labels.icon",
      "stylers":[
         {
            "visibility":"off"
         }
      ]
   },
   {
      "featureType":"road.local",
      "elementType":"labels",
      "stylers":[
         {
            "visibility":"off"
         }
      ]
   },
   {
      "featureType":"transit",
      "elementType":"all",
      "stylers":[
         {
            "visibility":"off"
         }
      ]
   },
   {
      "featureType":"transit.line",
      "elementType":"labels",
      "stylers":[
         {
            "visibility":"off"
         }
      ]
   },
   {
      "featureType":"transit.station",
      "elementType":"labels",
      "stylers":[
         {
            "visibility":"off"
         }
      ]
   },
   {
      "featureType":"transit.station.airport",
      "elementType":"labels",
      "stylers":[
         {
            "visibility":"off"
         }
      ]
   },
   {
      "featureType":"transit.station.bus",
      "elementType":"labels",
      "stylers":[
         {
            "visibility":"off"
         }
      ]
   },
   {
      "featureType":"water",
      "elementType":"all",
      "stylers":[
         {
            "color":"#46bcec"
         },
         {
            "visibility":"on"
         }
      ]
   },
   {
      "featureType":"water",
      "elementType":"geometry.fill",
      "stylers":[
         {
            "lightness":"27"
         },
         {
            "saturation":"-70"
         }
      ]
   },
   {
      "featureType":"water",
      "elementType":"labels",
      "stylers":[
         {
            "visibility":"off"
         }
      ]
   }
];*/


function init(){
    console.log("Initialize Called");
    //var latlng = new google.maps.LatLng(37.09024, -95.712891);
    var latlng = new google.maps.LatLng(35.972191, -17.189423);

    currentMapStyle = darkMapStyle;
    mapOptions = {
        center: latlng,
        scrollWheel: false,
        zoom: 3,
        styles: currentMapStyle
    };
    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    console.log("Setting cluster Style");
    clusterOptions = {
        imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
    }

    map.addListener('click', function(event){
        geoSpatialSearch(event);
    });
}

function drawMarkers(tweetJSON){
    tweets = tweetJSON.features;
    // Remove all markers
    markers.length = 0;

    // Clear Tweet Sidebar
    $('#tweetPlace').empty();

    $.each(tweets, function(i, tweet){
        if(tweet != undefined || tweet.geometry != undefined){
            placeMarker(tweet);
            if(i < 10){
                addTweetSidebar(tweet);
            }
        }
    });

    markerCluster = new MarkerClusterer(map, markers, clusterOptions);

}

function placeMarker(tweet){
    //Get all variables from JSON

    var location = new google.maps.LatLng(tweet.geometry.coordinates[1], tweet.geometry.coordinates[0]);
    var username = tweet.properties.username;
    var screen_name = tweet.properties.screenname;
    var link = tweet.properties.link;
    var text = urlify(tweet.properties.text);
    var profile_pic = tweet.properties.profile_img;

    var tweetMarker = new google.maps.Marker({
        position: location,
        map: map,
    });

    markers.push(tweetMarker);

    var window_content = '<div id="iw-container">' +
                            '<div class="iw-title">'+
                                '<a href="' + link + '">' +
                                    username + '(@' + screen_name + ')' +
                                '</a>' +
                            '</div>' +
                            '<div class="iw-content">' +
                                '<img src="' + profile_pic + '" onerror="imgError(this);">' +
                                '<p>' + text + '</p>' +
                            '</div>' +
                        '</div>';

    var infoWindow = new google.maps.InfoWindow({
        content: window_content,
        maxWidth: 350
    });

    designInfoWindow(infoWindow);

    google.maps.event.addListener(tweetMarker, 'click', function () {
        infoWindow.open(map, tweetMarker);
    });

    google.maps.event.addListener(map, 'click', function() {
        infoWindow.close();
    });

}

function designInfoWindow(infoWindow){

    google.maps.event.addListener(infoWindow, 'domready', function() {

        var iwOuter = $('.gm-style-iw');

        var iwBackground = iwOuter.prev();

        iwBackground.children(':nth-child(2)').css({'display' : 'none'});
        iwBackground.children(':nth-child(4)').css({'display' : 'none'});
        iwOuter.parent().parent().css({left: '115px'});

        iwBackground.children(':nth-child(1)').attr('style', function(i,s){ return s + 'left: 100px !important;'});
        iwBackground.children(':nth-child(3)').attr('style', function(i,s){ return s + 'left: 100px !important;'});
        iwBackground.children(':nth-child(3)').find('div').children().css({'box-shadow': 'rgba(72, 181, 233, 0.6) 0px 1px 6px', 'z-index' : '1'});

        var iwCloseBtn = iwOuter.next();
        iwCloseBtn.css({opacity: '1', right: '51px', top: '16px'});
        iwCloseBtn.mouseout(function(){
          $(this).css({opacity: '1'});
        });
    });
}

function urlify(text) {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function(url) {
        return '<a class = "tweetLink" href="' + url + '">' + url + '</a>';
    })
}

function addTweetSidebar(tweet){
    var username = tweet.properties.username;
    var screen_name = tweet.properties.screenname
    var link = tweet.properties.link;
    var text = urlify(tweet.properties.text);
    var profile_pic = tweet.properties.profile_img;

    var tweetContent = '<blockquote class="twitter-tweet">' +
                            '<img src="' + profile_pic + '">' +
                            '<a href="' + link + '">' +
                                '<h5>' + username + ' (@' + screen_name + ')' + '</h5>' +
                            '</a>' +
                            '<p>' + text + '</p>' +
                        '</blockquote>';

    var $newTweet = $(tweetContent);
    $('#tweetPlace').append($newTweet);
}

function keywordSelect(queryKey) {
    $.getJSON("keywordSelect", {keyword: queryKey})
    .done(function(data){
        drawMarkers(data);
    })
    .fail(function(error){
        console.log(error);
    });
}

function geoSpatialSearch(event)
{
    coordinates = {
        "lat": event.latLng.lat(),
        "lng": event.latLng.lng()
    };

    $.getJSON("geoSpatialSearch", coordinates)
    .done(function(data){
        drawMarkers(data);
    })
    .fail(function(error){
        console.log(error);
    });
}

function imgError(image) {
    image.onerror = "";
    //image.src = "img/blank.jpg";
    return true;
}

function removeMarkers(){
    for(i = 0; i < markers.length; i++){
        markers[i].setMap(null);
    }
    markers.length = 0;
}

function getValue(value){
    currentKeyword = value.text;
    $('.dropdown-menu').parents('.input-group-btn').find('.dropdown-toggle').html(value.text + ' <span class="caret"></span>');
    console.log("DropDown select " + currentKeyword);
    removeMarkers();
    keywordSelect(currentKeyword);
    map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
}

window.setInterval(function(){
    removeMarkers();
    keywordSelect(currentKeyword);
}, 30000);

setTimeout(function() {
  keywordSelect(null);
}, 2000);