import React from 'react'
import PropTypes from 'prop-types'

export const RowItemView = ({id,product,price,quantity,handlerDeleteItems}) => {
  return (
    <>
        <tr >
                <td>{product}</td>
                <td>{price}</td>
                <td>{quantity}</td>
                <td><button className='btn btn-danger' onClick={()=> handlerDeleteItems(id)}>Eliminar</button></td>
        </tr>
    </>
  )
}

RowItemView.propTypes = {
  product: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantity:PropTypes.number.isRequired
}