
let pago = 0;

function bienvenida(){
    let saludo = alert('Bienvenido al Simulador de pagos en cuotas de Tiago Sepulveda!');
    return saludo;
}

function calcularPago(montoInicial, numeroDeCuotas) {
    pago = montoInicial / numeroDeCuotas;
    return pago;
}

function iniciarSimulador() {
    pago = parseFloat(prompt("Ingrese el monto a financiar:"));
    let numeroDeCuotas = parseInt(prompt("Ingrese el número de cuotas:"));

    pago = calcularPago(pago, numeroDeCuotas);
    alert("El pago mensual sería de $" + `${pago}`);

}

function despedidaMomentanea(){
    let despedidaFeliz = alert('Un momento, antes de irse, ¿le gustaria probar nuestra siguiente alternativa de financiamiento?');
    return despedidaFeliz;
}

let monto = 0;
let tasaInteres = 0;
let plazoMeses = 0;
let interesesAcumulados = 0;
let pagoFinal = 0;

function simuladorInteresCompuesto() {
    monto = parseFloat(prompt('Ingrese el monto deseado'));
    tasaInteres = parseFloat(prompt('Ingrese la tasa de interes' + ' (EN NUMEROS DECIMALES POR FAVOR)'))
    plazoMeses = parseInt(prompt('Ingrese la cantidad de meses a financiar'));

    while ( plazoMeses > 0) {
        interesesAcumulados = monto * tasaInteres;
        monto = monto + interesesAcumulados;
        plazoMeses--;

        alert('El monto final despues de ' + (12 - plazoMeses) + ' meses es de $' + `${monto}`);
    }
}


bienvenida();
iniciarSimulador();
despedidaMomentanea();
simuladorInteresCompuesto();