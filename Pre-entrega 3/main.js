

//Array con todos los vehiculos
const vehicles = [
    // Autos
    {
        id: "audi-rs7",
        titulo: "Audi RS7",
        imagen: "./cars/audi-rs7.avif",
        categoria: {
            nombre: "Autos",
            id: "autos"
        },
        precio: 75000
    },
    {
        id: "ferrari-458",
        titulo: "Ferrari 458 Italia",
        imagen: "./cars/ferrari-458.avif",
        categoria: {
            nombre: "Autos",
            id: "autos"
        },
        precio: 80000
    },
    {
        id: "lamborghini",
        titulo: "Lamborghini Aventador",
        imagen: "./cars/lamborghini-aventador.avif",
        categoria: {
            nombre: "Autos",
            id: "autos"
        },
        precio: 120000
    },
    {
        id: "mclaren",
        titulo: "Mclaren",
        imagen: "./cars/mclaren.avif",
        categoria: {
            nombre: "Autos",
            id: "autos"
        },
        precio: 55000
    },
    {
        id: "mustang-shelby",
        titulo: "Mustang Shelby",
        imagen: "./cars/mustang-shelby.avif",
        categoria: {
            nombre: "Autos",
            id: "autos"
        },
        precio: 45000
    },
    {
        id: "panamera",
        titulo: "Porsche Panamera",
        imagen: "./cars/panamera.avif",
        categoria: {
            nombre: "Autos",
            id: "autos"
        },
        precio: 145000
    },
    
    // Camionetas
    {
        id: "silverado",
        titulo: "Chevrolet Silverado",
        imagen: "./pickup/chevrolet-silverado.avif",
        categoria: {
            nombre: "Camionetas",
            id: "camionetas"
        },
        precio: 37000
    },
    {
        id: "f150",
        titulo: "Ford F-150",
        imagen: "./pickup/f-150.avif",
        categoria: {
            nombre: "Camionetas",
            id: "camionetas"
        },
        precio: 66000
    },
    {
        id: "gmc",
        titulo: "GMC Sierra",
        imagen: "./pickup/gmc-sierra.avif",
        categoria: {
            nombre: "Camionetas",
            id: "camionetas"
        },
        precio: 87000
    },
    {
        id: "tacoma",
        titulo: "Toyora Tacoma",
        imagen: "./pickup/toyota-tacoma.avif",
        categoria: {
            nombre: "Camionetas",
            id: "camionetas"
        },
        precio: 52000
    },
    
    // Motos
    {
        id: "harley-gris",
        titulo: "Harley Davidson Gris",
        imagen: "./motorcycle/harley-davidson-gris.avif",
        categoria: {
            nombre: "Motos",
            id: "motos"
        },
        precio: 13000
    },
    {
        id: "duke",
        titulo: "KTM Duke",
        imagen: "./motorcycle/ktm-duke.avif",
        categoria: {
            nombre: "Motos",
            id: "motos"
        },
        precio: 5500
    },
    {
        id: "spibo",
        titulo: "Spibo RT5",
        imagen: "./motorcycle/spibo-rt5.avif",
        categoria: {
            nombre: "Motos",
            id: "motos"
        },
        precio: 8500
    },
    {
        id: "harley-negro",
        titulo: "Harley-Davidson Negra",
        imagen: "./motorcycle/harley-davidson-negro.avif",
        categoria: {
            nombre: "Motos",
            id: "motos"
        },
        precio: 16000
    },
];

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

uploadVehicles(vehicles);

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


if (vehiclesInCartLS) {
    vehiclesInCart = JSON.parse(vehiclesInCartLS);
    updateNumber();
} else {
    vehiclesInCart = [];
}

//Agregamos al carrito!
function addToCart(e) {
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