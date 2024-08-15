//  CRUD
// CREATe read update delete
var productsList;
if(localStorage.getItem("productsList")== null){
  productsList =[]
}
else {
  productsList=JSON.parse(localStorage.getItem("productsList"))
  displayproduct (productsList)

}
var counter;
var productName = document.getElementById("productName")
var productPrice = document.getElementById("productPrice")
var productCategory = document.getElementById("productCat")
var productDescription = document.getElementById("productDes")
var saveBtn = document.getElementById("saveBtn")

function localStorageUpdate(){
  localStorage.setItem("productsList",JSON.stringify(productsList))
}
function addproduct(){
  if (checkProductName(productName) && checkProductPrice(productPrice) && chackProductCategory(productCategory) && chackProductDescription(productDescription)) {
  var product ={
    name:productName.value ,
    price:productPrice.value,
    categ:productCategory.value,
    desc:productDescription.value
  };

  productsList.push(product)
  localStorageUpdate()
  console.log(productsList);
  displayproduct (productsList);
  clearInputs()
}  
}
function displayproduct(data) {
    var cartona = '';
    for(var i = 0 ; i<data.length ; i++){
      cartona += `
              <tr>
              <td>${i+1}</td>
              <td>${data[i].newName ? data[i].newName : data[i].name}</td>
              <td>${data[i].price}</td>
              <td>${data[i].categ}</td>
              <td>${data[i].desc}</td>
              <td><button onclick="updateProduct(${i})" class="btn btn-warning">Update</button></td>
              <td><button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button></td>
          </tr>`
    }
    document.getElementById("dataa").innerHTML = cartona;
}
function deleteProduct(index){
  productsList.splice(index,1)
  localStorageUpdate()
  displayproduct (productsList);
}
function clearInputs(){
  productName.value = '';
  productPrice.value = '';
  productCategory.value ='';
  productDescription.value ='';
}
function updateProduct(index){
  productName.value = productsList[index].name
  productPrice.value = productsList[index].price
  productCategory.value = productsList[index].categ
  productDescription.value =productsList[index].desc
  counter = index
  saveBtn.classList.remove("d-none");
}
function saveUpdate(){
 productsList[counter].name = productName.value 
 productsList[counter].price = productPrice.value 
 productsList[counter].categ = productCategory.value 
 productsList[counter].desc = productDescription.value 
 localStorageUpdate()
 displayproduct(productsList)
 saveBtn.classList.add("d-none");
 clearInputs()
}
function searchProduct(data){
  console.log(data);
  
  var newproductsList = [];
 for (var i = 0; i < productsList.length; i++) {
  var originalName = data.toLowerCase();
  
   if(productsList[i].name.toLowerCase().includes(originalName)){
    var regex = new RegExp(`(${originalName})`, 'gi');
    productsList[i].newName= productsList[i].name.replaceAll(regex, `<span class="text-danger fw-bold">${data}</span>`);
    newproductsList.push(productsList[i]);
    console.log("fond",productsList[i]);
    
   }
   displayproduct(newproductsList);
 }
}

function checkProductName(productName) {
  var regex = /^[A-Z][a-zA-Z0-9\s]+$/;
  var isValid = regex.test(productName.value);
  document.getElementById("nameError").innerText = isValid ? "" : "Invalid product name.";
  return isValid;
}
function checkProductPrice(productPrice) {
  var regex = /^\$?\d+(\.\d{1,2})?\$?$/;
  var isValid = regex.test(productPrice.value);
  document.getElementById("priceError").innerText = isValid ? "" : "Invalid product price. Example: $99.99$";
  return isValid;

}
function chackProductCategory(productCategory) {
  var regex = /^[a-zA-Z0-9\s]+$/; 
  var isValid = regex.test(productCategory.value);
  document.getElementById("categoryError").innerText = isValid ? "" : "Invalid product category.";
  return isValid;
}
function chackProductDescription(productDescription) {
  var regex = /^[a-zA-Z0-9\s.,!?\-]+$/;
  var isValid = regex.test(productDescription.value);
  document.getElementById("descriptionError").innerText = isValid ? "" : "Invalid product description.";
  return isValid;
}

