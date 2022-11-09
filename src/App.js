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

  //Alter data on server
  const toggleImportance = (id) => {
    const url = `http://localhost:3001/notes/${id}`;
    //find the particular note we want to modify
    const note = notesRepo.find((n) => n.id === id);
    //make your change
    const changedNote = { ...note, important: !note.important };

    axios.put(url, changedNote).then((response) => {
      //reset the notes status in server
      setNotesRepo(notesRepo.map((n) => (n.id !== id ? n : response.data)));
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
          <Notes
            key={note.id}
            note={note.content}
            toggleImportance={() => {
              toggleImportance(note.id);
            }}
          />
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
