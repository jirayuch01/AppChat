var geocoder;
var map;
function initialize() {
    var geocoder = new google.maps.Geocoder();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
    }
    function successFunction(position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        codeLatLng(lat, lng)
    }
    function errorFunction() {
        console.log("Geocoder failed");
    }
    function initialize() {
        geocoder = new google.maps.Geocoder();
    }
    function codeLatLng(lat, lng) {
        var latlng = new google.maps.LatLng(lat, lng);
        geocoder.geocode({ 'latLng': latlng }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                console.log("[1] " + results)
                if (results[1]) {
                    var mapOptions = {
                        center: new google.maps.LatLng(-34.397, 100.644),
                        zoom: 15,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    };
                    map = new google.maps.Map(document.getElementById("map_canvas"),
                        mapOptions);
                    geocoder = new google.maps.Geocoder();
                    console.log("[2] " + results[0].formatted_address)
                    geocoder.geocode({ 'address': results[0].formatted_address }, function (results, status) {
                        if (status == google.maps.GeocoderStatus.OK) {
                            map.setCenter(results[0].geometry.location);
                            var marker = new google.maps.Marker({
                                map: map,
                                position: results[0].geometry.location
                            });
                        }
                    });
                    for (var i = 0; i < results[0].address_components.length; i++) {
                        for (var b = 0; b < results[0].address_components[i].types.length; b++) {
                            if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
                                city = results[0].address_components[i];
                                break;
                            }
                        }
                    }
                    console.log("[3] " + city.short_name + " " + city.long_name)
                } else {
                    console.log("No results found");
                }
            } else {
                console.log("Geocoder failed due to: " + status);
            }
        });
    }
}