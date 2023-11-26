import './sidebar.css'
import ReactMarkdown from 'react-markdown'
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

export default function Sidebar({ notes, onAddNote, onDeleteNote, activeNote, setActiveNote, sidebarClass, setIsPressed, isPressed }) {

    const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified)

    return (
        <div className={sidebarClass}>

            <div className='app-sidebar-notes'>

                <button onClick={onAddNote} className='addnote-mob'>&#43;</button>

                {sortedNotes.map((note => {
                    return (

                        <div className={`app-sidebar-note ${note.id === activeNote && 'active'}`} key={note.id} onClick={() => {
                            setIsPressed(!isPressed)
                            setActiveNote(note.id)
                        }}>

                            <div className='sidebar-note-title'>

                                <strong>{note.title}</strong>

                                <IconButton aria-label="delete" onClick={() => onDeleteNote(note.id)} className='sidebar-delete-btn'>
                                    <DeleteIcon />
                                </IconButton>

                            </div>

                            <ReactMarkdown className='reactMarkdown'>{note.body && note.body.substr(0, 50) + '...'}</ReactMarkdown>

                            <small className='note-meta'>Last modified: {new Date(note.lastModified).toLocaleDateString('en-IN', {
                                hour: '2-digit',
                                minute: '2-digit'
                            })}</small>

                        </div>

                    );

                }))}

            </div>

        </div>

    );
}