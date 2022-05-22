import React from 'react';
import { Link } from 'react-router-dom';
import Customlink from '../utilities/Customlink';
import { RiMenu3Line } from 'react-icons/ri'

const Navbar = () => {
    return (
        <div className="navbar bg-warning">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex="0" className="btn btn-ghost md:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex="0" className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 md:hidden">
                        <li><Customlink to='/'>Home</Customlink></li>
                        <li><Customlink to='/login'>Login</Customlink></li>
                        <li><Customlink to='/register'>Register</Customlink></li>
                        <li><Customlink to='/blogs'>Blogs</Customlink></li>
                        <li><Customlink to='/portfolio'>Portfolio</Customlink></li>
                        <li><Customlink to='/dashboard'>Dashboard</Customlink></li>
                    </ul>
                </div>
                <Link to='/' className="btn btn-ghost normal-case text-xl">Chicony Electronics</Link>
            </div>
            <div className="navbar-center hidden md:flex">
                <ul className="menu menu-horizontal p-0">
                    <li><Customlink to='/'>Home</Customlink></li>
                    <li><Customlink to='/login'>Login</Customlink></li>
                    <li><Customlink to='/register'>Register</Customlink></li>
                    <li><Customlink to='/blogs'>Blogs</Customlink></li>
                    <li><Customlink to='/portfolio'>Portfolio</Customlink></li>
                    <li><Link to='/dashboard'>Dashboard</Link></li>
                </ul>
            </div>
            <div className="navbar-end lg:hidden">
                <label htmlFor="my-drawer-2" className="btn btn-ghost drawer-button"><RiMenu3Line className='text-xl'></RiMenu3Line></label>
            </div>
        </div>
    );
};

export default Navbar;