import React, { useEffect, useState } from 'react';
import {Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout } from '../../context/userSlice';

function NavbarStrays (props) {

    const dispatch = useDispatch();
    const isLogged = useSelector(state => state.user.isLogged);
    const usuario = useSelector(state => state.user.user);

    const handleLogout = () => {
        dispatch(logout());
    };
    

    return(
        <nav className={`${isLogged ? 'navbar--logged' : 'navbar'}`}> 
            <img style={{width: '30px'}} src='src\assets\logonew.ico'></img>
            <Link style={{minWidth: '80px'}} className="fs--logo" to="/Ghabits/">G Habits</Link>
            {isLogged 
                ? 
                <ul className="navbar__items">
                    <Link className="navbar__item fs--navitem" to="/Ghabits/finance">Finance</Link>
                    <Link className="navbar__item fs--navitem" to="/Ghabits/holistic">Holistic</Link>
                    <Link className="navbar__item fs--navitem" to="/Ghabits/health">Health</Link>
                    <img style={{marginLeft:'auto', height: '30px', borderRadius: '50%'}} src={usuario.imageUrl} />
                    <button onClick={handleLogout}  className='button--icon-text'>
                        <i className="pi pi-user" style={{fontSize:'12px', color:'white'}}></i>
                        <span className='fs--navitem'>Cerrar sesión</span>
                    </button>
                </ul>
                : 
                <ul className="navbar__items">
                    <Link className="navbar__item fs--navitem" to="/Ghabits/login">Comencémos</Link>
                </ul>
            }
        </nav>
    );
}

export default NavbarStrays;
