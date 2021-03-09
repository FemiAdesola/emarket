// for the webpage (https://console.firebase.google.com/u/0/project/marketing-cdc03/overview)firebase
// https://console.firebase.google.com/u/0/project/marketing-cdc03/overview

var firebaseConfig = {
    apiKey: "AIzaSyBLC0yWBzRzTN2uaNsRo6BTu5xc-gkZzoQ",
    authDomain: "emarket-7deaf.firebaseapp.com",
    projectId: "emarket-7deaf",
    storageBucket: "emarket-7deaf.appspot.com",
    messagingSenderId: "107494635013",
    appId: "1:107494635013:web:6f1053cb806a82efc58e6c",
    measurementId: "G-EWMG4G7HBY"
};

// initialize Firebase
firebase.initializeApp(firebaseConfig);


//global
var products = JSON.parse(localStorage.getItem('cart'));
var cartItems = [];
var cart_n = document.getElementById('cart_n');
var table = document.getElementById('table');
var total = 0;

//HTML
function tableHTML(i) {
    return `
            <tr>
                <th scope="row">${i + 1}</th>
                <td><img style="width:90px;" src="${products[i].url}"></td>
                <td>${products[i].name}</td>
                <td>1</td>
                <td>${products[i].price}</td>
            </tr>
    
    `;         
}

//format cart
document.getElementById('formCart').addEventListener('submit', function (e) {
    e.preventDefault();
    userName = document.getElementById('userName');
    userEmail = document.getElementById('userEmail');
    userSelect = document.getElementById('userSelect');
    var d = new Date();
    var t = d.getTime();
    var order = t - 300;
    firebase.database().ref("orders").push({
        id: t + 1,
        order: order,
        userName: userName.value,
        userEmail: userEmail.value,
        payment: userSelect.value,
        date: d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear(),
        hour: d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds(),
        year: d.getFullYear(),
        products: JSON.parse(localStorage.getItem("cart")),
        total: total()
    });
    Swal.fire({
        position: 'center',
        type: 'success',
        title: 'Purchase made succssfully!',
        text: `Purchase order is:${order}`,
        showConfirmButton: true,
        timer: 50000,
    });
    clean();
});


//CLEAN
function clean() {
    localStorage.clear();
    for (let index = 0; index <products.length; index++){
        table.innerHTML += tableHTML(index);
        total = total + parseInt(products[index].price);
    }
    total = 0;
    table.innerHTML = `
        <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>

        </tr>

    `;
    document.getElementById("btnBuy").style.display = "none";
    document.getElementById("btnClean").style.display = "none";
}
//  Render
function render() {
    for (let index = 0; index < products.length; index++) {
        table.innerHTML += tableHTML(index);
        total = total + parseInt(products[index].price);
    }
    table.innerHTML += `
        <tr>
            <th scope ="col"></th>
            <th scope ="col"></th>
            <th scope ="col"></th>
            <th scope ="col"></th>
            <th scope ="col">Total:$${total}.00</th>
            
        </tr>
        <tr>
            <th scope ="col"></th>
            <th scope ="col"></th>
            <th scope ="col"></th>
          
            <th scope ="col">
                <button id="btnClean" onclick="clean()" class="btn yellow darken-4">
                Clean Shopping Cart </button></th>
            <th scope ="col">
                <button id="btnBuy" href="#modal1" class="modal-trigger waves-effect waves-light btn-secondary">Buy</button>
            </th>
        </tr>
        
    `;
}
$(document).ready(function(){
    $('.modal').modal();
  });
          