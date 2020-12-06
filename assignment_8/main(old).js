//Google Maps section //
function initMap() {
  var LatLng = {lat:40.730610, lng: -73.935242}
  var mapProp = {
    center: LatLng,
    zoom: 2
  }
  var map = new google.maps.Map(document.getElementById('googleMap'), mapProp);

  var input = document.getElementById('locationField');
  // var options = {
  //   types: ['cities'],
  // }

  var marker = new google.maps.Marker({
  position: LatLng,
  map: map, 
  draggable: true, 
  });

  var autocomplete = new google.maps.places.Autocomplete(input);
  console.log(autocomplete)
  autocomplete.bindTo('bounds', map);
  autocomplete.setFields(['name', 'geometry']);

  var infowindow = new google.maps.InfoWindow();
  var infowindowContent = document.getElementById('infowindow-content');
  infowindow.setContent(infowindowContent);

  google.maps.event.addListener(autocomplete, 'place_changed',function() {
    var place = autocomplete.getPlace();
    if (!place.geometry) {
       window.alert('No details available for:' + place.name);
       return;
    if(place.geometry.viewport){
      map.fitBounds(place.geometry.viewport);
    }
    else {
      maps.setCenter(place.geometry.input);
      mapsetZoom(17);
    }

    marker.setPlace( ({
      placeId: place.place_id,
      location: place.geometry.input
    }))
    }
  })

  google.maps.event.addDomListener(window, 'load', initMap);
}

//Edit budget, location, duration//
function saveDetails() {
  var budgetRemain = document.getElementById('budget-remaining');
  var budgetTotal = document.getElementById('budget-total');

  var budgetTotalValue = document.getElementById('budgetField').value;

  budgetRemain.innerHTML = '$' + budgetTotalValue;
  budgetTotal.innerHTML = '/ $' + budgetTotalValue;

  var tripLocation = document.getElementById('infowindow-content').value;
  document.getElementById('location').innerHTML = '<span class="text-black">'+ tripLocation + '</span';

  var tripDuration = document.getElementById('durationField').value;
  document.getElementById('duration').innerHTML = '<span class="text-black">' + tripDuration + '</span>';
}


