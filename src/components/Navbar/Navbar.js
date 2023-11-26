import React from 'react'
import MenuIcon from '@material-ui/icons/Menu';
import './navbar.css'


export default function Navbar({ setIsPressed, isPressed, auth, userName }) {
    return (
        <div className='header'>

            <div className='head-and-ham'>

                <div className='ham' onClick={() => {
                    setIsPressed(!isPressed)
                }}> <MenuIcon className='ham-icon' /> </div>

                <h1 className='heading'>NoteCyper</h1>

            </div>
            <div className='username-signout' >
                <p>{`Hi, ${userName}!`}</p>
                <button onClick={() => auth.signOut()} color='primary' className='signout-btn'>Sign Out</button>
            </div>
        </div>
    )
}
