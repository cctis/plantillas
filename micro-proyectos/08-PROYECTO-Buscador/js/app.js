//variables

const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');


//contenedor para los resultados
const resultado = document.querySelector('#resultado');


const max = new Date().getFullYear();
const min = max - 10;

//generar un objeto con la busqueda
const datosBusqueda = {
    marca : '',
    year : '',
    minimo : '',
    maximo : '',
    puertas : '',
    transmision: '',
    color: ''
}

//eventos
document.addEventListener('DOMContentLoaded', () =>{
    mostrarAutos(autos); //muestra los autos al cargar

    //llena las opciones de años
    llenarSelect()
});

//event listener para los select de busqueda
marca.addEventListener('change', e => {
    datosBusqueda.marca= e.target.value;

    filtrarAuto();
    
});

year.addEventListener('change', e => {
    datosBusqueda.year = e.target.value;

    filtrarAuto();
});

minimo.addEventListener('change', e => {
    datosBusqueda.minimo = parseInt( e.target.value);

    filtrarAuto();
});

maximo.addEventListener('change', e => {
    datosBusqueda.maximo = parseInt( e.target.value);

    filtrarAuto();
});

puertas.addEventListener('change', e =>{
    datosBusqueda.puertas = parseInt(e.target.value);

    filtrarAuto();
});

transmision.addEventListener('change', e =>{
    datosBusqueda.transmision = e.target.value;

    filtrarAuto();
});

color.addEventListener('change', e => {
    datosBusqueda.color = e.target.value;
    
    filtrarAuto();
});

//funciones
function mostrarAutos(autos){

    limpiarHTML(); //elimina el html previo

    autos.forEach(auto => {

        const { marca, modelo,year, puertas,transmision,precio,color} = auto;
        const autoHTML = document.createElement('p');

        autoHTML.textContent = `
        ${marca} ${modelo} - ${year} - ${puertas} Puertas-${transmision} -${precio} Precio- Color: ${color}
        `;

        //insertar en el html
        resultado.appendChild(autoHTML)
    }); 
}

//limpiar HTML
function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

//genera los años del select
function llenarSelect(){

    for(let i = max; i >= min; i--){
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion); //agrega las opciones de año al select
    }
}

//funcion que filtra en base a la busqueda
function filtrarAuto(){
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);

    

    if(resultado.length){
        //console.log(resultado);
        mostrarAutos(resultado);
    } else{
        noResultado();
    }
}

function noResultado(){

    limpiarHTML();
    
    const noResultado = document.createElement('div');

    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No Hay Resultados';
    resultado.appendChild(noResultado);
}

function filtrarMarca(auto){
    if(datosBusqueda.marca){
        return auto.marca === datosBusqueda.marca;
    }
    return auto;
}

function filtrarYear(auto){
    if(datosBusqueda.year){
        return auto.year === parseInt( datosBusqueda.year);
    }
    return auto;
}

function filtrarMinimo(auto){
    const {minimo} = datosBusqueda
    if(minimo){
        return auto.precio >= minimo;
    }
    return auto;
}

function filtrarMaximo(auto){
    const {maximo} = datosBusqueda
    if(maximo){
        return auto.precio <= maximo;
    }
    return auto;
}

function filtrarPuertas(auto){
    if(datosBusqueda.puertas){
        return auto.puertas === datosBusqueda.puertas;
    }
    return auto;
}

function filtrarTransmision(auto){
    if(datosBusqueda.transmision){
        return auto.transmision === datosBusqueda.transmision;
    }
    return auto;
}

function filtrarColor(auto){
    if(datosBusqueda.color){
        return auto.color === datosBusqueda.color;
    }
    return auto;
}