function addTransportation () {
  var selectedTransport = document.getElementsByName('transportRadio');
  var parentEl = document.getElementById('transportEl')

  if (selectedTransport[0].checked){

    //white container for flight transportation
    let flightContainer = document.createElement('div');
    flightContainer.classList.add ('container-large');
    parentEl.appendChild(flightContainer);

    //departure + flight expense
    let flightRowA = document.createElement('div');
    flightRowA.classList.add('row');
    flightContainer.appendChild(flightRowA);

    //departure airport
    let departureColA = document.createElement('div');
    departureColA.classList.add('col-3');
    flightRowA.appendChild(departureColA);

    let departureLabel = document.createElement('label');
    departureColA.appendChild(departureLabel);
    departureLabel.classList.add('text-sm-b');
    departureLabel.htmlFor = 'departure-airport';

    let departureLabelText = document.createTextNode('Departure Airport');
    departureLabel.appendChild(departureLabelText);

    let departureContainer = document.createElement('div');
    departureContainer.classList.add('input-group');
    departureColA.appendChild(departureContainer);

    let departureInput = document.createElement('input');
    departureInput.setAttribute('type','text');
    departureInput.classList.add('form-control','text-box');
    departureContainer.appendChild(departureInput);

    //departure time
    let departureColB = document.createElement('div');
    departureColB.classList.add('col-3');
    flightRowA.appendChild(departureColB);

    let dTimeLabel = document.createElement('label');
    departureColB.appendChild(dTimeLabel);
    dTimeLabel.classList.add('text-sm-b');
    dTimeLabel.htmlFor = 'departure-time';

    let dTimeLabelText = document.createTextNode('Departure Time');
    dTimeLabel.appendChild(dTimeLabelText);

    let dTimeContainer = document.createElement('div');
    dTimeContainer.classList.add('input-group');
    departureColB.appendChild(dTimeContainer);

    let dTimeInput = document.createElement('input');
    dTimeInput.setAttribute('type','text');
    dTimeInput.classList.add('form-control','text-box');
    dTimeContainer.appendChild(dTimeInput);

    //space between departure and expense
    let departureColC = document.createElement('div');
    departureColC.classList.add('col-1');
    flightRowA.appendChild(departureColC);

    //flight expense
    let departureColD = document.createElement('div');
    departureColD.classList.add('col-3');
    flightRowA.appendChild(departureColD);

    let flightExpenseLabel = document.createElement('label');
    flightExpenseLabel.classList.add('text-sm-b');
    flightExpenseLabel.htmlFor = 'flight-expense';
    departureColD.appendChild(flightExpenseLabel);

    let flightExpenseLabelText = document.createTextNode('Flight Expense');
    flightExpenseLabel.appendChild(flightExpenseLabelText);

    let flightExpenseContainer = document.createElement('div');
    flightExpenseContainer.classList.add('input-group');
    departureColD.appendChild(flightExpenseContainer);

    let flightExpenseSpan = document.createElement('span');
    flightExpenseSpan.classList.add('input-group-addon','my-auto');
    flightExpenseContainer.appendChild(flightExpenseSpan);

    let flightExpenseSpanText = document.createTextNode('$'); 
    flightExpenseSpan.appendChild(flightExpenseSpanText);

    let flightExpenseInput = document.createElement('input');
    flightExpenseInput.setAttribute('type','text');
    flightExpenseInput.placeholder = '0.00';
    flightExpenseInput.classList.add('form-control','text-box-expense');
    flightExpenseContainer.appendChild(flightExpenseInput)

    //space between flight expense and delete btn
    let flightColF = document.createElement('div');
    flightColF.classList.add('col-1');
    flightRowA.appendChild(flightColF);

    //delete btn
    let flightColE = document.createElement('div');
    flightColE.classList.add('col-1');
    flightRowA.appendChild(flightColE);

    let flightCloseContainer = document.createElement('div');
    flightCloseContainer.classList.add('text-right');
    flightColE.appendChild(flightCloseContainer);

    let flightCloseBtn = document.createElement('button');
    flightCloseBtn.classList.add('close','deleteBtn');
    flightCloseBtn.type = 'button';
    flightCloseContainer.appendChild(flightCloseBtn);

    flightCloseBtn.onclick = function(e) {
    flightContainer.remove()
    }

    let flightCloseBtnImg = document.createElement('img');
    flightCloseBtnImg.setAttribute('src', 'Assets/DeleteBtn.svg')
    flightCloseBtnImg.classList.add('btn-delete')
    flightCloseBtn.appendChild(flightCloseBtnImg);

    //arrival airport
    let arrivalRow = document.createElement('div');
    arrivalRow.classList.add('row');
    flightContainer.appendChild(arrivalRow);

    let arrivalColA = document.createElement('div');
    arrivalColA.classList.add('col-3');
    arrivalRow.appendChild(arrivalColA);

    let arrivalLabel = document.createElement('label');
    arrivalLabel.htmlFor = 'arrival-airport';
    arrivalLabel.classList.add('text-sm-b');
    arrivalColA.appendChild(arrivalLabel);

    let arrivalLabelText = document.createTextNode('Arrival Airport');
    arrivalLabel.appendChild(arrivalLabelText);

    let arrivalContainer = document.createElement('div');
    arrivalContainer.classList.add('input-group');
    arrivalColA.appendChild(arrivalContainer);

    let arrivalInput = document.createElement('input');
    arrivalInput.setAttribute('type','text');
    arrivalInput.classList.add('form-control','text-box');
    arrivalContainer.appendChild(arrivalInput); 

    // arrival time
    let arrivalColB = document.createElement('div');
    arrivalColB.classList.add('col-3');
    arrivalRow.appendChild(arrivalColB);

    let aTimeLabel = document.createElement('label');
    aTimeLabel.htmlFor = 'arrival-time';
    aTimeLabel.classList.add('text-sm-b');
    arrivalColB.appendChild(aTimeLabel);

    let aTimeLabelText = document.createTextNode('Arrival Time');
    aTimeLabel.appendChild(aTimeLabelText);

    let aTimeContainer = document.createElement('div');
    aTimeContainer.classList.add('input-group');
    arrivalColB.appendChild(aTimeContainer);

    let aTimeInput = document.createElement('input');
    aTimeInput.setAttribute('type','text');
    aTimeInput.classList.add('form-control','text-box');
    aTimeContainer.appendChild(aTimeInput); 

    // space between departure/arrival and notes
    let arrivalColC = document.createElement('div');
    arrivalColC.classList.add('col-1');
    arrivalRow.appendChild(arrivalColC);

    //notes container
    let arrivalColD = document.createElement('div');
    arrivalColD .classList.add('col');
    arrivalRow.appendChild(arrivalColD );

    let notesLabel = document.createElement('label');
    notesLabel.htmlFor = 'notes';
    notesLabel.classList.add('text-sm-b');
    arrivalColD.appendChild(notesLabel);

    let notesLabelText = document.createTextNode('Notes');
    notesLabel.appendChild(notesLabelText);

    let notesContainer = document.createElement('div');
    notesContainer.classList.add('input-group');
    arrivalColD .appendChild(notesContainer);

    let notesInput = document.createElement('textarea');
    notesInput.classList.add('form-control','text-box');
    notesInput.rows = 4;
    notesContainer.appendChild(notesInput); 
  } 
  
  if (selectedTransport[1].checked) {

    //white container for rental transportation
    let rentalContainer = document.createElement('div');
    rentalContainer.classList.add ('container-large');
    parentEl.appendChild(rentalContainer);

    //rental service
    let rentalRowA = document.createElement('div');
    rentalRowA.classList.add('row');
    rentalContainer.appendChild(rentalRowA);

    let rentalColA = document.createElement('div');
    rentalColA.classList.add('col-6');
    rentalRowA.appendChild(rentalColA);

    let rentalLabelA = document.createElement('label');
    rentalColA.appendChild(rentalLabelA);
    rentalLabelA.classList.add('text-sm-b');
    rentalLabelA.htmlFor = 'rental-service';

    let rentalLabelTextA = document.createTextNode('Rental Service');
    rentalLabelA.appendChild(rentalLabelTextA);

    let rentalServiceContainer = document.createElement('div');
    rentalServiceContainer.classList.add('input-group');
    rentalColA.appendChild(rentalServiceContainer);

    let rentalServiceInput = document.createElement('input');
    rentalServiceInput.setAttribute('type','text');
    rentalServiceInput.classList.add('form-control','text-box');
    rentalServiceContainer.appendChild(rentalServiceInput);

    //space between rental service and expense
    let rentalColB = document.createElement('div');
    rentalColB.classList.add('col-1');
    rentalRowA.appendChild(rentalColB);

    //rental expense
    let rentalColC = document.createElement('div');
    rentalColC.classList.add('col-3');
    rentalRowA.appendChild(rentalColC);

    let rentalLabelB = document.createElement('label');
    rentalLabelB.htmlFor = 'rental-expense';
    rentalColC.appendChild(rentalLabelB);

    let rentalLabelTextB = document.createTextNode('Rental Expense');
    rentalLabelB.classList.add('text-sm-b');
    rentalLabelB.appendChild(rentalLabelTextB);

    let rentalExpenseContainer = document.createElement('div');
    rentalExpenseContainer.classList.add('input-group');
    rentalColC.appendChild(rentalExpenseContainer);

    let rentalExpenseSpan = document.createElement('span');
    rentalExpenseSpan.classList.add('input-group-addon','my-auto');
    rentalExpenseContainer.appendChild(rentalExpenseSpan);

    let rentalExpenseSpanText = document.createTextNode('$'); 
    rentalExpenseSpan.appendChild(rentalExpenseSpanText);

    let rentalExpenseInput = document.createElement('input');
    rentalExpenseInput.setAttribute('type','text');
    rentalExpenseInput.placeholder = '0.00';
    rentalExpenseInput.classList.add('form-control','text-box-expense');
    rentalExpenseContainer.appendChild(rentalExpenseInput)

    //space between rental expense and delete btn
    let rentalColD = document.createElement('div');
    rentalColD.classList.add('col-1');
    rentalRowA.appendChild(rentalColD);

    //delete btn
    let rentalColE = document.createElement('div');
    rentalColE.classList.add('col-1');
    rentalRowA.appendChild(rentalColE);

    let rentalCloseContainer = document.createElement('div');
    rentalCloseContainer.classList.add('text-right');
    rentalColE.appendChild(rentalCloseContainer);

    let rentalCloseBtn = document.createElement('button');
    rentalCloseBtn.classList.add('close','deleteBtn');
    rentalCloseBtn.type = 'button';
    rentalCloseContainer.appendChild(rentalCloseBtn);

    rentalCloseBtn.onclick = function(e) {
    rentalContainer.remove()
    }

    let rentalCloseBtnImg = document.createElement('img');
    rentalCloseBtnImg.setAttribute('src', 'Assets/DeleteBtn.svg')
    rentalCloseBtnImg.classList.add('btn-delete')
    rentalCloseBtn.appendChild(rentalCloseBtnImg);

    //pickup location
    let rentalRowB = document.createElement('div');
    rentalRowB.classList.add('row');
    rentalContainer.appendChild(rentalRowB);

    let rentalColAA = document.createElement('div');
    rentalColAA.classList.add('col-6');
    rentalRowB.appendChild(rentalColAA);

    let pickupLabel = document.createElement('label');
    pickupLabel.htmlFor = 'pickup';
    pickupLabel.classList.add('text-sm-b');
    rentalColAA.appendChild(pickupLabel);

    let pickupLabelText = document.createTextNode('Pickup Location');
    pickupLabel.appendChild(pickupLabelText);

    let pickupContainer = document.createElement('div');
    pickupContainer.classList.add('input-group');
    rentalColAA.appendChild(pickupContainer);

    let pickupInput = document.createElement('input');
    pickupInput.setAttribute('type','text');
    pickupInput.classList.add('form-control','text-box');
    pickupContainer.appendChild(pickupInput); 

    //dropoff location 
    let dropoffLabel = document.createElement('label');
    dropoffLabel.htmlFor = 'dropoff';
    dropoffLabel.classList.add('text-sm-b');
    rentalColAA.appendChild(dropoffLabel);

    let dropoffLabelText = document.createTextNode('Dropoff Location');
    dropoffLabel.appendChild(dropoffLabelText);

    let dropoffContainer = document.createElement('div');
    dropoffContainer.classList.add('input-group');
    rentalColAA.appendChild(dropoffContainer);

    let dropoffInput = document.createElement('input');
    dropoffInput.setAttribute('type','text');
    dropoffInput.classList.add('form-control','text-box');
    dropoffContainer.appendChild(dropoffInput); 

    // space between pickup & dropoff and notes
    let rentalColBB = document.createElement('div');
    rentalColBB.classList.add('col-1');
    rentalRowB.appendChild(rentalColBB);

    //notes container
    let rentalColCC = document.createElement('div');
    rentalColCC.classList.add('col');
    rentalRowB.appendChild(rentalColCC);

    let notesLabel = document.createElement('label');
    notesLabel.htmlFor = 'notes';
    notesLabel.classList.add('text-sm-b');
    rentalColCC.appendChild(notesLabel);

    let notesLabelText = document.createTextNode('Notes');
    notesLabel.appendChild(notesLabelText);

    let notesContainer = document.createElement('div');
    notesContainer.classList.add('input-group');
    rentalColCC.appendChild(notesContainer);

    let notesInput = document.createElement('textarea');
    notesInput.classList.add('form-control','text-box');
    notesInput.rows = 4;
    notesContainer.appendChild(notesInput); 
  }

  if (selectedTransport[2].checked){

    //white container for bus/traintransportation
    let busContainer = document.createElement('div');
    busContainer.classList.add ('container-large');
    parentEl.appendChild(busContainer);

    //departing station
    let busRowA = document.createElement('div');
    busRowA.classList.add('row');
    busContainer.appendChild(busRowA);

    let departColA = document.createElement('div');
    departColA.classList.add('col-3');
    busRowA.appendChild(departColA);

    let departLabel = document.createElement('label');
    departColA.appendChild(departLabel);
    departLabel.classList.add('text-sm-b');
    departLabel.htmlFor = 'departing-station';

    let departLabelText = document.createTextNode('Departing Station');
    departLabel.appendChild(departLabelText);

    let departContainer = document.createElement('div');
    departContainer.classList.add('input-group');
    departColA.appendChild(departContainer);

    let departInput = document.createElement('input');
    departInput.setAttribute('type','text');
    departInput.classList.add('form-control','text-box');
    departContainer.appendChild(departInput);

    //departure time
    let departColB = document.createElement('div');
    departColB.classList.add('col-3');
    busRowA.appendChild(departColB);

    let dTimeLabel = document.createElement('label');
    departColB.appendChild(dTimeLabel);
    dTimeLabel.classList.add('text-sm-b');
    dTimeLabel.htmlFor = 'departure-time';

    let dTimeLabelText = document.createTextNode('Departure Time');
    dTimeLabel.appendChild(dTimeLabelText);

    let dTimeContainer = document.createElement('div');
    dTimeContainer.classList.add('input-group');
    departColB.appendChild(dTimeContainer);

    let dTimeInput = document.createElement('input');
    dTimeInput.setAttribute('type','text');
    dTimeInput.classList.add('form-control','text-box');
    dTimeContainer.appendChild(dTimeInput);

    //space between departure and expense
    let departColC = document.createElement('div');
    departColC.classList.add('col-1');
    busRowA.appendChild(departColC);

    //bus or train expense
    let departColD = document.createElement('div');
    departColD.classList.add('col-3');
    busRowA.appendChild(departColD);

    let busExpenseLabel = document.createElement('label');
    busExpenseLabel.classList.add('text-sm-b');
    busExpenseLabel.htmlFor = 'bus-expense';
    departColD.appendChild(busExpenseLabel);

    let busExpenseLabelText = document.createTextNode('Bus/Train Expense');
    busExpenseLabel.appendChild(busExpenseLabelText);

    let busExpenseContainer = document.createElement('div');
    busExpenseContainer.classList.add('input-group');
    departColD.appendChild(busExpenseContainer);

    let busExpenseSpan = document.createElement('span');
    busExpenseSpan.classList.add('input-group-addon','my-auto');
    busExpenseContainer.appendChild(busExpenseSpan);

    let busExpenseSpanText = document.createTextNode('$'); 
    busExpenseSpan.appendChild(busExpenseSpanText);

    let busExpenseInput = document.createElement('input');
    busExpenseInput.setAttribute('type','text');
    busExpenseInput.placeholder = '0.00';
    busExpenseInput.classList.add('form-control','text-box-expense');
    busExpenseContainer.appendChild(busExpenseInput)

    //space between bus expense and delete btn
    let busColF = document.createElement('div');
    busColF.classList.add('col-1');
    busRowA.appendChild(busColF);

    //delete btn
    let busColE = document.createElement('div');
    busColE.classList.add('col-1');
    busRowA.appendChild(busColE);

    let busCloseContainer = document.createElement('div');
    busCloseContainer.classList.add('text-right');
    busColE.appendChild(busCloseContainer);

    let busCloseBtn = document.createElement('button');
    busCloseBtn.classList.add('close','deleteBtn');
    busCloseBtn.type = 'button';
    busCloseContainer.appendChild(busCloseBtn);

    busCloseBtn.onclick = function(e) {
    busContainer.remove()
    }

    let busCloseBtnImg = document.createElement('img');
    busCloseBtnImg.setAttribute('src', 'Assets/DeleteBtn.svg')
    busCloseBtnImg.classList.add('btn-delete')
    busCloseBtn.appendChild(busCloseBtnImg);

    //arrival station
    let arrivalRow = document.createElement('div');
    arrivalRow.classList.add('row');
    busContainer.appendChild(arrivalRow);

    let arrivalColA = document.createElement('div');
    arrivalColA.classList.add('col-3');
    arrivalRow.appendChild(arrivalColA);

    let arrivalLabel = document.createElement('label');
    arrivalLabel.htmlFor = 'arrival-station';
    arrivalLabel.classList.add('text-sm-b');
    arrivalColA.appendChild(arrivalLabel);

    let arrivalLabelText = document.createTextNode('Arrival Station');
    arrivalLabel.appendChild(arrivalLabelText);

    let arrivalContainer = document.createElement('div');
    arrivalContainer.classList.add('input-group');
    arrivalColA.appendChild(arrivalContainer);

    let arrivalInput = document.createElement('input');
    arrivalInput.setAttribute('type','text');
    arrivalInput.classList.add('form-control','text-box');
    arrivalContainer.appendChild(arrivalInput); 

    // arrival time
    let arrivalColB = document.createElement('div');
    arrivalColB.classList.add('col-3');
    arrivalRow.appendChild(arrivalColB);

    let aTimeLabel = document.createElement('label');
    aTimeLabel.htmlFor = 'arrival-time';
    aTimeLabel.classList.add('text-sm-b');
    arrivalColB.appendChild(aTimeLabel);

    let aTimeLabelText = document.createTextNode('Arrival Time');
    aTimeLabel.appendChild(aTimeLabelText);

    let aTimeContainer = document.createElement('div');
    aTimeContainer.classList.add('input-group');
    arrivalColB.appendChild(aTimeContainer);

    let aTimeInput = document.createElement('input');
    aTimeInput.setAttribute('type','text');
    aTimeInput.classList.add('form-control','text-box');
    aTimeContainer.appendChild(aTimeInput); 

    // space between departure/arrival and notes
    let arrivalColC = document.createElement('div');
    arrivalColC.classList.add('col-1');
    arrivalRow.appendChild(arrivalColC);

    //notes container
    let arrivalColD = document.createElement('div');
    arrivalColD.classList.add('col');
    arrivalRow.appendChild(arrivalColD );

    let notesLabel = document.createElement('label');
    notesLabel.htmlFor = 'notes';
    notesLabel.classList.add('text-sm-b')
    arrivalColD.appendChild(notesLabel);

    let notesLabelText = document.createTextNode('Notes');
    notesLabel.appendChild(notesLabelText);

    let notesContainer = document.createElement('div');
    notesContainer.classList.add('input-group');
    arrivalColD .appendChild(notesContainer);

    let notesInput = document.createElement('textarea');
    notesInput.classList.add('form-control','text-box');
    notesInput.rows = 4;
    notesContainer.appendChild(notesInput); 
  } 
}

