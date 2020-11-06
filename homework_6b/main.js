
var cartArray = []
var cartCountArray = []

// class for cinnamon rolls
class Rolls {
	constructor(glaze, quantity) {
		this.glaze = glaze
		this.quantity = quantity
	}
	
}

var newGlaze = ''

// handle click events for all the glaze buttons
function glazeClickHandler() {
	let nodeGlazeButtons = document.querySelectorAll("input.glaze-button")
	for (let nodeGlazeButton of nodeGlazeButtons) {
		nodeGlazeButton.onclick = function(e) {
			let nodeGlazeButtonsActive = document.querySelectorAll("input.buttonSmallWhiteBorderActive")
			for (let prevActiveButton of nodeGlazeButtonsActive) {
				prevActiveButton.classList.remove("buttonSmallWhiteBorderActive");
			}

			let clickedInputBtn = e.target
			clickedInputBtn.classList.add("buttonSmallWhiteBorderActive");
			newGlaze = clickedInputBtn.value;
		}
	}
}
	
glazeClickHandler()


var modalCart = document.getElementById('modalCart');

// create new Rolls object with new quantity and glaze values
function addToCart() {
	var quantity = document.getElementById('quantity').value;
	var quantityNum = parseInt(quantity)
	var rolls = new Rolls(newGlaze, quantityNum)
	cartArray.push(rolls)
	console.log(cartArray)
	
	for (var i=0; i < quantityNum; i++) {
		cartCountArray.push(rolls)
		}

	updateCart(cartCountArray.length)

	localStorage.setItem('cart', JSON.stringify(cartArray));

	// open modal after clicking "Add to Cart" button
	modalCart.style.display = 'block';
}

//close modal after clicking x button
function exitModal() {
	var exitModal = document.getElementsByClassName('closeModal');
	modalCart.style.display = 'none';
}

// update items in cart
function updateCart() {
	var cartCount = document.getElementById('cartCount');
	if (cartCountArray.length > 0) {
	cartCount.innerHTML = 'Cart (' + cartCountArray.length + ')'
	}

	localStorage.setItem('count', JSON.stringify(cartCountArray.length));
}



function loadCart() {
	let parentEl = document.getElementById('cart-items');

	var orderArray = JSON.parse(localStorage.getItem('cart'));

	var retrieveCount = localStorage.getItem('count');
	var parsedCount =  JSON.parse(retrieveCount);

	cartCount.innerHTML = 'Cart (' + parsedCount + ')';
	itemCount.innerHTML = 'Cart (' + parsedCount + ' items)';



// create cart item 
	for (var i=0; i < orderArray.length; i++) {

		let itemContainer = document.createElement('div');
		itemContainer.className = 'item';
		parentEl.appendChild(itemContainer);

		let divImg = document.createElement('div');
		itemContainer.appendChild(divImg);

		let img = document.createElement('img');
		img.src = 'Assets/Original-product.png';
		img.classList.add('item-img');
		divImg.appendChild(img);

		let itemFlexContainer = document.createElement('div');
		itemFlexContainer.className = 'item-box-flex-items';
		itemContainer.appendChild(itemFlexContainer);

		let detailsContainer = document.createElement('div');
		itemFlexContainer.appendChild(detailsContainer);

		let itemName = document.createElement('p');
		itemName.innerHTML = 'Original Roll';
		itemName.classList.add('text-body2');
		detailsContainer.appendChild(itemName);

		let itemGlaze = document.createElement('p');
		itemGlaze.innerHTML = orderArray[i].glaze;
		itemGlaze.classList.add('text-body3')
		detailsContainer.appendChild(itemGlaze);


		//dropdown for choosing quantity
		let itemQuant = document.createElement('select');
		itemQuant.classList.add('item-dropdown');

		let option1 = document.createElement('option');
		option1.value = 1
		option1.text = 'Qty: 1 Roll'
		itemQuant.add(option1);

		let option2 = document.createElement('option');
		option2.value = 3
		option2.text = 'Qty: 3 Rolls'
		itemQuant.add(option2);

		let option3 = document.createElement('option');
		option3.value = 6
		option3.text = 'Qty: 6 Rolls'
		itemQuant.add(option3);

		let option4 = document.createElement('option');
		option4.value = 12
		option4.text = 'Qty: 12 Rolls';
		itemQuant.add(option4);

		for (var x=0; x < itemQuant.options.length; x++) {
			if (itemQuant.options[x].value == orderArray[i].quantity) {
				itemQuant.options[x].selected = 'selected'
			}
		}

		detailsContainer.appendChild(itemQuant);

		//---------------------------------------------

		let priceContainer = document.createElement('div');
		priceContainer.className = 'item-box-price';
		itemFlexContainer.appendChild(priceContainer);

		let totalPrice = document.createElement('int');
		totalPrice.classList.add('text-body2', 'total-price');
		totalPrice.innerHTML = '$' + orderArray[i].quantity * 2 + ' total';
		priceContainer.appendChild(totalPrice);

		let unitPrice = document.createElement('p');
		unitPrice.classList.add('text-body3');
		unitPrice.innerHTML = '$2.00 each';
		priceContainer.appendChild(unitPrice);

		let deleteBtn = document.createElement('button');
		deleteBtn.innerHTML = 'Delete this Item';
		deleteBtn.classList.add('deleteBtn');
		priceContainer.appendChild(deleteBtn);
		deleteBtn.onclick = function() {
			itemContainer.remove();
			orderArray.splice(i,1);
			parsedCount = parsedCount - orderArray[i].quantity; 
			cartCount.innerHTML = 'Cart (' + parsedCount + ')';
			itemCount.innerHTML = 'Cart (' + parsedCount + ' items)';

		}

	}
	
}
