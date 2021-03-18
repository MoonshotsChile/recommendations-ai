var geocoder = null;
var map = null;
var customerMarker = null;
var gmarkers = [];
var closest = [];

export function initLocations(locations, center) {
  // alert("init");
  geocoder = new google.maps.Geocoder();
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 9,
    center: new google.maps.LatLng(center),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });
  var infowindow = new google.maps.InfoWindow();
  var marker, i;
  var bounds = new google.maps.LatLngBounds();
  document.getElementById('info').innerHTML = "found " + locations.length + " locations<br>";
  for (i = 0; i < locations.length; i++) {
    var coordStr = locations[i][4];
    var coords = coordStr.split(",");
    var pt = new google.maps.LatLng(parseFloat(coords[0]), parseFloat(coords[1]));
    bounds.extend(pt);
    marker = new google.maps.Marker({
      position: pt,
      map: map,
      icon: locations[i][5],
      address: locations[i][2],
      title: locations[i][0],
      html: locations[i][0] + "<br>" + locations[i][2]
    });
    gmarkers.push(marker);
    google.maps.event.addListener(marker, 'click', (function (marker, i) {
        return function () {
          infowindow.setContent(marker.html);
          infowindow.open(map, marker);
        }
      })(marker, i)
    );
  }
  map.fitBounds(bounds);

}

export function codeAddress() {
  var numberOfResults = 25;
  var numberOfDrivingResults = 5;
  var address = document.getElementById('address').value;
  geocoder.geocode({
    'address': address
  }, function (results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      if (customerMarker) customerMarker.setMap(null);
      customerMarker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location
      });
      closest = findClosestN(results[0].geometry.location, numberOfResults);
      // get driving distance
      closest = closest.splice(0, numberOfResults);
      calculateDistances(results[0].geometry.location, closest, numberOfDrivingResults);
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

export function findClosestN(pt, numberOfResults) {
  var closest = [];
  document.getElementById('info').innerHTML += "processing " + gmarkers.length + "<br>";
  for (var i = 0; i < gmarkers.length; i++) {
    gmarkers[i].distance = google.maps.geometry.spherical.computeDistanceBetween(pt, gmarkers[i].getPosition());
    document.getElementById('info').innerHTML += "process " + i + ":" + gmarkers[i].getPosition().toUrlValue(6) + ":" + gmarkers[i].distance.toFixed(2) + "<br>";
    gmarkers[i].setMap(null);
    closest.push(gmarkers[i]);
  }
  closest.sort(sortByDist);
  return closest;
}

export function sortByDist(a, b) {
  return (a.distance - b.distance)
}

export function calculateDistances(pt, closest, numberOfResults) {
  var service = new google.maps.DistanceMatrixService();
  var request = {
    origins: [pt],
    destinations: [],
    travelMode: google.maps.TravelMode.DRIVING,
    unitSystem: google.maps.UnitSystem.METRIC,
    avoidHighways: false,
    avoidTolls: false
  };
  for (var i = 0; i < closest.length; i++) {
    request.destinations.push(closest[i].getPosition());
  }
  service.getDistanceMatrix(request, function (response, status) {
    if (status != google.maps.DistanceMatrixStatus.OK) {
      alert('Error was: ' + status);
    } else {
      var origins = response.originAddresses;
      var destinations = response.destinationAddresses;
      var outputDiv = document.getElementById('side_bar');
      outputDiv.innerHTML = '';

      var results = response.rows[0].elements;
      // save title and address in record for sorting
      for (var i = 0; i < closest.length; i++) {
        results[i].title = closest[i].title;
        results[i].address = closest[i].address;
        results[i].idx_closestMark = i;
      }
      results.sort(sortByDistDM);
      for (var j = 0;
           ((j < numberOfResults) && (j < closest.length)); j++) {
        closest[j].setMap(map);
        outputDiv.innerHTML += "<a href='javascript:google.maps.event.trigger(closest[" + results[j].idx_closestMark + "],\"click\");'>" + results[j].title + '</a><br>' + results[j].address + "<br>" + results[j].distance.text + ' appoximately ' + results[j].duration.text + '<br><hr>';
      }
    }
  });
}

export function sortByDistDM(a, b) {
  return (a.distance.value - b.distance.value)
}


