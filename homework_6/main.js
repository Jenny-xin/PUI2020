
var cartArray = []

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

// create new Rolls object with new quantity and glaze values
function addToCart() {
	var quantity = document.getElementById('quantity').value;
	var quantityNum = parseInt(quantity)
		for (var i=0; i < quantityNum; i++) {
			var rolls = new Rolls(newGlaze, quantity)
			cartArray.push(rolls)
		}
		console.log(cartArray)
	updateCart(cartArray.length)
}

// update items in cart
function updateCart() {
	var cartCount = document.getElementById('cartCount');
	if (cartArray.length > 0) {
	cartCount.innerHTML = 'Cart (' + cartArray.length + ')'
	}
}