import './preview.css'
import ReactMarkdown from 'react-markdown'
import { useEffect, useState } from 'react'

export default function Preview({ activeNoteId, onUpdateNote, activeNote, onAddNote, noNotesClass, previewClass }) {

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
            <div className={noNotesClass}>
                <div className='no-active-note'>Add or Select a Note</div>
                <button onClick={onAddNote} className='addnote-mob'>&#43;</button>
            </div>
        )

    }

    return (
        <div className={previewClass} key={activeNoteId}>

            <button onClick={onAddNote} className='addnote-mob'>&#43;</button>

            <div className='app-preview-note-edit'>

                <input type='text' id='title' value={title} onChange={(e) => setTitle(e.target.value)} autoFocus placeholder='Title' />

                <textarea id='body' value={body} onChange={(e) => setBody(e.target.value)} placeholder='Write Notes Here....' />

                <button onClick={onSave} className='save-btn'>Save</button>


            </div>

            <div className='app-preview-note-preview'>
                <div className='app-note-preview'>
                    <h1 className='preview-title'>{title}</h1>

                    <ReactMarkdown className='markdown-preview'>{body}</ReactMarkdown>
                </div>
            </div>

        </div>
    );
}