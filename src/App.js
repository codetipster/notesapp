import Notes from './components/Notes';
import Button from './components/Button';
import { useState, useEffect } from 'react';
import noteServices from './services/notes';

function App() {
  const [newNote, setNewNote] = useState('');
  const [notesRepo, setNotesRepo] = useState([]);
  const [display, displayAll] = useState(true);

  //Fetching data from the server
  useEffect(() => {
    noteServices.getAll().then((initialNotes) => {
      setNotesRepo(initialNotes);
    });
  }, []);

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  //Toggle functionality for notes display
  const notesToShow = display
    ? notesRepo
    : notesRepo.filter((note) => note.important === true);

  //adding data to server
  const addNote = (event) => {
    event.preventDefault();
    const newObject = {
      content: newNote,
      date: new Date(),
      important: Math.random() < 0.5,
    };

    noteServices.create(newObject).then((returnedNote) => {
      setNotesRepo(notesRepo.concat(returnedNote));
      setNewNote('');
    });
  };

  //Alter data on server
  const toggleImportance = (id) => {
    //find the particular note we want to modify
    const note = notesRepo.find((n) => n.id === id);
    //make your change
    const changedNote = { ...note, important: !note.important };

    noteServices
      .update(changedNote)
      .then((returnedNote) => {
        //reset the notes status in server
        setNotesRepo(notesRepo.map((n) => (n.id !== id ? n : returnedNote)));
      })
      //handling error
      .catch((error) => {
        alert(`the note '${note.content}' was already deleted from server`);
        setNotes(notesRepo.filter((n) => n.id !== id));
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
