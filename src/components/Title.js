import React from 'react'
import styled from 'styled-components'

export const Title = ({name, title}) => {
    return (
        <TitleWrapper className='row'>
            <div className='col mx-auto my-2 text-center text title'>
                <h1 className='text-capitalize font-weight-bold'>
                    {name} <strong className='text-blue'>{title}</strong>
                </h1>
            </div>
        </TitleWrapper>
    )
}

const TitleWrapper = styled.div`
margin-top: 100px;
    `