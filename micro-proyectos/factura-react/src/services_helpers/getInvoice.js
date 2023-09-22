import { Invoice } from "../data/Invoice"

export const getInvoice= ()=>{

    // let total=0;
    // Invoice.items.forEach(
    //     item =>{
    //         total = total + item.price * item.quantity;
    //     }
    // )

    const total = calculateTotal(Invoice.items)
    return {...Invoice,total}
}

export const calculateTotal = (items=[]) =>{
   return items
    .map( item => item.price * item.quantity)
    .reduce((acumulator,currentValue)=> acumulator + currentValue, 0)
}