import React, { Component } from 'react'
import { Link }from 'react-router-dom'
import logo from '../logo.svg'
import iconfinder from '../img/iconfinder_goat_4591892.svg'
import styled from 'styled-components'
import { ButtonContainer } from './Button'
import { Goats } from '../img/goats.jpg'


export default class Navbar extends Component {
    render() {
        return (
            <NavWrapper className="navbar navbar-expand-sm bg-primary navbar-dark px-sm-5">
                {/*
                    https://www.iconfinder.com/kerismaker
                */}
                <Link to='/'>
                    <img src={iconfinder} alt='goat' className='logo' />
                </Link>
                <ul className='navbar-nav align-items-center'>
                    <li className='nav-item ml-5'>
                        <Link to='/' className='nav-link'>
                            Lawn Mower Rentals
                        </Link>
                    </li>
                </ul>
                <Link to='/cart' className='ml-auto mr-5'>
                    <ButtonContainer nowrap>
                        <span className='mr-2'>
                            <i className='fas fa-truck-pickup' />
                        </span>                       
                        cart
                    </ButtonContainer>
                </Link>
            </NavWrapper>
        )
    }
}

const NavWrapper = styled.nav`
    background: var(--mainGreen) !important;
    a {
        width: 10%;
    }
    .logo {
        width: 100%;
    }
    .nav-link {
       // width: 10%
       white-space: nowrap;
        color: var(--mainWhite) !important;
        font-size: 1.3rem;
        text-transform: capitalize;
    }`