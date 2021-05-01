import React, { useState, useEffect } from 'react'
import './App.css';
import Sidebar from './components/Sidebar/Sidebar'
import Preview from './components/Preview/Preview'
import { v4 as uuidv4 } from 'uuid';
import db from './firebase'

function App() {

  // const localStorageNotes = localStorage.getItem('notes') && JSON.parse(localStorage.getItem('notes'))

  const [notes, setNotes] = useState([]);


  const [activeNote, setActiveNote] = useState();

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

    // localStorage.setItem('notes', JSON.stringify(notes))

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

    // const updatedNotesArr = notes.map((note) => {
    //   return note.id === activeNote ? updatedNote : note
    // })
    // setNotes(updatedNotesArr)
  }


  const getActiveNote = () => {
    const currentNote = notes.find((note) => note.id === activeNote)
    return currentNote
  }

  return (

    <div className="App">

      <Sidebar notes={notes} onAddNote={onAddNote} onDeleteNote={onDeleteNote} activeNote={activeNote} setActiveNote={setActiveNote} />

      <Preview activeNote={getActiveNote()} activeNoteId={activeNote} onUpdateNote={onUpdateNote} onAddNote={onAddNote} />

    </div>

  );
}

export default App;
