// ---------------------------------- CRUD ---------------------------------- 
let productNameInput = document.getElementById('productName')
let productCategoryInput = document.getElementById('productCategory')
let productPriceInput = document.getElementById('productPrice')
let productDescriptionInput = document.getElementById('productDescription')
let productIMGInput = document.getElementById('productIMG')

let productContainer = []

if (localStorage.getItem('allproducts') !=null ) {
    productContainer=JSON.parse(localStorage.getItem('allproducts'))
    display()    
}

function addProduct(){
    let product = {
        name:productNameInput.value,
        category:productCategoryInput.value,
        price:productPriceInput.value,
        description:productDescriptionInput.value,
        img:productIMGInput.files[0]?.name
    }
    
    productContainer.push(product)
    display()
    clearinput()

    localStorage.setItem('allproducts' , JSON.stringify(productContainer))
}
function display() {
    let ButtonPress=""
    for (let i = 0; i < productContainer.length; i++) {
        ButtonPress+=`
        <div class="product col-md-4 col-sm-6 col-lg-3 p-4">
            <div class="product-img d-flex justify-content-center">
                <img class="w-75 mb-3 " src="image/${productContainer[i].img}" alt="">
            </div>
            <div class="content">
                <h2 class="fs-3 fw-bold text-center">${productContainer[i].name}</h2>
                <h3 class="fs-5">${productContainer[i].category}</h3>
                <span class="fs-5">Price: ${productContainer[i].price} L.E</span>
                <p class="fs-5">${productContainer[i].description}</p>
                <button class="btn w-100  mb-2  btn-outline-success" onclick="AddValue(${i})">Update</button>
                <button class="btn w-100 mb-2 btn-outline-danger" onclick="DeleteItem(${i})" >Delete</button>
            </div>
        </div>`
    }
    document.getElementById('ProductInfo').innerHTML=ButtonPress
}
function clearinput(){
	productNameInput.value=""
	productCategoryInput.value=""
	productPriceInput.value=""
	productDescriptionInput.value=""
    productIMGInput.value=""
}
function DeleteItem(index){
    productContainer.splice(index,1)
    localStorage.setItem('allproducts' , JSON.stringify(productContainer))
    display()
}
let SuperIndex;
function AddValue(index){
    SuperIndex= index

    document.getElementById('updatebtn').style.display="block"
    document.getElementById('addbtn').style.display="none"

    productNameInput.value=productContainer[index].name
	productCategoryInput.value=productContainer[index].category
	productPriceInput.value=productContainer[index].price
	productDescriptionInput.value=productContainer[index].description
    productIMGInput.value=productContainer[index].img
}
function updateProduct(){
    productContainer[SuperIndex].name=productNameInput.value
	productContainer[SuperIndex].category=productCategoryInput.value
	productContainer[SuperIndex].price=productPriceInput.value
	productContainer[SuperIndex].description=productDescriptionInput.value

    display()
    clearinput()

    localStorage.setItem('allproducts' , JSON.stringify(productContainer))

    document.getElementById('updatebtn').style.display="none"
    document.getElementById('addbtn').style.display="block"
}
function search(inputvalue){
    let ButtonPress=""
    for (let i = 0; i < productContainer.length; i++) {
        if (productContainer[i].name.toLowerCase().includes(inputvalue.toLowerCase())) {
            ButtonPress+=`
            <div class="product col-md-4 col-sm-6 col-lg-3 p-4">
                <div class="product-img d-flex justify-content-center">
                    <img class="w-75 mb-3 " src="image/${productContainer[i].img}" alt="">
                </div>
                <div class="content">
                    <h2 class="fs-3 fw-bold text-center">${productContainer[i].name.toLowerCase().replace(inputvalue.toLowerCase(),`<span>${inputvalue}</span>`)}</h2>
                    <h3 class="fs-5">${productContainer[i].category}</h3>
                    <span class="fs-5">Price: ${productContainer[i].price} L.E</span>
                    <p class="fs-5">${productContainer[i].description}</p>
                    <button class="btn w-100  mb-2  btn-outline-success" onclick="AddValue(${i})">Update</button>
                    <button class="btn w-100 mb-2 btn-outline-danger" onclick="DeleteItem(${i})" >Delete</button>
                </div>
            </div>`
        }
    }
    document.getElementById('ProductInfo').innerHTML=ButtonPress
}