let teams;
let drivers;
let message2;

function welcome() {
    let message = alert('Bienvenido al buscador de equipos de Formula 1');
    return message;
}

function callF1 (){

    teams = ['RED BULL', 'FERRARI', 'MERCEDES', 'ALPINE', 'MCLAREN',
'ASTON MARTIN', 'ALFA ROMEO', 'HAAS', 'ALPHATAURI', 'WILLIAMS']

let getTeams = prompt('Introduzca algun equipo de Formula 1. Ej: Mercedes, Ferrari, etc').toUpperCase();

if(teams.find((team)=>team == getTeams)){
    alert(`Se encontro el equipo: ${getTeams}`)
} else {
    alert(`No se encontro el equipo: ${getTeams}`)
}

message2 = alert('Perfecto, ahora se le mostraran una serie de pilotos como ejemplo! (Revisar en consola)')

let arrayDrivers = [
        {id: 1, name: 'HAMILTON'}, 
        {id: 2, name: 'VERSTAPPEN'}, 
        {id: 3, name: 'LECLERC'}, 
        {id: 4, name: 'OCON'},
        {id: 5, name: 'NORRIS'}, 
        {id: 6, name: 'ALONSO'}, 
        {id: 7, name: 'BOTTAS'}, 
        {id: 8, name: 'MAGNUSSEN'},
        {id: 9, name: 'TSUNODA'}, 
        {id: 10, name: 'ALBON'},
]

let resultArrayDrivers = arrayDrivers.filter(number => number.id <= 5);

console.log(`Los pilotos hallados fueron: ${JSON.stringify(resultArrayDrivers)}`);

}


welcome();
callF1();