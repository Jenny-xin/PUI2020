var autocomplete;

//Google Maps section 
function initMap() {
  var initialMapCenter =  { lat: 40.440624, lng:  -79.995888};
  var parsedTrip = JSON.parse(localStorage.getItem('trip'));
  if(parsedTrip && parsedTrip["mapcenter"] !== undefined) {
    initialMapCenter = parsedTrip["mapcenter"];
  }
  const map = new google.maps.Map(document.getElementById("map"), {
    center: initialMapCenter,
    zoom: 13,
  });
  const card = document.getElementById("pac-card");
  const input = document.getElementById("pac-input");

  autocomplete = new google.maps.places.Autocomplete(input);

  autocomplete.bindTo("bounds", map);

  autocomplete.setFields(["address_components", "geometry", "icon", "name"]);
  const infowindow = new google.maps.InfoWindow();
  const infowindowContent = document.getElementById("infowindow-content");
  infowindow.setContent(infowindowContent);
  const marker = new google.maps.Marker({
    map,
    anchorPoint: new google.maps.Point(0, -29),
  });

  autocomplete.addListener("place_changed", () => {
    infowindow.close();
    marker.setVisible(false);
    const place = autocomplete.getPlace();

    if (!place.geometry) {
      window.alert("No details available for input: '" + place.name + "'");
      return;
    }
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);
    let address = "";

    if (place.address_components) {
      address = [
        (place.address_components[0] &&
          place.address_components[0].short_name) ||
          "",
        (place.address_components[1] &&
          place.address_components[1].short_name) ||
          "",
        (place.address_components[2] &&
          place.address_components[2].short_name) ||
          "",
      ].join(" ");
    }
  });
}

// add transportation container 
function addTransport() {    
    var parentEl = document.getElementById('transportEl')

    let transportContainer = document.createElement('div');
    transportContainer.classList.add ('container-large', 'transportContainer');
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
    nameInput.classList.add('form-control','text-box', 'tNameInput');
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
    expInput.value = '0';
    expInput.classList.add('form-control','text-box-expense', 'exp', 'tExpInput');
    expContainer.appendChild(expInput);

    //space between transportation expense and delete btn
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
    notesInput.classList.add('form-control','text-box', 'tNotesInput');
    notesInput.rows = 4;
    notesContainer.appendChild(notesInput); 

    return transportContainer;
}

// add housing container 

function addHousing() {
    let parentEl = document.getElementById('housingEl');

    let housingContainer = document.createElement('div');
    housingContainer.classList.add ('container-large','housingContainer');
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
    nameInput.classList.add('form-control','text-box','hNameInput');
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

    let expContainer = document.createElement('div');
    expContainer.classList.add('input-group');
    housingColC.appendChild(expContainer);

    let housingExpSpan = document.createElement('span');
    housingExpSpan.classList.add('input-group-addon','my-auto');
    expContainer.appendChild(housingExpSpan);

    let housingExpSpanText = document.createTextNode('$'); 
    housingExpSpan.appendChild(housingExpSpanText);

    let expInput = document.createElement('input');
    expInput.setAttribute('type','text');
    expInput.value = '0';
    expInput.classList.add('form-control','text-box-expense', 'exp', 'hExpInput');
    expContainer.appendChild(expInput);

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
    addressInput.classList.add('form-control','text-box', 'addressInput');
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
    notesInput.classList.add('form-control','text-box','hNotesInput');
    notesInput.rows = 4;
    notesContainer.appendChild(notesInput);

    return housingContainer 
}

// add food / activities container 
function addFood() {

  //food name
  let foodEl = document.getElementById('foodEl');

  let foodContainer = document.createElement('div');
  foodContainer.classList.add('container-large', 'foodContainer');
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

  let nameInput = document.createElement('input');
  nameInput.setAttribute('type','text');
  nameInput.classList.add('form-control','text-box', 'fNameInput');
  foodLabel.appendChild(nameInput); 

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
    expInput.value = '0';
    expInput.classList.add('form-control','text-box-expense', 'exp', 'fExpInput');
    expContainer.appendChild(expInput);

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

  return foodContainer
}

