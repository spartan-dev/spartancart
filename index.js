// ITERATION 1

function updateSubtotal(product) {
  //* aca entra un solo nodo cuando la usamos en calculateAll
  //* un nodo  es una etiqueta de html que tomamos con javascript

  // get the dom element from the html file
  const price = product.querySelector(".price span");
  const quantity = product.querySelector(".quantity input");

  // extract values from the previous dom getElements
  const priceValue = price.innerText * 1; // parseFloat(price.innerText);
  const quantityValue = quantity.valueAsNumber;

  //Calculate total value
  const subtotalValue = priceValue * quantityValue;

  //get DOM element that hold the subtotal value
  const subTotal = product.querySelector(".subtotal span");
  // set the product total in the corresponding DOM element
  subTotal.innerText = subtotalValue;
  //subTotal.textContent = subtotalValue;

  return subtotalValue;
}

function calculateAll() {
  // code in the following two lines is added just for testing purposes.
  // it runs when only iteration 1 is completed. at later point, it can be removed.
  const products = document.querySelectorAll(".product");
  // end of test
  let total = 0;
  // ITERATION 2
  for (let product of products) {
    total += updateSubtotal(product);
  }
  // ITERATION 3
  document.querySelector("#total-value span").innerText = total;
  //... your code goes here
}

// ITERATION 4

function removeProduct(event) {
  const target = event.currentTarget;
  //! this code only remove the button target.parentNode.remove();
  //* this code remove and takes  all the code from parent to the target
  const row = target.closest(".product").remove();
  //* this code remove the same as above but has some complications because the parentNode repetition
  /*
     const row = target.parentNode.parentNode
     const parent = row.parentNode;
     parent.removeChild()
     */
  // we call calculateAll for recall our
  calculateAll();
}

// ITERATION 5

function createProduct() {
  // select from create product parent and grab input value
  const createRow = document.querySelector(".create-product");
  const newProductNameInput = createRow.querySelector("input");
  const newProductNameValue = newProductNameInput.value;
  //select from create product price
  const newProductPriceInput = createRow.querySelector("input[type='number']");
  const newProductValue = Number(newProductPriceInput.valueAsNumber).toFixed(2);

  const newTableRow = document.createElement("tr");
  newTableRow.className = "product";
  newTableRow.innerHTML = `
    <td class="name">
      <span>${newProductNameValue}</span>
    </td>
    <td class="price">$<span>${newProductValue}</span></td>
    <td class="quantity">
   <input type="number" value="0" min="0" placeholder="Quantity" />
    </td>
    <td class="subtotal">$<span>0</span></td>
    <td class="action">
   <button class="btn btn-remove">Remove</button>
  </td>
   `;
  //get the pqarent node where is going to be the new baby 💅
  const parent = document.querySelector("#cart tbody");
  // add the new baby to his parent
  parent.appendChild(newTableRow);
  // we add some new remove bnutton because its new and its no part of a array of elements
  const removeBtn = newTableRow.querySelector(".btn-remove");
  removeBtn.addEventListener("click", removeProduct);

  // clean all the previousProducts
  newProductNameInput.value = "";
  newProductPriceInput.value = 0;
}

window.addEventListener("load", () => {
  const calculatePricesBtn = document.getElementById("calculate");
  calculatePricesBtn.addEventListener("click", calculateAll);

  const removeBtns = document.getElementsByClassName("btn-remove");
  for (let removeBtn of removeBtns) {
    removeBtn.addEventListener("click", removeProduct);
  }
  const createBtn = document.getElementById("create");
  if (createBtn) {
    createBtn.addEventListener("click", createProduct);
  }
});