function addHousing() {
    let parentEl = document.getElementById('housingEl');

    let housingContainer = document.createElement('div');
    housingContainer.classList.add ('container-large');
    parentEl.appendChild(housingContainer);

    let housingRowA = document.createElement('div');
    housingRowA.classList.add('row');
    housingContainer.appendChild(housingRowA);

    let housingColA = document.createElement('div');
    housingColA.classList.add('col-6');
    housingRowA.appendChild(housingColA);

    let nameLabel = document.createElement('label');
    housingColA.appendChild(nameLabel);
    nameLabel.classList.add('text-sm-b');
    nameLabel.htmlFor = 'housing-name';

    let nameLabelText = document.createTextNode('Hotel / Airbnb Name');
    nameLabel.appendChild(nameLabelText);

    let nameContainer = document.createElement('div');
    nameContainer.classList.add('input-group');
    housingColA.appendChild(nameContainer);

    let nameInput = document.createElement('input');
    nameInput.setAttribute('type','text');
    nameInput.classList.add('form-control','text-box');
    nameContainer.appendChild(nameInput);

    //space between hotel name and expense
    let housingColB = document.createElement('div');
    housingColB.classList.add('col-1');
    housingRowA.appendChild(housingColB);

    //housing expense
    let housingColC = document.createElement('div');
    housingColC.classList.add('col-3');
    housingRowA.appendChild(housingColC);

    let housingExpLabel = document.createElement('label');
    housingExpLabel.htmlFor = 'housing-expense';
    housingColC.appendChild(housingExpLabel);

    let housingExpLabelText = document.createTextNode('Housing Expense');
    housingExpLabel.classList.add('text-sm-b');
    housingExpLabel.appendChild(housingExpLabelText);

    let housingExpContainer = document.createElement('div');
    housingExpContainer.classList.add('input-group');
    housingColC.appendChild(housingExpContainer);

    let housingExpSpan = document.createElement('span');
    housingExpSpan.classList.add('input-group-addon','my-auto');
    housingExpContainer.appendChild(housingExpSpan);

    let housingExpSpanText = document.createTextNode('$'); 
    housingExpSpan.appendChild(housingExpSpanText);

    let housingExpInput = document.createElement('input');
    housingExpInput.setAttribute('type','text');
    housingExpInput.placeholder = '0.00';
    housingExpInput.classList.add('form-control','text-box-expense');
    housingExpContainer.appendChild(housingExpInput)

    //space between housing expense and delete btn
    let housingColD = document.createElement('div');
    housingColD.classList.add('col-1');
    housingRowA.appendChild(housingColD);

    //delete btn
    let housingColE = document.createElement('div');
    housingColE.classList.add('col-1');
    housingRowA.appendChild(housingColE);

    let housingCloseContainer = document.createElement('div');
    housingCloseContainer.classList.add('text-right');
    housingColE.appendChild(housingCloseContainer);

    let housingCloseBtn = document.createElement('button');
    housingCloseBtn.classList.add('close','deleteBtn');
    housingCloseBtn.type = 'button';
    housingCloseContainer.appendChild(housingCloseBtn);

    housingCloseBtn.onclick = function(e) {
    housingContainer.remove()
    }

    let housingCloseBtnImg = document.createElement('img');
    housingCloseBtnImg.setAttribute('src', 'Assets/DeleteBtn.svg')
    housingCloseBtnImg.classList.add('btn-delete')
    housingCloseBtn.appendChild(housingCloseBtnImg);

    //address
    let housingRowB = document.createElement('div');
    housingRowB.classList.add('row');
    housingContainer.appendChild(housingRowB);

    let addressCol = document.createElement('div');
    addressCol.classList.add('col-6');
    housingRowB.appendChild(addressCol);

    let addressLabel = document.createElement('label');
    addressLabel.htmlFor = 'address';
    addressLabel.classList.add('text-sm-b');
    addressCol.appendChild(addressLabel);

    let addressLabelText = document.createTextNode('Address');
    addressLabel.appendChild(addressLabelText);

    let addressContainer = document.createElement('div');
    addressContainer.classList.add('input-group');
    addressCol.appendChild(addressContainer);

    let addressInput = document.createElement('textarea');
    addressInput.classList.add('form-control','text-box');
    addressInput.rows = 4;
    addressContainer.appendChild(addressInput); 

    // space between address and notes
    let spaceCol = document.createElement('div');
    spaceCol.classList.add('col-1');
    housingRowB.appendChild(spaceCol);

    //notes container
    let notesCol = document.createElement('div');
    notesCol.classList.add('col');
    housingRowB.appendChild(notesCol);

    let notesLabel = document.createElement('label');
    notesLabel.htmlFor = 'notes';
    notesLabel.classList.add('text-sm-b');
    notesCol.appendChild(notesLabel);

    let notesLabelText = document.createTextNode('Notes');
    notesLabel.appendChild(notesLabelText);

    let notesContainer = document.createElement('div');
    notesContainer.classList.add('input-group');
    notesCol.appendChild(notesContainer);

    let notesInput = document.createElement('textarea');
    notesInput.classList.add('form-control','text-box');
    notesInput.rows = 4;
    notesContainer.appendChild(notesInput); 
}

