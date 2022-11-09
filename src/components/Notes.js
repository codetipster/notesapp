//Component renders a single note at every instance

const Notes = ({ note, toggleImportance }) => {
  return (
    <div>
      <li>{note}</li>
      <label>
        <input type="checkbox" onClick={toggleImportance} />
        Mark as Important
      </label>
    </div>
  );
};

export default Notes;
