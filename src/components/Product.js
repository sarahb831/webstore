import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { ProductConsumer } from '../context'
import picture from '../img/product-1.png'

export default class Product extends Component {
    render() {
        // handle empty items
        if (this.props && this.props.product) {
            const {id, title, img, price, inCart} = this.props.product
            
            return (
                
                <ProductWrapper className='col-9 mx-auto col-md-6 col-lg-3
                    my-3'>
                    <div className='card'>
                        <ProductConsumer>
                            {value => (
                                <div 
                                    className={this.props.product.rotate ? 'img-container p-5 rotate' : 'img-container p-5'}
                                    onClick={()=>
                                        value.handleDetail(id)}>
                                    <Link to='/details'>
                                        <img src={img} alt='product' 
                                        className={this.props.product.rotate ? 'card-img-top rotate' : 'card-img-top'} />
                                    </Link>
                                    <button className='cart-btn' 
                                        disabled={inCart? true : false}
                                        onClick={() => {
                                            value.addToCart(id)
                                            value.openModal(id)
                                        }} >
                                            {inCart ? (<p className='text-capitalize mb-0' disabled>
                                            in cart</p>) 
                                            : (<i className='fas fa-truck-pickup'/> )} 
                                    </button>
                                </div>
                        )}
                        </ProductConsumer>
                        {/* card footer */}
                        <div className='card-footer d-flex justify-content-between'>
                            <p className='align-self-center mb-0'>
                                {title}
                            </p>
                            <h5 className='text-blue font italic mb-0'>
                                <span className='mr-1'>$</span>
                                {price}
                            </h5>
                        </div>

                    </div>
                </ProductWrapper>
            )
        }  else return null
    }
}

const ProductWrapper = styled.div`
    .card {
        border-color: transparent;
        transition: all 1s linear;
        height: 260px; /* new */
    }
    .card-footer {
        position: absolute;
        bottom: 0px;
        width: 100%;
        background: transparent;
        border-top: transparent;
        transiton: all 1s linear;
    }
    &:hover {
        .card {
            border: 0.04rem solid rgba(0,0,0,0.2);
            box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.2);
        }
        .card-footer {
            background: rgba(247, 247, 247);
        }
    }
    .img-container {
        position: relative;
        overflow: hidden;
    }

    .rotate {
        transform: rotate(90deg);
        transition:  transform: 0;
    }

    .card-img-top {
        display: block;
        max-width: 100%;
        margin-left: auto;
        margin-right: auto;
        max-height: 100%;
        /* max-height: 175px; */
        width: auto;
        transition: all 1s linear;
    }

    .img-container:hover .card-img-top {
        transform: scale(1.2);
    }

    .cart-btn {
        position: absolute;
        bottom: 50px;
        right: 0;
        padding: 0.2rem 0.4rem;
        background: var(--darkBlue);
        border: none;
        color: var(--mainWhite);
        font-size: 1.4rem;
        border-radius: 0.5rem 0 0 0;
        transform: translate(100%, 100%);
        transition: all .1s linear;
    }

    .img-container:hover .cart-btn {
        transform: translate(0, 0);
    }

    .cart-btn:hover {
        color: var(--mainBlue);
        cursor: pointer;
    }
`