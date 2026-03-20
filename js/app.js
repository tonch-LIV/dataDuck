'use strict';

function AppState() {
  this.allProducts = [];
}

AppState.prototype.instantiateProducts = function () {

  const productNames = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'water-can', 'wine-glass'];

  for (let i = 0; i < productNames.length; i++) {
    if (productNames[i] === 'sweep') {
      this.allProducts.push(new Product(productNames[i], 'png'))
    } else {
      this.allProducts.push(new Product(productNames[i]))
    }
  }

}

AppState.prototype.saveToLocalStorage = function () {
  // TODO: Fill in this instance method to save product data to local storage
  
  let stringifiedProducts = JSON.stringify(this.allProducts);     // takes `state.allProducts` and converts to a string
  localStorage.setItem('products', stringifiedProducts);        // stores "product:" "stringifiedProducts" to localStorage
};

AppState.prototype.loadItems = function () {
  // TODO: Update this instance method to retrieve data from local storage instead of creating new Products on each page load

  // gets data from localStorage; will return 'null' on first visit
  let retrievedProducts = localStorage.getItem('products');

  if (retrievedProducts) { // save data exists
    let parsedProducts = JSON.parse(retrievedProducts); // from strings to usable objects (plain), not Product

    // rebuild Product instances
    this.allProducts = [];

    for (let i = 0; i < parsedProducts.length; i++) {
      let productData = parsedProducts[i];

      let rebuiltProduct = new Product(productData.name);
      // fix for png file extension
      rebuiltProduct.source = productData.source;
      rebuiltProduct.timesClicked = productData.timesClicked;
      rebuiltProduct.timesShown = productData.timesShown;

      this.allProducts.push(rebuiltProduct);
    }

  } else { // first time visit
    this.instantiateProducts();
  }
};


function Product(name, fileExtension = 'jpg') {
  this.name = name;
  this.source = `assets/${name}.${fileExtension}`;
  this.timesClicked = 0;
  this.timesShown = 0;
}
