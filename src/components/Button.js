import styled from 'styled-components'

export const ButtonContainer = styled.button`
text-transform: capitalize;
font-size: 1.4rem;
background: transparent;
border: 0.05rem solid;
border-color: ${props => 
    props.cart ? 'var(--mainYellow)' : 'var(--darkBlue)'};
color: ${props => 
    props.cart ? 'var(--mainYellow)' : 'var(--darkBlue)'};
border-radius: 0.5rem;
padding: 0.2rem 0.5rem;
cursor: pointer;
margin: 0.2rem 0.5rem 0.2rem 0;
//margin: 0.2rem 0 0.2rem 0;
transition: all 0.5s ease-in-out;
white-space: ${props =>
    props.nowrap ? 'nowrap' : 'normal'};
}
&:hover {
    background: ${props => 
        props.cart ? 'var(--mainYellow)' : 'var(--lightBlue)'};
    color: var(--mainBlue);
}
&:focus {
    outline: none;
}
`

