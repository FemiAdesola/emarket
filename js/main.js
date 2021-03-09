
//GLOBAl
var products = [];
var cartItems = [];
var cart_n = document.getElementById('cart_n');

//DIVS
var fruitDIV = document.getElementById("fruitDIV");
var juiceDIV = document.getElementById("juiceDIV");
var saladDIV = document.getElementById("saladDIV");

//INFORMATION
var FRUIT = [
    {name: 'Apple', price: 1 },
    {name: 'Banana', price: 1 },
    {name: 'Cherry', price: 1 },
    {name: 'Kiwi', price: 1 },
    {name: 'Orange', price: 1 },
    {name: 'Pineapple', price: 1 },
    {name:'Strawberry', price: 1 },
    {name: 'Water Melon', price: 1 },
];

var JUICE = [
    {name: 'Juice #1', price: 10 },
    {name: 'Juice #2', price: 11 },
    {name: 'Juice #3', price: 12 },
    {name: 'Juice #4', price: 13 },
];

var SALAD = [
    {name: 'Salad #1', price: 11 },
    {name: 'Salad #2', price: 12 },
    {name: 'Salad #3', price: 15 },
    {name: 'Salad #4', price: 12 },
];

//HTML
function HTMLfruitProduct(con) {
    let URL = `img/fruits/fruit${con}.jpg`;
    let btn = `btnFruit${con}`;
        return `
        <div class="col s3 wow fadeInup data-wow-delays="3s" data-wow-offset="300" ">
            <div class="card">
                <div class="card-image">
                    <img class="card-img-top" style="height:10rem;" src="${URL}">
                    <a id="${btn}" onclick="cart('${FRUIT[con-1].name}', '${FRUIT[con - 1].price}', '${URL}', '${con}', '${btn}')" class="btn btn-floating halfway-fab waves-effect waves-light red">
                        <i class="material-icons">add</i>
                    </a>
                </div>
                <div class="card-content">
                    <i class="material-icons" style="color:orange">star</i>
                    <i class="material-icons" style="color:orange">star</i>
                    <i class="material-icons" style="color:orange">star</i>
                    <i class="material-icons" style="color:orange">star</i>
                    <i class="material-icons" style="color:orange">star</i>        
                    <span class="card-title">${FRUIT[con - 1].name}</span>
                    <p>Price: ${FRUIT[con - 1].price}</p>
            
                </div>
            </div>
        </div>   
    `
} 

function HTMLjuiceProduct(con) {
    let URL = `img/juice/juice${con}.jpg`;
    let btn = `btnJuice${con}`;
        return `
        <div class="col s3 wow fadeInup data-wow-delays="3s" data-wow-offset="300" ">
            <div class="card">
                <div class="card-image">
                    <img class="card-img-top" style=height:18rem;" src="${URL}">
                    <a id="${btn}" onclick="cart('${JUICE[con-1].name}', '${JUICE[con - 1].price}', '${URL}', '${con}', '${btn}')" class="btn btn-floating halfway-fab waves-effect waves-light red">
                        <i class="material-icons">add</i>
                    </a>
                </div>
                <div class="card-content">
                    <i class="material-icons" style="color:orange" >star</i>
                    <i class="material-icons" style="color:orange" >star</i>
                    <i class="material-icons" style="color:orange" >star</i>
                    <i class="material-icons" style="color:orange" >star</i>
                    <i class="material-icons" style="color:orange" >star</i>        
                    <span class="card-title">${JUICE[con - 1].name}</span>
                    <p>Price: ${JUICE[con - 1].price}</p>
            
                </div>
            </div>
        </div>   
    `
} 

function HTMLsaladProduct(con) {
    let URL = `img/salads/salad${con}.jpg`;
    let btn = `btnSalad${con}`;
        return `
        <div class="col s3 wow fadeInup data-wow-delays="3s" data-wow-offset="300" ">
            <div class="card">
                <div class="card-image">
                    <img class="card-img-top" style=height:12rem;" src="${URL}">
                    <a id="${btn}" onclick="cart('${SALAD[con-1].name}', '${SALAD[con - 1].price}', '${URL}', '${con}', '${btn}')" class="btn btn-floating halfway-fab waves-effect waves-light red">
                        <i class="material-icons">add</i>
                    </a>
                </div>
                <div class="card-content">
                    <i class="material-icons" style="color:orange" >star</i>
                    <i class="material-icons" style="color:orange" >star</i>
                    <i class="material-icons" style="color:orange" >star</i>
                    <i class="material-icons" style="color:orange" >star</i>
                    <i class="material-icons" style="color:orange" >star</i>        
                    <span class="card-title">${SALAD[con - 1].name}</span>
                    <p>Price: ${SALAD[con - 1].price}</p>
            
                </div>
            </div>
        </div>   
    `
} 

//ANIMATION
function animation() {
    var Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000
    });
    Toast.fire({
        type: 'success',
        title: 'Added to shopping cart'
    });
}
//Cart Function
function cart(name, price, url, con, btncart) {
    const item = {
        name: name,
        price: price,
        url:url
    }
    cartItems.push(item);
    let storage = JSON.parse(localStorage.getItem("cart"));
    if (storage == null) {
        products.push(item);
        localStorage.setItem("cart", JSON.stringify(products));
    } else {
        products = JSON.parse(localStorage.getItem("cart"));
        products.push(item);
        localStorage.setItem("cart", JSON.stringify(products));
    }
    products = JSON.parse(localStorage.getItem("cart"));
    cart_n.innerHTML = `[${products.length}]`;
    document.getElementById(btncart).style.display = "none";
    animation();
}


//render
$('.carousel.carousel-slider').carousel({
    fullWidth: true,
    indicators: true
});
$(document).ready(function () {
    $('.modal').modal();
});

    
function render() {
    
    for (let index = 1; index <= 8; index++) {
        //FRUIT
        fruitDIV.innerHTML += `${HTMLfruitProduct(index)}`;
    }
    for (let index = 1; index <= 4; index++) {
        juiceDIV.innerHTML += `${HTMLjuiceProduct(index)}`;
    }
    for (let index = 1; index <= 4; index++) {
        saladDIV.innerHTML += `${HTMLsaladProduct(index)}`;
    }
    
    
}