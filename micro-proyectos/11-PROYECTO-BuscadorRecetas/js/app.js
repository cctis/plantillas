//https://www.themealdb.com/api.php

function iniciarApp(){

    const resultado = document.querySelector('#resultado');

    const selectCategorias = document.querySelector('#categorias');

    if(selectCategorias){
        selectCategorias.addEventListener('change',seleccionarCategoria);
        obtenerCategorias();
    }
    
    const favoritosDiv = document.querySelector('.favoritos');
    if(favoritosDiv){
        obtenerFavoritos();
    }
    
    const modal = new bootstrap.Modal('#modal',{})

   

    function obtenerCategorias(){

        const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';

        fetch(url) //llamado a la url
            .then(respuesta => { //entonces quiero una respuesta de tipo json
                return respuesta.json()
            })
            .then(resultado => { //entonces quiero imprimir los resultados
                mostrarCategorias(resultado.categories)
            })
    }

    function mostrarCategorias(categorias = []){
        categorias.forEach( categoria =>{ //accediento a cada elemento de la categoria

            const { strCategory}=categoria;
            const option = document.createElement('OPTION');
            option.value = strCategory; //trae las opciones por el nombre
            option.textContent = strCategory;
            selectCategorias.appendChild(option);
                        
        })
    }

    function seleccionarCategoria(e){
        const categoria = e.target.value;
        const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoria}`;

        fetch(url)
            .then(respuesta => respuesta.json())
            .then(resultado => mostrarRecetas(resultado.meals))
    }

    function mostrarRecetas(recetas = []){

        limpiarHtml(resultado);

        const headig = document.createElement('H2');
        headig.classList.add('text-center','text-black','my-5');
        headig.textContent = recetas.length ? 'Resultados': 'No hay resultados';
        resultado.appendChild(headig);


        //iterar en los resultados
        recetas.forEach(receta => {

           const {idMeal,strMeal,strMealThumb} =receta;

            const recetaContenedor = document.createElement('DIV');
            recetaContenedor.classList.add('col-md-4');

            const recetaCard = document.createElement('DIV');
            recetaCard.classList.add('card','mb-4');

            const recetaImagen = document.createElement('IMG');
            recetaImagen.classList.add('card-img-top');
            recetaImagen.alt = `Imagen de la receta ${strMeal ?? receta.titulo} `
            recetaImagen.src = strMealThumb ?? receta.img; //si este valor existe...

            const recetaCardBody = document.createElement('DIV');
            recetaCardBody.classList.add('card-body');

            const recetaHeading = document.createElement('H3');
            recetaHeading.classList.add('card-title','mb-3');
            recetaHeading.textContent = strMeal ?? receta.titulo;

            const recetaButoon= document.createElement('BUTTON');
            recetaButoon.classList.add('btn','btn-danger','w-100');
            recetaButoon.textContent = 'Ver Receta';
            // recetaButoon.dataset.bsTarget = "#modal";
            // recetaButoon.dataset.bsToggle = "modal";

            recetaButoon.onclick = function(){
                seleccionarReceta(idMeal ?? receta.id);
            }

            //inyectar en el codigo html

            recetaCardBody.appendChild(recetaHeading);
            recetaCardBody.appendChild(recetaButoon);
            recetaCard.appendChild(recetaImagen);
            recetaCard.appendChild(recetaCardBody);

            recetaContenedor.appendChild(recetaCard);

            resultado.appendChild(recetaContenedor)
            
        })
    }

    function seleccionarReceta(id){
        const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`

        fetch(url)
            .then(respuesta => respuesta.json())
            .then(resultado => mostrarRecetaModal(resultado.meals[0]))
    }

    function mostrarRecetaModal(receta){

       

        const {idMeal,strInstructions,strMeal,strMealThumb} = receta;

        //añadir contenido al modal
        const modalTitle = document.querySelector('.modal .modal-title');
        const modalBody = document.querySelector('.modal .modal-body');

        modalTitle.textContent = strMeal;
        modalBody.innerHTML = `
            <img class="img-fluid" src="${strMealThumb}" alt="receta ${strMeal}" />
            <h3 class="my-3">Instrucciones</h3>
            <p>${strInstructions}</p>
            <h3 class="my-3">Ingredientes y Cantidades</h3>
        `;

        const listGroup = document.createElement('UL');
        listGroup.classList.add('list-group');

        //mostrar cantidades e ingredientes
        for(let i=1; i<=20; i++){
            if(receta[`strIngredient${i}`]){
                const ingrediente = receta[`strIngredient${i}`];
                const cantidad = receta[`strMeasure${i}`];

                const ingredienteLi = document.createElement('LI');
                ingredienteLi.classList.add('list-group-item');
                ingredienteLi.textContent = `${ingrediente} - ${cantidad}`

                listGroup.appendChild(ingredienteLi);
            }
        }

        modalBody.appendChild(listGroup);

        const modalFooter = document.querySelector('.modal-footer');
        limpiarHtml(modalFooter);

        //botones de cerrar y favorito
        const btnFavorito = document.createElement('BUTTON');
        btnFavorito.classList.add('btn','btn-danger','col');
        btnFavorito.textContent = existeSorage(idMeal) ? 'Eliminar Favorito' : 'Guardar Favorito';

        //almacenar en localStorage

        btnFavorito.onclick = function(){

            if(existeSorage(idMeal)){
                eliminarFavorito(idMeal);
                btnFavorito.textContent = 'Guardar Favorito';
                mostrarToast('Eliminado Correctamente')
                return
            }

            agregarFavorito({
                id:idMeal,
                titulo:strMeal,
                img: strMealThumb
            });

            btnFavorito.textContent = 'Eliminar Favorito';
            mostrarToast('Agregado Correctamente')
        }

        const btnCerrarModal = document.createElement('BUTTON');
        btnCerrarModal.classList.add('btn','btn-secondary','col');
        btnCerrarModal.textContent = 'Cerrar';
        btnCerrarModal.onclick = function (){
            modal.hide();
        }

        modalFooter.appendChild(btnFavorito);
        modalFooter.appendChild(btnCerrarModal);

        //muestra el modal
        modal.show();
    }

    function agregarFavorito(receta){
        const favoritos = JSON.parse(localStorage.getItem('favoritos')) ?? []; //?? en caso de que se marque null lo de la izquierda aplica lo que hay en la derecha
        localStorage.setItem('favoritos',JSON.stringify([...favoritos,receta]));
    }

    function eliminarFavorito(id){
        const favoritos = JSON.parse(localStorage.getItem('favoritos')) ?? [];
        const nuevosFavoritos = favoritos.filter(favorito => favorito.id !== id);

        localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));
    }

    function existeSorage(id){
        const favoritos = JSON.parse(localStorage.getItem('favoritos')) ?? [];
        return favoritos.some(favorito => favorito.id === id);
    }

    function mostrarToast(mensaje){
        const toastDiv = document.querySelector('#toast');
        const toastBody = document.querySelector('.toast-body');
        const toast = new bootstrap.Toast(toastDiv);
        toastBody.textContent = mensaje;

        toast.show();
    }

    function obtenerFavoritos(){
        const favoritos = JSON.parse(localStorage.getItem('favoritos')) ?? [];
        if(favoritos.length){
            mostrarRecetas(favoritos);
            return
        }

        const noFavoritos = document.createElement('P');
        noFavoritos.textContent = 'No hay favoritos aún';
        noFavoritos.classList.add('fs-4','text-center','font-bold','mt-5');
        favoritosDiv.appendChild(noFavoritos);
    }

    function limpiarHtml(selector){
        while(selector.firstChild){
            selector.removeChild(selector.firstChild);
        }
    }
}

document.addEventListener('DOMContentLoaded',iniciarApp)