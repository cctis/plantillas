import React from 'react'
import PropTypes from 'prop-types'
import { RowItemView } from './RowItemView'

export const ListItemsView = ({title,items,handlerDeleteItems}) => {
  return (
    <>
     <h4>{title}</h4>
      <table className='table table-striped table-hover'>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {items.map(({ id, product, price, quantity }) => {
            return (
              <RowItemView key={id} id={id} product={product} price={price} quantity={quantity} handlerDeleteItems={handlerDeleteItems}/>
            )
          })}

        </tbody>
      </table>
    </>
  )
}

ListItemsView.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired
}