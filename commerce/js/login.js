var x = document.getElementById("userName");
var p = document.getElementById("userPassword");

document.getElementById("formlogin").addEventListener("submit", (ee) => {
    ee.preventDefault();
    console.log(x.value);
    console.log(p.value);
    if (x.value=='12345@gmail.com' && p.value=="qwerty") {
            swal.fire({
                position: 'center',
                type: 'success',
                title: 'welcome',
                text: `Acess Granted`
            });
            x.value = '';
            p.value = '';
            setTimeout(() => {
                loadPage();
            }, 3000);
    } else {
        swal.fire({
            position: 'center',
            type: 'error',
            title: 'Error',
            text: `Acess Denied`
        });
        x.value = '';
        p.value = '';
    }
         
    function loadPage() {
        window.location.href = "./admin.html";
    }
});