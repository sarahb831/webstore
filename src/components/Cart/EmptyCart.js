import React from 'react'
import styled from 'styled-components'

export default function EmptyCart() {
    return (
        <EmptyCartWrapper className='container'>
            <div className='row'>
                <div className='col-10 mx-auto text-center text-title'>
                    <h1>Your cart is empty</h1>
                </div>
            </div>
        </EmptyCartWrapper>
    )
}

const EmptyCartWrapper = styled.div`
margin-top: 110px;
`