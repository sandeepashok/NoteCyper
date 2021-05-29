import React, { useState, useEffect } from 'react'
import './App.css';
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import Preview from './components/Preview/Preview'
import { v4 as uuidv4 } from 'uuid';
import db from './firebase'

function App() {

  const [notes, setNotes] = useState([]);

  const [activeNote, setActiveNote] = useState();

  const [isPressed, setIsPressed] = useState(false)

  const getNotes = () => {

    db.onSnapshot((snapshot) => {

      const serverNotes = [];

      snapshot.forEach((doc) => {

        serverNotes.push(doc.data());

      });

      setNotes(serverNotes)

    })

  }

  useEffect(() => {

    getNotes();

  }, [])

  const onAddNote = () => {

    const newNote = {
      id: uuidv4(),
      title: 'Title',
      body: '**Note (This is markdown text enabled textfield!)** \n\n > > > > **&&** \n\n  > **(>>save notes after adding<<)** \n\n *view sample markdown doc to write in markdown*',
      lastModified: Date.now()
    }

    setNotes([...notes, newNote])

    setActiveNote(newNote.id)
  }

  const onDeleteNote = (noteId) => {

    setNotes(notes.filter((note) => note.id !== noteId))

    db.doc(noteId).delete()

  }

  const onUpdateNote = (updatedNote) => {

    db.doc(updatedNote.id).set({

      ...updatedNote

    })

  }

  let noNotesClass = isPressed ? "hide-selected-none" : "selected-none"

  let previewClass = isPressed ? "hide-app-preview" : "app-preview"

  let sidebarClass = isPressed ? "app-sidebar" : "hide-app-sidebar"


  const getActiveNote = () => {

    const currentNote = notes.find((note) => note.id === activeNote)

    return currentNote

  }

  return (

    <div className="App">

      <Navbar setIsPressed={setIsPressed} isPressed={isPressed} onAddNote={onAddNote} />

      <div className='container'>

        <Sidebar notes={notes} onAddNote={onAddNote} onDeleteNote={onDeleteNote} activeNote={activeNote} setActiveNote={setActiveNote} sidebarClass={sidebarClass} setIsPressed={setIsPressed} isPressed={isPressed} />

        <Preview activeNote={getActiveNote()} activeNoteId={activeNote} onUpdateNote={onUpdateNote} onAddNote={onAddNote} noNotesClass={noNotesClass} previewClass={previewClass} />

      </div>

    </div>

  );
}

export default App;
