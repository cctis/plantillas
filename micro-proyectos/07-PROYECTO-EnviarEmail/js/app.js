document.addEventListener('DOMContentLoaded',function() {
    const email = {
        email: '',
        asunto: '',
        mensaje:''
    }
    //seleccionar los elementos de la interfaz
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario= document.querySelector('#formulario');
    const btnSubmit= document.querySelector('#formulario button[type="submit"]');
    const btnReset= document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');
       
    //para que no sea repetitivo se puede asignar el evento por medio de una function

    inputEmail.addEventListener('input',validar);

    inputAsunto.addEventListener('input',validar);

    inputMensaje.addEventListener('input',validar);

    formulario.addEventListener('submit',enviarEmail);

    btnReset.addEventListener('click',function(e){
        e.preventDefault();

        //reiniciar el objeto
       resetFormulario();

    })

    function enviarEmail(e){
        e.preventDefault();

        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        setTimeout( () =>{
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');
    

            resetFormulario();

            //crear una alerta
            const alertaExito = document.createElement('P');
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center','rounded-lg','mt-10', 'font-bold','text-sm','uppercase');

            alertaExito.textContent = 'Mensaje enviado correctamente';

            formulario.appendChild(alertaExito);

            setTimeout( () =>{
                alertaExito.remove();
            },3000);
        },3000);
    }

    function validar(event){ 
       
        if(event.target.value.trim() === ''){
            mostrarAlerta( `el campo ${event.target.id} es obligatorio`,event.target.parentElement);
            email[event.target.name] = '';
            comprobarEmail();
            return;
        }

        if( event.target.id ==='email'&& !validarEmail(event.target.value)){
            mostrarAlerta('el email no es valido', event.target.parentElement);
            email[event.target.name] = '';
            comprobarEmail();
            return;
        };
        
        limpiarAlerta(event.target.parentElement);
        
        //asignar los valores
        email[event.target.name]= event.target.value.trim().toLowerCase();

        //comprobar el objeto de email
        comprobarEmail();
    }

    function mostrarAlerta(mensaje,referencia){
        
        limpiarAlerta(referencia)

        //alerta en html
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600','text-white','p-2','text-center')

        //inyectar el error en el formulario
        referencia.appendChild(error)
    }

    function limpiarAlerta(referencia){
        //comprueba si ya existe una alerta
        const alerta = referencia.querySelector('.bg-red-600');

        if(alerta){
            alerta.remove();
        }

    }

    function validarEmail(email){
        const regex = /^\w+([.-_+]?\w+)@\w+([.-]?\w+)*(\.\w{2,10})+$/

        const resultado= regex.test(email);
        return resultado;
    }

    function comprobarEmail(){
        if(Object.values(email).includes('')){
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return
        }
            btnSubmit.classList.remove('opacity-50');
            btnSubmit.disabled = false;
        
    }

    function resetFormulario(){

         //reiniciar el objeto
         email.email = '';
         email.asunto = '';
         email.mensaje= '';
 
         formulario.reset();
         comprobarEmail();
    }
});

