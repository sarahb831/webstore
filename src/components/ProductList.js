import React, { Component } from 'react'
import Product from './Product'
import { Title } from './Title'
import { ProductConsumer } from '../context'

export default class ProductList extends Component {
   componentDidMount() {
        window.scrollTo(0,0)
   }
    render() {
        return (
            <React.Fragment>
                <div className='pb-5'>
                    <div className='container'>
                        <Title name='Our' title='Mowers' />
                        <div className='row'>
                            <ProductConsumer>
                                {(value)=> {
                                    return value.products.map(product => {
                                            return <Product key={product.id} product={product} />
                                        }
                                    )
                                }}
                            </ProductConsumer>
                        </div>
                    </div>
                    
                </div>
 <Product />
            </React.Fragment>
             
        )
    }
}