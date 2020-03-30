import React from 'react'

export const Title = ({name, title}) => {
    return (
        <div className='row'>
            <div className='col mx-auto my-2 text-center text title'>
                <h1 className='text-capitalize font-weight-bold'>
                    {name} <strong className='text-blue'>{title}</strong>
                </h1>
            </div>
        </div>
    )
}