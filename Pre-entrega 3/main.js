let vehicles = [];

fetch("./vehicles.json")
    .then(response => response.json())
    .then(data => {
        vehicles = data;
        uploadVehicles(vehicles);
    })



//Elementos del DOM!
const productsContainer = document.querySelector("#products-container");
const categoryButtons = document.querySelectorAll(".category-buttons");
const principalTitle = document.querySelector("#principal-title");
let addButtons = document.querySelectorAll(".add-product");
const numero = document.querySelector("#number-cart");

//Cargamos los vehiculos
function uploadVehicles(chosenVehicles) {

    productsContainer.innerHTML = "";
        
    chosenVehicles.forEach(vehicles => {

        const div = document.createElement('div');
        div.classList.add('producto');
        div.innerHTML = `
            <img class="img-product" src="${vehicles.imagen}" alt="${vehicles.titulo}">
            <div class="details-product">
                    <h3 class="title-product">${vehicles.titulo}</h3>
                    <p class="price-product">$${vehicles.precio}</p>
                    <button class="add-product" id="${vehicles.id}">Agregar</button>
            </div>
        `;

            productsContainer.append(div)
    })

        addButtonsUpdate();
}


categoryButtons.forEach(button => {
    button.addEventListener("click", (e) => {

        categoryButtons.forEach(button => button.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const categoryVehicles = vehicles.find(vehicle => vehicle.categoria.id === e.currentTarget.id);
            principalTitle.innerText = categoryVehicles.categoria.nombre;
            
            const buttonVehicles = vehicles.filter(vehicle => vehicle.categoria.id === e.currentTarget.id);
            uploadVehicles(buttonVehicles);
        } else {
            principalTitle.innerText = "Todos los productos";
            uploadVehicles(vehicles);
        }
        
    })
})


//Actualizamos los botones
function addButtonsUpdate() {
    addButtons = document.querySelectorAll('.add-product');

    addButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

let vehiclesInCart;

let vehiclesInCartLS = localStorage.getItem("vehicles-in-cart");


vehiclesInCartLS ? (vehiclesInCart = JSON.parse(vehiclesInCartLS), updateNumber()) : vehiclesInCart = []


//Agregamos al carrito!
function addToCart(e) {
    
    Toastify({
        text: "Vehiculo agregado",
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
    const addedVehicle = vehicles.find(vehicle => vehicle.id === idButton);

    if (vehiclesInCart.some(vehicle => vehicle.id === idButton)) {
        const index = vehiclesInCart.findIndex(vehicle => vehicle.id === idButton);
        vehiclesInCart[index].cantidad++;
    } else {
        addedVehicle.cantidad = 1;
        vehiclesInCart.push(addedVehicle);
    }

    updateNumber();

    localStorage.setItem("vehicles-in-cart", JSON.stringify(vehiclesInCart));

}

//Actualizamos el numero de la cantidad en el carrito
function updateNumber() {
    let newNumber = vehiclesInCart.reduce((acc, vehicle) => acc + vehicle.cantidad, 0);
    numero.innerText = newNumber;
}