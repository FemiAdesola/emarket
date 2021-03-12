/* function for row details */
//'d' is the original data object for the row
function format(d) {
    return `
        <table>
            <tr>
                <td>Client:</td>
                <td>${d.userName}</td>
            </tr>
            <tr>
                <td>E-mail:</td>
                <td>${d.userEmail}</td>
            </tr>
            <tr>
                <td>Year:</td>
                <td>${d.year}</td>
            </tr>
            <tr>
                <td>Date:</td>
                <td>${d.date}</td>
            </tr>
            <tr>
                <td>Hour:</td>
                <td>${d.hour}</td>
            </tr>
            <tr>
                <td>Payment Method:</td>
                <td>${d.payment}</td>
            </tr>
            <tr>
                <td>Order:</td>
                <td>${d.order}</td>
            </tr>
            <tr>
                <td>Id:</td>
                <td>${d.id}</td>
            </tr>
            <tr>
                <td>Total:</td>
                <td>${d.total}</td>
            </tr>
            <tr>
                <td>Products:</td>
                <td>${d.products.map(function (product) {
                    return `<ul>
                            <li>Product:${product.name}</li>
                            <li>Price:${product.price}</li>
                            <li>Quantity:${product.quantity}</li>
                            <li>Total:${product.total}</li>
                        </ul>`;
                    })}
                </td>
            </tr>
        </table>`;
}

// end format
$(document).ready(function () {
    setTimeout(function () {
        var table = $('#tableOrders').DataTable({
            "data": final.data,
            select: "single",
            "columns": [
                {
                    "className": 'details-control',
                    "orderable": true,
                    "data": null,
                    "defaulContent": '',
                    "render": function () {
                        return '<i style="hover:pointer" class="fa fa-plus-square" aria-hidden="true"></i>';
                    },
                    width: "15px"
                },
                { "data": "id" },
                { "data": "order" },
                { "data": "date" },
                { "data": "userName" },
                { "data": "payment" },
                { "data": "total" },
            ],
            "order": [[1, 'desc']]
        });
        //add event listener
        $('#tableOrders tbody').on('click', 'td.details-control', function () {
            
            var tr = $(this).closest('tr');
            var tdi = tr.find("i.fa");
            var row = table.row(tr);

            if (row.child.isShow()) {
                //This row is already open-close 
                row.child.hide();
                tdi.first().removeClass('fa-minus-square');
                tdi.first().addClass('fa-plus-square');
                
            }
            else {
                //open this row
                row.child(format(row.data())).show();
                tr.addClass('shown');
                tdi.first().removeClass('fa-plus-square');
                tdi.first().addClass('fa-minus-square');
            }
        });
    }, 5000);
});

//-------------
//firebase
//Your web app's firebase configuration
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

var order = firebase.database().ref('cart');

order.on('child_added', function (data) {
    var orderValue = data.val();
    fsales(orderValue);
});
function fsales(params) {
    final.data.push(params);
}
var final = {
    "data":[]
}
console.log(final);



    
