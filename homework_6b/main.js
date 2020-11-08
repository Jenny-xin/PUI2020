
var cartArray = [];
var cartCountArray = [];

// class for cinnamon rolls
class Rolls {
  constructor (glaze, quantity) {
    this.glaze = glaze;
    this.quantity = quantity;
  }
}

var newGlaze = '';

// handle click events for all the glaze buttons
function glazeClickHandler () {
  let nodeGlazeButtons = document.querySelectorAll ('input.glaze-button');
  for (let nodeGlazeButton of nodeGlazeButtons) {
    nodeGlazeButton.onclick = function (e) {
      let nodeGlazeButtonsActive = document.querySelectorAll (
        'input.buttonSmallWhiteBorderActive'
      );
      for (let prevActiveButton of nodeGlazeButtonsActive) {
        prevActiveButton.classList.remove ('buttonSmallWhiteBorderActive');
      }

      let clickedInputBtn = e.target;
      clickedInputBtn.classList.add ('buttonSmallWhiteBorderActive');
      newGlaze = clickedInputBtn.value;
    };
  }
}

glazeClickHandler ();

var modalCart = document.getElementById ('modalCart');

// create new Rolls object with new quantity and glaze values
function addToCart () {
  var quantity = document.getElementById('quantity').value;
  var quantityNum = parseInt(quantity)
  if (quantityNum > 0 && newGlaze !='') {
    var rolls = new Rolls(newGlaze, quantityNum)
    cartArray.push(rolls)
    console.log(cartArray)
  
    for (var i=0; i < quantityNum; i++) {
      cartCountArray.push(rolls)
      }

    updateCart()

    localStorage.setItem('cart', JSON.stringify(cartArray));

  // open modal after clicking "Add to Cart" button
    modalCart.style.display = 'block';
  }

  //alert for if a glaze or quantity is not chosen
  else {
      alert('Please choose both a glaze and quantity.');
    }
  }


//close modal after clicking x button
function exitModal () {
  var exitModal = document.getElementsByClassName ('closeModal');
  modalCart.style.display = 'none';
}

// update items in cart
function updateCart () {
  var cartCount = document.getElementById ('cartCount');
  if (cartCountArray.length > 0) {
    cartCount.innerHTML = 'Cart (' + cartCountArray.length + ')';
  }

  localStorage.setItem ('count', JSON.stringify (cartCountArray.length));
}

function loadCartCounter () {
  var retrieveCount = localStorage.getItem ('count');
  var parsedCount = JSON.parse (retrieveCount);
  cartCount.innerHTML = 'Cart (' + parsedCount + ')';
}

function loadCart () {
  var orderArray = JSON.parse (localStorage.getItem ('cart'));
  var retrieveCount = localStorage.getItem ('count');
  var parsedCount = JSON.parse (retrieveCount);

  cartCount.innerHTML = 'Cart (' + parsedCount + ')';
  itemCount.innerHTML = 'Cart (' + parsedCount + ' items)';

  let parentEl = document.getElementById ('cart-items');
  var priceArray = [];

  // display popup if there are no items in the cart
  if (orderArray.length == 0) {
    modalNoItems.style.display = 'block';
  }

  for (var i = 0; i < orderArray.length; i++) {

  	// create html elements needed for cart item
    let itemContainer = document.createElement ('div');
    itemContainer.className = 'item';
    itemContainer.id = i;
    itemContainer.value = i;
    parentEl.appendChild (itemContainer);

    let divImg = document.createElement ('div');
    itemContainer.appendChild (divImg);

    let img = document.createElement ('img');
    img.src = 'Assets/Original-product.png';
    img.classList.add ('item-img');
    divImg.appendChild (img);

    let itemFlexContainer = document.createElement ('div');
    itemFlexContainer.className = 'item-box-flex-items';
    itemContainer.appendChild (itemFlexContainer);
    itemContainer.value = i;

    let detailsContainer = document.createElement ('div');
    itemFlexContainer.appendChild (detailsContainer);

    let itemName = document.createElement ('p');
    itemName.innerHTML = 'Original Roll';
    itemName.classList.add ('text-body2');
    detailsContainer.appendChild (itemName);

    let itemGlaze = document.createElement ('p');
    itemGlaze.innerHTML = orderArray[i].glaze;
    itemGlaze.classList.add ('text-body3');
    detailsContainer.appendChild (itemGlaze);

    let itemQuant = document.createElement ('p');
    itemQuant.innerHTML = 'Qty: ' + orderArray[i].quantity;
    itemQuant.classList.add ('text-body3', 'vertical-align');
    detailsContainer.appendChild (itemQuant);

    let priceContainer = document.createElement ('div');
    priceContainer.className = 'item-box-price';
    itemFlexContainer.appendChild (priceContainer);

    let totalPrice = document.createElement ('int');
    totalPrice.classList.add ('text-body2', 'total-price');
    price = orderArray[i].quantity * 2;
    priceArray.push (price);
    totalPrice.innerHTML = '$' + price + ' total';
    priceContainer.appendChild (totalPrice);

    let unitPrice = document.createElement ('p');
    unitPrice.classList.add ('text-body3');
    unitPrice.innerHTML = '$2.00 each';
    priceContainer.appendChild (unitPrice);

    let deleteBtn = document.createElement ('button');
    deleteBtn.innerHTML = 'Delete this Item';
    deleteBtn.classList.add ('deleteBtn');
    deleteBtn.value = i;
    priceContainer.appendChild (deleteBtn);
    let num = i;


    deleteBtn.onclick = function (e) {
      deleteItem (num);
      document.querySelectorAll ('.item').forEach (function (a) {
        a.remove ();
      });
      loadCart ();
    };

    //set order summary prices
    var orderSubtotal = document.getElementById ('subtotal');
    var sum = 0;
    for (var n = 0; n < priceArray.length; n++) {
      sum += priceArray[n];
    }
    orderSubtotal.innerHTML = '$' + Math.round (sum * 100.00) / 100.00;

    var orderTax = sum * 0.06;
    document.getElementById ('tax').innerHTML =
      '$' + Math.round (orderTax * 100.00) / 100.00;

    var orderTotal = Math.round ((orderTax + sum + 2.99) * 100.00) / 100.00;
    document.getElementById ('total').innerHTML = '$' + orderTotal;
  }


// delete item from cart
  function deleteItem (i) {
    itemContainer = document.getElementById (i);
    console.log ('Prinitng Iem');
    console.log (itemContainer);

    let remove = orderArray.splice (itemContainer.value, 1);
    console.log ('after ', remove);
    console.log ('after ', orderArray);

    if (orderArray.length == 0) {
      modalNoItems.style.display = 'block';
      parsedCount = 0;
      cartCount.innerHTML = 'Cart';
      itemCount.innerHTML = 'No Items in Cart';
    } else {
      console.log ('count:', parsedCount);
      parsedCount = parsedCount - remove[0].quantity;
      cartCount.innerHTML = 'Cart (' + parsedCount + ')';
      itemCount.innerHTML = 'Cart (' + parsedCount + ' items)';
    }
    
    localStorage.setItem ('cart', JSON.stringify (orderArray));
    localStorage.setItem ('count', JSON.stringify (parsedCount));
  }
}
