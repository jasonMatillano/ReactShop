import React from 'react'
import { PRODUCTS } from '../../products'
import { Product } from './product'

export const Shop = () => {
  return (
    <div className='shop'>
        <div className='shop-title'>
            <h1>Jason Shop</h1>
        </div>
        <div className='products'>
            {PRODUCTS.map((product) => <Product data={product} key={product.id}/>)}</div>
    </div>
  )
}
