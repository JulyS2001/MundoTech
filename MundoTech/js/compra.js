//Recuperar los datos de sessionStorage
const productos = JSON.parse(localStorage.getItem('carrito')) || [];
const total = localStorage.getItem('total') || 0;

//Mostrar el resumen de la compra
const resumen = document.getElementById("detalle");
let resumenTexto = "Resumen de la compra: <br><br>";

//bucle for para los productos
for(let i = 0; i < productos.length; i++){
    const producto = productos[i];
    resumenTexto += `${producto.nombre}: $USD ${producto.precio}<br>`;
}
resumenTexto += `<br>Total a pagar: $USD ${total}`;
resumen.innerHTML = resumenTexto;

//Funcion envio del formulario

function enviarFormulario(event){
    event.preventDefault(); //Prevenir el comportamiento predeterminado del formulario

    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefono = document.getElementById('telefono').value.trim();

    if(!nombre || !apellido || !email || !telefono){
        alert("Por favor, completa todos los datos del campo");
        return;
    }

    let carrito = '';
    for(let i = 0; i < productos.length; i++){
        const producto = productos[i];
        carrito += `${producto.nombre} - $USD ${producto.precio}\n`;
    }
    const totalDolares = `$USD ${total}`;

    document.getElementById('carritoData').value = carrito;
    document.getElementById('totalCarrito').value = totalDolares;

    document.getElementById('formulario').submit();

    document.getElementById('botonEnviar').addEventListener('click', enviarFormulario);
}

