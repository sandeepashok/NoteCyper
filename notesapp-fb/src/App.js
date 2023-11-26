import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Preview from './components/Preview/Preview';
import { v4 as uuidv4 } from 'uuid';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore, collection, query, where, onSnapshot, doc, setDoc, deleteDoc } from './firebase'; // Update this import statement
import Signin from './components/Signin/Signin';

function App() {
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState();
  const [isPressed, setIsPressed] = useState(false);
  const [user] = useAuthState(auth);

  const getNotes = () => {
    onSnapshot(query(collection(firestore, 'notes'), where('userId', '==', user.uid)), (snapshot) => {
      const serverNotes = snapshot.docs.map((doc) => doc.data());
      setNotes(serverNotes);
    });
  };

  useEffect(() => {
    if (user) {
      getNotes();
    }
  }, [user]);

  const body = `
  - ##### **Note (This is markdown text enabled textfield!)** \n\n > > > > **&&** \n\n  > **(>>save notes after adding<<)**
  - *This is a italicized text* \
  - **This is a bold text**
  - >This is a blockquote 
   >Ordered list >>
  1. First item
  2. Second item
  3. Third item 
   >Unordered list >>
  - First item
  - Second item
  - Third item
  `+ " - `console.log('hello world!')`" + `
  - [This is my website link](https://sandeep.netlify.app)- syntax for link: [link description] (link) *[note: without space]*
  - This is an image >>![image](https://static-cdn.jtvnw.net/jtv_user_pictures/89f44435-2040-4707-97e1-4aa6ad2c2128-profile_image-300x300.png)
  - syntax for image: ! [alt text] (google image address link) *(note: without space)* => image
  # This is H1
  ## This is H2
  ### This is H3
  #### This is H4
  ##### This is H5
  ###### This is H6
  ### *You can view all the syntax for things present here in the editor ^_^*
  `

  const onAddNote = () => {
    const newNote = {
      id: uuidv4(),
      title: '>> Add a title here <<',
      body: body,
      lastModified: Date.now(),
      userId: user.uid,
    };

    setNotes([...notes, newNote]);
    setActiveNote(newNote.id);

    // Add the new note to Firestore
    setDoc(doc(firestore, `notes`, newNote.id), newNote);
  };

  const onDeleteNote = (noteId) => {
    setNotes(notes.filter((note) => note.id !== noteId));
    // Delete the note from Firestore
    deleteDoc(doc(firestore, `notes`, noteId));
  };

  const onUpdateNote = (updatedNote) => {
    // Update the note in Firestore
    setDoc(doc(firestore, `notes`, updatedNote.id), updatedNote);
  };

  let noNotesClass = isPressed ? 'hide-selected-none' : 'selected-none';
  let previewClass = isPressed ? 'hide-app-preview' : 'app-preview';
  let sidebarClass = isPressed ? 'app-sidebar' : 'hide-app-sidebar';

  const getActiveNote = () => {
    const currentNote = notes.find((note) => note.id === activeNote);
    return currentNote;
  };

  return (
    <div className="App">
      {user ? (
        <>
          <Navbar setIsPressed={setIsPressed} isPressed={isPressed} onAddNote={onAddNote} auth={auth} userName={user.displayName} />

          <div className="container">
            <Sidebar
              notes={notes}
              onAddNote={onAddNote}
              onDeleteNote={onDeleteNote}
              activeNote={activeNote}
              setActiveNote={setActiveNote}
              sidebarClass={sidebarClass}
              setIsPressed={setIsPressed}
              isPressed={isPressed}
            />
            <Preview
              activeNote={getActiveNote()}
              activeNoteId={activeNote}
              onUpdateNote={onUpdateNote}
              onAddNote={onAddNote}
              noNotesClass={noNotesClass}
              previewClass={previewClass}
            />
          </div>
        </>
      ) : (
        <Signin />
      )}
    </div>
  );
}

export default App;
