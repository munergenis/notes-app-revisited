const Sidebar = (props) => {
  const noteElements = props.notes.map((note, index) => {
    let firstLine
    const firstNewLineIndex = note.body.indexOf('\n')
    if (firstNewLineIndex < 0 && note.body) {
      firstLine = note.body
    } else if (firstNewLineIndex < 1) {
      firstLine = `New note ${index}`
    } else {
      firstLine = note.body.slice(0, firstNewLineIndex)
    }

    return (
      <div key={note.id}>
        <div

            className={`title ${
                note.id === props.currentNote.id ? 'selected-note' : ''
            }`}
            onClick={() => props.setCurrentNoteId(note.id)}
        >
            <h4 className="text-snippet">{firstLine}</h4>
        </div>
      </div>
    )
  })

  return (
    <section className="pane sidebar">
        <div className="sidebar--header">
            <h3>Notes</h3>
            <button className="new-note" onClick={props.newNote}>+</button>
        </div>
        {noteElements}
    </section>
  )
}

export default Sidebar
