

//Traemos del Local Storage los productos
let vehiclesInCart = localStorage.getItem("vehicles-in-cart");
vehiclesInCart = JSON.parse(vehiclesInCart);

// Traemos al archivo JS todo sobre el DOM
const emptyCartContainer = document.querySelector("#empty-cart");
const productsCartContainer = document.querySelector("#products-cart");
const actionsCartContainer = document.querySelector("#actions-cart");
const boughtCartContainer = document.querySelector("#bought-cart");
let deleteButtons = document.querySelectorAll(".delete-product-cart");
const emptyButtonFix = document.querySelector("#empty-actions-cart");
const totalContainer = document.querySelector("#total");
const buyButton = document.querySelector("#buy-actions-cart");


//Cargar productos al carrito
function cartProductsUpload() {
    if (vehiclesInCart && vehiclesInCart.length > 0) {
    
        emptyCartContainer.classList.add("disabled");
        productsCartContainer.classList.remove("disabled");
        actionsCartContainer.classList.remove("disabled");
        boughtCartContainer.classList.add("disabled");
    
        productsCartContainer.innerHTML = "";
    
        vehiclesInCart.forEach(vehicle => {
            
            const div = document.createElement("div");
            div.classList.add("product-cart");
            div.innerHTML = `
                <img class="img-product-cart" src="${vehicle.imagen}" alt="${vehicle.titulo}">
                <div class="title-product-cart">
                    <small>Título</small>
                    <h3>${vehicle.titulo}</h3>
                </div>
                <div class="amount-product-cart">
                    <small>Cantidad</small>
                    <p>${vehicle.cantidad}</p>
                </div>
                <div class="price-product-cart">
                    <small>Precio</small>
                    <p>$${vehicle.precio}</p>
                </div>
                <div class="subtotal-product-cart">
                    <small>Subtotal</small>
                    <p>$${vehicle.precio * vehicle.cantidad}</p>
                </div>
                <button class="delete-product-cart" id="${vehicle.id}"><i class="bi bi-trash-fill"></i></button>
            `;
    
            productsCartContainer.append(div);
    
        })
    
    deleteButtonsUpdate();
    totalUpdate();    
    
    } else {       
        emptyCartContainer.classList.remove("disabled");
        productsCartContainer.classList.add("disabled");
        actionsCartContainer.classList.add("disabled");
        boughtCartContainer.classList.add("disabled");   
    }

}

cartProductsUpload();

//Eliminamos los botones
function deleteButtonsUpdate() {
    deleteButtons = document.querySelectorAll(".delete-product-cart");

    deleteButtons.forEach(button => {
        button.addEventListener("click", deleteFromCart);
    });
}

//Eliminamos individualmente del carrito
function deleteFromCart(e) {

    Toastify({
        text: "Vehiculo eliminado",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, #5c5770, #1e1b2b)",
            borderRadius: "2rem",
            textTransform: "uppercase",
            fontSize: ".75rem"
        },
        offset: {
            x: "1.5rem", // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: "1.5rem" // vertical axis - can be a number or a string indicating unity. eg: '2em'
        },
        onClick: function(){} // Callback after click
    }).showToast();

    const idButton = e.currentTarget.id;
    const index = vehiclesInCart.findIndex(vehicle => vehicle.id === idButton);

    vehiclesInCart.splice(index, 1);
    cartProductsUpload();

    localStorage.setItem("vehicles-in-cart", JSON.stringify(vehiclesInCart));

}

emptyButtonFix.addEventListener("click", emptyButton);

//Vaciamos todo el carrito
function emptyButton() {

    Swal.fire({
        title: '¿Estas seguro?',
        icon: 'info',
        html: `Se van a borrar ${vehiclesInCart.reduce((acc, vehicle) => acc + vehicle.cantidad, 0)} vehiculos`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
    }).then((result) => {
        if (result.isConfirmed) {
            vehiclesInCart.length = 0;
            localStorage.setItem("vehicles-in-cart", JSON.stringify(vehiclesInCart));
            cartProductsUpload();
        }
    })

}


//Actualizamos el total
function totalUpdate() {
    const calculatedTotal = vehiclesInCart.reduce((acc, vehicle) => acc + (vehicle.precio * vehicle.cantidad), 0);
    total.innerText = `${calculatedTotal}`;
}

buyButton.addEventListener("click", buyCart);

//Comprar finalmente el carrito
function buyCart() {
    
    vehiclesInCart.length = 0;
    localStorage.setItem("vehicles-in-cart", JSON.stringify(vehiclesInCart));

    emptyCartContainer.classList.add("disabled");
    productsCartContainer.classList.add("disabled");
    actionsCartContainer.classList.add("disabled");
    boughtCartContainer.classList.remove("disabled");
}