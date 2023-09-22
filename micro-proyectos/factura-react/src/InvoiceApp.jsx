import React, { useEffect, useState } from 'react'

import { getInvoice,calculateTotal } from './services_helpers/getInvoice'
import { InvoiceView } from './components/InvoiceView'
import { ClientView } from './components/ClientView'
import { CompanyView } from './components/CompanyView'
import { ListItemsView } from './components/ListItemsView'
import { TotalView } from './components/TotalView'
import { FormItemsView } from './components/FormItemsView'

const invoiceInitial = {
    id:0,
    name:'',
    client:{
        name:'',
        lastname:'',
        adress:{
            country:'',
            city:'',
            street:' ',
            number:0
        }
    },
    company:{
        name:'',
        fiscalNumber:0
    },
    items:[ ]
  
}

export const InvoiceApp = () => {

  const [activeForm,setaActiveForm]=useState(false);

  const [total,setTotal]=useState(0);

  const [invoice,setInvoice]=useState(invoiceInitial)

  const [items,setItems]= useState([]);

  const [counter,setCounter]= useState(4);

  const { id, name, client, company } = invoice
  

  useEffect( () => {
    const data=getInvoice();
    setInvoice(data)
    setItems(data.items)
  },[]);

  

  useEffect( ()=>{
    //console.log('el counter cambio')
  },[counter]);

  useEffect( ()=>{
    //console.log('el items cambio')
    setTotal(calculateTotal(items))
  },[items]);

 
 
  const handlerAddItems =({product,price,quantity}) =>{
    
         setItems([...items, {id:counter,
        product:product.trim(),
        price:+ price.trim(),
        quantity:parseInt(quantity.trim(),10)
      }])

       setCounter(counter + 1)
    
  }

  const handlerDeleteItems = (id) => {
    setItems(items.filter(item => item.id !== id))
  }

  const onActiveForm = () =>{
    setaActiveForm(!activeForm)
  }

  return (
    <>
      
      <div className='container'>
        <div className="card my-3">
      <div className="card-header">
        Ejemplo Factura</div>
      <div className='card-body'>
        <InvoiceView id={id} name={name}/>

    <div className='row my-3'>
      <div className='col'>
        <ClientView title="Datos del cliente" client={client}/>
        </div>
        <div className='col'>
        <CompanyView title="Datos de la empresa" company={company}/>
        </div>
        </div>      
          <ListItemsView title="Productos de la factura" items={items} handlerDeleteItems={ handlerDeleteItems}/>
          <TotalView total={total}/>
          <button className='btn btn-secondary' onClick={onActiveForm}>{ !activeForm ? 'Agregar item': 'Ocultar item'}</button>
          { !activeForm || <FormItemsView handlerAddItems={ (newItem)=> handlerAddItems(newItem)}/> }
                   
      </div>
      </div>
      </div>
    </>
  )
}
