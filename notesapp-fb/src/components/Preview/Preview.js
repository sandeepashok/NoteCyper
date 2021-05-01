import './preview.css'
import ReactMarkdown from 'react-markdown'
import { useEffect, useState } from 'react'
import { Button } from '@material-ui/core';

export default function Preview({ activeNoteId, onUpdateNote, activeNote, onAddNote }) {

    useEffect(() => {
        setTitle(activeNote ? activeNote.title : "");
        setBody(activeNote ? activeNote.body : "")
    }, [activeNote])

    const [title, setTitle] = useState(activeNote ? activeNote.title : "");
    const [body, setBody] = useState(activeNote ? activeNote.body : "")

    const onSave = (e) => {
        e.preventDefault();
        onUpdateNote({
            ...activeNote,
            title: title,
            body: body
        })
    }

    if (!activeNote) {
        return (
            <div className='selected-none'>
                <div className='no-active-note'>No Note Selected</div>
                {/* <Button onClick={onAddNote} className='addnote-mob'>+</Button> */}
            </div>
        )

    }

    return (
        <div className='app-preview' key={activeNoteId}>

            {/* <Button onClick={onAddNote} className='addnote-mob'>+</Button> */}

            <div className='app-preview-note-edit'>

                <input type='text' id='title' value={title} onChange={(e) => setTitle(e.target.value)} autoFocus placeholder='Title' />

                <textarea id='body' value={body} onChange={(e) => setBody(e.target.value)} placeholder='Write Notes Here....' />

                <button onClick={onSave} className='save-btn'>Save</button>


            </div>

            <div className='app-preview-note-preview'>

                <h1 className='preview-title'>{title}</h1>

                <ReactMarkdown className='markdown-preview'>{body}</ReactMarkdown>

            </div>

        </div>
    );
}