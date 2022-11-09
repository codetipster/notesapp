import Notes from './components/Notes';
import Button from './components/Button';
import { useState, useEffect } from 'react';
import axios from 'axios';
function App(props) {
  const [newNote, setNewNote] = useState('');
  const [notesRepo, setNotesRepo] = useState([]);
  const [display, displayAll] = useState(true);

  //Fetching data from the server
  useEffect(() => {
    axios.get(' http://localhost:3001/notes').then((response) => {
      setNotesRepo(response.data);
    });
  }, []);

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
      date: new Date(),
      important: Math.random() < 0.5,
    };

    axios.post(' http://localhost:3001/notes', newObject).then((response) => {
      setNotesRepo(notesRepo.concat(response.data));
      setNewNote('');
    });
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
      <label>
        <input type="checkbox" onClick={() => displayAll(!display)} />
        Show Important Notes
      </label>
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
