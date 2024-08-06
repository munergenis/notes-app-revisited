import Sidebar from 'components/Sidebar.jsx'
import Editor from 'components/Editor.jsx'
import { data } from 'data/data.js'
import Split from 'react-split'
import { nanoid } from 'nanoid'
import { useState, useEffect } from 'react'

const App = () => {
  const [notes, setNotes] = useState(() => JSON.parse(localStorage.getItem('notes')) || [])
  const [currentNoteId, setCurrentNoteId] = useState(
    (notes[0] && notes[0].id) || ''
  )

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes))
  }, [notes])

  function createNewNote () {
    const newNote = {
      id: nanoid(),
      body: "# Type your markdown note's title here"
    }
    setNotes((prevNotes) => [newNote, ...prevNotes])
    setCurrentNoteId(newNote.id)
  }

  function updateNote (text) {
    setNotes(oldNotes => {
      let currentNoteIndex

      const newNotes = oldNotes.map((note, index) => {
        if (note.id === currentNoteId) {
          currentNoteIndex = index

          return { ...note, body: text }
        } else {
          return note
        }
      })

      if (currentNoteIndex > 0) {
        const [currentNote] = newNotes.splice(currentNoteIndex, 1)
        newNotes.unshift(currentNote)
      }

      return newNotes
    })
  }

  function findCurrentNote () {
    return (
      notes.find((note) => {
        return note.id === currentNoteId
      }) || notes[0]
    )
  }

  return (
    <main>
      {
        notes.length > 0
          ? <Split sizes={[30, 70]} direction="horizontal" className="split">
              <Sidebar
                notes={notes}
                currentNote={findCurrentNote()}
                setCurrentNoteId={setCurrentNoteId}
                newNote={createNewNote}
              />
              {
                currentNoteId
                  ? <Editor
                      currentNote={findCurrentNote()}
                      updateNote={updateNote}
                    />
                  : <div className='flex items-center mx-auto'>
                      <p>Seleccione una nota</p>
                    </div>
              }
            </Split>

          : <div className="no-notes">
              <h1 className='text-4xl mb-8'>You have no notes</h1>

              <button
                className="first-note"
                onClick={createNewNote}
              >
                Create one now
              </button>
            </div>
      }
    </main>
  )
}

export default App
