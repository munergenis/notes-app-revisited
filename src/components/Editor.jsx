import { useState } from 'react'
import Showdown from 'showdown'
import ReactMde from 'react-mde'

const Editor = ({ currentNote, updateNote }) => {
  const [selectedTab, setSelectedTab] = useState('write')

  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true
  })

  return (
      <section className="pane editor">
          <ReactMde
              value={currentNote.body}
              onChange={updateNote}
              selectedTab={selectedTab}
              onTabChange={setSelectedTab}
              generateMarkdownPreview={(markdown) =>
                Promise.resolve(converter.makeHtml(markdown))
              }
              minEditorHeight={80}
              heightUnits="vh"
          />
      </section>
  )
}

export default Editor
