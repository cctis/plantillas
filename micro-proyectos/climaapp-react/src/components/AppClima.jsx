import Formulario from "./Formulario"
import Resultado from "./Resultado"
import useClima from "../Hooks/useClima"
import Loading from "./Loading"

const AppClima=()=> {

  const {resultado,cargando,noResultado}=useClima()

  return (
    <main className='dos-columnas'>
        <Formulario/>

          { cargando ? <Loading/> :
          resultado?.name ? <Resultado/> : noResultado ? <p>{noResultado}</p> :
        <p>El clima se va a mostrar aqui</p>
        }
        
    </main>
  )
}

export default AppClima