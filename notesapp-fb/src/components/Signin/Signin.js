import React from 'react'
import { GoogleAuthProvider, auth, signInWithPopup } from '../../firebase'
import './signin.css'

export default function Signin() {

  const signInWithGoogle = async () => {

    const provider = new GoogleAuthProvider();

    await signInWithPopup(auth, provider)

  }
  return (
    <div className='signin-container'>

      <div className='signin-page'>

        <img src='/note.svg' alt='notes-icon' className='brand-logo' />

        <h1>NoteCyper</h1>

        <h4>Sign In with Google, Start taking notes in markdown enabled Notepad.</h4>

        <button onClick={signInWithGoogle} className='signin-btn'>
          <img src='/google.png' alt='google-img' className='google-img' />
          <span className='btn-name'>Sign in with Google</span>
        </button>
      </div>

    </div >
  )
}