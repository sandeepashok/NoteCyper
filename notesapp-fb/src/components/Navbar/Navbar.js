import React from 'react'
import { Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import './navbar.css'


export default function Navbar({ onAddNote, setIsPressed, isPressed }) {
    return (
        <div className='header'>

            <div className='head-and-ham'>

                <div className='ham' onClick={() => {
                    setIsPressed(!isPressed)
                }}> <MenuIcon className='ham-icon' /> </div>

                <h1 className='heading'>NoteCyper</h1>

            </div>
            <div>
                <Button onClick={onAddNote} color='primary' className='add-btn'>Add Notes</Button>
                {/* <Button className='login-logout-btn'>Logout</Button> */}
            </div>
        </div>
    )
}