function addFood() {

  //food name
  let foodEl = document.getElementById('foodEl');

  let foodContainer = document.createElement('div');
  foodContainer.classList.add('container-large');
  foodEl.appendChild(foodContainer);

  let foodRow = document.createElement('div');
  foodRow.classList.add('row');
  foodContainer.appendChild(foodRow);

  let nameCol = document.createElement('div');
  nameCol.classList.add('col-6');
  foodRow.appendChild(nameCol);

  let foodLabel = document.createElement('div');
  foodLabel.classList.add('text-sm-b');
  nameCol.appendChild(foodLabel);

  let foodLabelText = document.createTextNode('Name');
  foodLabel.appendChild(foodLabelText);

  let foodInput = document.createElement('input');
  foodInput.setAttribute('type','text');
  foodInput.classList.add('form-control','text-box');
  foodLabel.appendChild(foodInput); 

  //space between input name and expense

  let spaceContainer = document.createElement('div');
  spaceContainer.classList.add('col-1');
  foodRow.appendChild(spaceContainer)

  //expense
  let expCol = document.createElement('div');
  expCol.classList.add('col-3');
  foodRow.appendChild(expCol);

  let expLabel = document.createElement('div');
  expLabel.classList.add('text-sm-b');
  expCol.appendChild(expLabel);

  let expLabelText = document.createTextNode('Expense');
  expLabel.appendChild(expLabelText);  

  let expContainer = document.createElement('div');
  expContainer.classList.add('input-group');
  expCol.appendChild(expContainer);

  let expSpan = document.createElement('span');
  expSpan.classList.add('input-group-addon','my-auto');
  expContainer.appendChild(expSpan);

  let expSpanText = document.createTextNode('$'); 
  expSpan.appendChild(expSpanText);

  let expInput = document.createElement('input');
  expInput.setAttribute('type','text');
  expInput.placeholder = '0.00';
  expInput.classList.add('form-control','text-box-expense');
  expContainer.appendChild(expInput)

  //delete btn
  let deleteCol = document.createElement('div');
  deleteCol.classList.add('col-2');
  foodRow.appendChild(deleteCol);

  let closeContainer = document.createElement('div');
  deleteCol.appendChild(closeContainer);

  let closeBtn = document.createElement('button');
  closeBtn.classList.add('close','deleteBtn');
  closeBtn.type = 'button';
  closeContainer.appendChild(closeBtn);

  let closeBtnImg = document.createElement('img');
  closeBtnImg.setAttribute('src', 'Assets/DeleteBtn.svg')
  closeBtnImg.classList.add('btn-delete')
  closeBtn.appendChild(closeBtnImg);

  closeBtn.onclick = function(e) {
  foodContainer.remove();
  }
}