import React, { useState } from "react";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id) {
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            name={noteItem.name}
            type={noteItem.type}
            date={noteItem.date}
            quota={noteItem.quota}
            description={noteItem.description}
            image={noteItem.image}
            place={noteItem.place}
            onDelete={deleteNote}
          />
        );
      })}
    </div>
  );
}

export default App;
