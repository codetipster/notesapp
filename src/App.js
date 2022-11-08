import Notes from './components/Notes';
import Button from './components/Button';
import { useState } from 'react';
function App(props) {
  const [newNote, setNewNote] = useState('');
  const [notesRepo, setNotesRepo] = useState(props.notes);
  const [display, displayAll] = useState(false);

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  //Toggle functionality for notes display
  const notesToShow = display
    ? notesRepo
    : notesRepo.filter((note) => note.important === true);

  const addNote = (event) => {
    event.preventDefault();
    const newObject = {
      content: newNote,
      id: props.notes.length + 1,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    };
    setNotesRepo(notesRepo.concat(newObject));
    setNewNote('');
    console.log('form submitted successfully', notesRepo);
  };

  return (
    <div className="App">
      <h1>Notes Application</h1>
      <p>
        <i>Making note taking easy and accessible...</i>
      </p>
      <ul>
        {notesToShow.map((note) => (
          <Notes key={note.id} note={note.content} />
        ))}
      </ul>

      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
          placeholder="Enter new note"
          type="textfield"
        />
        <Button label="Submit" />
      </form>
    </div>
  );
}

export default App;
