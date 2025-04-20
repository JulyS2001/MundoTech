let total = 0; 
function agregarProducto(event){
    var producto = {
        id: event.target.getAttribute('data-id'),
        nombre: event.target.getAttribute('data-nombre'),
        precio: event.target.getAttribute('data-precio')
    };

    var carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert("¡Producto agregado al carrito!");
    actualizarCarrito();

}

function eliminarProducto(idProducto){
    var carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito = carrito.filter(function(producto){
        return producto.id !== idProducto;
    });
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
}

function actualizarCarrito(){
    var carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    var listaCarrito = document.getElementById("lista-carrito");
    var totalCarrito = document.getElementById("total-carrito");
    listaCarrito.innerHTML = "";
    for(var i = 0; i < carrito.length; i++){
        var producto = carrito[i];
        var li = document.createElement("li");
        li.textContent = producto.nombre + " - $USD " + producto.precio;

        var botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.onclick = function(){
            eliminarProducto(producto.id);
        }
        li.appendChild(botonEliminar)
        listaCarrito.appendChild(li);
        total += parseFloat(producto.precio);
    }
    //document.getElementById("total-carrito").textContent = "Total: $" + total.toFixed(2);
    totalCarrito.textContent = "Total: $USD " + total.toFixed(2);
    localStorage.setItem('total', total);
}
document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("lista-carrito")) {
        actualizarCarrito(); // Actualiza la lista de productos al cargar la página
    }

    // Funcionalidad para vaciar el carrito
    const botonVaciar = document.getElementById("vaciar-carrito");
    if (botonVaciar) {
        botonVaciar.addEventListener("click", function () {
            localStorage.removeItem("carrito");
            localStorage.removeItem('total');
            actualizarCarrito(); // Refresca la lista
            document.getElementById("total-carrito").textContent = "Total $USD 0";
        });
    }
});

function pagar(){
    if(total > 0){
    alert("Total a pagar: $USD " + total);
    window.location.href = "finalizar.html";
    }else{
        alert("El carrito esta vacío.");
    }
}