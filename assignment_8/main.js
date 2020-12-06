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


function addTransport() {
    var parentEl = document.getElementById('transportEl')

    let transportContainer = document.createElement('div');
    transportContainer.classList.add ('container-large');
    parentEl.appendChild(transportContainer);

    let transportRow = document.createElement('div');
    transportRow.classList.add('row');
    transportContainer.appendChild(transportRow);

    let serviceCol = document.createElement('div');
    serviceCol.classList.add('col-6');
    transportRow.appendChild(serviceCol);

    let nameLabel = document.createElement('label');
    serviceCol.appendChild(nameLabel);
    nameLabel.classList.add('text-sm-b');
    nameLabel.htmlFor = 'transport-name';

    let nameLabelText = document.createTextNode('Transportation Service');
    nameLabel.appendChild(nameLabelText);

    let nameContainer = document.createElement('div');
    nameContainer.classList.add('input-group');
    serviceCol.appendChild(nameContainer);

    let nameInput = document.createElement('input');
    nameInput.setAttribute('type','text');
    nameInput.classList.add('form-control','text-box');
    nameContainer.appendChild(nameInput);

    //space between service and expense
    let spaceCol = document.createElement('div');
    spaceCol.classList.add('col-1');
    transportRow.appendChild(spaceCol);

    //transportation expense
    let expCol = document.createElement('div');
    expCol.classList.add('col-3');
    transportRow.appendChild(expCol);

    let expLabel = document.createElement('label');
    expLabel.htmlFor = 'transport-expense';
    expCol.appendChild(expLabel);

    let expLabelText = document.createTextNode('Transportation Expense');
    expLabel.classList.add('text-sm-b');
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

    //space between housing expense and delete btn
    let spaceCol2 = document.createElement('div');
    spaceCol2.classList.add('col-1');
    transportRow.appendChild(spaceCol2);

    //delete btn
    let deleteCol = document.createElement('div');
    deleteCol.classList.add('col-1');
    transportRow.appendChild(deleteCol);

    let closeContainer = document.createElement('div');
    closeContainer.classList.add('text-right');
    deleteCol.appendChild(closeContainer);

    let closeBtn = document.createElement('button');
    closeBtn.classList.add('close','deleteBtn');
    closeBtn.type = 'button';
    closeContainer.appendChild(closeBtn);

    closeBtn.onclick = function(e) {
    transportContainer.remove()
    }

    let closeBtnImg = document.createElement('img');
    closeBtnImg.setAttribute('src', 'Assets/DeleteBtn.svg')
    closeBtnImg.classList.add('btn-delete')
    closeBtn.appendChild(closeBtnImg);

    //notes
    let notesRow = document.createElement('div');
    notesRow.classList.add('row');
    transportContainer.appendChild(notesRow);

    let notesCol = document.createElement('div');
    notesCol.classList.add('col-6');
    notesRow.appendChild(notesCol);

    let notesLabel = document.createElement('label');
    notesLabel.htmlFor = 'address';
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