//Edit budget, location, duration
function saveDetails() {
    var budget = document.getElementById('budgetField').value;
    if (budget =='') {
        budget = 0
    }
    var budgetRemain = document.getElementById('budget-remaining');
    var budgetTotal = document.getElementById('budget-total');
  
  var expense = document.querySelectorAll('.exp');
  var expenseArr = [];
    for (var i=0; i<expense.length; i++){
        expenseArr.push(expense[i].value);
    }
    var expenseTotal = 0;
    for(i=0; i<expenseArr.length; i++){
        expenseTotal = expenseTotal + parseInt(expenseArr[i])
    }

  if (expenseTotal != 0) {
    budgetTotal.innerHTML = '/ $' + budget;
    budget = budget - expenseTotal
    budgetRemain.innerHTML = '$' + budget;
  }

  else {
    budgetRemain.innerHTML = '$' + budget;
    budgetTotal.innerHTML = '/ $' + budget;
  }

  var tripLocation = document.getElementById('pac-input').value;
  if (tripLocation =='') {
    tripLocation = "Where will your trip be?"
    document.getElementById('location').innerHTML = tripLocation;
  } 
  else {
  document.getElementById('location').innerHTML = '<span class="text-black">'+ tripLocation + '</span';
  }

  var tripDuration = document.getElementById('durationField').value;
  if (tripDuration =='') {
    tripDuration ="When or how long will your trip be?"
    document.getElementById('duration').innerHTML = tripDuration;
  }
  else {
  document.getElementById('duration').innerHTML = '<span class="text-black">' + tripDuration + '</span>';
    }
}

// save trip info to localStorage
function saveTrip() {
  var place = autocomplete.getPlace();
  var mapCenter = { 
    'lat': place?place.geometry.location.lat():40.440624,
    'lng': place?place.geometry.location.lng():-79.995888,
    }

    var tripLocation = document.getElementById('pac-input').value;
    var tripDuration = document.getElementById('durationField').value;
    
    var transportArr = []
    var housingArr = []
    var foodArr = []


    var transportObjs = document.querySelectorAll('.transportContainer');
    for (const transportObj of transportObjs) {
        const transport = {
        name: transportObj.querySelector('.tNameInput').value,
        expense: transportObj.querySelector('.tExpInput').value,
        notes: transportObj.querySelector('.tNotesInput').value,
        }
        transportArr.push(transport)
    }

    var housingObjs = document.querySelectorAll('.housingContainer');
    for (const housingObj of housingObjs) {
        const housing = {
        name: housingObj.querySelector('.hNameInput').value,
        address: housingObj.querySelector('.addressInput').value,
        expense: housingObj.querySelector('.hExpInput').value,
        notes: housingObj.querySelector('.hNotesInput').value,
        }
        housingArr.push(housing)
    }

    var foodObjs = document.querySelectorAll('.foodContainer');
    for (const foodObj of foodObjs) {
        const food = {
        name: foodObj.querySelector('.fNameInput').value,
        expense: foodObj.querySelector('.fExpInput').value,
        }
        foodArr.push(food)
    }

    var trip = {
    mapcenter: mapCenter,
    budget: budgetField.value,
    duration: tripDuration,
    location: tripLocation,
    transportation: transportArr,
    housing: housingArr,
    food: foodArr,
}
    var storedTrip = localStorage.setItem('trip', JSON.stringify(trip));
    console.log(trip)
}

//clear localStorage
function resetTrip() {
    localStorage.clear()
    location.reload()
}


//retrieve localStorage if trip is saved
function loadTrip() {
    var parsedTrip = JSON.parse(localStorage.getItem('trip'));
    console.log(parsedTrip);

    if (parsedTrip == undefined) {
      return
    }

    document.getElementById('pac-input').value = parsedTrip["location"];
    document.getElementById('durationField').value = parsedTrip["duration"];
    document.getElementById('budgetField').value = parsedTrip["budget"];

    var transportObjs = parsedTrip["transportation"];
    for (const transportObj of transportObjs) {
        let transportContainer = addTransport()
        console.log(transportObj);
        transportContainer.querySelector('.tNameInput').value = transportObj["name"];
        transportContainer.querySelector('.tExpInput').value = transportObj["expense"];
        transportContainer.querySelector('.tNotesInput').value = transportObj["notes"];
    }

    var housingObjs = parsedTrip["housing"];
    for (const housingObj of housingObjs) {
        let housingContainer = addHousing()
        housingContainer.querySelector('.hNameInput').value = housingObj["name"];
        housingContainer.querySelector('.hExpInput').value = housingObj["expense"];
        housingContainer.querySelector('.addressInput').value = housingObj["address"];
        housingContainer.querySelector('.hNotesInput').value = housingObj["notes"];
    }

    var foodObjs = parsedTrip["food"];
    for (const foodObj of foodObjs) {
        let foodContainer = addFood()
        foodContainer.querySelector('.fNameInput').value = foodObj["name"];
        foodContainer.querySelector('.fExpInput').value = foodObj["expense"];
    }

    saveDetails();
}